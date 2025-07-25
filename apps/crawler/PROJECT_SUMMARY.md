# ⚽ Football Intelligence Crawler
## Persian Football Information Extraction System with LLM Agent

### 📋 Project Overview

This is a comprehensive web crawling and AI-powered information extraction system specifically designed for Persian football websites. The system combines advanced web scraping techniques with Large Language Model (LLM) processing to automatically gather, analyze, and structure football-related content from Iranian and Persian-language sources.

### 🎯 Key Features

#### 🕷️ **Intelligent Web Crawling**
- **Multi-site Support**: Crawls major Persian football websites (Varzesh3, Persian Football, Football Iran, ISNA)
- **Smart Rate Limiting**: Respects robots.txt and implements intelligent delays
- **Content Detection**: Automatically identifies football-related content
- **Anti-bot Evasion**: Rotating user agents and proxy support
- **Playwright Integration**: Modern browser automation for JavaScript-heavy sites

#### 🤖 **Advanced LLM Processing**
- **GPT-4 Integration**: Uses OpenAI's GPT-4 for intelligent content analysis
- **Persian Language Specialized**: Optimized prompts for Persian football content
- **Multi-stage Processing**: Content cleaning, analysis, and structured extraction
- **Confidence Scoring**: Each analysis includes confidence metrics
- **Batch Processing**: Efficient handling of multiple articles

#### 📊 **Content Analysis Capabilities**
- **Sentiment Analysis**: Detailed sentiment scoring and emotion detection
- **Entity Extraction**: Identifies players, teams, coaches, venues, and dates
- **Match Information**: Extracts scores, lineups, and match statistics
- **Transfer News**: Identifies player transfers and contract details
- **Categorization**: Automatically classifies content types (news, analysis, match reports)
- **Summarization**: Generates concise summaries of long articles

#### 🗄️ **Robust Data Management**
- **PostgreSQL Database**: Comprehensive schema for all football entities
- **Redis Caching**: Fast access to frequently used data
- **Data Relationships**: Proper linking between articles, players, teams, and matches
- **Historical Tracking**: Maintains version history and change tracking
- **Bulk Operations**: Efficient batch processing and storage

### 🏗️ **System Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Scrapers  │───▶│  Content Queue  │───▶│   LLM Agent     │
│   (Playwright)  │    │    (Redis)      │    │   (GPT-4)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web API       │◀───│   Database      │◀───│   Data Storage  │
│   (FastAPI)     │    │  (PostgreSQL)   │    │   (Processed)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 📁 **Project Structure**

```
football-crawler/
├── README.md                          # Project documentation
├── requirements.txt                   # Python dependencies
├── setup.py                          # Package configuration
├── docker-compose.yml                # Docker services
├── Dockerfile                        # Container configuration
├── main.py                           # Main application entry point
├── crawler/
│   ├── __init__.py
│   ├── config.py                     # Configuration management
│   ├── models.py                     # Database models
│   ├── agents/
│   │   ├── __init__.py
│   │   └── llm_agent.py             # LLM processing agent
│   ├── spiders/
│   │   ├── __init__.py
│   │   └── persian_football_spider.py  # Web crawling spider
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── persian_utils.py          # Persian text processing
│   │   ├── prompt_templates.py       # LLM prompt templates
│   │   └── rate_limiter.py          # Request rate limiting
│   └── database/
│       ├── __init__.py
│       └── connection.py             # Database management
├── scripts/
│   └── setup.sh                      # Setup automation script
└── examples/
    └── basic_usage.py                # Usage examples
```

### 🛠️ **Technology Stack**

#### **Core Technologies**
- **Python 3.8+**: Main programming language
- **FastAPI**: Web API framework
- **PostgreSQL**: Primary database
- **Redis**: Caching and message queue
- **Docker**: Containerization

#### **Web Scraping**
- **Scrapy**: Web scraping framework
- **Playwright**: Browser automation
- **BeautifulSoup**: HTML parsing
- **Selenium**: Web driver support

#### **AI/ML Processing**
- **OpenAI GPT-4**: Language model
- **LangChain**: LLM framework
- **Transformers**: NLP models
- **NLTK**: Text processing
- **Hazm**: Persian text processing

#### **Data & Analytics**
- **SQLAlchemy**: ORM
- **Pandas**: Data manipulation
- **NumPy**: Numerical computing
- **Sentence-Transformers**: Text embeddings

### 🚀 **Getting Started**

#### **Quick Setup with Docker**
```bash
# Clone the repository
git clone https://github.com/ap-football-academy/football-crawler.git
cd football-crawler

# Create environment file
cp .env.example .env
# Edit .env and add your OpenAI API key

# Start with Docker
docker-compose up -d
```

#### **Local Development Setup**
```bash
# Run the setup script
./scripts/setup.sh

# Or manually:
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
playwright install

# Configure environment
cp .env.example .env
# Edit .env file with your settings

# Initialize database
python -c "from crawler.database.connection import DatabaseManager; DatabaseManager().create_tables()"

# Start the application
python main.py server
```

### 📖 **Usage Examples**

#### **Command Line Interface**
```bash
# Start web crawling
python main.py crawl --sites varzesh3,persianfootball --max-pages 50

# Process articles with LLM
python main.py process --batch-size 10 --type llm

# Start API server
python main.py server --host 0.0.0.0 --port 8000

# Monitor system status
python main.py monitor

# View statistics
python main.py stats
```

#### **API Usage**
```python
import requests

# Get recent articles
response = requests.get("http://localhost:8000/api/articles")
articles = response.json()

# Search for specific content
response = requests.get("http://localhost:8000/api/search?q=پرسپولیس")
results = response.json()

# Get player information
response = requests.get("http://localhost:8000/api/players/123")
player = response.json()
```

### 🔧 **Configuration**

#### **Environment Variables**
- `OPENAI_API_KEY`: Your OpenAI API key
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `CRAWLER_DELAY`: Delay between requests (seconds)
- `PROCESSING_BATCH_SIZE`: Articles per batch
- `LOG_LEVEL`: Logging level (DEBUG, INFO, WARNING, ERROR)

#### **Site Configuration**
The system includes pre-configured settings for major Persian football websites:
- **Varzesh3**: Main sports news portal
- **Persian Football**: Football-specific news
- **Football Iran**: Iranian football coverage
- **ISNA**: News agency sports section

### 📊 **Data Schema**

#### **Core Entities**
- **Articles**: News articles and content
- **Players**: Football player information
- **Teams**: Team data and statistics
- **Matches**: Game results and details
- **Coaches**: Coaching staff information
- **Leagues**: Competition information

#### **Processing Data**
- **Article Processing**: LLM analysis results
- **Sentiment Analysis**: Emotion and opinion data
- **Entity Extraction**: Named entity recognition
- **Content Classification**: Category assignments

### 🔍 **Monitoring & Analytics**

#### **Built-in Monitoring**
- **Real-time Statistics**: Live crawling and processing metrics
- **Health Checks**: System component status monitoring
- **Error Tracking**: Comprehensive error logging and reporting
- **Performance Metrics**: Response times and throughput tracking

#### **Dashboard Features**
- **Processing Queue**: Current and pending jobs
- **Site Statistics**: Per-site crawling success rates
- **Content Analytics**: Article categories and trends
- **System Health**: Database and service status

### 🛡️ **Security & Best Practices**

#### **Ethical Crawling**
- **Robots.txt Compliance**: Respects site crawling policies
- **Rate Limiting**: Prevents server overload
- **User Agent Rotation**: Mimics natural browsing patterns
- **Content Respect**: Only collects publicly available information

#### **Data Protection**
- **Secure Configuration**: Environment-based secrets management
- **Database Security**: Encrypted connections and access control
- **API Security**: Rate limiting and authentication options
- **Privacy Compliance**: Respects content usage policies

### 📈 **Performance Optimization**

#### **Scalability Features**
- **Distributed Processing**: Multi-worker architecture
- **Caching Strategy**: Redis-based performance optimization
- **Database Optimization**: Indexed queries and connection pooling
- **Batch Operations**: Efficient bulk data processing

#### **Resource Management**
- **Memory Optimization**: Efficient data structures and garbage collection
- **CPU Utilization**: Parallel processing and async operations
- **Storage Efficiency**: Compressed data storage and archiving
- **Network Optimization**: Connection pooling and request batching

### 🤝 **Integration with AP Football Academy**

This crawler system is designed to seamlessly integrate with the existing AP Football Academy platform:

#### **Data Flow Integration**
- **Content Enrichment**: Enhances academy content with latest news
- **Player Database**: Supplements academy player profiles
- **Match Analysis**: Provides detailed match insights
- **Trend Analysis**: Identifies football trends and patterns

#### **API Integration**
- **RESTful API**: Easy integration with existing systems
- **Webhook Support**: Real-time data updates
- **Bulk Export**: Data export for analysis tools
- **Custom Queries**: Flexible data retrieval options

### 🔄 **Maintenance & Updates**

#### **Regular Maintenance**
- **Site Configuration Updates**: Adapt to website changes
- **Model Updates**: Improve LLM processing accuracy
- **Database Optimization**: Regular cleanup and indexing
- **Security Updates**: Keep dependencies current

#### **Monitoring & Alerts**
- **Automated Alerts**: System health notifications
- **Performance Monitoring**: Track system metrics
- **Error Reporting**: Comprehensive error tracking
- **Usage Analytics**: Monitor system utilization

### 📚 **Documentation & Support**

#### **Technical Documentation**
- **API Reference**: Complete endpoint documentation
- **Database Schema**: Detailed table and relationship docs
- **Configuration Guide**: Comprehensive setup instructions
- **Troubleshooting**: Common issues and solutions

#### **Development Resources**
- **Code Examples**: Ready-to-use integration examples
- **Testing Framework**: Comprehensive test suite
- **Development Tools**: Debugging and profiling utilities
- **Contributing Guidelines**: Community contribution standards

### 🏆 **Benefits for AP Football Academy**

#### **Content Automation**
- **24/7 Content Updates**: Continuous content gathering
- **Multilingual Support**: Persian and English content
- **Quality Assurance**: AI-powered content validation
- **Trend Identification**: Early detection of football trends

#### **Enhanced User Experience**
- **Real-time Updates**: Latest football news and analysis
- **Personalized Content**: Tailored content recommendations
- **Comprehensive Coverage**: Wide range of football topics
- **Mobile Optimization**: Responsive design for all devices

#### **Business Intelligence**
- **Market Analysis**: Football industry insights
- **Player Performance**: Data-driven player analysis
- **Competition Monitoring**: Track competitor activities
- **Strategic Planning**: Data-informed decision making

### 🌟 **Future Enhancements**

#### **Planned Features**
- **Video Content Analysis**: Process football videos and highlights
- **Social Media Integration**: Twitter and Instagram content crawling
- **Real-time Notifications**: Live match updates and alerts
- **Mobile App Integration**: Native mobile app support
- **Advanced Analytics**: Machine learning-based predictions

#### **Scalability Improvements**
- **Cloud Deployment**: AWS/Azure cloud infrastructure
- **Microservices Architecture**: Containerized service deployment
- **Auto-scaling**: Dynamic resource allocation
- **Global CDN**: Worldwide content delivery network

---

## 🎯 **Conclusion**

The Football Intelligence Crawler represents a significant advancement in automated sports content processing. By combining modern web scraping techniques with cutting-edge AI technology, this system provides the AP Football Academy with a powerful tool for content aggregation, analysis, and intelligence gathering.

The system's modular architecture ensures easy maintenance and extensibility, while its comprehensive feature set addresses current needs and future growth. With proper configuration and deployment, this crawler will serve as a cornerstone of the academy's digital infrastructure, providing valuable insights and keeping the platform at the forefront of football content and analysis.

**Ready to transform your football content strategy? Let's get started! 🚀** 