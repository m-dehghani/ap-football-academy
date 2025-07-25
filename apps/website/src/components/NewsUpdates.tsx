import { useState } from 'react';
import { CalendarDaysIcon, ClockIcon, UserGroupIcon, TrophyIcon, CameraIcon, PlayIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function NewsUpdates() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'همه اخبار', icon: '📰' },
    { id: 'matches', name: 'مسابقات', icon: '⚽' },
    { id: 'training', name: 'تمرینات', icon: '🏃' },
    { id: 'events', name: 'رویدادها', icon: '🎉' },
    { id: 'achievements', name: 'موفقیت‌ها', icon: '🏆' },
  ];

  const news = [
    {
      id: 1,
      title: 'قهرمانی تیم نوجوانان در مسابقات منطقه‌ای',
      excerpt: 'تیم نوجوانان آکادمی AP با نتیجه 3-1 در فینال مسابقات منطقه‌ای به قهرمانی رسید',
      content: 'در یک بازی پرهیجان، تیم نوجوانان آکادمی AP توانست با نمایش فوق‌العاده‌ای عنوان قهرمانی مسابقات منطقه‌ای را کسب کند. این قهرمانی اولین عنوان بزرگ آکادمی در سال 1402 محسوب می‌شود.',
      category: 'matches',
      date: '1402/08/15',
      author: 'مدیر آکادمی',
      image: '/api/placeholder/400/250',
      tags: ['قهرمانی', 'نوجوانان', 'مسابقات'],
      readTime: '3 دقیقه',
      likes: 156,
      comments: 23,
      type: 'news',
      featured: true
    },
    {
      id: 2,
      title: 'برگزاری کمپ تابستانی ویژه',
      excerpt: 'کمپ تابستانی آکادمی AP با حضور مربیان برتر و برنامه‌های متنوع آغاز شد',
      content: 'کمپ تابستانی امسال با حضور بیش از 100 کودک و نوجوان برگزار شد. این کمپ شامل تمرینات فنی، بازی‌های تفریحی و اردوی یک روزه بود.',
      category: 'events',
      date: '1402/08/10',
      author: 'تیم اجرایی',
      image: '/api/placeholder/400/250',
      tags: ['کمپ تابستانی', 'کودکان', 'تفریح'],
      readTime: '2 دقیقه',
      likes: 89,
      comments: 12,
      type: 'news',
      featured: false
    },
    {
      id: 3,
      title: 'ویدئو: تمرینات جدید آمادگی جسمانی',
      excerpt: 'آشنایی با تمرینات جدید آمادگی جسمانی که در آکادمی AP استفاده می‌شود',
      content: 'در این ویدئو، مربی آمادگی جسمانی آکادمی روش‌های نوین تمرینات قدرتی و هوازی را معرفی می‌کند.',
      category: 'training',
      date: '1402/08/08',
      author: 'حسن میرزایی',
      image: '/api/placeholder/400/250',
      tags: ['آمادگی جسمانی', 'تمرین', 'ویدئو'],
      readTime: '5 دقیقه',
      likes: 234,
      comments: 45,
      type: 'video',
      featured: true
    },
    {
      id: 4,
      title: 'دستاورد جدید: انتقال بازیکن به لیگ برتر',
      excerpt: 'علی نوری، فارغ‌التحصیل آکادمی AP، به تیم جوانان استقلال پیوست',
      content: 'علی نوری که 4 سال در آکادمی AP تمرین کرده بود، امروز قراردادش با تیم جوانان باشگاه استقلال را امضا کرد.',
      category: 'achievements',
      date: '1402/08/05',
      author: 'خبرنگار ورزشی',
      image: '/api/placeholder/400/250',
      tags: ['انتقال', 'لیگ برتر', 'موفقیت'],
      readTime: '4 دقیقه',
      likes: 312,
      comments: 67,
      type: 'news',
      featured: true
    },
    {
      id: 5,
      title: 'گالری تصاویر: جشن قهرمانی',
      excerpt: 'تصاویر جشن قهرمانی تیم نوجوانان آکادمی AP',
      content: 'مجموعه‌ای از بهترین تصاویر جشن قهرمانی تیم نوجوانان در حضور خانواده‌ها و مربیان.',
      category: 'events',
      date: '1402/08/03',
      author: 'عکاس آکادمی',
      image: '/api/placeholder/400/250',
      tags: ['جشن', 'تصاویر', 'قهرمانی'],
      readTime: '1 دقیقه',
      likes: 198,
      comments: 34,
      type: 'gallery',
      featured: false
    },
    {
      id: 6,
      title: 'معرفی مربی جدید: احمد صالحی',
      excerpt: 'احمد صالحی، مربی سابق تیم ملی جوانان، به تیم مربیگری AP پیوست',
      content: 'احمد صالحی با 20 سال تجربه مربیگری در تیم‌های مختلف، مسئولیت آموزش برنامه بزرگسالان را بر عهده خواهد داشت.',
      category: 'training',
      date: '1402/08/01',
      author: 'مدیر آکادمی',
      image: '/api/placeholder/400/250',
      tags: ['مربی جدید', 'تیم ملی', 'بزرگسالان'],
      readTime: '3 دقیقه',
      likes: 145,
      comments: 28,
      type: 'news',
      featured: false
    }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const featuredNews = news.filter(item => item.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayIcon className="w-5 h-5" />;
      case 'gallery': return <CameraIcon className="w-5 h-5" />;
      default: return <CalendarDaysIcon className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-500';
      case 'gallery': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 to-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-navy-100 text-navy-600 text-sm font-medium mb-4">
            <CalendarDaysIcon className="w-4 h-4 ml-2" />
            اخبار و رویدادها
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            آخرین <span className="text-navy-600">اخبار</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            از آخرین اخبار، رویدادها و دستاوردهای آکادمی AP مطلع شوید
          </p>
        </div>

        {/* Featured News */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">اخبار ویژه</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.slice(0, 2).map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="h-64 bg-gradient-to-r from-navy-500 to-navy-600 flex items-center justify-center">
                    <div className="text-white text-6xl">📰</div>
                  </div>
                  <div className={`absolute top-4 right-4 ${getTypeColor(item.type)} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
                    {getTypeIcon(item.type)}
                    <span className="mr-1">{item.type === 'video' ? 'ویدئو' : item.type === 'gallery' ? 'گالری' : 'خبر'}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="w-4 h-4 ml-1" />
                      {item.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <UserGroupIcon className="w-4 h-4 ml-1" />
                      {item.author}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                      <span>👍 {item.likes}</span>
                      <span>💬 {item.comments}</span>
                      <span>⏱️ {item.readTime}</span>
                    </div>
                    <button className="text-navy-600 hover:text-navy-700 font-medium flex items-center">
                      ادامه مطلب
                      <ArrowRightIcon className="w-4 h-4 mr-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-navy-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span className="ml-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-gray-400 text-4xl">
                    {item.type === 'video' ? '🎥' : item.type === 'gallery' ? '📸' : '📰'}
                  </div>
                </div>
                <div className={`absolute top-4 right-4 ${getTypeColor(item.type)} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
                  {getTypeIcon(item.type)}
                  <span className="mr-1">{item.type === 'video' ? 'ویدئو' : item.type === 'gallery' ? 'گالری' : 'خبر'}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-navy-600 font-medium">{item.date}</span>
                  <span className="text-xs text-gray-500">{item.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-navy-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{item.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-500">
                    <span>👍 {item.likes}</span>
                    <span>💬 {item.comments}</span>
                  </div>
                  <button className="text-navy-600 hover:text-navy-700 font-medium text-sm flex items-center">
                    بیشتر
                    <ArrowRightIcon className="w-4 h-4 mr-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-navy-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-navy-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            مشاهده اخبار بیشتر
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-navy-600 to-navy-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">از اخبار آکادمی مطلع شوید</h3>
          <p className="text-navy-100 mb-6 max-w-2xl mx-auto">
            برای دریافت آخرین اخبار، رویدادها و دستاوردهای آکادمی AP ایمیل خود را وارد کنید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="آدرس ایمیل شما"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-400"
            />
            <button className="bg-white text-navy-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">
              عضویت
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 