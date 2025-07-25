"""
Custom exceptions for the Football Crawler application
"""
from typing import Optional, Dict, Any


class CrawlerBaseException(Exception):
    """Base exception for all crawler-related errors"""
    
    def __init__(self, message: str, error_code: Optional[str] = None, details: Optional[Dict[str, Any]] = None):
        self.message = message
        self.error_code = error_code
        self.details = details or {}
        super().__init__(self.message)


class ConfigurationError(CrawlerBaseException):
    """Raised when there's a configuration error"""
    pass


class DatabaseError(CrawlerBaseException):
    """Raised when database operations fail"""
    pass


class CrawlingError(CrawlerBaseException):
    """Raised when crawling operations fail"""
    pass


class ProcessingError(CrawlerBaseException):
    """Raised when content processing fails"""
    pass


class ValidationError(CrawlerBaseException):
    """Raised when validation fails"""
    pass


class APIError(CrawlerBaseException):
    """Raised when API operations fail"""
    pass


class LLMError(CrawlerBaseException):
    """Raised when LLM operations fail"""
    pass


class NetworkError(CrawlerBaseException):
    """Raised when network operations fail"""
    pass


class AuthenticationError(CrawlerBaseException):
    """Raised when authentication fails"""
    pass


class RateLimitError(CrawlerBaseException):
    """Raised when rate limits are exceeded"""
    pass 