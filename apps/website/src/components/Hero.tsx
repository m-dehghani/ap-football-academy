import { useState, useEffect } from 'react';
import { ChevronRightIcon, TrophyIcon, StarIcon, UsersIcon, PlayIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const slides = [
    {
      title: "آکادمی فوتبال AP",
      subtitle: "جایی که قهرمانان ساخته می‌شوند",
      description: "اشتیاق خود را به تعالی تبدیل کنید با آموزش حرفه‌ای، مربیان کارآزموده و امکانات درجه یک که برای بالا بردن سطح بازی شما طراحی شده‌اند.",
      cta: "سفر خود را شروع کنید",
      ctaSecondary: "داستان ما را ببینید",
      bgGradient: "from-navy-900 via-primary-800 to-primary-700",
      stats: { players: "500+", championships: "25+", experience: "10+" }
    },
    {
      title: "مربیگری متخصص",
      subtitle: "از بهترین‌ها بیاموزید",
      description: "مربیان دارای مدرک فیفا ما دهه‌ها تجربه حرفه‌ای دارند تا به شما در تسلط بر تمام جنبه‌های فوتبال زیبا با برنامه‌های آموزشی شخصی‌سازی شده کمک کنند.",
      cta: "مربیان ما را بشناسید",
      ctaSecondary: "برنامه‌ها را ببینید",
      bgGradient: "from-navy-900 via-secondary-800 to-secondary-700",
      stats: { coaches: "12+", certifications: "FIFA", rating: "4.9/5" }
    },
    {
      title: "امکانات مدرن",
      subtitle: "مثل حرفه‌ای‌ها تمرین کنید",
      description: "زمین‌های تمرین پیشرفته، زمین‌های استاندارد فیفا و تجهیزات مدرن برای بهینه‌سازی رشد و عملکرد بازیکنان.",
      cta: "بازدید کنید",
      ctaSecondary: "رزرو تمرین",
      bgGradient: "from-navy-900 via-accent-800 to-accent-700",
      stats: { facilities: "3", pitches: "FIFA", equipment: "Pro" }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const achievements = [
    { icon: TrophyIcon, number: "25+", label: "قهرمانی کسب شده", color: "text-gold-400", bg: "bg-gold-400/20" },
    { icon: StarIcon, number: "500+", label: "بازیکن آموزش دیده", color: "text-secondary-400", bg: "bg-secondary-400/20" },
    { icon: UsersIcon, number: "10+", label: "سال تجربه", color: "text-accent-400", bg: "bg-accent-400/20" },
  ];

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.bgGradient} transition-all duration-1000`}>
        {/* Modern Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-30 animate-gradient-shift"></div>
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white/20 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 border-2 border-white/30 rounded-full animate-float"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 border border-white/20 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-white/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Professional Grid Pattern */}
        <div className="absolute inset-0 bg-pattern-grid opacity-5"></div>
        
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-screen py-20">
            
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              
              {/* Professional Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full glass-card text-white text-sm font-medium animate-scale-in">
                <TrophyIcon className="w-5 h-5 mr-2 text-gold-400" />
                آکادمی فوتبال درجه یک
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-white leading-tight animate-fade-in">
                  {currentSlideData.title}
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-white/90 animate-fade-in">
                  {currentSlideData.subtitle}
                </h2>
              </div>
              
              {/* Enhanced Description */}
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in">
                {currentSlideData.description}
              </p>

              {/* Modern CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in">
                <button className="group btn-primary bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white shadow-elegant-xl">
                  <span className="flex items-center">
                    {currentSlideData.cta}
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button 
                  className="group btn-glass border-2 border-white/30 hover:border-white/50"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <PlayIcon className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                  {currentSlideData.ctaSecondary}
                </button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in">
                {Object.entries(currentSlideData.stats).map(([key, value], index) => (
                  <div key={key} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-2 animate-scale-in">
                      {value}
                    </div>
                    <div className="text-sm sm:text-base text-white/70 capitalize font-medium">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Enhancement */}
            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Main Professional Circle */}
                <div className="w-96 h-96 xl:w-112 xl:h-112 rounded-full glass-card flex items-center justify-center mx-auto animate-float">
                  <div className="w-80 h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl xl:text-9xl mb-6 animate-bounce-slow">⚽</div>
                      <div className="text-white font-display font-bold text-2xl xl:text-3xl mb-2">آکادمی AP</div>
                      <div className="text-white/80 text-lg xl:text-xl">تعالی از سال 1393</div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Floating Achievement Cards */}
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`absolute ${
                      index === 0 ? 'top-8 -right-8' : 
                      index === 1 ? 'bottom-8 -left-8' : 
                      'top-1/2 -right-16 transform -translate-y-1/2'
                    } glass-card p-6 rounded-2xl shadow-elegant-lg animate-float`}
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl ${achievement.bg} flex items-center justify-center`}>
                        <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{achievement.number}</div>
                        <div className="text-white/80 text-sm font-medium">{achievement.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modern Slide Indicators */}
          <div className="flex justify-center items-center space-x-3 pb-8 animate-fade-in">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 h-3 bg-white rounded-full shadow-lg' 
                    : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Professional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/75 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Enhanced Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-elegant-2xl">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="AP Football Academy Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
} 