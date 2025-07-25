"""
Persian text processing utilities using hazm and persian-tools
"""
import re
from typing import List, Optional, Dict, Any
from loguru import logger

# Try to import hazm and persian-tools, fall back to basic processing if not available
try:
    from hazm import Normalizer, Stemmer, Lemmatizer, word_tokenize, sent_tokenize
    HAZM_AVAILABLE = True
except ImportError:
    logger.warning("hazm not available, using basic text processing")
    HAZM_AVAILABLE = False

try:
    from persian_tools import digits, persian_chars, phone_number
    PERSIAN_TOOLS_AVAILABLE = True
except ImportError:
    logger.warning("persian-tools not available, using basic text processing")
    PERSIAN_TOOLS_AVAILABLE = False

class PersianTextProcessor:
    """Enhanced Persian text processor using hazm and persian-tools"""
    
    def __init__(self):
        """Initialize Persian text processor with hazm components"""
        try:
            if HAZM_AVAILABLE:
                self.normalizer = Normalizer()
                self.stemmer = Stemmer()
                self.lemmatizer = Lemmatizer()
                logger.info("Persian text processor initialized with hazm")
            else:
                self.normalizer = None
                self.stemmer = None
                self.lemmatizer = None
                logger.info("Persian text processor initialized with basic processing")
        except Exception as e:
            logger.error(f"Error initializing Persian processor: {str(e)}")
            # Fallback to basic processing
            self.normalizer = None
            self.stemmer = None
            self.lemmatizer = None
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize Persian text"""
        if not text:
            return ""
        
        try:
            # Use hazm normalizer if available
            if self.normalizer:
                text = self.normalizer.normalize(text)
            else:
                # Basic fallback normalization
                text = self._basic_normalize(text)
            
            # Additional cleaning
            text = self._remove_extra_whitespace(text)
            text = self._remove_special_chars(text)
            
            return text.strip()
            
        except Exception as e:
            logger.error(f"Error cleaning text: {str(e)}")
            return self._basic_clean(text)
    
    def _basic_normalize(self, text: str) -> str:
        """Basic Persian text normalization fallback"""
        # Convert Arabic numbers to Persian if persian-tools is available
        if PERSIAN_TOOLS_AVAILABLE:
            text = digits.to_persian(text)
            # Normalize Persian characters
            text = persian_chars.normalize(text)
        
        # Fix common character substitutions
        char_map = {
            'ي': 'ی',  # Arabic Ya to Persian Ya
            'ك': 'ک',  # Arabic Kaf to Persian Kaf
            'ۀ': 'ه',  # Persian Heh with Yeh above to regular Heh
            '٠': '۰', '١': '۱', '٢': '۲', '٣': '۳', '٤': '۴',
            '٥': '۵', '٦': '۶', '٧': '۷', '٨': '۸', '٩': '۹'
        }
        
        for old, new in char_map.items():
            text = text.replace(old, new)
        
        return text
    
    def _basic_clean(self, text: str) -> str:
        """Basic text cleaning fallback"""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)
        
        # Remove unwanted characters
        text = re.sub(r'[^\w\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]', ' ', text)
        
        return text.strip()
    
    def _remove_extra_whitespace(self, text: str) -> str:
        """Remove extra whitespace and normalize spacing"""
        # Replace multiple spaces with single space
        text = re.sub(r'\s+', ' ', text)
        
        # Remove spaces before punctuation
        text = re.sub(r'\s+([،؛؟!])', r'\1', text)
        
        # Add space after punctuation if missing
        text = re.sub(r'([،؛؟!])([^\s])', r'\1 \2', text)
        
        return text
    
    def _remove_special_chars(self, text: str) -> str:
        """Remove unwanted special characters while preserving Persian text"""
        # Keep Persian/Arabic characters, numbers, and basic punctuation
        allowed_pattern = r'[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\w\s،؛؟!.()\[\]{}"\'-]'
        text = re.sub(allowed_pattern, ' ', text)
        
        return text
    
    def tokenize_words(self, text: str) -> List[str]:
        """Tokenize text into words using hazm"""
        if not text:
            return []
        
        try:
            if self.normalizer and HAZM_AVAILABLE:
                # Use hazm word tokenizer
                normalized_text = self.normalizer.normalize(text)
                return word_tokenize(normalized_text)
            else:
                # Basic fallback tokenization
                return self._basic_tokenize(text)
                
        except Exception as e:
            logger.error(f"Error tokenizing words: {str(e)}")
            return self._basic_tokenize(text)
    
    def _basic_tokenize(self, text: str) -> List[str]:
        """Basic word tokenization fallback"""
        # Split on whitespace and punctuation
        tokens = re.findall(r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\w]+', text)
        return [token for token in tokens if len(token) > 1]
    
    def tokenize_sentences(self, text: str) -> List[str]:
        """Tokenize text into sentences"""
        if not text:
            return []
        
        try:
            if self.normalizer and HAZM_AVAILABLE:
                # Use hazm sentence tokenizer
                normalized_text = self.normalizer.normalize(text)
                return sent_tokenize(normalized_text)
            else:
                # Basic sentence splitting
                return self._basic_sentence_split(text)
                
        except Exception as e:
            logger.error(f"Error tokenizing sentences: {str(e)}")
            return self._basic_sentence_split(text)
    
    def _basic_sentence_split(self, text: str) -> List[str]:
        """Basic sentence splitting fallback"""
        # Split on sentence-ending punctuation
        sentences = re.split(r'[.!؟]+', text)
        return [sent.strip() for sent in sentences if sent.strip()]
    
    def stem_words(self, words: List[str]) -> List[str]:
        """Stem words using hazm stemmer"""
        if not words or not self.stemmer:
            return words
        
        try:
            return [self.stemmer.stem(word) for word in words]
        except Exception as e:
            logger.error(f"Error stemming words: {str(e)}")
            return words
    
    def lemmatize_words(self, words: List[str]) -> List[str]:
        """Lemmatize words using hazm lemmatizer"""
        if not words or not self.lemmatizer:
            return words
        
        try:
            return [self.lemmatizer.lemmatize(word) for word in words]
        except Exception as e:
            logger.error(f"Error lemmatizing words: {str(e)}")
            return words
    
    def remove_stopwords(self, words: List[str], custom_stopwords: Optional[List[str]] = None) -> List[str]:
        """Remove Persian stopwords from word list"""
        # Default Persian stopwords
        default_stopwords = {
            'در', 'از', 'به', 'با', 'را', 'که', 'این', 'آن', 'و', 'یا', 'اما', 'هم',
            'تا', 'بر', 'برای', 'پس', 'اگر', 'چون', 'وقتی', 'هنگام', 'همان', 'است',
            'هست', 'بود', 'باشد', 'دارد', 'کند', 'شود', 'گردد', 'بین', 'روی', 'زیر',
            'کنار', 'نزد', 'پیش', 'دور', 'نزدیک', 'داخل', 'خارج', 'علیه', 'ضد',
            'طبق', 'مطابق', 'بنابر', 'بر اساس', 'در مورد', 'در باره', 'نسبت به'
        }
        
        # Add custom stopwords if provided
        if custom_stopwords:
            default_stopwords.update(custom_stopwords)
        
        return [word for word in words if word not in default_stopwords]
    
    def extract_persian_text(self, text: str) -> str:
        """Extract only Persian text from mixed content"""
        if not text:
            return ""
        
        # Pattern to match Persian characters and common punctuation
        persian_pattern = r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s،؛؟!.()"\'-]+'
        
        persian_parts = re.findall(persian_pattern, text)
        return ' '.join(persian_parts).strip()
    
    def detect_language(self, text: str) -> str:
        """Detect if text is primarily Persian or not"""
        if not text:
            return "unknown"
        
        # Count Persian characters
        persian_chars = len(re.findall(r'[\u0600-\u06FF]', text))
        total_chars = len(re.findall(r'[^\s\W]', text))
        
        if total_chars == 0:
            return "unknown"
        
        persian_ratio = persian_chars / total_chars
        
        if persian_ratio > 0.5:
            return "persian"
        elif persian_ratio > 0.1:
            return "mixed"
        else:
            return "non-persian"
    
    def convert_numbers_to_persian(self, text: str) -> str:
        """Convert English numbers to Persian"""
        if PERSIAN_TOOLS_AVAILABLE:
            return digits.to_persian(text)
        else:
            # Basic fallback conversion
            conversion_map = {
                '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴',
                '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹'
            }
            for eng, per in conversion_map.items():
                text = text.replace(eng, per)
            return text
    
    def convert_numbers_to_english(self, text: str) -> str:
        """Convert Persian numbers to English"""
        if PERSIAN_TOOLS_AVAILABLE:
            return digits.to_english(text)
        else:
            # Basic fallback conversion
            conversion_map = {
                '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
                '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
            }
            for per, eng in conversion_map.items():
                text = text.replace(per, eng)
            return text
    
    def extract_football_terms(self, text: str) -> List[str]:
        """Extract football-related terms from Persian text"""
        football_terms = [
            'فوتبال', 'بازیکن', 'مربی', 'تیم', 'لیگ', 'جام', 'مسابقه', 'دیدار',
            'گل', 'پاس', 'دروازه', 'دروازه‌بان', 'مهاجم', 'مدافع', 'هافبک',
            'کاپیتان', 'قهرمان', 'قهرمانی', 'صعود', 'سقوط', 'انتقال', 'کارت',
            'پنالتی', 'کرنر', 'اوت', 'داور', 'خط', 'زمین', 'استادیوم', 'تماشاگر',
            'هوادار', 'کنفدراسیون', 'فدراسیون', 'باشگاه', 'اردو', 'تمرین'
        ]
        
        found_terms = []
        words = self.tokenize_words(text.lower())
        
        for term in football_terms:
            if term in words:
                found_terms.append(term)
        
        return found_terms
    
    def process_article_text(self, title: str, content: str) -> Dict[str, Any]:
        """Process article title and content comprehensively"""
        result = {
            'title': {
                'original': title,
                'cleaned': self.clean_text(title),
                'words': [],
                'language': 'unknown',
                'football_terms': []
            },
            'content': {
                'original': content,
                'cleaned': self.clean_text(content),
                'words': [],
                'sentences': [],
                'language': 'unknown',
                'football_terms': []
            },
            'combined': {
                'all_words': [],
                'unique_words': [],
                'football_terms': [],
                'persian_ratio': 0.0
            }
        }
        
        try:
            # Process title
            title_cleaned = result['title']['cleaned']
            result['title']['words'] = self.tokenize_words(title_cleaned)
            result['title']['language'] = self.detect_language(title_cleaned)
            result['title']['football_terms'] = self.extract_football_terms(title_cleaned)
            
            # Process content
            content_cleaned = result['content']['cleaned']
            result['content']['words'] = self.tokenize_words(content_cleaned)
            result['content']['sentences'] = self.tokenize_sentences(content_cleaned)
            result['content']['language'] = self.detect_language(content_cleaned)
            result['content']['football_terms'] = self.extract_football_terms(content_cleaned)
            
            # Combined analysis
            all_words = result['title']['words'] + result['content']['words']
            result['combined']['all_words'] = all_words
            result['combined']['unique_words'] = list(set(all_words))
            result['combined']['football_terms'] = list(set(
                result['title']['football_terms'] + result['content']['football_terms']
            ))
            
            # Calculate Persian ratio
            all_text = title_cleaned + ' ' + content_cleaned
            if all_text.strip():
                persian_chars = len(re.findall(r'[\u0600-\u06FF]', all_text))
                total_chars = len(re.findall(r'[^\s\W]', all_text))
                result['combined']['persian_ratio'] = persian_chars / total_chars if total_chars > 0 else 0
            
            return result
            
        except Exception as e:
            logger.error(f"Error processing article text: {str(e)}")
            return result
    
    def get_text_statistics(self, text: str) -> Dict[str, Any]:
        """Get comprehensive statistics about the text"""
        if not text:
            return {
                'character_count': 0,
                'word_count': 0,
                'sentence_count': 0,
                'persian_character_count': 0,
                'persian_ratio': 0.0,
                'language': 'unknown'
            }
        
        words = self.tokenize_words(text)
        sentences = self.tokenize_sentences(text)
        persian_chars = len(re.findall(r'[\u0600-\u06FF]', text))
        total_chars = len(re.findall(r'[^\s\W]', text))
        
        return {
            'character_count': len(text),
            'word_count': len(words),
            'sentence_count': len(sentences),
            'persian_character_count': persian_chars,
            'persian_ratio': persian_chars / total_chars if total_chars > 0 else 0,
            'language': self.detect_language(text)
        } 