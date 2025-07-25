import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'صفحه اصلی', href: '/' },
    { name: 'برنامه‌ها', href: '/programs' },
    { name: 'درباره ما', href: '/about' },
    { name: 'مربیان', href: '/coaches' },
    { name: 'اخبار', href: '/news' },
    { name: 'تماس', href: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-elegant-lg sticky top-0 z-50 border-b border-white/20">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Enhanced Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 space-x-reverse"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-elegant-lg">
              <span className="text-white font-bold text-xl">AP</span>
            </div>
            <div className="text-right">
              <h1 className="text-xl font-bold text-navy-800">آکادمی فوتبال</h1>
              <p className="text-xs text-navy-600 font-medium">AP Football Academy</p>
            </div>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            {navigation.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-navy-700 hover:text-primary-600 font-medium transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-primary-50"
              >
                {item.name}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-700 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </motion.a>
            ))}
          </nav>

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-4 space-x-reverse"
          >
            <a
              href="/register"
              className="btn-primary bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white shadow-elegant-lg"
            >
              ثبت نام
            </a>
          </motion.div>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-xl hover:bg-navy-50 transition-all duration-300 border border-navy-200 hover:border-navy-300"
            aria-label="منوی اصلی"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-navy-700" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-navy-700" />
            )}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-navy-200 py-6 bg-white/95 backdrop-blur-lg"
          >
            <div className="flex flex-col space-y-4">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-navy-700 hover:text-primary-600 font-medium py-3 px-4 rounded-lg hover:bg-primary-50 transition-all duration-300 flex items-center group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="/register"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                className="btn-primary bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white text-center shadow-elegant-lg mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                ثبت نام
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header; 