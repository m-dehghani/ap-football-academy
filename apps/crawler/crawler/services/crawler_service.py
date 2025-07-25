"""
Crawler service for managing crawling operations
"""
import asyncio
import logging
import time
from typing import Dict, List, Any, Optional
from datetime import datetime

from ..config import Settings
from ..repositories.article_repository import ArticleRepository
from ..repositories.site_repository import SiteRepository
from ..schemas import CrawlRequest, CrawlResult, ArticleCreate, ArticleCategory
from ..exceptions import CrawlingError

logger = logging.getLogger(__name__)


class CrawlerService:
    """Service for managing web crawling operations"""
    
    def __init__(self, article_repository: ArticleRepository, 
                 site_repository: SiteRepository, settings: Settings):
        self.article_repository = article_repository
        self.site_repository = site_repository
        self.settings = settings
        
    async def crawl_sites(self, request: CrawlRequest) -> Dict[str, CrawlResult]:
        """Crawl multiple sites based on request"""
        start_time = time.time()
        
        try:
            logger.info(f"Starting crawl operation for sites: {request.sites}")
            
            # Get sites to crawl
            if request.sites:
                sites = await self.site_repository.get_sites_for_crawling(request.sites)
            else:
                sites = await self.site_repository.get_sites_for_crawling()
            
            if not sites:
                logger.warning("No active sites found for crawling")
                return {}
            
            # Crawl each site
            results = {}
            
            # Create semaphore for concurrency control
            semaphore = asyncio.Semaphore(self.settings.CRAWLER_CONCURRENT_REQUESTS)
            
            async def crawl_single_site(site):
                async with semaphore:
                    try:
                        return await self._crawl_site(site, request)
                    except Exception as e:
                        logger.error(f"Error crawling site {site.site_name}: {str(e)}")
                        return CrawlResult(
                            site=site.site_name,
                            pages_crawled=0,
                            articles_found=0,
                            articles_saved=0,
                            errors=1,
                            duration=0.0,
                            success_rate=0.0,
                            error_messages=[str(e)]
                        )
            
            # Process all sites concurrently
            tasks = [crawl_single_site(site) for site in sites]
            crawl_results = await asyncio.gather(*tasks, return_exceptions=True)
            
            # Organize results
            for i, result in enumerate(crawl_results):
                if isinstance(result, CrawlResult):
                    results[sites[i].site_name] = result
                else:
                    # Handle exception
                    results[sites[i].site_name] = CrawlResult(
                        site=str(sites[i].site_name),
                        pages_crawled=0,
                        articles_found=0,
                        articles_saved=0,
                        errors=1,
                        duration=0.0,
                        success_rate=0.0,
                        error_messages=[str(result)]
                    )
            
            total_duration = time.time() - start_time
            logger.info(f"Crawl operation completed in {total_duration:.2f}s")
            
            return results
            
        except Exception as e:
            logger.error(f"Error in crawl operation: {str(e)}")
            raise CrawlingError(f"Crawl operation failed: {str(e)}")
            
    async def _crawl_site(self, site, request: CrawlRequest) -> CrawlResult:
        """Crawl a single site"""
        start_time = time.time()
        pages_crawled = 0
        articles_found = 0
        articles_saved = 0
        errors = 0
        error_messages = []
        
        try:
            logger.info(f"Starting crawl of site: {site.site_name}")
            
            # Update last crawled timestamp
            await self.site_repository.update_last_crawled(str(site.id))
            
            # Mock crawling implementation
            # In a real implementation, this would use Scrapy, Playwright, or similar
            
            # Simulate crawling pages
            max_pages = min(request.max_pages, site.max_pages)
            
            for page_num in range(1, max_pages + 1):
                try:
                    # Simulate page crawling
                    await asyncio.sleep(request.delay)
                    
                    # Mock finding articles on page
                    mock_articles = await self._mock_crawl_page(
                        site, page_num, request.categories
                    )
                    
                    pages_crawled += 1
                    articles_found += len(mock_articles)
                    
                    # Save articles
                    for article_data in mock_articles:
                        try:
                            # Check if article already exists
                            existing = await self.article_repository.get_by_url(
                                article_data['url']
                            )
                            
                            if existing and not request.force:
                                logger.debug(f"Article already exists: {article_data['url']}")
                                continue
                            
                            # Create article
                            article_create = ArticleCreate(
                                url=article_data['url'],
                                title=article_data['title'],
                                content=article_data['content'],
                                raw_html=article_data.get('raw_html', ''),
                                published_date=article_data.get('published_date'),
                                source=site.site_name,
                                language='fa',
                                category=self._determine_category(
                                    article_data['title'], 
                                    article_data['content']
                                )
                            )
                            
                            await self.article_repository.create(article_create)
                            articles_saved += 1
                            
                            logger.debug(f"Saved article: {article_data['title'][:50]}...")
                            
                        except Exception as e:
                            errors += 1
                            error_msg = f"Error saving article {article_data.get('url', 'unknown')}: {str(e)}"
                            logger.error(error_msg)
                            error_messages.append(error_msg)
                    
                except Exception as e:
                    errors += 1
                    error_msg = f"Error crawling page {page_num}: {str(e)}"
                    logger.error(error_msg)
                    error_messages.append(error_msg)
            
            duration = time.time() - start_time
            success_rate = articles_saved / articles_found if articles_found > 0 else 0.0
            
            # Update site success rate
            await self.site_repository.update_success_rate(str(site.id), success_rate)
            
            result = CrawlResult(
                site=site.site_name,
                pages_crawled=pages_crawled,
                articles_found=articles_found,
                articles_saved=articles_saved,
                errors=errors,
                duration=duration,
                success_rate=success_rate,
                error_messages=error_messages[:10]  # Limit error messages
            )
            
            logger.info(f"Completed crawling {site.site_name}: {articles_saved} articles saved")
            return result
            
        except Exception as e:
            duration = time.time() - start_time
            logger.error(f"Error crawling site {site.site_name}: {str(e)}")
            
            return CrawlResult(
                site=site.site_name,
                pages_crawled=pages_crawled,
                articles_found=articles_found,
                articles_saved=articles_saved,
                errors=errors + 1,
                duration=duration,
                success_rate=0.0,
                error_messages=error_messages + [str(e)]
            )
            
    async def _mock_crawl_page(self, site, page_num: int, 
                             categories: Optional[List[str]] = None) -> List[Dict[str, Any]]:
        """Mock implementation of page crawling"""
        # This is a placeholder implementation
        # In a real crawler, this would:
        # 1. Use Playwright/Selenium to load the page
        # 2. Extract articles using CSS selectors from site configuration
        # 3. Parse content and metadata
        
        mock_articles = []
        
        # Generate mock articles for demonstration
        if page_num <= 5:  # Only first 5 pages have articles
            for i in range(2):  # 2 articles per page
                article_id = f"{site.site_name}_{page_num}_{i+1}"
                mock_articles.append({
                    'url': f"{site.base_url}/article/{article_id}",
                    'title': f"مقاله نمونه {article_id}",
                    'content': f"محتوای نمونه برای مقاله {article_id}. این محتوا شامل اطلاعات فوتبال است.",
                    'raw_html': f"<article><h1>مقاله نمونه {article_id}</h1><p>محتوای نمونه</p></article>",
                    'published_date': datetime.now()
                })
        
        return mock_articles
        
    def _determine_category(self, title: str, content: str) -> ArticleCategory:
        """Determine article category based on title and content"""
        text = f"{title} {content}".lower()
        
        # Simple keyword-based categorization
        if any(word in text for word in ['انتقال', 'transfer', 'خرید', 'فروش']):
            return ArticleCategory.TRANSFER
        elif any(word in text for word in ['مسابقه', 'بازی', 'مچ', 'نتیجه']):
            return ArticleCategory.MATCH
        elif any(word in text for word in ['تحلیل', 'بررسی', 'گزارش']):
            return ArticleCategory.ANALYSIS
        elif any(word in text for word in ['مصاحبه', 'گفتگو', 'مصاحبه']):
            return ArticleCategory.INTERVIEW
        elif any(word in text for word in ['بازیکن', 'ستاره']):
            return ArticleCategory.PLAYER
        elif any(word in text for word in ['مربی', 'سرمربی']):
            return ArticleCategory.COACH
        elif any(word in text for word in ['لیگ', 'جدول']):
            return ArticleCategory.LEAGUE
        elif any(word in text for word in ['تیم ملی', 'ملی']):
            return ArticleCategory.NATIONAL_TEAM
        else:
            return ArticleCategory.NEWS
            
    async def get_crawl_status(self) -> Dict[str, Any]:
        """Get current crawl status"""
        try:
            # Get site statistics
            site_stats = await self.site_repository.get_statistics()
            
            # Get article statistics
            article_stats = await self.article_repository.get_statistics()
            
            return {
                "total_sites": site_stats["total_sites"],
                "active_sites": site_stats["active_sites"],
                "total_articles": article_stats["total_articles"],
                "latest_crawl": site_stats.get("latest_crawl"),
                "crawl_success_rate": article_stats.get("success_rate", 0.0)
            }
            
        except Exception as e:
            logger.error(f"Error getting crawl status: {str(e)}")
            raise CrawlingError(f"Failed to get crawl status: {str(e)}")
            
    async def health_check(self) -> bool:
        """Check if crawler service is healthy"""
        try:
            # Check database connectivity
            await self.site_repository.get_statistics()
            await self.article_repository.get_statistics()
            
            return True
            
        except Exception as e:
            logger.error(f"Crawler service health check failed: {str(e)}")
            return False
            
    async def get_site_status(self, site_name: str) -> Dict[str, Any]:
        """Get status for a specific site"""
        try:
            site = await self.site_repository.get_by_name(site_name)
            if not site:
                raise CrawlingError(f"Site {site_name} not found")
            
            # Get articles from this site
            articles = await self.article_repository.get_all(
                source=site_name, 
                limit=100
            )
            
            return {
                "site_name": site.site_name,
                "active": site.active,
                "last_crawled": site.last_crawled,
                "success_rate": site.success_rate,
                "total_articles": len(articles),
                "base_url": site.base_url
            }
            
        except Exception as e:
            logger.error(f"Error getting site status for {site_name}: {str(e)}")
            raise CrawlingError(f"Failed to get site status: {str(e)}")
            
    async def pause_site(self, site_name: str) -> bool:
        """Pause crawling for a specific site"""
        try:
            site = await self.site_repository.get_by_name(site_name)
            if not site:
                return False
            
            await self.site_repository.set_active(str(site.id), False)
            logger.info(f"Paused crawling for site: {site_name}")
            return True
            
        except Exception as e:
            logger.error(f"Error pausing site {site_name}: {str(e)}")
            raise CrawlingError(f"Failed to pause site: {str(e)}")
            
    async def resume_site(self, site_name: str) -> bool:
        """Resume crawling for a specific site"""
        try:
            site = await self.site_repository.get_by_name(site_name)
            if not site:
                return False
            
            await self.site_repository.set_active(str(site.id), True)
            logger.info(f"Resumed crawling for site: {site_name}")
            return True
            
        except Exception as e:
            logger.error(f"Error resuming site {site_name}: {str(e)}")
            raise CrawlingError(f"Failed to resume site: {str(e)}") 