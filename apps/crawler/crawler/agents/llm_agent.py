import openai
import json
from typing import Dict, List, Any, Optional
from datetime import datetime
import re
from dataclasses import dataclass
from loguru import logger
from crawler.utils.persian_utils import PersianTextProcessor
from crawler.utils.prompt_templates import PromptTemplates
from crawler.config import settings
import asyncio
from langchain_openai import OpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
import tiktoken

@dataclass
class ProcessedArticle:
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

class FootballLLMAgent:
    """Advanced LLM agent for processing Persian football content"""
    
    def __init__(self):
        self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.OPENAI_MODEL
        self.persian_processor = PersianTextProcessor()
        self.prompt_templates = PromptTemplates()
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=4000,
            chunk_overlap=200,
            length_function=self.count_tokens
        )
        self.encoding = tiktoken.encoding_for_model(self.model)
        
    def count_tokens(self, text: str) -> int:
        """Count tokens in text for the specific model"""
        return len(self.encoding.encode(text))
    
    def process_article(self, article_data: Dict[str, Any]) -> ProcessedArticle:
        """Main processing pipeline for football articles"""
        try:
            # Extract and clean content
            cleaned_content = self.persian_processor.clean_text(article_data['content'])
            cleaned_title = self.persian_processor.clean_text(article_data['title'])
            
            # Split content if too long
            chunks = self.text_splitter.split_text(cleaned_content)
            
            # Process each chunk and combine results
            processed_chunks = []
            for chunk in chunks:
                chunk_result = self._process_chunk(cleaned_title, chunk)
                processed_chunks.append(chunk_result)
            
            # Combine and finalize results
            final_result = self._combine_chunk_results(processed_chunks)
            
            # Add metadata
            final_result.processing_metadata = {
                'processed_at': datetime.now().isoformat(),
                'model_used': self.model,
                'chunks_processed': len(chunks),
                'original_length': len(cleaned_content),
                'token_count': self.count_tokens(cleaned_content)
            }
            
            return final_result
            
        except Exception as e:
            logger.error(f"Error processing article: {str(e)}")
            return self._create_fallback_result(article_data)
    
    def _process_chunk(self, title: str, content: str) -> Dict[str, Any]:
        """Process a single chunk of content"""
        # Prepare the comprehensive prompt
        prompt = self.prompt_templates.get_analysis_prompt(title, content)
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self.prompt_templates.get_system_prompt()},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1,
                max_tokens=2000
            )
            
            result = response.choices[0].message.content or ""
            parsed_result = self._parse_llm_response(result)
            
            return parsed_result
            
        except Exception as e:
            logger.error(f"Error in LLM processing: {str(e)}")
            return self._create_empty_result()
    
    def _parse_llm_response(self, response: str) -> Dict[str, Any]:
        """Parse structured response from LLM"""
        try:
            # Try to parse as JSON first
            if response.strip().startswith('{'):
                return json.loads(response)
            
            # If not JSON, parse manually
            result = {
                'category': self._extract_category(response),
                'sentiment_score': self._extract_sentiment(response),
                'summary': self._extract_summary(response),
                'tags': self._extract_tags(response),
                'entities': self._extract_entities(response),
                'players': self._extract_players(response),
                'matches': self._extract_matches(response),
                'confidence_score': 0.8
            }
            
            return result
            
        except Exception as e:
            logger.error(f"Error parsing LLM response: {str(e)}")
            return self._create_empty_result()
    
    def _extract_category(self, response: str) -> str:
        """Extract article category from response"""
        categories = {
            'انتقال': 'transfer',
            'اخبار': 'news',
            'مسابقه': 'match',
            'تحلیل': 'analysis',
            'تیم ملی': 'national_team',
            'لیگ': 'league',
            'مربی': 'coach',
            'بازیکن': 'player'
        }
        
        for persian, english in categories.items():
            if persian in response:
                return english
        
        return 'news'
    
    def _extract_sentiment(self, response: str) -> float:
        """Extract sentiment score from response"""
        sentiment_patterns = [
            r'احساسات?\s*[:=]\s*([+-]?\d*\.?\d+)',
            r'نظر\s*[:=]\s*(مثبت|منفی|خنثی)',
            r'sentiment\s*[:=]\s*([+-]?\d*\.?\d+)'
        ]
        
        for pattern in sentiment_patterns:
            match = re.search(pattern, response, re.IGNORECASE)
            if match:
                value = match.group(1)
                if value in ['مثبت', 'positive']:
                    return 0.7
                elif value in ['منفی', 'negative']:
                    return -0.7
                elif value in ['خنثی', 'neutral']:
                    return 0.0
                else:
                    try:
                        return float(value)
                    except ValueError:
                        pass
        
        return 0.0
    
    def _extract_summary(self, response: str) -> str:
        """Extract summary from response"""
        summary_patterns = [
            r'خلاصه\s*[:=]\s*(.+?)(?=\n\n|\n[A-Z]|\n[۰-۹])',
            r'خلاصه\s*[:=]\s*(.+?)$',
            r'summary\s*[:=]\s*(.+?)(?=\n\n|\n[A-Z])',
        ]
        
        for pattern in summary_patterns:
            match = re.search(pattern, response, re.IGNORECASE | re.DOTALL)
            if match:
                return match.group(1).strip()
        
        # If no explicit summary found, take first paragraph
        lines = response.split('\n')
        for line in lines:
            if len(line.strip()) > 50:
                return line.strip()[:200] + '...'
        
        return ''
    
    def _extract_tags(self, response: str) -> List[str]:
        """Extract tags from response"""
        tag_patterns = [
            r'برچسب\s*[:=]\s*(.+?)(?=\n\n|\n[A-Z])',
            r'تگ\s*[:=]\s*(.+?)(?=\n\n|\n[A-Z])',
            r'tags?\s*[:=]\s*(.+?)(?=\n\n|\n[A-Z])',
        ]
        
        tags = []
        for pattern in tag_patterns:
            match = re.search(pattern, response, re.IGNORECASE)
            if match:
                tag_text = match.group(1)
                # Split by common delimiters
                potential_tags = re.split(r'[,،\s\n]+', tag_text)
                tags.extend([tag.strip() for tag in potential_tags if tag.strip()])
        
        # Remove duplicates and filter
        unique_tags = list(set(tags))
        return [tag for tag in unique_tags if 2 < len(tag) < 20][:10]
    
    def _extract_entities(self, response: str) -> Dict[str, Any]:
        """Extract named entities from response"""
        entities = {
            'teams': [],
            'players': [],
            'coaches': [],
            'leagues': [],
            'locations': []
        }
        
        # Persian team names
        persian_teams = [
            'پرسپولیس', 'استقلال', 'سپاهان', 'تراکتور', 'الهلال',
            'النصر', 'الاهلی', 'بارسلونا', 'رئال مادرید', 'منچستر',
            'لیورپول', 'چلسی', 'آرسنال', 'منچستر یونایتد'
        ]
        
        # Persian player name patterns
        player_patterns = [
            r'([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\s]+)\s+(?:بازیکن|گلزن|مهاجم|مدافع|دروازه‌بان)',
            r'(?:بازیکن|گلزن|مهاجم|مدافع|دروازه‌بان)\s+([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\s]+)',
        ]
        
        for team in persian_teams:
            if team in response:
                entities['teams'].append(team)
        
        for pattern in player_patterns:
            matches = re.findall(pattern, response)
            for match in matches:
                if isinstance(match, str) and 3 < len(match) < 30:
                    entities['players'].append(match.strip())
        
        return entities
    
    def _extract_players(self, response: str) -> List[Dict[str, Any]]:
        """Extract player information from response"""
        players = []
        
        # Pattern to match player mentions with details
        player_patterns = [
            r'([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\s]+)\s+(?:بازیکن|گلزن|مهاجم|مدافع|دروازه‌بان)\s+([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\s]+)',
            r'([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\s]+)\s+(\d+)\s+(?:ساله|سال)',
            r'([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\s]+)\s+(?:گل|پاس|امتیاز)\s+(\d+)',
        ]
        
        for pattern in player_patterns:
            matches = re.findall(pattern, response)
            for match in matches:
                if len(match) >= 2:
                    player_data = {
                        'name': match[0].strip(),
                        'team': match[1].strip() if len(match) > 1 else '',
                        'mentioned_in': response[:100] + '...',
                        'confidence': 0.7
                    }
                    players.append(player_data)
        
        return players[:5]  # Limit to 5 players
    
    def _extract_matches(self, response: str) -> List[Dict[str, Any]]:
        """Extract match information from response"""
        matches = []
        
        # Pattern to match match results
        match_patterns = [
            r'([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\s]+)\s+(\d+)\s*[-–]\s*(\d+)\s+([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\s]+)',
            r'([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\s]+)\s+برابر\s+([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\s]+)',
            r'دیدار\s+([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\s]+)\s+و\s+([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\s]+)',
        ]
        
        for pattern in match_patterns:
            matches_found = re.findall(pattern, response)
            for match in matches_found:
                if len(match) >= 2:
                    match_data = {
                        'team1': match[0].strip(),
                        'team2': match[-1].strip(),
                        'score1': match[1] if len(match) > 2 and match[1].isdigit() else None,
                        'score2': match[2] if len(match) > 3 and match[2].isdigit() else None,
                        'mentioned_in': response[:100] + '...',
                        'confidence': 0.8
                    }
                    matches.append(match_data)
        
        return matches[:3]  # Limit to 3 matches
    
    def _combine_chunk_results(self, chunks: List[Dict[str, Any]]) -> ProcessedArticle:
        """Combine results from multiple chunks"""
        if not chunks:
            return self._create_fallback_result({})
        
        # Take the first chunk as base
        base_chunk = chunks[0]
        
        # Combine tags from all chunks
        all_tags = []
        for chunk in chunks:
            all_tags.extend(chunk.get('tags', []))
        unique_tags = list(set(all_tags))[:10]
        
        # Combine entities
        combined_entities = {
            'teams': [],
            'players': [],
            'coaches': [],
            'leagues': [],
            'locations': []
        }
        
        for chunk in chunks:
            entities = chunk.get('entities', {})
            for key in combined_entities:
                if key in entities:
                    combined_entities[key].extend(entities[key])
        
        # Remove duplicates
        for key in combined_entities:
            combined_entities[key] = list(set(combined_entities[key]))
        
        # Combine players and matches
        all_players = []
        all_matches = []
        
        for chunk in chunks:
            all_players.extend(chunk.get('players', []))
            all_matches.extend(chunk.get('matches', []))
        
        # Create summary from first chunk or combine
        summary = base_chunk.get('summary', '')
        if len(chunks) > 1:
            summary = f"{summary} [محتوای ترکیبی از {len(chunks)} بخش]"
        
        # Average confidence score
        avg_confidence = sum(chunk.get('confidence_score', 0.5) for chunk in chunks) / len(chunks)
        
        return ProcessedArticle(
            title=base_chunk.get('title', ''),
            content=base_chunk.get('content', ''),
            summary=summary,
            category=base_chunk.get('category', 'news'),
            sentiment_score=base_chunk.get('sentiment_score', 0.0),
            published_date=base_chunk.get('published_date'),
            tags=unique_tags,
            entities=combined_entities,
            players=all_players[:10],  # Limit to 10 players
            matches=all_matches[:5],   # Limit to 5 matches
            confidence_score=avg_confidence,
            processing_metadata={}
        )
    
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
    
    def _create_fallback_result(self, article_data: Dict[str, Any]) -> ProcessedArticle:
        """Create fallback result when processing fails"""
        return ProcessedArticle(
            title=article_data.get('title', ''),
            content=article_data.get('content', ''),
            summary='خلاصه‌ای در دسترس نیست',
            category='news',
            sentiment_score=0.0,
            published_date=None,
            tags=[],
            entities={},
            players=[],
            matches=[],
            confidence_score=0.0,
            processing_metadata={'error': 'Processing failed, using fallback'}
        )
    
    async def process_article_async(self, article_data: Dict[str, Any]) -> ProcessedArticle:
        """Async version of article processing"""
        return await asyncio.get_event_loop().run_in_executor(
            None, self.process_article, article_data
        )
    
    def analyze_sentiment_advanced(self, text: str) -> Dict[str, Any]:
        """Advanced sentiment analysis with detailed breakdown"""
        prompt = self.prompt_templates.get_sentiment_analysis_prompt(text)
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a sentiment analysis expert specializing in Persian sports content."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1,
                max_tokens=500
            )
            
            result = response.choices[0].message.content or ""
            return self._parse_sentiment_response(result)
            
        except Exception as e:
            logger.error(f"Error in sentiment analysis: {str(e)}")
            return {
                'overall_sentiment': 0.0,
                'confidence': 0.0,
                'emotions': {},
                'aspects': {}
            }
    
    def _parse_sentiment_response(self, response: str) -> Dict[str, Any]:
        """Parse sentiment analysis response"""
        try:
            if response.strip().startswith('{'):
                return json.loads(response)
            
            # Manual parsing fallback
            return {
                'overall_sentiment': self._extract_sentiment(response),
                'confidence': 0.8,
                'emotions': {},
                'aspects': {}
            }
            
        except Exception as e:
            logger.error(f"Error parsing sentiment response: {str(e)}")
            return {
                'overall_sentiment': 0.0,
                'confidence': 0.0,
                'emotions': {},
                'aspects': {}
            } 