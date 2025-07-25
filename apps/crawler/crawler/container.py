"""
Dependency injection container for the Football Crawler application
"""
from typing import Dict, Any, Type, Optional, Callable
import logging
from contextlib import asynccontextmanager
from sqlalchemy.ext.asyncio import AsyncSession

from .config import Settings
from .database.connection import DatabaseManager
from .services.crawler_service import CrawlerService
from .services.processing_service import ProcessingService
from .services.llm_service import LLMService
from .repositories.article_repository import ArticleRepository
from .repositories.site_repository import SiteRepository
from .utils.logging_config import setup_logging
from .exceptions import ConfigurationError

logger = logging.getLogger(__name__)


class Container:
    """Dependency injection container"""
    
    def __init__(self):
        self._services: Dict[str, Any] = {}
        self._factories: Dict[str, Callable] = {}
        self._singletons: Dict[str, Any] = {}
        self._settings: Optional[Settings] = None
        self._initialized = False
        
    def register_singleton(self, name: str, instance: Any) -> None:
        """Register a singleton instance"""
        self._singletons[name] = instance
        
    def register_factory(self, name: str, factory: Callable) -> None:
        """Register a factory function"""
        self._factories[name] = factory
        
    def register_service(self, name: str, service_class: Type, **kwargs) -> None:
        """Register a service class"""
        self._services[name] = (service_class, kwargs)
        
    def get(self, name: str) -> Any:
        """Get a service instance"""
        if name in self._singletons:
            return self._singletons[name]
            
        if name in self._factories:
            return self._factories[name]()
            
        if name in self._services:
            service_class, kwargs = self._services[name]
            return service_class(**kwargs)
            
        raise ConfigurationError(f"Service '{name}' not found in container")
        
    def get_settings(self) -> Settings:
        """Get application settings"""
        if self._settings is None:
            self._settings = Settings()
        return self._settings
        
    def initialize(self) -> None:
        """Initialize the container with all services"""
        if self._initialized:
            return
            
        logger.info("Initializing dependency injection container")
        
        try:
            # Register settings
            settings = self.get_settings()
            self.register_singleton("settings", settings)
            
            # Setup logging
            setup_logging(level=getattr(logging, settings.LOG_LEVEL))
            
            # Register database manager
            db_manager = DatabaseManager(settings.DATABASE_URL)
            self.register_singleton("database_manager", db_manager)
            
            # Register repositories
            self.register_factory("article_repository", 
                                lambda: ArticleRepository(self.get("database_manager")))
            self.register_factory("site_repository", 
                                lambda: SiteRepository(self.get("database_manager")))
            
            # Register services
            self.register_factory("llm_service", 
                                lambda: LLMService(settings))
            self.register_factory("processing_service", 
                                lambda: ProcessingService(
                                    self.get("article_repository"),
                                    self.get("llm_service"),
                                    settings
                                ))
            self.register_factory("crawler_service", 
                                lambda: CrawlerService(
                                    self.get("article_repository"),
                                    self.get("site_repository"),
                                    settings
                                ))
            
            self._initialized = True
            logger.info("Container initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize container: {str(e)}")
            raise ConfigurationError(f"Container initialization failed: {str(e)}")
            
    @asynccontextmanager
    async def get_db_session(self):
        """Get database session context manager"""
        db_manager = self.get("database_manager")
        async with db_manager.get_session() as session:
            yield session
            
    async def health_check(self) -> Dict[str, str]:
        """Check health of all services"""
        health_status = {}
        
        try:
            # Check database
            db_manager = self.get("database_manager")
            if await db_manager.health_check():
                health_status["database"] = "healthy"
            else:
                health_status["database"] = "unhealthy"
        except Exception as e:
            health_status["database"] = f"error: {str(e)}"
            
        try:
            # Check LLM service
            llm_service = self.get("llm_service")
            if await llm_service.health_check():
                health_status["llm"] = "healthy"
            else:
                health_status["llm"] = "unhealthy"
        except Exception as e:
            health_status["llm"] = f"error: {str(e)}"
            
        try:
            # Check Redis (if configured)
            settings = self.get_settings()
            if settings.REDIS_URL:
                # TODO: Implement Redis health check
                health_status["redis"] = "not_implemented"
        except Exception as e:
            health_status["redis"] = f"error: {str(e)}"
            
        return health_status
        
    def cleanup(self) -> None:
        """Cleanup resources"""
        logger.info("Cleaning up container resources")
        
        try:
            # Close database connections
            if "database_manager" in self._singletons:
                db_manager = self._singletons["database_manager"]
                if hasattr(db_manager, 'close'):
                    db_manager.close()
                    
            # Clear all services
            self._services.clear()
            self._factories.clear()
            self._singletons.clear()
            
            self._initialized = False
            logger.info("Container cleanup completed")
            
        except Exception as e:
            logger.error(f"Error during container cleanup: {str(e)}")


# Global container instance
container = Container()


def get_container() -> Container:
    """Get the global container instance"""
    if not container._initialized:
        container.initialize()
    return container


def get_service(service_name: str) -> Any:
    """Get a service from the container"""
    return get_container().get(service_name)


def get_settings() -> Settings:
    """Get application settings"""
    return get_container().get_settings()


# Context manager for dependency injection
@asynccontextmanager
async def get_db_session():
    """Get database session"""
    async with get_container().get_db_session() as session:
        yield session 