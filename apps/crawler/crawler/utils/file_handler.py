"""
Async file handler utilities using aiofiles
"""
import aiofiles
import json
import csv
from typing import Any, Dict, List, Optional, Union
from pathlib import Path
from loguru import logger
import asyncio
from datetime import datetime

class AsyncFileHandler:
    """Async file handler for various file operations"""
    
    @staticmethod
    async def write_text(filepath: Union[str, Path], content: str, encoding: str = 'utf-8') -> None:
        """Write text to file asynchronously"""
        try:
            async with aiofiles.open(filepath, 'w', encoding=encoding) as f:
                await f.write(content)
            logger.debug(f"Successfully wrote text to {filepath}")
        except Exception as e:
            logger.error(f"Error writing text to {filepath}: {str(e)}")
            raise
    
    @staticmethod
    async def read_text(filepath: Union[str, Path], encoding: str = 'utf-8') -> str:
        """Read text from file asynchronously"""
        try:
            async with aiofiles.open(filepath, 'r', encoding=encoding) as f:
                content = await f.read()
            logger.debug(f"Successfully read text from {filepath}")
            return content
        except Exception as e:
            logger.error(f"Error reading text from {filepath}: {str(e)}")
            raise
    
    @staticmethod
    async def write_json(filepath: Union[str, Path], data: Any, encoding: str = 'utf-8', indent: int = 2) -> None:
        """Write JSON data to file asynchronously"""
        try:
            json_str = json.dumps(data, ensure_ascii=False, indent=indent)
            async with aiofiles.open(filepath, 'w', encoding=encoding) as f:
                await f.write(json_str)
            logger.debug(f"Successfully wrote JSON to {filepath}")
        except Exception as e:
            logger.error(f"Error writing JSON to {filepath}: {str(e)}")
            raise
    
    @staticmethod
    async def read_json(filepath: Union[str, Path], encoding: str = 'utf-8') -> Any:
        """Read JSON data from file asynchronously"""
        try:
            async with aiofiles.open(filepath, 'r', encoding=encoding) as f:
                content = await f.read()
            data = json.loads(content)
            logger.debug(f"Successfully read JSON from {filepath}")
            return data
        except Exception as e:
            logger.error(f"Error reading JSON from {filepath}: {str(e)}")
            raise
    
    @staticmethod
    async def append_text(filepath: Union[str, Path], content: str, encoding: str = 'utf-8') -> None:
        """Append text to file asynchronously"""
        try:
            async with aiofiles.open(filepath, 'a', encoding=encoding) as f:
                await f.write(content)
            logger.debug(f"Successfully appended text to {filepath}")
        except Exception as e:
            logger.error(f"Error appending text to {filepath}: {str(e)}")
            raise
    
    @staticmethod
    async def file_exists(filepath: Union[str, Path]) -> bool:
        """Check if file exists"""
        try:
            path = Path(filepath)
            return path.exists() and path.is_file()
        except Exception as e:
            logger.error(f"Error checking file existence for {filepath}: {str(e)}")
            return False
    
    @staticmethod
    async def ensure_directory(directory: Union[str, Path]) -> None:
        """Ensure directory exists"""
        try:
            path = Path(directory)
            path.mkdir(parents=True, exist_ok=True)
            logger.debug(f"Ensured directory exists: {directory}")
        except Exception as e:
            logger.error(f"Error creating directory {directory}: {str(e)}")
            raise
    
    @staticmethod
    async def get_file_size(filepath: Union[str, Path]) -> int:
        """Get file size in bytes"""
        try:
            path = Path(filepath)
            if path.exists():
                return path.stat().st_size
            return 0
        except Exception as e:
            logger.error(f"Error getting file size for {filepath}: {str(e)}")
            return 0
    
    @staticmethod
    async def delete_file(filepath: Union[str, Path]) -> bool:
        """Delete file if it exists"""
        try:
            path = Path(filepath)
            if path.exists():
                path.unlink()
                logger.debug(f"Deleted file: {filepath}")
                return True
            return False
        except Exception as e:
            logger.error(f"Error deleting file {filepath}: {str(e)}")
            return False
    
    @staticmethod
    async def copy_file(source: Union[str, Path], destination: Union[str, Path]) -> None:
        """Copy file asynchronously"""
        try:
            async with aiofiles.open(source, 'rb') as src:
                async with aiofiles.open(destination, 'wb') as dst:
                    while True:
                        chunk = await src.read(8192)
                        if not chunk:
                            break
                        await dst.write(chunk)
            logger.debug(f"Successfully copied {source} to {destination}")
        except Exception as e:
            logger.error(f"Error copying file from {source} to {destination}: {str(e)}")
            raise
    
    @staticmethod
    async def write_csv(filepath: Union[str, Path], data: List[Dict[str, Any]], encoding: str = 'utf-8') -> None:
        """Write CSV data to file asynchronously"""
        try:
            if not data:
                logger.warning(f"No data to write to CSV file {filepath}")
                return
            
            # Get headers from first row
            headers = list(data[0].keys())
            
            # Convert data to CSV format
            csv_lines = []
            csv_lines.append(','.join(headers))
            
            for row in data:
                csv_row = []
                for header in headers:
                    value = row.get(header, '')
                    # Escape commas and quotes
                    if isinstance(value, str):
                        if ',' in value or '"' in value:
                            value = f'"{value.replace('"', '""')}"'
                    csv_row.append(str(value))
                csv_lines.append(','.join(csv_row))
            
            csv_content = '\n'.join(csv_lines)
            await AsyncFileHandler.write_text(filepath, csv_content, encoding)
            logger.debug(f"Successfully wrote CSV to {filepath}")
        except Exception as e:
            logger.error(f"Error writing CSV to {filepath}: {str(e)}")
            raise
    
    @staticmethod
    async def backup_file(filepath: Union[str, Path], backup_dir: Optional[Union[str, Path]] = None) -> Optional[Path]:
        """Create a backup of the file"""
        try:
            source_path = Path(filepath)
            if not source_path.exists():
                logger.warning(f"Source file {filepath} does not exist")
                return None
            
            # Determine backup directory
            if backup_dir:
                backup_path = Path(backup_dir)
            else:
                backup_path = source_path.parent / 'backups'
            
            # Ensure backup directory exists
            await AsyncFileHandler.ensure_directory(backup_path)
            
            # Create backup filename with timestamp
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            backup_filename = f"{source_path.stem}_{timestamp}{source_path.suffix}"
            backup_filepath = backup_path / backup_filename
            
            # Copy file
            await AsyncFileHandler.copy_file(source_path, backup_filepath)
            
            logger.info(f"Created backup: {backup_filepath}")
            return backup_filepath
        except Exception as e:
            logger.error(f"Error creating backup for {filepath}: {str(e)}")
            return None
    
    @staticmethod
    async def write_lines(filepath: Union[str, Path], lines: List[str], encoding: str = 'utf-8') -> None:
        """Write lines to file asynchronously"""
        try:
            content = '\n'.join(lines)
            await AsyncFileHandler.write_text(filepath, content, encoding)
            logger.debug(f"Successfully wrote {len(lines)} lines to {filepath}")
        except Exception as e:
            logger.error(f"Error writing lines to {filepath}: {str(e)}")
            raise
    
    @staticmethod
    async def read_lines(filepath: Union[str, Path], encoding: str = 'utf-8') -> List[str]:
        """Read lines from file asynchronously"""
        try:
            content = await AsyncFileHandler.read_text(filepath, encoding)
            lines = content.splitlines()
            logger.debug(f"Successfully read {len(lines)} lines from {filepath}")
            return lines
        except Exception as e:
            logger.error(f"Error reading lines from {filepath}: {str(e)}")
            raise

# Convenience functions
async def save_article_data(articles: List[Dict[str, Any]], filepath: Union[str, Path]) -> None:
    """Save article data to JSON file"""
    try:
        # Ensure directory exists
        await AsyncFileHandler.ensure_directory(Path(filepath).parent)
        
        # Prepare data for JSON serialization
        serializable_articles = []
        for article in articles:
            serializable_article = {}
            for key, value in article.items():
                if isinstance(value, datetime):
                    serializable_article[key] = value.isoformat()
                else:
                    serializable_article[key] = value
            serializable_articles.append(serializable_article)
        
        # Write to file
        await AsyncFileHandler.write_json(filepath, serializable_articles)
        logger.info(f"Saved {len(articles)} articles to {filepath}")
    except Exception as e:
        logger.error(f"Error saving article data: {str(e)}")
        raise

async def load_article_data(filepath: Union[str, Path]) -> List[Dict[str, Any]]:
    """Load article data from JSON file"""
    try:
        if not await AsyncFileHandler.file_exists(filepath):
            logger.warning(f"Article data file {filepath} does not exist")
            return []
        
        articles = await AsyncFileHandler.read_json(filepath)
        
        # Convert datetime strings back to datetime objects
        for article in articles:
            for key, value in article.items():
                if key in ['published_date', 'crawled_date', 'processed_date'] and isinstance(value, str):
                    try:
                        article[key] = datetime.fromisoformat(value)
                    except ValueError:
                        article[key] = None
        
        logger.info(f"Loaded {len(articles)} articles from {filepath}")
        return articles
    except Exception as e:
        logger.error(f"Error loading article data: {str(e)}")
        return []

async def export_articles_to_csv(articles: List[Dict[str, Any]], filepath: Union[str, Path]) -> None:
    """Export articles to CSV format"""
    try:
        # Flatten article data for CSV
        csv_data = []
        for article in articles:
            csv_row = {
                'title': article.get('title', ''),
                'url': article.get('url', ''),
                'source': article.get('source', ''),
                'category': article.get('category', ''),
                'published_date': article.get('published_date', ''),
                'crawled_date': article.get('crawled_date', ''),
                'content_length': len(article.get('content', '')),
                'language': article.get('language', 'fa'),
                'processed': article.get('processed', False)
            }
            csv_data.append(csv_row)
        
        await AsyncFileHandler.write_csv(filepath, csv_data)
        logger.info(f"Exported {len(articles)} articles to CSV: {filepath}")
    except Exception as e:
        logger.error(f"Error exporting articles to CSV: {str(e)}")
        raise 