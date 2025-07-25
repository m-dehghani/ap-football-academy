"""
Configuration settings for the Football Crawler project
Clean and optimized configuration for the new service architecture
"""

import os
from typing import List, Optional, Dict, Any
from pydantic import Field, validator
from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    """Application settings with proper environment variable handling"""
    
    # Application Info
    APP_NAME: str = "Football Intelligence Crawler"
    VERSION: str = "2.0.0"
    DESCRIPTION: str = "Persian Football Information Extraction System with LLM Agent"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"
    
    # Database Configuration
    DATABASE_URL: str = "sqlite+aiosqlite:///./football_crawler.db"
    DATABASE_ECHO: bool = False
    DATABASE_POOL_SIZE: int = 10
    DATABASE_MAX_OVERFLOW: int = 20
    
    # Redis Configuration (for caching and queues)
    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_ENABLED: bool = False
    
    # OpenAI Configuration
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4-turbo-preview"
    OPENAI_MAX_TOKENS: int = 2000
    OPENAI_TEMPERATURE: float = 0.1
    OPENAI_TIMEOUT: int = 60
    
    # Crawler Configuration
    CRAWLER_USER_AGENT: str = "Football-Intelligence-Crawler/2.0 (+https://github.com/your-org/football-crawler)"
    CRAWLER_DEFAULT_DELAY: float = 1.0
    CRAWLER_MAX_PAGES: int = 100
    CRAWLER_TIMEOUT: int = 30
    CRAWLER_RETRIES: int = 3
    CRAWLER_CONCURRENT_REQUESTS: int = 5
    
    # Processing Configuration
    PROCESSING_BATCH_SIZE: int = 10
    PROCESSING_MAX_WORKERS: int = 4
    PROCESSING_TIMEOUT: int = 300
    PROCESSING_SEMAPHORE_LIMIT: int = 3
    
    # Logging Configuration
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    LOG_FILE: Optional[str] = None
    LOG_ROTATION: str = "1 day"
    LOG_RETENTION: str = "30 days"
    
    # API Configuration
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    API_WORKERS: int = 1
    API_RELOAD: bool = False
    API_CORS_ORIGINS: List[str] = ["*"]
    
    # File Storage Configuration
    STORAGE_PATH: str = "./storage"
    IMAGES_PATH: str = "./storage/images"
    LOGS_PATH: str = "./storage/logs"
    DATA_PATH: str = "./storage/data"
    
    # Security Configuration
    SECRET_KEY: str = "your-secret-key-change-in-production"
    
    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_WINDOW: int = 3600  # 1 hour
    
    # Monitoring Configuration
    MONITORING_ENABLED: bool = True
    MONITORING_INTERVAL: int = 300  # 5 minutes
    ALERT_THRESHOLD_ERRORS: int = 10
    ALERT_THRESHOLD_FAILED_REQUESTS: int = 50
    
    # Site Configurations - Moved to be more manageable
    PERSIAN_FOOTBALL_SITES: Dict[str, Dict[str, Any]] = {
        "varzesh3": {
            "base_url": "https://www.varzesh3.com",
            "name": "ورزش سه",
            "selectors": {
                "title": "h1.title, h1",
                "content": ".news-content, .content",
                "date": ".news-date, .date",
                "category": ".news-category, .category"
            },
            "categories": ["/football/", "/persianleague/", "/worldcup/", "/news/"],
            "delay": 2.0,
            "max_pages": 50,
            "active": True
        },
        "persianfootball": {
            "base_url": "https://www.persianfootball.com",
            "name": "Persian Football",
            "selectors": {
                "title": "h1",
                "content": ".content, .post-content",
                "date": ".date, .post-date",
                "category": ".category, .post-category"
            },
            "categories": ["/news/", "/league/", "/team/"],
            "delay": 1.5,
            "max_pages": 30,
            "active": True
        },
        "footballiran": {
            "base_url": "https://www.footballiran.com",
            "name": "فوتبال ایران",
            "selectors": {
                "title": "h1.entry-title, h1",
                "content": ".entry-content, .content",
                "date": ".entry-date, .date",
                "category": ".entry-category, .category"
            },
            "categories": ["/news/", "/analysis/", "/transfer/", "/team-melli/"],
            "delay": 1.0,
            "max_pages": 40,
            "active": True
        },
        "isna": {
            "base_url": "https://www.isna.ir",
            "name": "ایسنا",
            "selectors": {
                "title": "h1.item-title, h1",
                "content": ".item-text, .content",
                "date": ".item-date, .date",
                "category": ".item-category, .category"
            },
            "categories": ["/service/sport/football/"],
            "delay": 3.0,
            "max_pages": 20,
            "active": False  # Can be enabled as needed
        },
        "mehrnews": {
            "base_url": "https://www.mehrnews.com",
            "name": "مهر",
            "selectors": {
                "title": "h1, .title",
                "content": ".content, .news-content",
                "date": ".date, .time",
                "category": ".category"
            },
            "categories": ["/service/sport/football/"],
            "delay": 2.5,
            "max_pages": 25,
            "active": False  # Can be enabled as needed
        }
    }
    
    # Persian Text Processing
    PERSIAN_STOPWORDS: List[str] = [
        "در", "از", "به", "با", "را", "که", "این", "آن", "و", "یا", "اما", "هم",
        "تا", "بر", "برای", "پس", "اگر", "چون", "وقتی", "هنگام", "همان",
        "است", "هست", "بود", "باشد", "دارد", "کند", "شود", "گردد", "بین",
        "روی", "زیر", "کنار", "نزد", "پیش", "دور", "نزدیک", "داخل", "خارج"
    ]
    
    # Team Name Mappings for normalization
    TEAM_NAME_MAPPINGS: Dict[str, str] = {
        "پرسپولیس": "Persepolis FC",
        "استقلال": "Esteghlal FC",
        "سپاهان": "Sepahan FC",
        "تراکتور": "Tractor FC",
        "پیکان": "Paykan FC",
        "ذوب آهن": "Zob Ahan FC",
        "الهلال": "Al-Hilal SFC",
        "النصر": "Al-Nassr FC",
        "الاهلی": "Al-Ahly SC",
        "بارسلونا": "FC Barcelona",
        "رئال مادرید": "Real Madrid CF",
        "منچستر یونایتد": "Manchester United FC",
        "لیورپول": "Liverpool FC",
        "چلسی": "Chelsea FC",
        "آرسنال": "Arsenal FC",
        "منچستر سیتی": "Manchester City FC",
        "بایرن مونیخ": "FC Bayern Munich",
        "پاری سن ژرمن": "Paris Saint-Germain"
    }
    
    # Processing pipelines configuration
    PROCESSING_PIPELINES: Dict[str, Dict[str, Any]] = {
        "llm_analysis": {
            "enabled": True,
            "priority": 1,
            "timeout": 120,
            "retry_attempts": 2
        },
        "sentiment_analysis": {
            "enabled": True,
            "priority": 2,
            "timeout": 30,
            "retry_attempts": 3
        },
        "entity_extraction": {
            "enabled": True,
            "priority": 3,
            "timeout": 60,
            "retry_attempts": 2
        },
        "player_extraction": {
            "enabled": True,
            "priority": 4,
            "timeout": 45,
            "retry_attempts": 2
        },
        "match_extraction": {
            "enabled": True,
            "priority": 5,
            "timeout": 45,
            "retry_attempts": 2
        }
    }
    
    @validator('STORAGE_PATH', 'IMAGES_PATH', 'LOGS_PATH', 'DATA_PATH')
    def create_directories(cls, v):
        """Create directories if they don't exist"""
        Path(v).mkdir(parents=True, exist_ok=True)
        return v
    
    @validator('OPENAI_API_KEY')
    def validate_openai_key(cls, v):
        """Validate OpenAI API key format"""
        if v and not v.startswith(("sk-", "org-")):
            if v != "":  # Allow empty for testing
                raise ValueError("OpenAI API key must start with 'sk-' or 'org-'")
        return v
    
    @validator('DATABASE_URL')
    def validate_database_url(cls, v):
        """Validate database URL format"""
        if not v.startswith(("postgresql://", "sqlite:///", "sqlite+aiosqlite:///", "mysql://", "mysql+pymysql://")):
            raise ValueError("Database URL must be a valid database connection string")
        return v
    
    @validator('LOG_LEVEL')
    def validate_log_level(cls, v):
        """Validate log level"""
        valid_levels = ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL']
        if v.upper() not in valid_levels:
            raise ValueError(f"Log level must be one of {valid_levels}")
        return v.upper()
    
    @validator('ENVIRONMENT')
    def validate_environment(cls, v):
        """Validate environment"""
        valid_envs = ['development', 'testing', 'staging', 'production']
        if v.lower() not in valid_envs:
            raise ValueError(f"Environment must be one of {valid_envs}")
        return v.lower()
    
    def get_active_sites(self) -> Dict[str, Dict[str, Any]]:
        """Get only active sites"""
        return {
            name: config for name, config in self.PERSIAN_FOOTBALL_SITES.items()
            if config.get('active', True)
        }
    
    def get_site_config(self, site_name: str) -> Optional[Dict[str, Any]]:
        """Get configuration for a specific site"""
        return self.PERSIAN_FOOTBALL_SITES.get(site_name)
    
    def is_production(self) -> bool:
        """Check if running in production"""
        return self.ENVIRONMENT == "production"
    
    def is_development(self) -> bool:
        """Check if running in development"""
        return self.ENVIRONMENT == "development"
    
    def is_testing(self) -> bool:
        """Check if running in testing"""
        return self.ENVIRONMENT == "testing"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        env_nested_delimiter = "__"  # For nested env vars like DATABASE__URL

# Create global settings instance
settings = Settings()

# Additional configuration classes for specific components

class CrawlerConfig:
    """Crawler-specific configuration derived from main settings"""
    
    def __init__(self, settings_obj: Settings = settings):
        self.settings = settings_obj
        self.sites = settings_obj.get_active_sites()
        self.user_agent = settings_obj.CRAWLER_USER_AGENT
        self.default_delay = settings_obj.CRAWLER_DEFAULT_DELAY
        self.max_pages = settings_obj.CRAWLER_MAX_PAGES
        self.timeout = settings_obj.CRAWLER_TIMEOUT
        self.retries = settings_obj.CRAWLER_RETRIES
        self.concurrent_requests = settings_obj.CRAWLER_CONCURRENT_REQUESTS
        
        # Headers for requests
        self.headers = {
            'User-Agent': self.user_agent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'fa,fa-IR;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'DNT': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none'
        }
    
    def get_site_headers(self, site_name: str) -> Dict[str, str]:
        """Get headers for a specific site"""
        site_config = self.settings.get_site_config(site_name)
        custom_headers = site_config.get('headers', {}) if site_config else {}
        return {**self.headers, **custom_headers}

class ProcessingConfig:
    """Processing-specific configuration"""
    
    def __init__(self, settings_obj: Settings = settings):
        self.settings = settings_obj
        self.batch_size = settings_obj.PROCESSING_BATCH_SIZE
        self.max_workers = settings_obj.PROCESSING_MAX_WORKERS
        self.timeout = settings_obj.PROCESSING_TIMEOUT
        self.semaphore_limit = settings_obj.PROCESSING_SEMAPHORE_LIMIT
        self.pipelines = settings_obj.PROCESSING_PIPELINES
        
        # LLM configuration
        self.llm_config = {
            'model': settings_obj.OPENAI_MODEL,
            'max_tokens': settings_obj.OPENAI_MAX_TOKENS,
            'temperature': settings_obj.OPENAI_TEMPERATURE,
            'timeout': settings_obj.OPENAI_TIMEOUT,
            'api_key': settings_obj.OPENAI_API_KEY
        }
    
    def get_pipeline_config(self, pipeline_name: str) -> Dict[str, Any]:
        """Get configuration for a specific processing pipeline"""
        return self.pipelines.get(pipeline_name, {})
    
    def is_pipeline_enabled(self, pipeline_name: str) -> bool:
        """Check if a processing pipeline is enabled"""
        return self.get_pipeline_config(pipeline_name).get('enabled', False)

class DatabaseConfig:
    """Database-specific configuration"""
    
    def __init__(self, settings_obj: Settings = settings):
        self.settings = settings_obj
        self.url = settings_obj.DATABASE_URL
        self.echo = settings_obj.DATABASE_ECHO
        
        # Connection pool settings
        self.pool_size = settings_obj.DATABASE_POOL_SIZE
        self.max_overflow = settings_obj.DATABASE_MAX_OVERFLOW
        self.pool_timeout = 30
        self.pool_recycle = 3600
        
        # Query settings
        self.query_timeout = 30
        self.bulk_insert_batch_size = 1000
    
    def get_engine_kwargs(self) -> Dict[str, Any]:
        """Get SQLAlchemy engine configuration"""
        kwargs = {
            'echo': self.echo,
            'pool_timeout': self.pool_timeout,
            'pool_recycle': self.pool_recycle
        }
        
        # Add pool settings for non-SQLite databases
        if not self.url.startswith('sqlite'):
            kwargs.update({
                'pool_size': self.pool_size,
                'max_overflow': self.max_overflow
            })
        
        return kwargs

# Create configuration instances
crawler_config = CrawlerConfig()
processing_config = ProcessingConfig()
database_config = DatabaseConfig()

# Utility functions
def get_env_info() -> Dict[str, Any]:
    """Get environment information"""
    return {
        'environment': settings.ENVIRONMENT,
        'debug': settings.DEBUG,
        'version': settings.VERSION,
        'database_type': settings.DATABASE_URL.split('://')[0],
        'openai_configured': bool(settings.OPENAI_API_KEY),
        'redis_enabled': settings.REDIS_ENABLED,
        'active_sites': len(settings.get_active_sites()),
        'log_level': settings.LOG_LEVEL
    }

def validate_configuration() -> List[str]:
    """Validate configuration and return list of issues"""
    issues = []
    
    # Check required settings for production
    if settings.is_production():
        if settings.SECRET_KEY == "your-secret-key-change-in-production":
            issues.append("SECRET_KEY must be changed in production")
        
        if not settings.OPENAI_API_KEY:
            issues.append("OPENAI_API_KEY is required in production")
        
        if settings.DEBUG:
            issues.append("DEBUG should be False in production")
    
    # Check database connectivity
    if settings.DATABASE_URL.startswith('postgresql://') and 'localhost' in settings.DATABASE_URL:
        if settings.is_production():
            issues.append("Using localhost database in production")
    
    # Check site configurations
    active_sites = settings.get_active_sites()
    if not active_sites:
        issues.append("No active sites configured")
    
    return issues

# Export commonly used configurations
__all__ = [
    "settings",
    "crawler_config", 
    "processing_config",
    "database_config",
    "CrawlerConfig",
    "ProcessingConfig", 
    "DatabaseConfig",
    "get_env_info",
    "validate_configuration"
] 