import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const CTA: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="container-custom">
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              آماده شروع سفر فوتبال خود هستید؟
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              به بیش از ۵۰۰ بازیکن دیگر بپیوندید و مهارت‌های فوتبال خود را به سطح بعدی برسانید
            </p>
            <p className="text-lg text-primary-200 mb-12 max-w-3xl mx-auto">
              با مربیان حرفه‌ای، امکانات مدرن و برنامه‌های آموزشی جامع، آکادمی فوتبال AP 
              بهترین انتخاب برای شروع یا ادامه مسیر فوتبال شماست.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 space-x-reverse"
            >
              <span>همین حالا ثبت نام کنید</span>
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 backdrop-blur-sm border border-white/30"
            >
              مشاوره رایگان
            </motion.a>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <PhoneIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold text-white mb-1">تماس تلفنی</h3>
                <p className="text-primary-100 persian-numbers">۰۲۱-۱۲۳۴۵۶۷۸</p>
                <p className="text-primary-200 text-sm">شنبه تا چهارشنبه: ۸:۰۰ - ۲۲:۰۰</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <EnvelopeIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold text-white mb-1">ایمیل</h3>
                <p className="text-primary-100">info@ap-football.com</p>
                <p className="text-primary-200 text-sm">پاسخگویی در کمتر از ۲۴ ساعت</p>
              </div>
            </div>
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              چرا باید امروز شروع کنید؟
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">⚽</div>
                <h4 className="font-semibold text-white mb-2">تمرین رایگان</h4>
                <p className="text-primary-200 text-sm">
                  اولین جلسه تمرینی برای تمام اعضای جدید رایگان است
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">👥</div>
                <h4 className="font-semibold text-white mb-2">گروه‌های کوچک</h4>
                <p className="text-primary-200 text-sm">
                  حداکثر ۱۲ نفر در هر گروه برای بهترین کیفیت آموزش
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">🏆</div>
                <h4 className="font-semibold text-white mb-2">ضمانت نتیجه</h4>
                <p className="text-primary-200 text-sm">
                  اگر در ۳ ماه پیشرفت نکنید، پول شما برگردانده می‌شود
                </p>
              </div>
            </div>
          </motion.div>

          {/* Urgency Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 p-6 bg-secondary-500/20 rounded-xl border border-secondary-400/30"
          >
            <p className="text-secondary-100 font-semibold mb-2">
              🔥 پیشنهاد ویژه: تخفیف ۲۰% برای ثبت نام در این ماه
            </p>
            <p className="text-white text-sm">
              تعداد محدود! فقط ۱۰ جای خالی باقی مانده است.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 