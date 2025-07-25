"""
Database connection and management
"""
import logging
from typing import Dict, List, Optional, AsyncGenerator
from contextlib import asynccontextmanager
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.pool import StaticPool
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text

from ..models import Base
from ..exceptions import DatabaseError

logger = logging.getLogger(__name__)

class DatabaseManager:
    """Manages database connections and operations"""
    
    def __init__(self, database_url: str = "sqlite+aiosqlite:///./crawler.db"):
        self.database_url = database_url
        self.engine = None
        self.session_factory = None
        self._initialized = False
        
    def initialize(self):
        """Initialize database engine and session factory"""
        if self._initialized:
            return
            
        try:
            # Create async engine
            if "sqlite" in self.database_url:
                self.engine = create_async_engine(
                    self.database_url,
                    poolclass=StaticPool,
                    connect_args={"check_same_thread": False},
                    echo=False
                )
            else:
                self.engine = create_async_engine(
                    self.database_url,
                    pool_size=10,
                    max_overflow=20,
                    pool_timeout=30,
                    pool_recycle=3600,
                    echo=False
                )
            
            # Create session factory
            self.session_factory = async_sessionmaker(
                self.engine,
                class_=AsyncSession,
                expire_on_commit=False
            )
            
            self._initialized = True
            logger.info("Database manager initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize database: {str(e)}")
            raise DatabaseError(f"Database initialization failed: {str(e)}")
        
    @asynccontextmanager
    async def get_session(self) -> AsyncGenerator[AsyncSession, None]:
        """Get database session context manager"""
        if not self._initialized:
            self.initialize()
            
        if not self.session_factory:
            raise DatabaseError("Database session factory not initialized")
            
        async with self.session_factory() as session:
            try:
                yield session
            except SQLAlchemyError as e:
                await session.rollback()
                logger.error(f"Database session error: {str(e)}")
                raise DatabaseError(f"Database operation failed: {str(e)}")
            except Exception as e:
                await session.rollback()
                logger.error(f"Unexpected error in database session: {str(e)}")
                raise
                
    async def create_tables(self):
        """Create database tables"""
        if not self._initialized:
            self.initialize()
            
        if not self.engine:
            raise DatabaseError("Database engine not initialized")
            
        try:
            logger.info("Creating database tables")
            async with self.engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            logger.info("Database tables created successfully")
            
        except Exception as e:
            logger.error(f"Error creating database tables: {str(e)}")
            raise DatabaseError(f"Failed to create tables: {str(e)}")
            
    async def health_check(self) -> bool:
        """Check database health"""
        if not self._initialized:
            self.initialize()
            
        try:
            async with self.get_session() as session:
                await session.execute(text("SELECT 1"))
                return True
                
        except Exception as e:
            logger.error(f"Database health check failed: {str(e)}")
            return False
        
    def get_statistics(self) -> Dict:
        """Get crawler statistics (sync version for compatibility)"""
        # TODO: Implement actual statistics retrieval
        return {
            'total_articles': {'count': 0, 'latest': 'N/A'},
            'processed_articles': {'count': 0, 'latest': 'N/A'},
            'sites_configured': {'count': 0, 'latest': 'N/A'}
        }
        
    def get_site_configurations(self) -> List[Dict]:
        """Get site configurations (sync version for compatibility)"""
        # TODO: Implement actual site configuration retrieval
        return []
        
    def get_queue_statistics(self) -> Dict:
        """Get processing queue statistics (sync version for compatibility)"""
        # TODO: Implement actual queue statistics
        return {'pending': 0, 'processing': 0, 'completed': 0}
        
    async def reset_database(self, keep_config: bool = True):
        """Reset database"""
        if not self._initialized:
            self.initialize()
            
        if not self.engine:
            raise DatabaseError("Database engine not initialized")
            
        try:
            logger.info(f"Resetting database (keep_config={keep_config})")
            async with self.engine.begin() as conn:
                await conn.run_sync(Base.metadata.drop_all)
                await conn.run_sync(Base.metadata.create_all)
            logger.info("Database reset completed")
            
        except Exception as e:
            logger.error(f"Error resetting database: {str(e)}")
            raise DatabaseError(f"Failed to reset database: {str(e)}")
            
    async def close(self):
        """Close database connections"""
        if self.engine:
            await self.engine.dispose()
            logger.info("Database connections closed") 