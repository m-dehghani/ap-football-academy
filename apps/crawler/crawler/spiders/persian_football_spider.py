"""
Modern Persian Football Spider integrated with the new service architecture
"""

import asyncio
import httpx
from typing import Dict, List, Any, Optional
from datetime import datetime
import re
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from loguru import logger

from crawler.config import settings
from crawler.utils.persian_utils import PersianTextProcessor
from crawler.schemas import ArticleCreate, ArticleCategory
from crawler.exceptions import CrawlingError, NetworkError
from crawler.container import get_service

class PersianFootballSpider:
    """Modern spider for Persian football websites using service architecture"""
    
    def __init__(self):
        """Initialize spider with services"""
        self.persian_processor = PersianTextProcessor()
        self.scraped_urls = set()
        self.stats = {
            'articles_scraped': 0,
            'players_found': 0,
            'matches_found': 0,
            'errors': 0
        }
        
        # Site configurations from settings
        self.site_configs = settings.PERSIAN_FOOTBALL_SITES
        
        # Rate limiting
        self.request_delay = 1.0
        self.max_retries = 3
        
        # HTTP client configuration
        self.http_client = None
        
    async def get_http_client(self) -> httpx.AsyncClient:
        """Get or create HTTP client with proper configuration"""
        if self.http_client is None:
            timeout = httpx.Timeout(
                connect=30.0,
                read=60.0,
                write=30.0,
                pool=30.0
            )
            
            headers = {
                'User-Agent': settings.CRAWLER_USER_AGENT,
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
            
            self.http_client = httpx.AsyncClient(
                timeout=timeout,
                headers=headers,
                follow_redirects=True,
                verify=False,  # For development - should be True in production
                limits=httpx.Limits(
                    max_keepalive_connections=20,
                    max_connections=100,
                    keepalive_expiry=30
                )
            )
        
        return self.http_client
    
    async def close(self):
        """Close HTTP client"""
        if self.http_client:
            await self.http_client.aclose()
            self.http_client = None
    
    async def fetch_page(self, url: str, site_config: Dict[str, Any]) -> Optional[str]:
        """Fetch a single page with retry logic"""
        client = await self.get_http_client()
        
        for attempt in range(self.max_retries):
            try:
                logger.info(f"Fetching page: {url} (attempt {attempt + 1})")
                
                # Add site-specific delay
                delay = site_config.get('delay', self.request_delay)
                await asyncio.sleep(delay)
                
                response = await client.get(url)
                response.raise_for_status()
                
                # Check if content is HTML
                content_type = response.headers.get('content-type', '')
                if 'text/html' not in content_type:
                    logger.warning(f"Non-HTML content type for {url}: {content_type}")
                    return None
                
                logger.success(f"Successfully fetched: {url}")
                return response.text
                
            except httpx.HTTPStatusError as e:
                logger.error(f"HTTP error {e.response.status_code} for {url}")
                if e.response.status_code == 404:
                    return None  # Don't retry 404s
                    
            except httpx.RequestError as e:
                logger.error(f"Request error for {url}: {str(e)}")
                
            except Exception as e:
                logger.error(f"Unexpected error fetching {url}: {str(e)}")
                
            # Wait before retry
            if attempt < self.max_retries - 1:
                wait_time = (attempt + 1) * 2
                logger.info(f"Waiting {wait_time}s before retry...")
                await asyncio.sleep(wait_time)
        
        self.stats['errors'] += 1
        raise NetworkError(f"Failed to fetch {url} after {self.max_retries} attempts")
    
    async def scrape_site(self, site_name: str, max_pages: int = 50) -> List[Dict[str, Any]]:
        """Scrape a single site for articles"""
        logger.info(f"Starting scrape of {site_name}")
        
        if site_name not in self.site_configs:
            raise CrawlingError(f"Site {site_name} not configured")
        
        site_config = self.site_configs[site_name]
        
        if not site_config.get('active', True):
            logger.warning(f"Site {site_name} is not active")
            return []
        
        articles = []
        base_url = site_config['base_url']
        categories = site_config.get('categories', ['/'])
        
        try:
            # Scrape each category
            for category in categories:
                category_url = urljoin(base_url, category)
                logger.info(f"Scraping category: {category_url}")
                
                # Get article links from category page
                article_links = await self.extract_article_links(category_url, site_config)
                
                # Limit the number of articles
                article_links = article_links[:max_pages]
                
                # Scrape each article
                for link in article_links:
                    if link in self.scraped_urls:
                        continue
                    
                    try:
                        article = await self.scrape_article(link, site_config)
                        if article:
                            articles.append(article)
                            self.scraped_urls.add(link)
                            self.stats['articles_scraped'] += 1
                    except Exception as e:
                        logger.error(f"Error scraping article {link}: {str(e)}")
                        self.stats['errors'] += 1
                        continue
                
                # Respect rate limiting between categories
                await asyncio.sleep(site_config.get('delay', self.request_delay))
        
        except Exception as e:
            logger.error(f"Error scraping site {site_name}: {str(e)}")
            raise CrawlingError(f"Site scraping failed for {site_name}: {str(e)}")
        
        logger.success(f"Scraped {len(articles)} articles from {site_name}")
        return articles
    
    async def extract_article_links(self, category_url: str, site_config: Dict[str, Any]) -> List[str]:
        """Extract article links from category page"""
        try:
            html = await self.fetch_page(category_url, site_config)
            if not html:
                return []
            
            soup = BeautifulSoup(html, 'html.parser')
            
            # Extract links based on site configuration
            links = []
            
            # Look for article links using various selectors
            article_selectors = [
                'a[href*="/news/"]',
                'a[href*="/article/"]',
                'a[href*="/sport/"]',
                'a[href*="/football/"]',
                '.article-link a',
                '.news-item a',
                '.post-title a',
                'h2 a',
                'h3 a'
            ]
            
            for selector in article_selectors:
                found_links = soup.select(selector)
                for link in found_links:
                    href = link.get('href')
                    if href and isinstance(href, str):
                        # Convert relative URLs to absolute
                        absolute_url = urljoin(category_url, href)
                        
                        # Filter out non-article URLs
                        if self.is_article_url(absolute_url):
                            links.append(absolute_url)
            
            # Remove duplicates and limit
            unique_links = list(set(links))[:50]  # Limit to 50 links per category
            
            logger.info(f"Found {len(unique_links)} article links in {category_url}")
            return unique_links
            
        except Exception as e:
            logger.error(f"Error extracting links from {category_url}: {str(e)}")
            return []
    
    def is_article_url(self, url: str) -> bool:
        """Check if URL is likely an article URL"""
        article_indicators = [
            '/news/', '/article/', '/sport/', '/football/', 
            '/transfer/', '/match/', '/player/', '/team/'
        ]
        
        url_lower = url.lower()
        return any(indicator in url_lower for indicator in article_indicators)
    
    async def scrape_article(self, url: str, site_config: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Scrape a single article"""
        try:
            html = await self.fetch_page(url, site_config)
            if not html:
                return None
            
            soup = BeautifulSoup(html, 'html.parser')
            
            # Extract article data using site-specific selectors
            selectors = site_config.get('selectors', {})
            
            # Extract title
            title = self.extract_text_by_selector(soup, selectors.get('title', 'h1'))
            if not title:
                logger.warning(f"No title found for {url}")
                return None
            
            # Extract content
            content = self.extract_text_by_selector(soup, selectors.get('content', '.content'))
            if not content:
                logger.warning(f"No content found for {url}")
                return None
            
            # Extract other metadata
            published_date = self.extract_text_by_selector(soup, selectors.get('date', '.date'))
            category = self.extract_text_by_selector(soup, selectors.get('category', '.category'))
            
            # Clean and process Persian text
            title = self.persian_processor.clean_text(title)
            content = self.persian_processor.clean_text(content)
            
            # Create article data
            article_data = {
                'url': url,
                'title': title,
                'content': content,
                'raw_html': html,
                'source': site_config.get('name', 'Unknown'),
                'published_date': self.parse_date(published_date),
                'category': self.categorize_content(title, content),
                'crawled_date': datetime.utcnow(),
                'language': 'fa'
            }
            
            logger.success(f"Successfully scraped article: {title[:50]}...")
            return article_data
            
        except Exception as e:
            logger.error(f"Error scraping article {url}: {str(e)}")
            return None
    
    def extract_text_by_selector(self, soup: BeautifulSoup, selector: str) -> Optional[str]:
        """Extract text using CSS selector"""
        try:
            elements = soup.select(selector)
            if elements:
                return elements[0].get_text(strip=True)
        except Exception as e:
            logger.debug(f"Error extracting text with selector '{selector}': {str(e)}")
        return None
    
    def parse_date(self, date_str: Optional[str]) -> Optional[datetime]:
        """Parse Persian date string to datetime"""
        if not date_str:
            return None
        
        # This is a simplified parser - in production you'd want more robust Persian date parsing
        try:
            # Handle various Persian date formats
            # This would need proper Persian date parsing library
            return datetime.utcnow()  # Placeholder
        except Exception as e:
            logger.debug(f"Error parsing date '{date_str}': {str(e)}")
            return None
    
    def categorize_content(self, title: str, content: str) -> str:
        """Categorize content based on title and content"""
        text = f"{title} {content}".lower()
        
        # Define category keywords
        categories = {
            'transfer': ['انتقال', 'transfer', 'خرید', 'فروش', 'قرارداد'],
            'match': ['بازی', 'مسابقه', 'دیدار', 'نتیجه', 'گل'],
            'national_team': ['تیم ملی', 'ایران', 'جام جهانی', 'ملی پوشان'],
            'league': ['لیگ', 'جدول', 'رده بندی', 'قهرمانی'],
            'player': ['بازیکن', 'ستاره', 'گلزن', 'کاپیتان'],
            'coach': ['سرمربی', 'مربی', 'کادرفنی']
        }
        
        for category, keywords in categories.items():
            if any(keyword in text for keyword in keywords):
                return category
        
        return 'news'  # Default category
    
    async def run_spider(self, sites: Optional[List[str]] = None, max_pages: int = 50) -> Dict[str, Any]:
        """Run the spider on specified sites"""
        if not sites:
            sites = list(self.site_configs.keys())
        
        results = {
            'total_articles': 0,
            'sites': {},
            'errors': 0,
            'duration': 0
        }
        
        start_time = datetime.utcnow()
        
        try:
            # Scrape each site
            for site_name in sites:
                logger.info(f"Starting scrape of {site_name}")
                
                try:
                    articles = await self.scrape_site(site_name, max_pages)
                    
                    results['sites'][site_name] = {
                        'articles': articles,
                        'count': len(articles),
                        'errors': 0
                    }
                    
                    results['total_articles'] += len(articles)
                    
                except Exception as e:
                    logger.error(f"Error scraping {site_name}: {str(e)}")
                    results['sites'][site_name] = {
                        'articles': [],
                        'count': 0,
                        'errors': 1
                    }
                    results['errors'] += 1
        
        finally:
            # Clean up
            await self.close()
            
            # Calculate duration
            end_time = datetime.utcnow()
            results['duration'] = (end_time - start_time).total_seconds()
            
            logger.info(f"Spider completed - Articles: {results['total_articles']}, Errors: {results['errors']}")
        
        return results 