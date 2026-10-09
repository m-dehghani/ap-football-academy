import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDaysIcon,
  ClockIcon,
  CameraIcon,
  PlayIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  BellIcon,
  CheckIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { NEWS_CATEGORIES, NEWS_ARTICLES } from '@/constants/content';

type NewsType = 'news' | 'video' | 'gallery';
type CategoryId = 'all' | string;

interface NewsArticle {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  type: NewsType;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  readTime: string;
  featured: boolean;
  image?: string;
}

interface Category {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
}

const getTypeIcon = (type: NewsType) => {
  switch (type) {
    case 'video': {
      return <PlayIcon className="w-5 h-5" />;
    }
    case 'gallery': {
      return <CameraIcon className="w-5 h-5" />;
    }
    default: {
      return <CalendarDaysIcon className="w-5 h-5" />;
    }
  }
};

const getTypeLabel = (type: NewsType) => {
  switch (type) {
    case 'video': {
      return 'ویدئو';
    }
    case 'gallery': {
      return 'گالری';
    }
    default: {
      return 'خبر';
    }
  }
};

const getTypeColor = (type: NewsType) => {
  switch (type) {
    case 'video': {
      return 'bg-red-600';
    }
    case 'gallery': {
      return 'bg-purple-600';
    }
    default: {
      return 'bg-blue-600';
    }
  }
};

const getTypeBgColor = (type: NewsType) => {
  switch (type) {
    case 'video': {
      return 'from-red-500 to-red-600';
    }
    case 'gallery': {
      return 'from-purple-500 to-purple-600';
    }
    default: {
      return 'from-blue-500 to-blue-600';
    }
  }
};

// Featured News Card
function FeaturedNewsCard({ article, index }: { article: NewsArticle; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <div className={`h-64 bg-linear-to-r ${getTypeBgColor(article.type as NewsType)} flex items-center justify-center relative overflow-hidden`}>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="relative z-10 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              {getTypeIcon(article.type as NewsType)}
            </motion.div>
          </div>
        </div>
        <div className={`absolute top-4 right-4 ${getTypeColor(article.type as NewsType)} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1`}>
          {getTypeIcon(article.type as NewsType)}
          <span>{getTypeLabel(article.type as NewsType)}</span>
        </div>
        {article.featured && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <StarIcon className="w-4 h-4 fill-current" />
            ویژه
          </div>
        )}
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span role="img" aria-label="لایک">👍</span>
              {article.likes}
            </span>
            <span className="flex items-center gap-1">
              <span role="img" aria-label="نظر">💬</span>
              {article.comments}
            </span>
          </div>
          <motion.button
            className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1"
            whileHover={{ x: 4 }}
            aria-label={`ادامه مطلب: ${article.title}`}
          >
            ادامه مطلب
            <ArrowRightIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// News Card Component
function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative">
        <div className={`h-48 bg-linear-to-br ${getTypeBgColor(article.type as NewsType)} flex items-center justify-center relative overflow-hidden`}>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="relative z-10 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              {getTypeIcon(article.type as NewsType)}
            </motion.div>
          </div>
        </div>
        <div className={`absolute top-4 right-4 ${getTypeColor(article.type as NewsType)} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1`}>
          {getTypeIcon(article.type as NewsType)}
          <span>{getTypeLabel(article.type as NewsType)}</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-primary-700 font-medium">{article.date}</span>
          <span className="text-xs text-gray-500">{article.readTime}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-600 line-clamp-3 text-sm">{article.excerpt}</p>

        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span role="img" aria-label="لایک">👍</span>
              {article.likes}
            </span>
            <span className="flex items-center gap-1">
              <span role="img" aria-label="نظر">💬</span>
              {article.comments}
            </span>
          </div>
          <motion.button
            className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1"
            whileHover={{ x: 4 }}
            aria-label={`ادامه مطلب: ${article.title}`}
          >
            بیشتر
            <ArrowRightIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Category Filter Component
function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: { 
  categories: Category[];
  selectedCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-3 mb-12"
      role="group"
      aria-label="دسته‌بندی اخبار"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
            selectedCategory === category.id
              ? 'bg-navy-700 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-pressed={selectedCategory === category.id}
        >
          <span aria-hidden="true">{category.icon}</span>
          {category.name}
        </motion.button>
      ))}
    </motion.div>
  );
}

// Newsletter Signup Component
function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('لطفاً یک ایمیل معتبر وارد کنید');
      return;
    }

    setStatus('loading');
    setMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStatus('success');
    setMessage('با موفقیت مشترک شدید! 🎉');
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-20 bg-linear-to-r from-navy-600 to-navy-700 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <BellIcon className="w-8 h-8" />
        </motion.div>

        <h3 className="text-2xl md:text-3xl font-bold mb-4">از اخبار آکادمی مطلع شوید</h3>
        <p className="text-navy-100 mb-8 text-lg">
          برای دریافت آخرین اخبار، رویدادها و دستاوردهای آکادمی AP ایمیل خود را وارد کنید
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="آدرس ایمیل شما"
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-12 py-4 pr-4 rounded-xl text-gray-900 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 disabled:opacity-50"
              aria-label="آدرس ایمیل برای اشتراک خبرنامه"
            />
          </div>
          <motion.button
            type="submit"
            disabled={status === 'loading' || status === 'success' || !email}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-navy-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                در حال پردازش...
              </>
            ) : status === 'success' ? (
              <>
                <CheckIcon className="w-5 h-5" />
                مشترک شدید
              </>
            ) : (
              'عضویت'
            )}
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 text-sm ${status === 'success' ? 'text-green-100' : 'text-red-100'}`}
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

// Load More Button Component
function LoadMoreButton({ onClick, hasMore }: { onClick: () => void; hasMore: boolean }) {
  if (!hasMore) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mt-12"
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(14, 165, 233, 0.4)' }}
        whileTap={{ scale: 0.98 }}
        className="bg-linear-to-r from-primary-600 to-primary-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
      >
        مشاهده اخبار بیشتر
        <ArrowRightIcon className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}

export default function NewsUpdates() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
    const [displayCount, setDisplayCount] = useState(6);

    const categories = [...NEWS_CATEGORIES] as Category[];
  const allNews = NEWS_ARTICLES as NewsArticle[];

  const featuredNews = allNews.filter((item) => item.featured);
  const regularNews = allNews.filter((item) => !item.featured);

  const filteredNews = selectedCategory === 'all'
    ? regularNews
    : regularNews.filter((item) => item.category === selectedCategory);

  const displayedNews = filteredNews.slice(0, displayCount);
  const hasMoreNews = displayedNews.length < filteredNews.length;

  const handleLoadMore = useCallback(() => {
      setTimeout(() => {
        setDisplayCount(prev => prev + 6);
      }, 500);
    }, []);

  return (
    <section className="py-20 bg-linear-to-br from-navy-50 to-navy-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-300 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-navy-100 text-navy-800 text-sm font-medium mb-4">
            <CalendarDaysIcon className="w-4 h-4 ml-2" />
            اخبار و رویدادها
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            آخرین <span className="text-navy-800">اخبار</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            از آخرین اخبار، رویدادها و دستاوردهای آکادمی AP مطلع شوید
          </p>
        </motion.div>

        {/* Featured News */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">اخبار ویژه</h3>
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {featuredNews.length} خبر ویژه
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.slice(0, 2).map((item, index) => (
              <FeaturedNewsCard key={item.id} article={item} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* News Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedNews.map((item, index) => (
              <NewsCard key={item.id} article={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {displayedNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 text-gray-500"
          >
            <MagnifyingGlassIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">هیچ خبری برای این دسته‌بندی یافت نشد</p>
          </motion.div>
        )}

        {/* Load More Button */}
        <LoadMoreButton onClick={handleLoadMore} hasMore={hasMoreNews} />

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </div>
    </section>
  );
}
