import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrophyIcon,
  StarIcon,
  UsersIcon,
  PlayIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

const statLabels: Record<string, string> = {
  players: 'بازیکن آموزش‌دیده',
  championships: 'قهرمانی',
  experience: 'سال تجربه',
  coaches: 'مربی متخصص',
  certifications: 'مدرک بین‌المللی',
  rating: 'امتیاز رضایت',
  facilities: 'مجموعه ورزشی',
  pitches: 'زمین استاندارد',
  equipment: 'تجهیزات حرفه‌ای',
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const slides = [
    {
      title: 'آکادمی فوتبال AP',
      subtitle: 'جایی که قهرمانان ساخته می‌شوند',
      description:
        'اشتیاق خود را به تعالی تبدیل کنید — آموزش حرفه‌ای، مربیان کارآزموده و امکانات درجه یک برای بالا بردن سطح بازی شما.',
      cta: { label: 'شروع ثبت نام', href: '/register' },
      ctaSecondary: { label: 'داستان ما', href: '/about' },
      bgGradient: 'from-navy-950 via-blue-900 to-blue-700',
      stats: { players: '۵۰۰+', championships: '۲۵+', experience: '۱۰+' },
    },
    {
      title: 'مربیگری متخصص',
      subtitle: 'از بهترین‌ها بیاموزید',
      description:
        'مربیان دارای مدرک فیفا با دهه‌ها تجربه حرفه‌ای — برنامه‌های آموزشی شخصی‌سازی‌شده برای تسلط بر تمام جنبه‌های فوتبال.',
      cta: { label: 'مربیان ما', href: '/coaches' },
      ctaSecondary: { label: 'برنامه‌ها', href: '/programs' },
      bgGradient: 'from-navy-950 via-secondary-900 to-secondary-700',
      stats: { coaches: '۱۲+', certifications: 'فیفا', rating: '۴.۹/۵' },
    },
    {
      title: 'امکانات مدرن',
      subtitle: 'مثل حرفه‌ای‌ها تمرین کنید',
      description:
        'زمین‌های تمرین پیشرفته، چمن استاندارد فیفا و تجهیزات مدرن برای بهینه‌سازی رشد و عملکرد بازیکنان.',
      cta: { label: 'تماس با ما', href: '/contact' },
      ctaSecondary: { label: 'ثبت نام', href: '/register' },
      bgGradient: 'from-navy-950 via-accent-900 to-accent-700',
      stats: { facilities: '۳', pitches: 'فیفا', equipment: 'حرفه‌ای' },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const achievements = [
    {
      icon: TrophyIcon,
      number: '۲۵+',
      label: 'قهرمانی',
      color: 'text-gold-400',
      bg: 'bg-gold-400/20',
      position: 'top-6 -left-6',
    },
    {
      icon: StarIcon,
      number: '۵۰۰+',
      label: 'بازیکن',
      color: 'text-secondary-300',
      bg: 'bg-secondary-400/20',
      position: 'bottom-8 -right-4',
    },
    {
      icon: UsersIcon,
      number: '۱۰+',
      label: 'سال تجربه',
      color: 'text-accent-300',
      bg: 'bg-accent-400/20',
      position: 'top-1/2 -left-10 -translate-y-1/2',
    },
  ];

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div
        className={`absolute inset-0 bg-linear-to-br ${currentSlideData.bgGradient} transition-all duration-1000`}
      >
        <div className="absolute inset-0 bg-gradient-mesh opacity-40 animate-gradient-shift" />
        <div className="absolute inset-0 bg-pattern-grid opacity-20" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-10 w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center min-h-[80vh] py-16 md:py-20">
            <div className="text-center lg:text-right space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <TrophyIcon className="h-5 w-5 text-gold-400" />
                آکادمی فوتبال درجه یک
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight text-balance">
                  {currentSlideData.title}
                </h1>
                <p className="text-xl sm:text-3xl font-semibold text-white text-balance">
                  {currentSlideData.subtitle}
                </p>
              </div>

              <p className="text-base sm:text-lg text-white/95 max-w-xl mx-auto lg:mx-0 lg:ms-0 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                {currentSlideData.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href={currentSlideData.cta.href}
                  className="btn-secondary shadow-elegant-lg"
                >
                  {currentSlideData.cta.label}
                  <ArrowLeftIcon className="h-5 w-5" />
                </Link>
                <Link
                  href={currentSlideData.ctaSecondary.href}
                  className="btn-glass"
                >
                  <PlayIcon className="h-5 w-5" />
                  {currentSlideData.ctaSecondary.label}
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg mx-auto lg:mx-0">
                {Object.entries(currentSlideData.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-white/15 bg-white/10 px-3 py-4 text-center backdrop-blur-sm"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-white persian-numbers mb-1">
                      {value}
                    </div>
                    <div className="text-xs sm:text-sm text-white/75 font-medium">
                      {statLabels[key] ?? key}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative mx-auto w-full max-w-md">
                <div className="aspect-square rounded-full border border-white/20 bg-white/10 p-6 shadow-elegant-2xl backdrop-blur-md animate-float">
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-linear-to-br from-white/20 to-white/5 text-center">
                    <span className="text-7xl xl:text-8xl mb-4">⚽</span>
                    <p className="text-2xl font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">آکادمی AP</p>
                    <p className="text-white/90 mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">تعالی از سال ۱۳۹۳</p>
                  </div>
                </div>

                {achievements.map((item, index) => (
                  <div
                    key={index}
                    className={`absolute ${item.position} glass-card rounded-2xl p-4 shadow-elegant-lg animate-float min-w-[140px]`}
                    style={{ animationDelay: `${index * 0.4}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg}`}
                      >
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-navy-900 persian-numbers drop-shadow-sm">
                          {item.number}
                        </p>
                        <p className="text-xs text-slate-600 drop-shadow-sm">{item.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 pb-10">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`اسلاید ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${index === currentSlide
                  ? 'w-8 h-2.5 bg-white'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-elegant-2xl">
            <button
              type="button"
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
              aria-label="بستن ویدئو"
            >
              ✕
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="معرفی آکادمی فوتبال AP"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
