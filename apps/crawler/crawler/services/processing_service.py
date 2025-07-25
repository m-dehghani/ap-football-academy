"""
Processing service for handling article processing operations
"""
import asyncio
import logging
from typing import Dict, List, Any, Optional
from datetime import datetime
import time

from ..config import Settings
from ..repositories.article_repository import ArticleRepository
from ..services.llm_service import LLMService
from ..schemas import ProcessRequest, ProcessResult, ProcessingStatus
from ..exceptions import ProcessingError

logger = logging.getLogger(__name__)


class ProcessingService:
    """Service for processing crawled articles"""
    
    def __init__(self, article_repository: ArticleRepository, 
                 llm_service: LLMService, settings: Settings):
        self.article_repository = article_repository
        self.llm_service = llm_service
        self.settings = settings
        
    async def process_articles(self, request: ProcessRequest) -> Dict[str, ProcessResult]:
        """Process articles based on request parameters"""
        start_time = time.time()
        
        try:
            logger.info(f"Starting article processing: {request.processor_type}")
            
            # Get articles to process
            if request.article_ids:
                articles = []
                for article_id in request.article_ids:
                    article = await self.article_repository.get_by_id(article_id)
                    if article:
                        articles.append(article)
            else:
                # Get unprocessed articles
                articles = await self.article_repository.get_unprocessed(
                    limit=request.batch_size
                )
            
            if not articles:
                logger.info("No articles to process")
                return {
                    "llm_processor": ProcessResult(
                        processor="llm_processor",
                        processed=0,
                        successful=0,
                        failed=0,
                        skipped=0,
                        duration=0.0,
                        success_rate=0.0
                    )
                }
            
            # Process articles based on type
            results = {}
            
            if request.processor_type in ["all", "llm"]:
                llm_result = await self._process_with_llm(articles, request.force)
                results["llm_processor"] = llm_result
            
            if request.processor_type in ["all", "sentiment"]:
                sentiment_result = await self._process_sentiment(articles, request.force)
                results["sentiment_processor"] = sentiment_result
            
            duration = time.time() - start_time
            logger.info(f"Article processing completed in {duration:.2f}s")
            
            return results
            
        except Exception as e:
            logger.error(f"Error in article processing: {str(e)}")
            raise ProcessingError(f"Article processing failed: {str(e)}")
            
    async def _process_with_llm(self, articles: List[Any], force: bool = False) -> ProcessResult:
        """Process articles with LLM"""
        start_time = time.time()
        processed = 0
        successful = 0
        failed = 0
        error_messages = []
        
        try:
            # Create semaphore for concurrency control
            semaphore = asyncio.Semaphore(self.settings.PROCESSING_MAX_WORKERS)
            
            async def process_single_article(article):
                nonlocal processed, successful, failed
                
                async with semaphore:
                    processed += 1
                    
                    try:
                        # Skip if already processed and not forcing
                        if article.processed and not force:
                            logger.info(f"Article {article.id} already processed, skipping")
                            return
                        
                        # Analyze article with LLM
                        analysis_result = await self.llm_service.analyze_article(
                            article.title,
                            article.content,
                            article.source
                        )
                        
                        # Save analysis results
                        processing_result = {
                            'llm_analysis': analysis_result.dict(),
                            'summary': analysis_result.summary,
                            'sentiment_score': analysis_result.sentiment_score,
                            'confidence_score': analysis_result.confidence_score,
                            'tags': analysis_result.tags
                        }
                        
                        await self.article_repository.mark_as_processed(
                            str(article.id),
                            processing_result
                        )
                        
                        successful += 1
                        logger.info(f"Successfully processed article {article.id}")
                        
                    except Exception as e:
                        failed += 1
                        error_msg = f"Error processing article {article.id}: {str(e)}"
                        logger.error(error_msg)
                        error_messages.append(error_msg)
                        
                        # Mark as failed
                        await self.article_repository.mark_as_failed(
                            str(article.id),
                            str(e)
                        )
            
            # Process all articles concurrently
            tasks = [process_single_article(article) for article in articles]
            await asyncio.gather(*tasks, return_exceptions=True)
            
            duration = time.time() - start_time
            success_rate = successful / processed if processed > 0 else 0
            
            return ProcessResult(
                processor="llm_processor",
                processed=processed,
                successful=successful,
                failed=failed,
                skipped=0,
                duration=duration,
                success_rate=success_rate,
                error_messages=error_messages
            )
            
        except Exception as e:
            logger.error(f"Error in LLM processing: {str(e)}")
            raise ProcessingError(f"LLM processing failed: {str(e)}")
            
    async def _process_sentiment(self, articles: List[Any], force: bool = False) -> ProcessResult:
        """Process articles for sentiment analysis"""
        start_time = time.time()
        processed = 0
        successful = 0
        failed = 0
        error_messages = []
        
        try:
            for article in articles:
                processed += 1
                
                try:
                    # Process sentiment analysis
                    
                    # Analyze sentiment
                    sentiment_result = await self.llm_service.analyze_article(
                        article.title,
                        article.content,
                        article.source
                    )
                    
                    # Update sentiment score
                    processing_result = {
                        'sentiment_score': sentiment_result.sentiment_score,
                        'confidence_score': sentiment_result.confidence_score
                    }
                    
                    await self.article_repository.mark_as_processed(
                        str(article.id),
                        processing_result
                    )
                    
                    successful += 1
                    logger.info(f"Successfully analyzed sentiment for article {article.id}")
                    
                except Exception as e:
                    failed += 1
                    error_msg = f"Error analyzing sentiment for article {article.id}: {str(e)}"
                    logger.error(error_msg)
                    error_messages.append(error_msg)
            
            duration = time.time() - start_time
            success_rate = successful / processed if processed > 0 else 0
            
            return ProcessResult(
                processor="sentiment_processor",
                processed=processed,
                successful=successful,
                failed=failed,
                skipped=0,
                duration=duration,
                success_rate=success_rate,
                error_messages=error_messages
            )
            
        except Exception as e:
            logger.error(f"Error in sentiment processing: {str(e)}")
            raise ProcessingError(f"Sentiment processing failed: {str(e)}")
            
    async def get_processing_status(self) -> Dict[str, Any]:
        """Get current processing status"""
        try:
            stats = await self.article_repository.get_statistics()
            
            return {
                "total_articles": stats["total_articles"],
                "processed_articles": stats["processed_articles"],
                "pending_articles": stats["pending_articles"],
                "failed_articles": stats["failed_articles"],
                "success_rate": stats["success_rate"],
                "last_processing": stats.get("latest_crawl")
            }
            
        except Exception as e:
            logger.error(f"Error getting processing status: {str(e)}")
            raise ProcessingError(f"Failed to get processing status: {str(e)}")
            
    async def reprocess_failed_articles(self, limit: int = 50) -> ProcessResult:
        """Reprocess failed articles"""
        try:
            # Get failed articles
            failed_articles = await self.article_repository.get_all(
                limit=limit,
                processed=False
            )
            
            # Filter only failed ones
            failed_articles = [
                article for article in failed_articles 
                if article.processing_status == ProcessingStatus.FAILED.value
            ]
            
            if not failed_articles:
                return ProcessResult(
                    processor="reprocessor",
                    processed=0,
                    successful=0,
                    failed=0,
                    skipped=0,
                    duration=0.0,
                    success_rate=0.0
                )
            
            # Process failed articles
            result = await self._process_with_llm(failed_articles, force=True)
            result.processor = "reprocessor"
            
            return result
            
        except Exception as e:
            logger.error(f"Error reprocessing failed articles: {str(e)}")
            raise ProcessingError(f"Failed to reprocess articles: {str(e)}")
            
    async def get_processing_queue_size(self) -> int:
        """Get the number of articles in processing queue"""
        try:
            articles = await self.article_repository.get_unprocessed(limit=1000)
            return len(articles)
            
        except Exception as e:
            logger.error(f"Error getting queue size: {str(e)}")
            return 0
            
    async def process_single_article(self, article_id: str) -> ProcessResult:
        """Process a single article"""
        try:
            article = await self.article_repository.get_by_id(article_id)
            if not article:
                raise ProcessingError(f"Article {article_id} not found")
            
            result = await self._process_with_llm([article], force=True)
            return result
            
        except Exception as e:
            logger.error(f"Error processing single article {article_id}: {str(e)}")
            raise ProcessingError(f"Failed to process article: {str(e)}")
            
    async def health_check(self) -> bool:
        """Check if processing service is healthy"""
        try:
            # Check LLM service health
            llm_health = await self.llm_service.health_check()
            
            # Check database connectivity
            await self.article_repository.get_statistics()
            
            return llm_health
            
        except Exception as e:
            logger.error(f"Processing service health check failed: {str(e)}")
            return False 