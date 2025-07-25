"""
Article repository for data access operations
"""
from typing import List, Optional, Dict, Any
from sqlalchemy import select, update, delete, func, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from datetime import datetime
import logging

from ..models import Article
from ..schemas import ArticleCreate, ArticleUpdate, ArticleResponse, ProcessingStatus
from ..exceptions import DatabaseError, ValidationError
from ..database.connection import DatabaseManager

logger = logging.getLogger(__name__)


class ArticleRepository:
    """Repository for article data access operations"""
    
    def __init__(self, db_manager: DatabaseManager):
        self.db_manager = db_manager
        
    async def create(self, article_data: ArticleCreate) -> Article:
        """Create a new article"""
        try:
            async with self.db_manager.get_session() as session:
                # Check if article already exists
                existing = await self.get_by_url(article_data.url)
                if existing:
                    raise ValidationError(f"Article with URL {article_data.url} already exists")
                
                # Create new article
                article = Article(
                    url=article_data.url,
                    title=article_data.title,
                    content=article_data.content,
                    raw_html=article_data.raw_html,
                    published_date=article_data.published_date,
                    source=article_data.source,
                    language=article_data.language,
                    category=article_data.category.value if article_data.category else None,
                    crawled_date=datetime.utcnow()
                )
                
                session.add(article)
                await session.commit()
                await session.refresh(article)
                
                logger.info(f"Created article: {article.id}")
                return article
                
        except Exception as e:
            logger.error(f"Error creating article: {str(e)}")
            raise DatabaseError(f"Failed to create article: {str(e)}")
            
    async def get_by_id(self, article_id: str) -> Optional[Article]:
        """Get article by ID"""
        try:
            async with self.db_manager.get_session() as session:
                result = await session.execute(
                    select(Article)
                    .options(selectinload(Article.players))
                    .options(selectinload(Article.matches))
                    .options(selectinload(Article.entities))
                    .where(Article.id == article_id)
                )
                return result.scalar_one_or_none()
                
        except Exception as e:
            logger.error(f"Error getting article by ID {article_id}: {str(e)}")
            raise DatabaseError(f"Failed to get article: {str(e)}")
            
    async def get_by_url(self, url: str) -> Optional[Article]:
        """Get article by URL"""
        try:
            async with self.db_manager.get_session() as session:
                result = await session.execute(
                    select(Article).where(Article.url == url)
                )
                return result.scalar_one_or_none()
                
        except Exception as e:
            logger.error(f"Error getting article by URL {url}: {str(e)}")
            raise DatabaseError(f"Failed to get article: {str(e)}")
            
    async def get_all(self, skip: int = 0, limit: int = 100, 
                     source: Optional[str] = None,
                     category: Optional[str] = None,
                     processed: Optional[bool] = None) -> List[Article]:
        """Get all articles with optional filtering"""
        try:
            async with self.db_manager.get_session() as session:
                query = select(Article)
                
                # Add filters
                conditions = []
                if source:
                    conditions.append(Article.source == source)
                if category:
                    conditions.append(Article.category == category)
                if processed is not None:
                    conditions.append(Article.processed == processed)
                
                if conditions:
                    query = query.where(and_(*conditions))
                
                # Add pagination
                query = query.offset(skip).limit(limit)
                query = query.order_by(Article.crawled_date.desc())
                
                result = await session.execute(query)
                return list(result.scalars().all())
                
        except Exception as e:
            logger.error(f"Error getting articles: {str(e)}")
            raise DatabaseError(f"Failed to get articles: {str(e)}")
            
    async def update(self, article_id: str, update_data: ArticleUpdate) -> Optional[Article]:
        """Update an article"""
        try:
            async with self.db_manager.get_session() as session:
                # Get existing article
                article = await self.get_by_id(article_id)
                if not article:
                    return None
                
                # Update fields
                update_dict = update_data.dict(exclude_unset=True)
                if update_dict:
                    await session.execute(
                        update(Article)
                        .where(Article.id == article_id)
                        .values(**update_dict)
                    )
                    await session.commit()
                    
                    # Get updated article
                    return await self.get_by_id(article_id)
                
                return article
                
        except Exception as e:
            logger.error(f"Error updating article {article_id}: {str(e)}")
            raise DatabaseError(f"Failed to update article: {str(e)}")
            
    async def delete(self, article_id: str) -> bool:
        """Delete an article"""
        try:
            async with self.db_manager.get_session() as session:
                result = await session.execute(
                    delete(Article).where(Article.id == article_id)
                )
                await session.commit()
                return result.rowcount > 0
                
        except Exception as e:
            logger.error(f"Error deleting article {article_id}: {str(e)}")
            raise DatabaseError(f"Failed to delete article: {str(e)}")
            
    async def get_unprocessed(self, limit: int = 100) -> List[Article]:
        """Get unprocessed articles"""
        try:
            async with self.db_manager.get_session() as session:
                result = await session.execute(
                    select(Article)
                    .where(Article.processed == False)
                    .order_by(Article.crawled_date.asc())
                    .limit(limit)
                )
                return list(result.scalars().all())
                
        except Exception as e:
            logger.error(f"Error getting unprocessed articles: {str(e)}")
            raise DatabaseError(f"Failed to get unprocessed articles: {str(e)}")
            
    async def mark_as_processed(self, article_id: str, 
                              processing_result: Dict[str, Any]) -> None:
        """Mark article as processed with results"""
        try:
            async with self.db_manager.get_session() as session:
                await session.execute(
                    update(Article)
                    .where(Article.id == article_id)
                    .values(
                        processed=True,
                        processing_status=ProcessingStatus.COMPLETED.value,
                        processed_date=datetime.utcnow(),
                        llm_analysis=processing_result.get('llm_analysis'),
                        summary=processing_result.get('summary'),
                        sentiment_score=processing_result.get('sentiment_score'),
                        confidence_score=processing_result.get('confidence_score'),
                        tags=processing_result.get('tags', [])
                    )
                )
                await session.commit()
                
        except Exception as e:
            logger.error(f"Error marking article {article_id} as processed: {str(e)}")
            raise DatabaseError(f"Failed to mark article as processed: {str(e)}")
            
    async def mark_as_failed(self, article_id: str, error_message: str) -> None:
        """Mark article processing as failed"""
        try:
            async with self.db_manager.get_session() as session:
                await session.execute(
                    update(Article)
                    .where(Article.id == article_id)
                    .values(
                        processing_status=ProcessingStatus.FAILED.value,
                        error_message=error_message,
                        processed_date=datetime.utcnow()
                    )
                )
                await session.commit()
                
        except Exception as e:
            logger.error(f"Error marking article {article_id} as failed: {str(e)}")
            raise DatabaseError(f"Failed to mark article as failed: {str(e)}")
            
    async def get_statistics(self) -> Dict[str, Any]:
        """Get article statistics"""
        try:
            async with self.db_manager.get_session() as session:
                # Total articles
                total_result = await session.execute(select(func.count(Article.id)))
                total_articles = total_result.scalar()
                
                # Processed articles
                processed_result = await session.execute(
                    select(func.count(Article.id))
                    .where(Article.processed == True)
                )
                processed_articles = processed_result.scalar()
                
                # Pending articles
                pending_result = await session.execute(
                    select(func.count(Article.id))
                    .where(Article.processed == False)
                )
                pending_articles = pending_result.scalar()
                
                # Failed articles
                failed_result = await session.execute(
                    select(func.count(Article.id))
                    .where(Article.processing_status == ProcessingStatus.FAILED.value)
                )
                failed_articles = failed_result.scalar()
                
                # Latest article
                latest_result = await session.execute(
                    select(Article.crawled_date)
                    .order_by(Article.crawled_date.desc())
                    .limit(1)
                )
                latest_crawl = latest_result.scalar()
                
                return {
                    "total_articles": total_articles or 0,
                    "processed_articles": processed_articles or 0,
                    "pending_articles": pending_articles or 0,
                    "failed_articles": failed_articles or 0,
                    "latest_crawl": latest_crawl,
                    "success_rate": (processed_articles / total_articles * 100) if total_articles and total_articles > 0 else 0
                }
                
        except Exception as e:
            logger.error(f"Error getting statistics: {str(e)}")
            raise DatabaseError(f"Failed to get statistics: {str(e)}")
            
    async def search(self, query: str, limit: int = 50) -> List[Article]:
        """Search articles by content"""
        try:
            async with self.db_manager.get_session() as session:
                result = await session.execute(
                    select(Article)
                    .where(
                        or_(
                            Article.title.ilike(f"%{query}%"),
                            Article.content.ilike(f"%{query}%")
                        )
                    )
                    .order_by(Article.crawled_date.desc())
                    .limit(limit)
                )
                return list(result.scalars().all())
                
        except Exception as e:
            logger.error(f"Error searching articles: {str(e)}")
            raise DatabaseError(f"Failed to search articles: {str(e)}") 