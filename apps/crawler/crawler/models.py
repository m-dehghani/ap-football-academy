"""
Database models for the Football Crawler project
Clean and optimized SQLAlchemy models for SQLite compatibility
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, JSON, ForeignKey, Index
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

Base = declarative_base()

class Article(Base):
    """Article model with comprehensive metadata"""
    __tablename__ = 'articles'
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Core content
    url = Column(String(500), unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    summary = Column(Text)
    raw_html = Column(Text)
    
    # Categorization
    category = Column(String(50), nullable=False, index=True)
    subcategory = Column(String(50))
    tags = Column(JSON, default=lambda: [])
    
    # Sentiment Analysis
    sentiment_score = Column(Float, default=0.0)
    sentiment_analysis = Column(JSON)
    
    # Temporal metadata
    published_date = Column(DateTime, index=True)
    crawled_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    processed_date = Column(DateTime)
    
    # Source information
    source = Column(String(100), nullable=False, index=True)
    language = Column(String(10), default='fa')
    
    # Processing status
    processed = Column(Boolean, default=False, index=True)
    processing_status = Column(String(20), default='pending', index=True)
    error_message = Column(Text)
    
    # LLM Analysis Results
    llm_analysis = Column(JSON)
    confidence_score = Column(Float, default=0.0)
    
    # Relationships
    players = relationship("ArticlePlayer", back_populates="article", cascade="all, delete-orphan")
    matches = relationship("ArticleMatch", back_populates="article", cascade="all, delete-orphan")
    entities = relationship("ArticleEntity", back_populates="article", cascade="all, delete-orphan")
    
    # Indexes for performance
    __table_args__ = (
        Index('idx_article_status_date', 'processing_status', 'crawled_date'),
        Index('idx_article_source_category', 'source', 'category'),
        Index('idx_article_published_processed', 'published_date', 'processed'),
    )
    
    def __repr__(self):
        return f"<Article(title='{self.title[:50]}...', source='{self.source}')>"

class Player(Base):
    """Player model with comprehensive information"""
    __tablename__ = 'players'
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Basic identification
    name = Column(String(100), nullable=False, index=True)
    persian_name = Column(String(100))
    nickname = Column(String(50))
    
    # Personal information
    age = Column(Integer)
    nationality = Column(String(50))
    position = Column(String(50))
    team = Column(String(100))
    team_id = Column(String(36), ForeignKey('teams.id'))
    
    # Physical attributes
    height = Column(Float)
    weight = Column(Float)
    foot = Column(String(10))  # left, right, both
    
    # Career statistics
    career_goals = Column(Integer, default=0)
    career_assists = Column(Integer, default=0)
    career_matches = Column(Integer, default=0)
    
    # Market information
    market_value = Column(Float)
    market_value_currency = Column(String(10))
    
    # Tracking metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_mentioned = Column(DateTime)
    mention_count = Column(Integer, default=0)
    
    # Additional information
    bio = Column(Text)
    social_media = Column(JSON)
    additional_info = Column(JSON)
    
    # Relationships
    team_rel = relationship("Team", back_populates="players")
    article_mentions = relationship("ArticlePlayer", back_populates="player")
    
    def __repr__(self):
        return f"<Player(name='{self.name}', team='{self.team}')>"

class Team(Base):
    """Team model with comprehensive information"""
    __tablename__ = 'teams'
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Basic identification
    name = Column(String(100), nullable=False, index=True)
    persian_name = Column(String(100))
    short_name = Column(String(20))
    
    # Location information
    country = Column(String(50))
    city = Column(String(50))
    founded = Column(Integer)
    league = Column(String(100))
    
    # Current season statistics
    current_position = Column(Integer)
    current_points = Column(Integer)
    matches_played = Column(Integer, default=0)
    wins = Column(Integer, default=0)
    draws = Column(Integer, default=0)
    losses = Column(Integer, default=0)
    goals_for = Column(Integer, default=0)
    goals_against = Column(Integer, default=0)
    
    # Stadium information
    stadium = Column(String(100))
    capacity = Column(Integer)
    
    # Tracking metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_mentioned = Column(DateTime)
    mention_count = Column(Integer, default=0)
    
    # Additional information
    description = Column(Text)
    website = Column(String(200))
    social_media = Column(JSON)
    additional_info = Column(JSON)
    
    # Relationships
    players = relationship("Player", back_populates="team_rel")
    coaches = relationship("Coach", back_populates="team_rel")
    matches_home = relationship("Match", foreign_keys="Match.home_team_id", back_populates="home_team_rel")
    matches_away = relationship("Match", foreign_keys="Match.away_team_id", back_populates="away_team_rel")
    
    def __repr__(self):
        return f"<Team(name='{self.name}', league='{self.league}')>"

class Coach(Base):
    """Coach model with career information"""
    __tablename__ = 'coaches'
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Basic identification
    name = Column(String(100), nullable=False, index=True)
    persian_name = Column(String(100))
    
    # Personal information
    age = Column(Integer)
    nationality = Column(String(50))
    current_team = Column(String(100))
    team_id = Column(String(36), ForeignKey('teams.id'))
    
    # Career information
    coaching_experience = Column(Integer)  # years
    former_teams = Column(JSON, default=lambda: [])
    achievements = Column(JSON, default=lambda: [])
    coaching_style = Column(String(100))
    
    # Tracking metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_mentioned = Column(DateTime)
    mention_count = Column(Integer, default=0)
    
    # Additional information
    bio = Column(Text)
    education = Column(String(200))
    additional_info = Column(JSON)
    
    # Relationships
    team_rel = relationship("Team", back_populates="coaches")
    
    def __repr__(self):
        return f"<Coach(name='{self.name}', team='{self.current_team}')>"

class Match(Base):
    """Match model with comprehensive match information"""
    __tablename__ = 'matches'
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Team information
    home_team = Column(String(100), nullable=False)
    away_team = Column(String(100), nullable=False)
    home_team_id = Column(String(36), ForeignKey('teams.id'))
    away_team_id = Column(String(36), ForeignKey('teams.id'))
    
    # Match result
    home_score = Column(Integer)
    away_score = Column(Integer)
    penalty_home = Column(Integer)
    penalty_away = Column(Integer)
    
    # Match details
    match_date = Column(DateTime, index=True)
    venue = Column(String(100))
    referee = Column(String(100))
    competition = Column(String(100))
    matchday = Column(Integer)
    
    # Match status
    status = Column(String(20), default='scheduled')  # scheduled, live, finished, postponed
    minute = Column(Integer)
    
    # Match statistics
    possession_home = Column(Integer)
    possession_away = Column(Integer)
    shots_home = Column(Integer)
    shots_away = Column(Integer)
    shots_on_target_home = Column(Integer)
    shots_on_target_away = Column(Integer)
    corners_home = Column(Integer)
    corners_away = Column(Integer)
    fouls_home = Column(Integer)
    fouls_away = Column(Integer)
    yellow_cards_home = Column(Integer)
    yellow_cards_away = Column(Integer)
    red_cards_home = Column(Integer)
    red_cards_away = Column(Integer)
    
    # Tracking metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Additional information
    match_events = Column(JSON)  # goals, cards, substitutions
    lineups = Column(JSON)
    additional_info = Column(JSON)
    
    # Relationships
    home_team_rel = relationship("Team", foreign_keys=[home_team_id], back_populates="matches_home")
    away_team_rel = relationship("Team", foreign_keys=[away_team_id], back_populates="matches_away")
    article_mentions = relationship("ArticleMatch", back_populates="match")
    
    def __repr__(self):
        return f"<Match(home='{self.home_team}', away='{self.away_team}', date='{self.match_date}')>"

class League(Base):
    """League model with basic information"""
    __tablename__ = 'leagues'
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Basic identification
    name = Column(String(100), nullable=False, index=True)
    persian_name = Column(String(100))
    country = Column(String(50))
    
    # League structure
    current_season = Column(String(20))
    teams_count = Column(Integer)
    matches_per_season = Column(Integer)
    
    # Tracking metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_mentioned = Column(DateTime)
    mention_count = Column(Integer, default=0)
    
    # Additional information
    description = Column(Text)
    website = Column(String(200))
    additional_info = Column(JSON)
    
    def __repr__(self):
        return f"<League(name='{self.name}', country='{self.country}')>"

# Association tables

class ArticlePlayer(Base):
    """Association table for articles and players"""
    __tablename__ = 'article_players'
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Foreign keys
    article_id = Column(String(36), ForeignKey('articles.id'), nullable=False)
    player_id = Column(String(36), ForeignKey('players.id'), nullable=False)
    
    # Context information
    context = Column(Text)
    confidence = Column(Float, default=0.0)
    mention_type = Column(String(50))  # goal, transfer, injury, etc.
    
    # Tracking
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    article = relationship("Article", back_populates="players")
    player = relationship("Player", back_populates="article_mentions")
    
    def __repr__(self):
        return f"<ArticlePlayer(article_id='{self.article_id}', player_id='{self.player_id}')>"

class ArticleMatch(Base):
    """Association table for articles and matches"""
    __tablename__ = 'article_matches'
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Foreign keys
    article_id = Column(String(36), ForeignKey('articles.id'), nullable=False)
    match_id = Column(String(36), ForeignKey('matches.id'), nullable=False)
    
    # Context information
    context = Column(Text)
    confidence = Column(Float, default=0.0)
    mention_type = Column(String(50))  # result, preview, analysis, etc.
    
    # Tracking
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    article = relationship("Article", back_populates="matches")
    match = relationship("Match", back_populates="article_mentions")
    
    def __repr__(self):
        return f"<ArticleMatch(article_id='{self.article_id}', match_id='{self.match_id}')>"

class ArticleEntity(Base):
    """Association table for articles and entities"""
    __tablename__ = 'article_entities'
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Foreign key
    article_id = Column(String(36), ForeignKey('articles.id'), nullable=False)
    
    # Entity information
    entity_type = Column(String(50), nullable=False)  # person, team, location, etc.
    entity_name = Column(String(200), nullable=False)
    entity_value = Column(String(500))
    
    # Context information
    context = Column(Text)
    confidence = Column(Float, default=0.0)
    start_position = Column(Integer)
    end_position = Column(Integer)
    
    # Tracking
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    article = relationship("Article", back_populates="entities")
    
    def __repr__(self):
        return f"<ArticleEntity(type='{self.entity_type}', name='{self.entity_name}')>"

class SiteConfiguration(Base):
    """Site configuration model for crawler settings"""
    __tablename__ = 'site_configurations'
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Site identification
    site_name = Column(String(100), nullable=False, unique=True)
    base_url = Column(String(200), nullable=False)
    
    # Crawling configuration
    selectors = Column(JSON)  # CSS selectors for different elements
    categories = Column(JSON, default=lambda: [])
    crawl_delay = Column(Float, default=1.0)
    max_pages = Column(Integer, default=100)
    
    # Site status
    active = Column(Boolean, default=True)
    last_crawled = Column(DateTime)
    success_rate = Column(Float, default=0.0)
    
    # Tracking metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Additional settings
    headers = Column(JSON)
    robots_txt_url = Column(String(200))
    respect_robots = Column(Boolean, default=True)
    
    def __repr__(self):
        return f"<SiteConfiguration(name='{self.site_name}', url='{self.base_url}')>"

class CrawlerSession(Base):
    """Crawler session tracking model"""
    __tablename__ = 'crawler_sessions'
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Session information
    session_name = Column(String(100), nullable=False)
    start_time = Column(DateTime, default=datetime.utcnow)
    end_time = Column(DateTime)
    status = Column(String(20), default='running')  # running, completed, failed
    
    # Session statistics
    pages_crawled = Column(Integer, default=0)
    articles_found = Column(Integer, default=0)
    articles_processed = Column(Integer, default=0)
    errors_count = Column(Integer, default=0)
    
    # Configuration used
    target_sites = Column(JSON, default=lambda: [])
    crawler_config = Column(JSON)
    
    # Results and errors
    session_stats = Column(JSON)
    error_log = Column(JSON)
    
    def __repr__(self):
        return f"<CrawlerSession(name='{self.session_name}', status='{self.status}')>"

class ProcessingQueue(Base):
    """Processing queue model for managing article processing"""
    __tablename__ = 'processing_queue'
    
    # Primary key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Article reference
    article_id = Column(String(36), ForeignKey('articles.id'), nullable=False)
    
    # Queue management
    priority = Column(Integer, default=0)
    status = Column(String(20), default='pending')  # pending, processing, completed, failed
    processor = Column(String(50))  # llm, sentiment, entity, etc.
    
    # Timing information
    created_at = Column(DateTime, default=datetime.utcnow)
    started_at = Column(DateTime)
    completed_at = Column(DateTime)
    
    # Processing information
    attempts = Column(Integer, default=0)
    max_attempts = Column(Integer, default=3)
    error_message = Column(Text)
    processing_time = Column(Float)  # seconds
    
    # Configuration
    processing_config = Column(JSON)
    
    def __repr__(self):
        return f"<ProcessingQueue(article_id='{self.article_id}', status='{self.status}')>"

# Utility functions

def create_all_tables(engine):
    """Create all tables in the database"""
    Base.metadata.create_all(bind=engine)

def drop_all_tables(engine):
    """Drop all tables from the database"""
    Base.metadata.drop_all(bind=engine)

def get_table_names():
    """Get all table names"""
    return Base.metadata.tables.keys()

def get_model_by_table_name(table_name: str):
    """Get model class by table name"""
    for cls in Base.registry._class_registry.values():
        if hasattr(cls, '__tablename__') and cls.__tablename__ == table_name:
            return cls
    return None 