#!/usr/bin/env python3
"""
Main entry point for the Football Intelligence Crawler
"""

import asyncio
from datetime import datetime
from typing import Dict, List, Optional
import typer
from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.table import Table
from loguru import logger

from crawler.container import get_container, get_service
from crawler.config import settings
from crawler.schemas import CrawlRequest, ProcessRequest
from crawler.utils.logging_config import setup_logging

# Initialize console and app
console = Console()
app = typer.Typer(name="football-crawler", help="Persian Football Information Crawler with LLM Agent")

@app.command()
def crawl(
    sites: Optional[List[str]] = typer.Option(None, "--sites", "-s", help="Specific sites to crawl"),
    max_pages: int = typer.Option(100, "--max-pages", "-p", help="Maximum pages to crawl per site"),
    delay: float = typer.Option(1.0, "--delay", "-d", help="Delay between requests in seconds"),
    headless: bool = typer.Option(True, "--headless/--no-headless", help="Run browser in headless mode"),
    force: bool = typer.Option(False, "--force", "-f", help="Force crawl even if recently crawled"),
):
    """Start crawling Persian football websites"""
    
    async def run_crawl():
        # Initialize container
        container = get_container()
        
        # Initialize database
        db_manager = get_service("database_manager")
        await db_manager.create_tables()
        
        # Get crawler service
        crawler_service = get_service("crawler_service")
        
        # Create crawl request
        request = CrawlRequest(
            sites=sites,
            max_pages=max_pages,
            delay=delay,
            headless=headless,
            force=force,
            categories=None
        )
        
        return await crawler_service.crawl_sites(request)
    
    console.print("[bold blue]🕷️  Starting Football Information Crawler[/bold blue]")
    console.print(f"⚙️  Configuration: max_pages={max_pages}, delay={delay}s, headless={headless}")
    
    # Setup logging
    setup_logging(
        level=settings.LOG_LEVEL,
        log_file=settings.LOG_FILE,
        rotation=settings.LOG_ROTATION,
        retention=settings.LOG_RETENTION
    )
    
    # Run crawler
    try:
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console,
        ) as progress:
            task = progress.add_task("Crawling websites...", total=None)
            
            results = asyncio.run(run_crawl())
            
            progress.update(task, completed=True)
            
        # Display results
        _display_crawl_results(results)
        
    except KeyboardInterrupt:
        console.print("\n[yellow]⚠️  Crawling interrupted by user[/yellow]")
    except Exception as e:
        logger.error(f"Crawling failed: {str(e)}")
        console.print(f"[red]❌ Error: {str(e)}[/red]")

@app.command()
def process(
    article_ids: Optional[List[str]] = typer.Option(None, "--ids", "-i", help="Specific article IDs to process"),
    batch_size: int = typer.Option(10, "--batch-size", "-b", help="Number of articles to process in batch"),
    force: bool = typer.Option(False, "--force", "-f", help="Force reprocessing of already processed articles"),
    processor_type: str = typer.Option("all", "--type", "-t", help="Type of processing: all, llm, sentiment, entity"),
):
    """Process crawled articles with LLM agent"""
    
    async def run_process():
        """Async process execution"""
        # Initialize container
        container = get_container()
        
        # Initialize database
        db_manager = get_service("database_manager")
        await db_manager.create_tables()
        
        # Get processing service
        processing_service = get_service("processing_service")
        
        # Create process request
        request = ProcessRequest(
            article_ids=article_ids,
            batch_size=batch_size,
            force=force,
            processor_type=processor_type
        )
        
        return await processing_service.process_articles(request)
    
    console.print("[bold green]🤖 Starting Article Processing[/bold green]")
    console.print(f"⚙️  Configuration: batch_size={batch_size}, type={processor_type}")
    
    # Setup logging
    setup_logging(
        level=settings.LOG_LEVEL,
        log_file=settings.LOG_FILE,
        rotation=settings.LOG_ROTATION,
        retention=settings.LOG_RETENTION
    )
    
    try:
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console,
        ) as progress:
            task = progress.add_task("Processing articles...", total=None)
            
            results = asyncio.run(run_process())
            
            progress.update(task, completed=True)
            
        # Display results
        _display_process_results(results)
        
    except KeyboardInterrupt:
        console.print("\n[yellow]⚠️  Processing interrupted by user[/yellow]")
    except Exception as e:
        logger.error(f"Processing failed: {str(e)}")
        console.print(f"[red]❌ Error: {str(e)}[/red]")

@app.command()
def server(
    host: str = typer.Option("0.0.0.0", "--host", "-h", help="Host to run the API server"),
    port: int = typer.Option(8000, "--port", "-p", help="Port to run the API server"),
    workers: int = typer.Option(1, "--workers", "-w", help="Number of worker processes"),
    reload: bool = typer.Option(False, "--reload", "-r", help="Enable auto-reload for development"),
):
    """Start the API server"""
    
    console.print("[bold purple]🚀 Starting API Server[/bold purple]")
    console.print(f"🌐 Server will be available at: http://{host}:{port}")
    console.print(f"📖 API Documentation: http://{host}:{port}/docs")
    
    # Setup logging
    setup_logging(
        level=settings.LOG_LEVEL,
        log_file=settings.LOG_FILE,
        rotation=settings.LOG_ROTATION,
        retention=settings.LOG_RETENTION
    )
    
    try:
        # For now, just print that server functionality is not implemented
        console.print("[yellow]⚠️  API Server functionality not yet implemented[/yellow]")
        console.print("This will be implemented in the next phase of the refactoring")
    except KeyboardInterrupt:
        console.print("\n[yellow]⚠️  Server stopped by user[/yellow]")
    except Exception as e:
        logger.error(f"Server failed: {str(e)}")
        console.print(f"[red]❌ Error: {str(e)}[/red]")

@app.command()
def stats():
    """Display crawler statistics"""
    
    async def get_stats():
        """Async stats retrieval"""
        # Initialize container
        container = get_container()
        
        # Initialize database
        db_manager = get_service("database_manager")
        await db_manager.create_tables()
        
        # Get article repository for stats
        article_repo = get_service("article_repository")
        
        # Get basic statistics
        stats = await article_repo.get_statistics()
        return stats
    
    console.print("[bold cyan]📊 Crawler Statistics[/bold cyan]")
    
    # Setup logging
    setup_logging(
        level=settings.LOG_LEVEL,
        log_file=settings.LOG_FILE,
        rotation=settings.LOG_ROTATION,
        retention=settings.LOG_RETENTION
    )
    
    try:
        stats = asyncio.run(get_stats())
        _display_statistics(stats)
    except Exception as e:
        logger.error(f"Failed to get statistics: {str(e)}")
        console.print(f"[red]❌ Error: {str(e)}[/red]")

@app.command()
def config(
    list_sites: bool = typer.Option(False, "--list-sites", "-l", help="List configured sites"),
    add_site: Optional[str] = typer.Option(None, "--add-site", "-a", help="Add new site configuration"),
    remove_site: Optional[str] = typer.Option(None, "--remove-site", "-r", help="Remove site configuration"),
    enable_site: Optional[str] = typer.Option(None, "--enable-site", "-e", help="Enable site"),
    disable_site: Optional[str] = typer.Option(None, "--disable-site", "-d", help="Disable site"),
):
    """Manage crawler configuration"""
    
    async def manage_config():
        """Async configuration management"""
        # Initialize container
        container = get_container()
        
        # Initialize database
        db_manager = get_service("database_manager")
        await db_manager.create_tables()
        
        # Get site repository
        site_repo = get_service("site_repository")
        
        if list_sites:
            sites = await site_repo.get_all()
            return {"action": "list", "sites": sites}
        elif add_site:
            console.print(f"Adding site: {add_site}")
            return {"action": "add", "site": add_site}
        elif remove_site:
            console.print(f"Removing site: {remove_site}")
            return {"action": "remove", "site": remove_site}
        elif enable_site:
            site = await site_repo.get_by_name(enable_site)
            if site:
                await site_repo.set_active(site.id, True)
                return {"action": "enable", "site": enable_site}
            else:
                return {"action": "error", "message": f"Site '{enable_site}' not found"}
        elif disable_site:
            site = await site_repo.get_by_name(disable_site)
            if site:
                await site_repo.set_active(site.id, False)
                return {"action": "disable", "site": disable_site}
            else:
                return {"action": "error", "message": f"Site '{disable_site}' not found"}
        else:
            return {"action": "help"}
    
    console.print("[bold magenta]⚙️  Crawler Configuration[/bold magenta]")
    
    # Setup logging
    setup_logging(
        level=settings.LOG_LEVEL,
        log_file=settings.LOG_FILE,
        rotation=settings.LOG_ROTATION,
        retention=settings.LOG_RETENTION
    )
    
    try:
        result = asyncio.run(manage_config())
        
        if result["action"] == "list":
            sites = result.get("sites", [])
            if sites and isinstance(sites, list):
                _display_site_configurations(sites)
            else:
                console.print("[yellow]No sites configured[/yellow]")
        elif result["action"] == "help":
            console.print("Use --help to see available configuration options")
        elif result["action"] == "error":
            console.print(f"[red]❌ {result['message']}[/red]")
        else:
            console.print(f"✅ {result['action'].title()} operation completed")
            
    except Exception as e:
        logger.error(f"Configuration failed: {str(e)}")
        console.print(f"[red]❌ Error: {str(e)}[/red]")

@app.command()
def monitor():
    """Monitor crawler and processing status"""
    
    console.print("[bold yellow]📡 Crawler Monitor[/bold yellow]")
    console.print("Press Ctrl+C to stop monitoring\n")
    
    try:
        asyncio.run(_monitor_status())
    except KeyboardInterrupt:
        console.print("\n[yellow]⚠️  Monitoring stopped by user[/yellow]")
    except Exception as e:
        logger.error(f"Monitoring failed: {str(e)}")
        console.print(f"[red]❌ Error: {str(e)}[/red]")

@app.command()
def reset(
    confirm: bool = typer.Option(False, "--confirm", "-c", help="Confirm database reset"),
    keep_config: bool = typer.Option(True, "--keep-config", "-k", help="Keep site configurations"),
):
    """Reset database (WARNING: This will delete all data)"""
    
    if not confirm:
        console.print("[red]⚠️  This will delete all crawled data![/red]")
        console.print("Use --confirm to proceed")
        return
    
    async def reset_db():
        """Async database reset"""
        # Initialize container
        container = get_container()
        
        # Initialize database
        db_manager = get_service("database_manager")
        await db_manager.drop_tables()
        await db_manager.create_tables()
        
        return True
    
    console.print("[bold red]🗑️  Resetting Database[/bold red]")
    
    # Setup logging
    setup_logging(
        level=settings.LOG_LEVEL,
        log_file=settings.LOG_FILE,
        rotation=settings.LOG_ROTATION,
        retention=settings.LOG_RETENTION
    )
    
    try:
        asyncio.run(reset_db())
        console.print("[green]✅ Database reset successfully[/green]")
    except Exception as e:
        logger.error(f"Database reset failed: {str(e)}")
        console.print(f"[red]❌ Error: {str(e)}[/red]")

# Helper functions for display

def _display_crawl_results(results: Dict):
    """Display crawling results"""
    table = Table(title="Crawling Results")
    
    table.add_column("Site", style="cyan")
    table.add_column("Pages Crawled", style="green")
    table.add_column("Articles Found", style="yellow")
    table.add_column("Errors", style="red")
    table.add_column("Duration", style="blue")
    
    for site, data in results.items():
        table.add_row(
            site,
            str(data.get('pages_crawled', 0)),
            str(data.get('articles_found', 0)),
            str(data.get('errors', 0)),
            f"{data.get('duration', 0):.2f}s"
        )
    
    console.print(table)

def _display_process_results(results: Dict):
    """Display processing results"""
    table = Table(title="Processing Results")
    
    table.add_column("Processor", style="cyan")
    table.add_column("Processed", style="green")
    table.add_column("Successful", style="yellow")
    table.add_column("Failed", style="red")
    table.add_column("Duration", style="blue")
    
    for processor, data in results.items():
        table.add_row(
            processor,
            str(data.get('processed', 0)),
            str(data.get('successful', 0)),
            str(data.get('failed', 0)),
            f"{data.get('duration', 0):.2f}s"
        )
    
    console.print(table)

def _display_statistics(stats: Dict):
    """Display crawler statistics"""
    table = Table(title="Database Statistics")
    
    table.add_column("Metric", style="cyan")
    table.add_column("Value", style="green")
    
    for metric, value in stats.items():
        # Handle different types of values
        if isinstance(value, (int, float)):
            display_value = str(value)
        elif value is None:
            display_value = "N/A"
        else:
            display_value = str(value)
            
        table.add_row(
            metric.replace('_', ' ').title(),
            display_value
        )
    
    console.print(table)

def _display_site_configurations(sites: List):
    """Display site configurations"""
    table = Table(title="Site Configurations")
    
    table.add_column("Site", style="cyan")
    table.add_column("URL", style="blue")
    table.add_column("Active", style="green")
    table.add_column("Last Crawled", style="yellow")
    table.add_column("Success Rate", style="magenta")
    
    for site in sites:
        table.add_row(
            site.site_name if hasattr(site, 'site_name') else 'N/A',
            site.base_url if hasattr(site, 'base_url') else 'N/A',
            "✅" if getattr(site, 'active', False) else "❌",
            str(site.last_crawled) if hasattr(site, 'last_crawled') and site.last_crawled else 'Never',
            f"{getattr(site, 'success_rate', 0):.1%}"
        )
    
    console.print(table)

async def _monitor_status():
    """Monitor crawler status"""
    # Initialize container
    container = get_container()
    
    # Initialize database
    db_manager = get_service("database_manager")
    await db_manager.create_tables()
    
    # Get repositories
    article_repo = get_service("article_repository")
    
    while True:
        try:
            # Get current statistics
            stats = await article_repo.get_statistics()
            
            # Clear console
            console.clear()
            
            # Display current time
            console.print(f"[bold blue]📡 Crawler Monitor - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}[/bold blue]")
            console.print()
            
            # Display statistics
            _display_statistics(stats)
            
            # Display processing queue status
            processing_stats = await article_repo.get_processing_statistics()
            if processing_stats:
                console.print()
                console.print("[bold cyan]Processing Queue[/bold cyan]")
                for status, count in processing_stats.items():
                    console.print(f"  {status}: {count}")
            
            # Wait before next update
            await asyncio.sleep(5)
            
        except Exception as e:
            logger.error(f"Monitor error: {str(e)}")
            await asyncio.sleep(10)

if __name__ == "__main__":
    app() 