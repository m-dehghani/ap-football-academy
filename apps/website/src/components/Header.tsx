import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'صفحه اصلی', href: '/' },
    { name: 'برنامه‌ها', href: '/programs' },
    { name: 'درباره ما', href: '/about' },
    { name: 'مربیان', href: '/coaches' },
    { name: 'اخبار', href: '/news' },
    { name: 'تماس', href: '/contact' },
  ];

  const isActive = (href: string) =>
    href === '/' ? router.pathname === '/' : router.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-sm">
      <a href="#main-content" className="skip-to-content">
        رفتن به محتوای اصلی
      </a>
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4 py-3 md:py-4">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-primary-600 to-primary-800 text-lg font-bold text-white shadow-md">
              AP
            </div>
            <div>
              <p className="text-base font-bold text-navy-900 leading-tight">
                آکادمی فوتبال
              </p>
              <p className="text-xs font-medium text-slate-500">
                AP Football Academy
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-primary-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" className="btn btn-outline px-4 py-2 text-sm">
              مشاوره رایگان
            </Link>
            <Link href="/register" className="btn btn-secondary px-5 py-2.5 text-sm">
              ثبت نام
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden rounded-xl border border-slate-200 p-2.5 text-slate-700 hover:bg-slate-50"
            aria-label="منوی اصلی"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-slate-200 lg:hidden"
            >
              <nav className="flex flex-col gap-1 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-lg px-4 py-3 font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-secondary mt-2 w-full text-center"
                >
                  ثبت نام
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
