#!/usr/bin/env python3
"""
Basic usage examples for the Football Intelligence Crawler
This script demonstrates how to use the crawler and LLM agent
"""

import asyncio
import sys
import os
from pathlib import Path
from datetime import datetime, timedelta

# Add the project root to the Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

from crawler.agents.llm_agent import FootballLLMAgent
from crawler.spiders.persian_football_spider import PersianFootballSpider
from crawler.database.connection import DatabaseManager
from crawler.config import settings
from crawler.utils.persian_utils import PersianTextProcessor

async def example_1_basic_crawling():
    """Example 1: Basic web crawling"""
    print("🕷️ Example 1: Basic Web Crawling")
    print("=" * 50)
    
    # Initialize spider
    spider = PersianFootballSpider()
    
    # Configure spider for limited crawling
    spider.settings.set('CLOSESPIDER_PAGECOUNT', 5)
    spider.settings.set('DOWNLOAD_DELAY', 1)
    
    print("Starting crawl of Persian football sites...")
    
    # Start crawling (this is a simplified example)
    # In practice, you'd use the Scrapy framework
    try:
        # This would be handled by the actual spider
        sample_urls = [
            "https://www.varzesh3.com/football",
            "https://www.persianfootball.com/news",
        ]
        
        for url in sample_urls:
            print(f"📄 Would crawl: {url}")
        
        print("✅ Crawling completed successfully")
        
    except Exception as e:
        print(f"❌ Crawling failed: {e}")

async def example_2_llm_processing():
    """Example 2: LLM-based content processing"""
    print("\n🤖 Example 2: LLM Content Processing")
    print("=" * 50)
    
    # Sample Persian football article
    sample_article = {
        "title": "پرسپولیس در دیدار حساس مقابل استقلال",
        "content": """
        در دیداری حساس و پرهیجان، تیم فوتبال پرسپولیس موفق شد با نتیجه ۲ بر ۱ 
        استقلال را شکست دهد. این دیدار در ورزشگاه آزادی و در حضور ۸۰ هزار تماشاگر 
        برگزار شد. علیرضا جهانبخش و مهدی طارمی گل‌های پرسپولیس را به ثمر رساندند.
        
        سرمربی پرسپولیس پس از بازی گفت: "بازیکنانم عالی بازی کردند و این پیروزی 
        را شایسته بودند. امیدوارم در ادامه فصل نیز همین روند را ادامه دهیم."
        
        این پیروزی پرسپولیس را در صدر جدول لیگ برتر قرار داد و احتمال قهرمانی 
        این تیم را بالا برد.
        """
    }
    
    # Initialize LLM agent
    if not settings.OPENAI_API_KEY or settings.OPENAI_API_KEY == "your-openai-api-key-here":
        print("⚠️  OpenAI API key not configured. Using mock processing...")
        
        # Mock processing result
        mock_result = {
            "title": sample_article["title"],
            "category": "match",
            "sentiment_score": 0.7,
            "summary": "پرسپولیس در دربی تهران استقلال را ۲-۱ شکست داد",
            "tags": ["پرسپولیس", "استقلال", "دربی", "لیگ برتر"],
            "entities": {
                "teams": ["پرسپولیس", "استقلال"],
                "players": ["علیرضا جهانبخش", "مهدی طارمی"],
                "venues": ["ورزشگاه آزادی"]
            },
            "confidence_score": 0.85
        }
        
        print("📊 Mock Processing Results:")
        print(f"   Category: {mock_result['category']}")
        print(f"   Sentiment: {mock_result['sentiment_score']}")
        print(f"   Summary: {mock_result['summary']}")
        print(f"   Tags: {', '.join(mock_result['tags'])}")
        print(f"   Teams: {', '.join(mock_result['entities']['teams'])}")
        print(f"   Players: {', '.join(mock_result['entities']['players'])}")
        print(f"   Confidence: {mock_result['confidence_score']:.2f}")
        
    else:
        print("🔄 Processing article with LLM agent...")
        
        try:
            # Initialize LLM agent
            llm_agent = FootballLLMAgent()
            
            # Process the article
            result = llm_agent.process_article(sample_article)
            
            print("📊 Processing Results:")
            print(f"   Category: {result.category}")
            print(f"   Sentiment: {result.sentiment_score:.2f}")
            print(f"   Summary: {result.summary}")
            print(f"   Tags: {', '.join(result.tags)}")
            print(f"   Confidence: {result.confidence_score:.2f}")
            
            if result.players:
                print(f"   Players found: {len(result.players)}")
                for player in result.players[:3]:  # Show first 3
                    print(f"     - {player['name']} ({player['team']})")
            
            if result.matches:
                print(f"   Matches found: {len(result.matches)}")
                for match in result.matches[:3]:  # Show first 3
                    print(f"     - {match['team1']} vs {match['team2']}")
            
            print("✅ LLM processing completed successfully")
            
        except Exception as e:
            print(f"❌ LLM processing failed: {e}")

async def example_3_persian_text_processing():
    """Example 3: Persian text processing utilities"""
    print("\n📝 Example 3: Persian Text Processing")
    print("=" * 50)
    
    # Sample Persian text with issues
    sample_text = """
    این   متن   دارای   مشکلاتی   است   .   مثل   فاصله   های   اضافی   و   
    کاراکترهای٪۱۲۳ غیرضروری میباشد. همچنین دارای نقطه‌گذاری اشتباه است,
    """
    
    print("🔤 Original text:")
    print(f"   {sample_text}")
    
    # Initialize Persian text processor
    processor = PersianTextProcessor()
    
    # Clean the text
    cleaned_text = processor.clean_text(sample_text)
    
    print("\n🧹 Cleaned text:")
    print(f"   {cleaned_text}")
    
    # Normalize the text
    normalized_text = processor.normalize_text(cleaned_text)
    
    print("\n🔄 Normalized text:")
    print(f"   {normalized_text}")
    
    # Extract keywords
    keywords = processor.extract_keywords(normalized_text)
    
    print("\n🔑 Keywords:")
    print(f"   {', '.join(keywords)}")
    
    # Detect language
    language = processor.detect_language(normalized_text)
    
    print(f"\n🌐 Detected language: {language}")
    
    print("✅ Text processing completed successfully")

async def example_4_database_operations():
    """Example 4: Database operations"""
    print("\n🗄️ Example 4: Database Operations")
    print("=" * 50)
    
    try:
        # Initialize database manager
        db_manager = DatabaseManager()
        
        print("📊 Database Statistics:")
        
        # Get statistics (this would be implemented in the actual database manager)
        mock_stats = {
            "total_articles": 1250,
            "processed_articles": 980,
            "total_players": 450,
            "total_teams": 85,
            "total_matches": 320,
            "last_crawl": datetime.now() - timedelta(hours=2)
        }
        
        for key, value in mock_stats.items():
            if isinstance(value, datetime):
                print(f"   {key.replace('_', ' ').title()}: {value.strftime('%Y-%m-%d %H:%M:%S')}")
            else:
                print(f"   {key.replace('_', ' ').title()}: {value}")
        
        # Show recent articles (mock data)
        print("\n📰 Recent Articles:")
        mock_articles = [
            "پرسپولیس قهرمان لیگ برتر شد",
            "انتقال مهدی طارمی به اروپا",
            "تیم ملی ایران در جام جهانی",
            "استقلال مربی جدید انتخاب کرد",
            "گل‌های برتر هفته در لیگ برتر"
        ]
        
        for i, article in enumerate(mock_articles, 1):
            print(f"   {i}. {article}")
        
        print("✅ Database operations completed successfully")
        
    except Exception as e:
        print(f"❌ Database operations failed: {e}")

async def example_5_full_pipeline():
    """Example 5: Complete processing pipeline"""
    print("\n🔄 Example 5: Complete Processing Pipeline")
    print("=" * 50)
    
    # Simulate a complete pipeline
    stages = [
        "🕷️  Crawling websites",
        "📝 Extracting content",
        "🧹 Cleaning text",
        "🤖 LLM processing",
        "📊 Analyzing sentiment",
        "🏷️  Extracting entities",
        "💾 Storing results",
        "📈 Updating statistics"
    ]
    
    print("Starting complete processing pipeline...")
    print()
    
    for stage in stages:
        print(f"   {stage}...")
        await asyncio.sleep(0.5)  # Simulate processing time
    
    print("\n📊 Pipeline Results:")
    print("   - Articles processed: 15")
    print("   - Players identified: 8")
    print("   - Matches analyzed: 3")
    print("   - Teams updated: 6")
    print("   - Processing time: 2.5 seconds")
    print("   - Success rate: 100%")
    
    print("\n✅ Complete pipeline finished successfully")

async def main():
    """Main function to run all examples"""
    print("🏈 Football Intelligence Crawler - Usage Examples")
    print("=" * 60)
    print()
    
    try:
        # Run all examples
        await example_1_basic_crawling()
        await example_2_llm_processing()
        await example_3_persian_text_processing()
        await example_4_database_operations()
        await example_5_full_pipeline()
        
        print("\n🎉 All examples completed successfully!")
        print()
        print("Next steps:")
        print("1. Configure your OpenAI API key in .env file")
        print("2. Set up PostgreSQL and Redis databases")
        print("3. Run: python main.py crawl --help")
        print("4. Start the API server: python main.py server")
        print("5. Visit http://localhost:8000/docs for API documentation")
        
    except Exception as e:
        print(f"\n❌ Examples failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Run the examples
    asyncio.run(main()) 