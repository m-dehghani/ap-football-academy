"""
Data Transfer Objects (DTOs) and schemas for the Football Crawler application
"""
from datetime import datetime
from typing import Optional, List, Dict, Any, Union
from pydantic import BaseModel, Field, validator
from enum import Enum


class ProcessingStatus(str, Enum):
    """Processing status enumeration"""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    SKIPPED = "skipped"


class ArticleCategory(str, Enum):
    """Article category enumeration"""
    NEWS = "news"
    MATCH = "match"
    TRANSFER = "transfer"
    ANALYSIS = "analysis"
    INTERVIEW = "interview"
    LEAGUE = "league"
    NATIONAL_TEAM = "national_team"
    PLAYER = "player"
    COACH = "coach"


class CrawlRequest(BaseModel):
    """Request schema for crawling operations"""
    sites: Optional[List[str]] = Field(None, description="List of sites to crawl")
    max_pages: int = Field(100, ge=1, le=1000, description="Maximum pages to crawl")
    delay: float = Field(1.0, ge=0.1, le=10.0, description="Delay between requests")
    headless: bool = Field(True, description="Run browser in headless mode")
    force: bool = Field(False, description="Force crawl even if recently crawled")
    categories: Optional[List[str]] = Field(None, description="Categories to crawl")


class ProcessRequest(BaseModel):
    """Request schema for processing operations"""
    article_ids: Optional[List[str]] = Field(None, description="Specific article IDs to process")
    batch_size: int = Field(10, ge=1, le=100, description="Batch size for processing")
    force: bool = Field(False, description="Force reprocessing")
    processor_type: str = Field("all", description="Type of processing to perform")


class ArticleCreate(BaseModel):
    """Schema for creating articles"""
    url: str = Field(..., max_length=500, description="Article URL")
    title: str = Field(..., max_length=200, description="Article title")
    content: str = Field(..., description="Article content")
    raw_html: Optional[str] = Field(None, description="Raw HTML content")
    published_date: Optional[datetime] = Field(None, description="Publication date")
    source: str = Field(..., max_length=100, description="Source website")
    language: str = Field("fa", max_length=10, description="Content language")
    category: Optional[ArticleCategory] = Field(None, description="Article category")
    
    @validator('url')
    def validate_url(cls, v):
        """Validate URL format"""
        if not v.startswith(('http://', 'https://')):
            raise ValueError('URL must start with http:// or https://')
        return v


class ArticleUpdate(BaseModel):
    """Schema for updating articles"""
    title: Optional[str] = Field(None, max_length=200)
    content: Optional[str] = Field(None)
    summary: Optional[str] = Field(None)
    category: Optional[ArticleCategory] = Field(None)
    tags: Optional[List[str]] = Field(None)
    processed: Optional[bool] = Field(None)
    processing_status: Optional[ProcessingStatus] = Field(None)


class ArticleResponse(BaseModel):
    """Schema for article responses"""
    id: str
    url: str
    title: str
    content: str
    summary: Optional[str] = None
    category: Optional[str] = None
    tags: List[str] = []
    sentiment_score: Optional[float] = None
    published_date: Optional[datetime] = None
    crawled_date: datetime
    processed_date: Optional[datetime] = None
    source: str
    language: str
    processed: bool
    processing_status: str
    confidence_score: Optional[float] = None
    
    class Config:
        from_attributes = True


class PlayerInfo(BaseModel):
    """Schema for player information"""
    name: str = Field(..., max_length=100)
    team: Optional[str] = Field(None, max_length=100)
    position: Optional[str] = Field(None, max_length=50)
    nationality: Optional[str] = Field(None, max_length=50)
    age: Optional[int] = Field(None, ge=15, le=50)
    mentioned_in: Optional[str] = Field(None, max_length=500)
    confidence: float = Field(0.0, ge=0.0, le=1.0)


class MatchInfo(BaseModel):
    """Schema for match information"""
    team1: str = Field(..., max_length=100)
    team2: str = Field(..., max_length=100)
    score1: Optional[int] = Field(None, ge=0)
    score2: Optional[int] = Field(None, ge=0)
    match_date: Optional[datetime] = Field(None)
    venue: Optional[str] = Field(None, max_length=200)
    league: Optional[str] = Field(None, max_length=100)
    mentioned_in: Optional[str] = Field(None, max_length=500)
    confidence: float = Field(0.0, ge=0.0, le=1.0)


class EntityInfo(BaseModel):
    """Schema for entity information"""
    entity_type: str = Field(..., max_length=50)
    entity_name: str = Field(..., max_length=200)
    confidence: float = Field(0.0, ge=0.0, le=1.0)
    context: Optional[str] = Field(None, max_length=500)


class LLMAnalysisResult(BaseModel):
    """Schema for LLM analysis results"""
    summary: str = Field(..., max_length=1000)
    category: ArticleCategory
    sentiment_score: float = Field(0.0, ge=-1.0, le=1.0)
    confidence_score: float = Field(0.0, ge=0.0, le=1.0)
    tags: List[str] = Field(default_factory=list)
    entities: List[EntityInfo] = Field(default_factory=list)
    players: List[PlayerInfo] = Field(default_factory=list)
    matches: List[MatchInfo] = Field(default_factory=list)
    processing_time: float = Field(0.0, ge=0.0)
    model_used: str = Field("", max_length=50)


class CrawlResult(BaseModel):
    """Schema for crawl results"""
    site: str
    pages_crawled: int = Field(0, ge=0)
    articles_found: int = Field(0, ge=0)
    articles_saved: int = Field(0, ge=0)
    errors: int = Field(0, ge=0)
    duration: float = Field(0.0, ge=0.0)
    success_rate: float = Field(0.0, ge=0.0, le=1.0)
    error_messages: List[str] = Field(default_factory=list)


class ProcessResult(BaseModel):
    """Schema for processing results"""
    processor: str
    processed: int = Field(0, ge=0)
    successful: int = Field(0, ge=0)
    failed: int = Field(0, ge=0)
    skipped: int = Field(0, ge=0)
    duration: float = Field(0.0, ge=0.0)
    success_rate: float = Field(0.0, ge=0.0, le=1.0)
    error_messages: List[str] = Field(default_factory=list)


class SiteConfiguration(BaseModel):
    """Schema for site configuration"""
    site_name: str = Field(..., max_length=100)
    base_url: str = Field(..., max_length=200)
    selectors: Dict[str, str] = Field(..., description="CSS selectors")
    categories: List[str] = Field(..., description="URL categories to crawl")
    crawl_delay: float = Field(1.0, ge=0.1, le=30.0)
    max_pages: int = Field(100, ge=1, le=1000)
    active: bool = Field(True)
    respect_robots: bool = Field(True)
    headers: Optional[Dict[str, str]] = Field(None)
    
    @validator('base_url')
    def validate_base_url(cls, v):
        """Validate base URL format"""
        if not v.startswith(('http://', 'https://')):
            raise ValueError('Base URL must start with http:// or https://')
        return v


class SystemStats(BaseModel):
    """Schema for system statistics"""
    total_articles: int = Field(0, ge=0)
    processed_articles: int = Field(0, ge=0)
    pending_articles: int = Field(0, ge=0)
    failed_articles: int = Field(0, ge=0)
    sites_configured: int = Field(0, ge=0)
    active_sites: int = Field(0, ge=0)
    last_crawl: Optional[datetime] = None
    last_process: Optional[datetime] = None
    success_rate: float = Field(0.0, ge=0.0, le=1.0)


class HealthCheck(BaseModel):
    """Schema for health check responses"""
    status: str = Field("healthy", description="Overall system status")
    timestamp: datetime = Field(default_factory=datetime.now)
    database: str = Field("unknown", description="Database connection status")
    redis: str = Field("unknown", description="Redis connection status")
    openai: str = Field("unknown", description="OpenAI API status")
    version: str = Field("1.0.0", description="Application version")
    uptime: Optional[float] = Field(None, description="System uptime in seconds")


class ErrorResponse(BaseModel):
    """Schema for error responses"""
    error: str = Field(..., description="Error message")
    error_code: Optional[str] = Field(None, description="Error code")
    details: Optional[Dict[str, Any]] = Field(None, description="Error details")
    timestamp: datetime = Field(default_factory=datetime.now)
    request_id: Optional[str] = Field(None, description="Request ID for tracking") 