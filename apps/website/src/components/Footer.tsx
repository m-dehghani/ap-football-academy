import React from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  ArrowRightIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Instagram', url: '#', icon: '📸' },
    { name: 'Telegram', url: '#', icon: '💬' },
    { name: 'YouTube', url: '#', icon: '🎥' },
    { name: 'WhatsApp', url: '#', icon: '📱' },
  ];

  const quickLinks = [
    { name: 'درباره آکادمی', url: '/about' },
    { name: 'برنامه‌های آموزشی', url: '/programs' },
    { name: 'مربیان ما', url: '/coaches' },
    { name: 'داستان‌های موفقیت', url: '/success' },
    { name: 'اخبار و رویدادها', url: '/news' },
    { name: 'تماس با ما', url: '/contact' },
  ];

  const programs = [
    { name: 'برنامه کودکان (8-12)', url: '/programs#youth' },
    { name: 'برنامه نوجوانان (13-17)', url: '/programs#teen' },
    { name: 'برنامه بزرگسالان (18-25)', url: '/programs#adult' },
    { name: 'برنامه استادان (26-35)', url: '/programs#masters' },
  ];

  return (
    <footer className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-pattern-dots animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Enhanced Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-elegant-lg">
                  ⚽
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">آکادمی فوتبال AP</h3>
                  <p className="text-gray-400 font-medium">جایی که قهرمانان ساخته می‌شوند</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                ساخت آینده فوتبال از طریق آموزش حرفه‌ای، مربیگری کارآزموده و امکانات مدرن. به جامعه بازیکنان پرشور و مربیان متعهد ما بپیوندید.
              </p>

              {/* Enhanced Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <PhoneIcon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">+1 (555) 123-4567</p>
                    <p className="text-gray-400 text-sm">24 ساعته در دسترس</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <EnvelopeIcon className="w-6 h-6 text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">info@apfootball.com</p>
                    <p className="text-gray-400 text-sm">پاسخ سریع تضمینی</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <MapPinIcon className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">مرکز آموزش فوتبال</p>
                    <p className="text-gray-400 text-sm">مجموعه ورزشی مرکز شهر</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20 hover:border-white/30"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Enhanced Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center">
                <ArrowRightIcon className="w-5 h-5 mr-2 text-primary-400" />
                لینک‌های سریع
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group py-2"
                    >
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Programs */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center">
                <StarIcon className="w-5 h-5 mr-2 text-secondary-400" />
                برنامه‌های آموزشی
              </h4>
              <ul className="space-y-3">
                {programs.map((program, index) => (
                  <li key={index}>
                    <a
                      href={program.url}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group py-2"
                    >
                      <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {program.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Enhanced Training Hours */}
              <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h5 className="text-white font-semibold mb-4 flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2 text-accent-400" />
                  ساعات تمرین
                </h5>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">دوشنبه - جمعه</span>
                    <span className="text-white font-medium">16:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">شنبه</span>
                    <span className="text-white font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">یکشنبه</span>
                    <span className="text-white font-medium">10:00 - 16:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Newsletter Section */}
        <div className="border-t border-white/10">
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  از آخرین اخبار مطلع شوید
                </h3>
                <p className="text-gray-300 text-lg">
                  به‌روزرسانی‌های اختصاصی برنامه‌های آموزشی، رویدادها و داستان‌های موفقیت آکادمی ما را دریافت کنید.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="آدرس ایمیل خود را وارد کنید"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                />
                <button className="btn-primary bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800">
                  عضویت
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container-custom py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <p className="text-gray-400">
                  © {currentYear} آکادمی فوتبال AP. تمام حقوق محفوظ است.
                </p>
                <span className="text-gray-600">•</span>
                <p className="text-gray-400 flex items-center">
                  با <HeartIcon className="w-4 h-4 text-red-500 mx-1" /> برای فوتبال ساخته شده
                </p>
              </div>
              
              <div className="flex space-x-6">
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  حریم خصوصی
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  قوانین و مقررات
                </a>
                <a href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                  سیاست کوکی
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 