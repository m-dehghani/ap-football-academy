"""
Site repository for managing site configurations
"""
from typing import List, Optional, Dict, Any
from sqlalchemy import select, update, delete, func
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
import logging

from ..models import SiteConfiguration
from ..schemas import SiteConfiguration as SiteConfigurationSchema
from ..exceptions import DatabaseError, ValidationError
from ..database.connection import DatabaseManager

logger = logging.getLogger(__name__)


class SiteRepository:
    """Repository for site configuration data access operations"""
    
    def __init__(self, db_manager: DatabaseManager):
        self.db_manager = db_manager
        
    async def create(self, site_data: SiteConfigurationSchema) -> SiteConfiguration:
        """Create a new site configuration"""
        try:
            async with self.db_manager.get_session() as session:
                # Check if site already exists
                existing = await self.get_by_name(site_data.site_name)
                if existing:
                    raise ValidationError(f"Site {site_data.site_name} already exists")
                
                # Create new site configuration
                site = SiteConfiguration(
                    site_name=site_data.site_name,
                    base_url=site_data.base_url,
                    selectors=site_data.selectors,
                    categories=site_data.categories,
                    crawl_delay=site_data.crawl_delay,
                    max_pages=site_data.max_pages,
                    active=site_data.active,
                    respect_robots=site_data.respect_robots,
                    headers=site_data.headers,
                    created_at=datetime.utcnow()
                )
                
                session.add(site)
                await session.commit()
                await session.refresh(site)
                
                logger.info(f"Created site configuration: {site.site_name}")
                return site
                
        except Exception as e:
            logger.error(f"Error creating site configuration: {str(e)}")
            raise DatabaseError(f"Failed to create site configuration: {str(e)}")
            
    async def get_by_id(self, site_id: str) -> Optional[SiteConfiguration]:
        """Get site configuration by ID"""
        try:
            async with self.db_manager.get_session() as session:
                result = await session.execute(
                    select(SiteConfiguration).where(SiteConfiguration.id == site_id)
                )
                return result.scalar_one_or_none()
                
        except Exception as e:
            logger.error(f"Error getting site by ID {site_id}: {str(e)}")
            raise DatabaseError(f"Failed to get site: {str(e)}")
            
    async def get_by_name(self, site_name: str) -> Optional[SiteConfiguration]:
        """Get site configuration by name"""
        try:
            async with self.db_manager.get_session() as session:
                result = await session.execute(
                    select(SiteConfiguration).where(SiteConfiguration.site_name == site_name)
                )
                return result.scalar_one_or_none()
                
        except Exception as e:
            logger.error(f"Error getting site by name {site_name}: {str(e)}")
            raise DatabaseError(f"Failed to get site: {str(e)}")
            
    async def get_all(self, active_only: bool = False) -> List[SiteConfiguration]:
        """Get all site configurations"""
        try:
            async with self.db_manager.get_session() as session:
                query = select(SiteConfiguration)
                
                if active_only:
                    query = query.where(SiteConfiguration.active == True)
                
                query = query.order_by(SiteConfiguration.site_name)
                
                result = await session.execute(query)
                return list(result.scalars().all())
                
        except Exception as e:
            logger.error(f"Error getting all sites: {str(e)}")
            raise DatabaseError(f"Failed to get sites: {str(e)}")
            
    async def update(self, site_id: str, update_data: Dict[str, Any]) -> Optional[SiteConfiguration]:
        """Update a site configuration"""
        try:
            async with self.db_manager.get_session() as session:
                # Get existing site
                site = await self.get_by_id(site_id)
                if not site:
                    return None
                
                # Update fields
                if update_data:
                    update_data['updated_at'] = datetime.utcnow()
                    await session.execute(
                        update(SiteConfiguration)
                        .where(SiteConfiguration.id == site_id)
                        .values(**update_data)
                    )
                    await session.commit()
                    
                    # Get updated site
                    return await self.get_by_id(site_id)
                
                return site
                
        except Exception as e:
            logger.error(f"Error updating site {site_id}: {str(e)}")
            raise DatabaseError(f"Failed to update site: {str(e)}")
            
    async def delete(self, site_id: str) -> bool:
        """Delete a site configuration"""
        try:
            async with self.db_manager.get_session() as session:
                result = await session.execute(
                    delete(SiteConfiguration).where(SiteConfiguration.id == site_id)
                )
                await session.commit()
                return result.rowcount > 0
                
        except Exception as e:
            logger.error(f"Error deleting site {site_id}: {str(e)}")
            raise DatabaseError(f"Failed to delete site: {str(e)}")
            
    async def update_last_crawled(self, site_id: str) -> None:
        """Update the last crawled timestamp for a site"""
        try:
            async with self.db_manager.get_session() as session:
                await session.execute(
                    update(SiteConfiguration)
                    .where(SiteConfiguration.id == site_id)
                    .values(last_crawled=datetime.utcnow())
                )
                await session.commit()
                
        except Exception as e:
            logger.error(f"Error updating last crawled for site {site_id}: {str(e)}")
            raise DatabaseError(f"Failed to update last crawled: {str(e)}")
            
    async def update_success_rate(self, site_id: str, success_rate: float) -> None:
        """Update the success rate for a site"""
        try:
            async with self.db_manager.get_session() as session:
                await session.execute(
                    update(SiteConfiguration)
                    .where(SiteConfiguration.id == site_id)
                    .values(success_rate=success_rate)
                )
                await session.commit()
                
        except Exception as e:
            logger.error(f"Error updating success rate for site {site_id}: {str(e)}")
            raise DatabaseError(f"Failed to update success rate: {str(e)}")
            
    async def set_active(self, site_id: str, active: bool) -> None:
        """Set the active status of a site"""
        try:
            async with self.db_manager.get_session() as session:
                await session.execute(
                    update(SiteConfiguration)
                    .where(SiteConfiguration.id == site_id)
                    .values(active=active)
                )
                await session.commit()
                
        except Exception as e:
            logger.error(f"Error setting active status for site {site_id}: {str(e)}")
            raise DatabaseError(f"Failed to set active status: {str(e)}")
            
    async def get_statistics(self) -> Dict[str, Any]:
        """Get site statistics"""
        try:
            async with self.db_manager.get_session() as session:
                # Total sites
                total_result = await session.execute(select(func.count(SiteConfiguration.id)))
                total_sites = total_result.scalar()
                
                # Active sites
                active_result = await session.execute(
                    select(func.count(SiteConfiguration.id))
                    .where(SiteConfiguration.active == True)
                )
                active_sites = active_result.scalar()
                
                # Latest crawl
                latest_result = await session.execute(
                    select(SiteConfiguration.last_crawled)
                    .where(SiteConfiguration.last_crawled.isnot(None))
                    .order_by(SiteConfiguration.last_crawled.desc())
                    .limit(1)
                )
                latest_crawl = latest_result.scalar()
                
                return {
                    "total_sites": total_sites or 0,
                    "active_sites": active_sites or 0,
                    "inactive_sites": (total_sites or 0) - (active_sites or 0),
                    "latest_crawl": latest_crawl
                }
                
        except Exception as e:
            logger.error(f"Error getting site statistics: {str(e)}")
            raise DatabaseError(f"Failed to get site statistics: {str(e)}")
            
    async def get_sites_for_crawling(self, site_names: Optional[List[str]] = None) -> List[SiteConfiguration]:
        """Get sites that should be crawled"""
        try:
            async with self.db_manager.get_session() as session:
                query = select(SiteConfiguration).where(SiteConfiguration.active == True)
                
                if site_names:
                    query = query.where(SiteConfiguration.site_name.in_(site_names))
                
                query = query.order_by(SiteConfiguration.site_name)
                
                result = await session.execute(query)
                return list(result.scalars().all())
                
        except Exception as e:
            logger.error(f"Error getting sites for crawling: {str(e)}")
            raise DatabaseError(f"Failed to get sites for crawling: {str(e)}") 