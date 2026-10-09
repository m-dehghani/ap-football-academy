import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrophyIcon,
  PlayIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { getIcon } from '@/lib/icons';
import {
  HERO_SLIDES,
  HERO_ACHIEVEMENTS,
  STAT_LABELS,
} from '@/constants/content';

// Particle System Component
function ParticleSystem({ particleCount = 30, colors = ['#0ea5e9', '#f97316', '#22c55e'] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number; 
    radius: number; color: string; opacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [particleCount, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);

  const slides = HERO_SLIDES;
  const achievements = HERO_ACHIEVEMENTS;
  const statLabels = STAT_LABELS;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];

  // Trigger stat animations when slide changes
  useEffect(() => {
      const timer = setTimeout(() => {
        setStatsAnimated(false);
        setTimeout(() => setStatsAnimated(true), 100);
      }, 0);
      return () => clearTimeout(timer);
    }, [currentSlide]);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden" aria-labelledby="hero-title">
      {/* Enhanced Background with Particles */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${currentSlideData.bgGradient} transition-all duration-1000`}
      >
        <div className="absolute inset-0 bg-gradient-mesh opacity-40 animate-gradient-shift" />
        <div className="absolute inset-0 bg-pattern-grid opacity-20" />
        <div className="absolute inset-0 bg-black/25" />
        <ParticleSystem 
          particleCount={40}
          colors={['rgba(14,165,233,0.6)', 'rgba(249,115,22,0.6)', 'rgba(34,197,94,0.6)']}
        />
      </div>

      <div className="relative z-10 w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center min-h-[80vh] py-16 md:py-20">
            <div className="text-center lg:text-right space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  <TrophyIcon className="h-5 w-5 text-gold-400" />
                  آکادمی فوتبال درجه یک
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="space-y-4">
                  <h1 
                    id="hero-title"
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight text-balance"
                  >
                    {currentSlideData.title}
                  </h1>
                  <p className="text-xl sm:text-3xl font-semibold text-white text-balance">
                    {currentSlideData.subtitle}
                  </p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-white/95 max-w-xl mx-auto lg:mx-0 lg:ms-0 leading-relaxed drop-shadow-lg"
              >
                {currentSlideData.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <Link
                  href={currentSlideData.cta.href}
                  className="btn-secondary shadow-elegant-lg group"
                  aria-label={currentSlideData.cta.label}
                >
                  {currentSlideData.cta.label}
                  <ArrowLeftIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={currentSlideData.ctaSecondary.href}
                  className="btn-glass group"
                  aria-label={currentSlideData.ctaSecondary.label}
                >
                  <PlayIcon className="h-5 w-5" />
                  {currentSlideData.ctaSecondary.label}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-4 pt-4 max-w-lg mx-auto lg:mx-0"
              >
                {Object.entries(currentSlideData.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-white/15 bg-white/10 px-3 py-4 text-center backdrop-blur-sm group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-white persian-numbers mb-1">
                      {statsAnimated ? value : '0'}
                    </div>
                    <div className="text-xs sm:text-sm text-white/75 font-medium">
                      {statLabels[key] ?? key}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative mx-auto w-full max-w-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="aspect-square rounded-full border border-white/20 bg-white/10 p-6 shadow-elegant-2xl backdrop-blur-md animate-float"
                >
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-linear-to-br from-white/20 to-white/5 text-center">
                    <span className="text-7xl xl:text-8xl mb-4">⚽</span>
                    <p className="text-2xl font-bold text-white drop-shadow-lg">
                      آکادمی AP
                    </p>
                    <p className="text-white/90 mt-1 drop-shadow-lg">
                      تعالی از سال ۱۳۹۳
                    </p>
                  </div>
                </motion.div>

                {achievements.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                    className={`absolute ${item.position} glass-card rounded-2xl p-4 shadow-elegant-lg animate-float min-w-[140px]`}
                    style={{ animationDelay: `${index * 0.4}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg}`}
                      >
                        {getIcon(item.icon, `h-5 w-5 ${item.color}`)}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-navy-900 persian-numbers drop-shadow-sm">
                          {item.number}
                        </p>
                        <p className="text-xs text-slate-600 drop-shadow-sm">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center items-center gap-3 pb-10"
            role="tablist"
            aria-label="اسلایدهای هیرو"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`برو به اسلاید ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'w-8 h-3 bg-white'
                    : 'w-3 h-3 bg-white/40 hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-900'
                }`}
/>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="ویدئوی معرفی آکادمی"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-elegant-2xl"
            >
              <button
                type="button"
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}