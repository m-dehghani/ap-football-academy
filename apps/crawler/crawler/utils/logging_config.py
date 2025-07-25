"""
Logging configuration for the crawler using loguru
"""
import sys
from loguru import logger
from pathlib import Path
from typing import Optional

def setup_logging(
    level: str = "INFO",
    log_file: Optional[str] = None,
    rotation: str = "1 day",
    retention: str = "30 days",
    format_string: Optional[str] = None
):
    """Setup logging configuration using loguru"""
    
    # Remove default handler
    logger.remove()
    
    # Default format
    if format_string is None:
        format_string = (
            "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | "
            "<level>{level: <8}</level> | "
            "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> | "
            "<level>{message}</level>"
        )
    
    # Add console handler
    logger.add(
        sys.stdout,
        format=format_string,
        level=level,
        colorize=True,
        backtrace=True,
        diagnose=True
    )
    
    # Add file handler if specified
    if log_file:
        log_path = Path(log_file)
        log_path.parent.mkdir(parents=True, exist_ok=True)
        
        logger.add(
            log_file,
            format=format_string,
            level=level,
            rotation=rotation,
            retention=retention,
            compression="zip",
            backtrace=True,
            diagnose=True
        )
    
    # Configure loguru to work with stdlib logging
    import logging
    
    class InterceptHandler(logging.Handler):
        def emit(self, record):
            # Get corresponding Loguru level if it exists
            try:
                level = logger.level(record.levelname).name
            except ValueError:
                level = record.levelno
            
            # Find caller from where originated the logged message
            frame, depth = sys._getframe(6), 6
            while frame and frame.f_code.co_filename == logging.__file__:
                frame = frame.f_back
                depth += 1
            
            logger.opt(depth=depth, exception=record.exc_info).log(
                level, record.getMessage()
            )
    
    # Replace stdlib logging with loguru
    logging.basicConfig(handlers=[InterceptHandler()], level=0, force=True)
    
    # Configure specific loggers
    logging.getLogger("crawler").setLevel(level)
    logging.getLogger("sqlalchemy").setLevel("WARNING")
    logging.getLogger("urllib3").setLevel("WARNING")
    logging.getLogger("aiohttp").setLevel("WARNING")
    
    logger.info(f"Logging configured - Level: {level}, File: {log_file}")

def get_logger(name: str):
    """Get a logger instance"""
    return logger.bind(name=name) 