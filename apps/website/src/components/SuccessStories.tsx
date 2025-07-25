import { useState } from 'react';
import { TrophyIcon, StarIcon, AcademicCapIcon, ArrowTrendingUpIcon, UserIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function SuccessStories() {
  const [activeTab, setActiveTab] = useState('achievements');

  const achievements = [
    {
      id: 1,
      playerName: 'امیر رضایی',
      age: 19,
      achievement: 'انتقال به باشگاه پرسپولیس',
      description: 'پس از 4 سال تمرین در آکادمی AP، امیر موفق به عضویت در تیم جوانان پرسپولیس شد',
      image: '/api/placeholder/150/150',
      date: '1402/06/15',
      program: 'برنامه نوجوانان',
      coach: 'علی احمدی',
      quote: 'آکادمی AP پایه و اساس موفقیت من بود. مربیان فوق‌العاده‌ای داشتم.',
      stats: {
        goals: 45,
        assists: 23,
        matches: 67
      }
    },
    {
      id: 2,
      playerName: 'محمد حسینی',
      age: 17,
      achievement: 'قهرمان لیگ جوانان تهران',
      description: 'کاپیتان تیم جوانان که آکادمی را به قهرمانی رساند',
      image: '/api/placeholder/150/150',
      date: '1402/05/20',
      program: 'برنامه نوجوانان',
      coach: 'محمد کریمی',
      quote: 'تیم‌ما مثل یک خانواده بود. هر روز با انگیزه به تمرین می‌آمدیم.',
      stats: {
        goals: 38,
        assists: 31,
        matches: 52
      }
    },
    {
      id: 3,
      playerName: 'علی نوری',
      age: 16,
      achievement: 'دعوت به تیم ملی جوانان',
      description: 'اولین بازیکن آکادمی که به تیم ملی جوانان دعوت شد',
      image: '/api/placeholder/150/150',
      date: '1402/04/10',
      program: 'برنامه نوجوانان',
      coach: 'علی احمدی',
      quote: 'رویای هر پسر ایرانی بازی برای تیم ملی است. آکادمی این رویا را محقق کرد.',
      stats: {
        goals: 52,
        assists: 19,
        matches: 48
      }
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'احمد کریمی',
      role: 'بازیکن سابق',
      program: 'برنامه بزرگسالان',
      rating: 5,
      text: 'بهترین آکادمی فوتبال که تا به حال دیدم. مربیان فوق‌العاده و امکانات عالی. پس از 6 ماه تمرین، سطح بازی‌ام به طور قابل توجهی بهبود یافت.',
      image: '/api/placeholder/60/60',
      date: '1402/07/12',
      improvement: '+40% مهارت فنی'
    },
    {
      id: 2,
      name: 'حسن احمدی',
      role: 'والد دانش‌آموز',
      program: 'برنامه کودکان',
      rating: 5,
      text: 'پسرم در آکادمی AP نه تنها فوتبال یاد گرفت بلکه اعتماد به نفس و روحیه تیمی پیدا کرد. مربیان بسیار صبور و حرفه‌ای هستند.',
      image: '/api/placeholder/60/60',
      date: '1402/06/25',
      improvement: '+60% اعتماد به نفس'
    },
    {
      id: 3,
      name: 'رضا میرزایی',
      role: 'بازیکن فعال',
      program: 'برنامه استادان',
      rating: 5,
      text: 'در سن 28 سالگی فکر می‌کردم دیگر نمی‌توانم مهارت‌هایم را بهبود دهم. اما آکادمی AP ثابت کرد که هرگز دیر نیست.',
      image: '/api/placeholder/60/60',
      date: '1402/05/30',
      improvement: '+25% آمادگی جسمانی'
    }
  ];

  const statistics = [
    {
      number: '95%',
      label: 'بازیکنان موفق',
      description: 'از دانش‌آموزان ما به سطح بالاتری رسیدند',
      icon: TrophyIcon,
      color: 'text-yellow-600'
    },
    {
      number: '15+',
      label: 'انتقال به باشگاه',
      description: 'بازیکن به باشگاه‌های حرفه‌ای پیوستند',
      icon: ArrowTrendingUpIcon,
      color: 'text-green-600'
    },
    {
      number: '3',
      label: 'تیم ملی',
      description: 'بازیکن به تیم‌های ملی دعوت شدند',
      icon: StarIcon,
      color: 'text-blue-600'
    },
    {
      number: '25+',
      label: 'قهرمانی',
      description: 'عنوان قهرمانی در مسابقات مختلف',
      icon: TrophyIcon,
      color: 'text-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium mb-4">
            <TrophyIcon className="w-4 h-4 ml-2" />
            داستان‌های موفقیت
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            افتخارات <span className="text-emerald-600">دانش‌آموزان</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            بازیکنان ما در مسیر رسیدن به اهدافشان موفقیت‌های بزرگی کسب کرده‌اند
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'achievements'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              دستاوردهای بزرگ
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'testimonials'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              نظرات و تجربیات
            </button>
            <button
              onClick={() => setActiveTab('statistics')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'statistics'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              آمار موفقیت
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <TrophyIcon className="w-8 h-8" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm opacity-90">{achievement.date}</div>
                      <div className="text-xs opacity-75">{achievement.program}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{achievement.playerName}</h3>
                  <p className="text-emerald-100 text-sm">{achievement.age} ساله</p>
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{achievement.achievement}</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">{achievement.description}</p>
                  
                                     {/* Quote */}
                   <div className="bg-gray-50 rounded-lg p-4 mb-4">
                     <ChatBubbleLeftRightIcon className="w-6 h-6 text-emerald-600 mb-2" />
                     <p className="text-gray-700 italic text-sm">{achievement.quote}</p>
                   </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-600">{achievement.stats.goals}</div>
                      <div className="text-xs text-gray-500">گل</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-600">{achievement.stats.assists}</div>
                      <div className="text-xs text-gray-500">پاس گل</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-600">{achievement.stats.matches}</div>
                      <div className="text-xs text-gray-500">بازی</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 border-t pt-4">
                    مربی: {achievement.coach}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold ml-4">
                    {testimonial.name.split(' ')[0].charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-emerald-600">{testimonial.program}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </blockquote>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{testimonial.date}</span>
                  <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">
                    {testimonial.improvement}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'statistics' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {statistics.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                  <div className="mb-6">
                    <div className={`w-16 h-16 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</div>
                    <p className="text-sm text-gray-600">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Success Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">مسیر موفقیت آکادمی AP</h3>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200"></div>
                <div className="space-y-12">
                  {[
                    { year: '1399', event: 'تأسیس آکادمی', description: 'شروع فعالیت با 20 دانش‌آموز' },
                    { year: '1400', event: 'اولین قهرمانی', description: 'قهرمانی در لیگ جوانان منطقه' },
                    { year: '1401', event: 'گسترش فعالیت', description: 'افزایش ظرفیت به 200 دانش‌آموز' },
                    { year: '1402', event: 'موفقیت‌های بزرگ', description: 'انتقال اولین بازیکن به لیگ برتر' },
                  ].map((milestone, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-1 text-right ml-8">
                        <div className="bg-emerald-50 rounded-lg p-4">
                          <h4 className="font-bold text-emerald-600 mb-2">{milestone.event}</h4>
                          <p className="text-gray-600 text-sm">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {milestone.year}
                      </div>
                      <div className="flex-1 mr-8"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 