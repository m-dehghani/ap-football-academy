"""
LLM service for processing content with AI models
"""
import openai
import json
from typing import Dict, List, Any, Optional
from datetime import datetime
import re
import asyncio
from dataclasses import dataclass
from loguru import logger

from crawler.config import settings
from crawler.schemas import LLMAnalysisResult, ArticleResponse, PlayerInfo, MatchInfo, EntityInfo
from crawler.exceptions import LLMError
from crawler.utils.persian_utils import PersianTextProcessor
import tiktoken

@dataclass
class ProcessedArticle:
    """Processed article data structure for compatibility with old system"""
    title: str
    content: str
    summary: str
    category: str
    sentiment_score: float
    published_date: Optional[datetime]
    tags: List[str]
    entities: Dict[str, Any]
    players: List[Dict[str, Any]]
    matches: List[Dict[str, Any]]
    confidence_score: float
    processing_metadata: Dict[str, Any]

class PromptTemplates:
    """Persian football content analysis prompts"""
    
    def get_system_prompt(self) -> str:
        """Main system prompt that defines the AI's role and capabilities"""
        return """
شما یک تحلیلگر حرفه‌ای محتوای فوتبال هستید که در تحلیل اخبار و محتوای فوتبال فارسی تخصص دارید. 
وظیفه شما تجزیه و تحلیل جامع متون فوتبال با استخراج اطلاعات مهم و ساختاریافته است.

قابلیت‌های شما:
1. تحلیل و دسته‌بندی اخبار فوتبال
2. استخراج اطلاعات بازیکنان، تیم‌ها و مسابقات
3. تحلیل احساسات و نظرات
4. خلاصه‌سازی محتوا
5. تشخیص موضوعات و برچسب‌گذاری
6. شناسایی اشخاص و اماکن مهم

اصول کار:
- دقت و صحت در استخراج اطلاعات
- حفظ زمینه فرهنگی و زبانی فارسی
- تفکیک واقعیت از نظر
- ارائه تحلیل منطقی و مستدل
- رعایت اخلاق حرفه‌ای

نتایج خود را به صورت ساختاریافته و قابل پردازش ارائه دهید.
"""
    
    def get_analysis_prompt(self, title: str, content: str) -> str:
        """Main analysis prompt for processing articles"""
        return f"""
لطفاً این مطلب فوتبال را تحلیل کنید:

عنوان: {title}
محتوا: {content}

تحلیل مطلوب:
1. دسته‌بندی: نوع مطلب و موضوع اصلی
2. خلاصه: خلاصه‌ای در 2-3 جمله
3. احساسات: تحلیل احساسات و امتیاز (-1 تا +1)
4. موجودیت‌ها: بازیکنان، تیم‌ها، مربیان، مسابقات
5. برچسب‌ها: کلمات کلیدی مهم
6. میزان اطمینان: امتیاز اطمینان (0 تا 1)

نتیجه را به صورت JSON ارائه دهید.
"""

class LLMService:
    """Service for LLM-based content processing"""
    
    def __init__(self, settings_obj):
        self.settings = settings_obj
        self.client = openai.OpenAI(api_key=settings_obj.OPENAI_API_KEY)
        self.model = settings_obj.OPENAI_MODEL
        self.persian_processor = PersianTextProcessor()
        self.prompt_templates = PromptTemplates()
        self.encoding = tiktoken.encoding_for_model(self.model)
        self.max_tokens = settings_obj.OPENAI_MAX_TOKENS
        self.temperature = settings_obj.OPENAI_TEMPERATURE
        
        # Rate limiting
        self.semaphore = asyncio.Semaphore(settings_obj.PROCESSING_SEMAPHORE_LIMIT)
        
    def count_tokens(self, text: str) -> int:
        """Count tokens in text for the specific model"""
        return len(self.encoding.encode(text))
    
    async def analyze_article(self, article: ArticleResponse) -> LLMAnalysisResult:
        """Analyze a single article with comprehensive LLM analysis"""
        try:
            # Clean and prepare content
            cleaned_content = self.persian_processor.clean_text(article.content)
            cleaned_title = self.persian_processor.clean_text(article.title)
            
            # Analyze content
            result = await self._analyze_chunk(cleaned_title, cleaned_content)
            
            # Convert to LLMAnalysisResult
            return LLMAnalysisResult(
                summary=result.get("summary", ""),
                sentiment_score=result.get("sentiment_score", 0.0),
                category=result.get("category", "news"),
                tags=result.get("tags", []),
                entities=self._convert_entities(result.get("entities", {})),
                players=self._convert_players(result.get("players", [])),
                matches=self._convert_matches(result.get("matches", [])),
                confidence_score=result.get("confidence_score", 0.0),
                processing_time=0.0,
                model_used=self.model
            )
            
        except Exception as e:
            logger.error(f"Error analyzing article {article.id}: {str(e)}")
            raise LLMError(f"Failed to analyze article: {str(e)}")
    
    async def _analyze_chunk(self, title: str, content: str) -> Dict[str, Any]:
        """Analyze a single chunk of content"""
        try:
            # Prepare the comprehensive prompt
            prompt = self.prompt_templates.get_analysis_prompt(title, content)
            
            response = await asyncio.to_thread(
                self.client.chat.completions.create,
                model=self.model,
                messages=[
                    {"role": "system", "content": self.prompt_templates.get_system_prompt()},
                    {"role": "user", "content": prompt}
                ],
                temperature=self.temperature,
                max_tokens=self.max_tokens
            )
            
            result = response.choices[0].message.content or ""
            return self._parse_llm_response(result)
            
        except Exception as e:
            logger.error(f"Error in LLM chunk analysis: {str(e)}")
            return self._create_empty_result()
    
    def _parse_llm_response(self, response: str) -> Dict[str, Any]:
        """Parse structured response from LLM"""
        try:
            # Try to parse as JSON first
            if response.strip().startswith('{'):
                return json.loads(response)
            
            # If not JSON, create basic structure
            return {
                'category': 'news',
                'sentiment_score': 0.0,
                'summary': response[:200] + '...' if len(response) > 200 else response,
                'tags': [],
                'entities': {},
                'players': [],
                'matches': [],
                'confidence_score': 0.5
            }
            
        except Exception as e:
            logger.error(f"Error parsing LLM response: {str(e)}")
            return self._create_empty_result()
    
    def _create_empty_result(self) -> Dict[str, Any]:
        """Create empty result structure"""
        return {
            'category': 'news',
            'sentiment_score': 0.0,
            'summary': '',
            'tags': [],
            'entities': {},
            'players': [],
            'matches': [],
            'confidence_score': 0.0
        }
    
    def _convert_entities(self, entities: Dict[str, Any]) -> List[EntityInfo]:
        """Convert entities dict to EntityInfo objects"""
        result = []
        for entity_type, entity_list in entities.items():
            if isinstance(entity_list, list):
                for entity in entity_list:
                    if isinstance(entity, str):
                        result.append(EntityInfo(
                            entity_type=entity_type,
                            entity_name=entity,
                            confidence=0.8,
                            context=""
                        ))
        return result
    
    def _convert_players(self, players: List[Dict[str, Any]]) -> List[PlayerInfo]:
        """Convert players list to PlayerInfo objects"""
        result = []
        for player in players:
            if isinstance(player, dict):
                result.append(PlayerInfo(
                    name=player.get('name', ''),
                    team=player.get('team', ''),
                    position=player.get('position', ''),
                    age=player.get('age'),
                    nationality=player.get('nationality', ''),
                    mentioned_in=player.get('mentioned_in', ''),
                    confidence=player.get('confidence', 0.8)
                ))
        return result
    
    def _convert_matches(self, matches: List[Dict[str, Any]]) -> List[MatchInfo]:
        """Convert matches list to MatchInfo objects"""
        result = []
        for match in matches:
            if isinstance(match, dict):
                result.append(MatchInfo(
                    team1=match.get('team1', ''),
                    team2=match.get('team2', ''),
                    score1=match.get('score1'),
                    score2=match.get('score2'),
                    match_date=None,
                    venue=match.get('venue', ''),
                    league=match.get('league', ''),
                    mentioned_in=match.get('mentioned_in', ''),
                    confidence=match.get('confidence', 0.8)
                ))
        return result
    
    async def process_article_legacy(self, article_data: Dict[str, Any]) -> ProcessedArticle:
        """Legacy method for compatibility with old system"""
        try:
            # Clean content
            title = self.persian_processor.clean_text(article_data.get('title', ''))
            content = self.persian_processor.clean_text(article_data.get('content', ''))
            
            # Analyze with LLM
            result = await self._analyze_chunk(title, content)
            
            return ProcessedArticle(
                title=title,
                content=content,
                summary=result.get('summary', ''),
                category=result.get('category', 'news'),
                sentiment_score=result.get('sentiment_score', 0.0),
                published_date=article_data.get('published_date'),
                tags=result.get('tags', []),
                entities=result.get('entities', {}),
                players=result.get('players', []),
                matches=result.get('matches', []),
                confidence_score=result.get('confidence_score', 0.0),
                processing_metadata={
                    'processed_at': datetime.now().isoformat(),
                    'model_used': self.model
                }
            )
            
        except Exception as e:
            logger.error(f"Error in legacy processing: {str(e)}")
            return ProcessedArticle(
                title=article_data.get('title', ''),
                content=article_data.get('content', ''),
                summary='خطا در پردازش',
                category='news',
                sentiment_score=0.0,
                published_date=None,
                tags=[],
                entities={},
                players=[],
                matches=[],
                confidence_score=0.0,
                processing_metadata={'error': str(e)}
            ) 