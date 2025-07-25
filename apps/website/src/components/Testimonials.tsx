import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'احمد کریمی',
      role: 'پدر دانش آموز',
      content: 'فرزندم در این آکادمی مهارت‌هایش را به طور چشمگیری بهبود داده است. مربیان بسیار صبور و حرفه‌ای هستند.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5
    },
    {
      id: 2,
      name: 'علی احمدی',
      role: 'بازیکن ۱۶ ساله',
      content: 'محیط آکادمی فوق‌العاده است. تمرینات جذاب و چالش‌برانگیز هستند. احساس می‌کنم هر روز بهتر می‌شوم.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5
    },
    {
      id: 3,
      name: 'محمد نوری',
      role: 'بازیکن ۲۲ ساله',
      content: 'این آکادمی واقعاً تفاوت کرده است. من از سطح آماتور به سطح نیمه حرفه‌ای رسیده‌ام.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5
    },
    {
      id: 4,
      name: 'حسن محمدی',
      role: 'بازیکن ۲۸ ساله',
      content: 'بعد از سال‌ها دوری از فوتبال، این آکادمی کمک کرد تا دوباره آمادگی‌ام را بازیابم و لذت فوتبال را تجربه کنم.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5
    },
    {
      id: 5,
      name: 'رضا قادری',
      role: 'بازیکن ۱۴ ساله',
      content: 'مربیان اینجا واقعاً استعداد منو دیدند و کمک کردند تا مهارت‌هایم را پیشرفت بدم. خیلی خوشحالم.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5
    },
    {
      id: 6,
      name: 'سامان رضایی',
      role: 'بازیکن ۲۶ ساله',
      content: 'به عنوان یک بازیکن با تجربه، این آکادمی کمک کرد تا تکنیک‌هایم را ارتقا بدم و دوباره انگیزه پیدا کنم.',
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5
    }
  ];

  const stats = [
    { number: '۱۲۰+', label: 'بازیکن پسر فعال' },
    { number: '۹۸%', label: 'رضایت خانواده‌ها' },
    { number: '۱۵+', label: 'بازیکن به تیم‌های حرفه‌ای' },
    { number: '۵', label: 'مدال طلا در مسابقات' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              نظرات بازیکنان ما
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              داستان‌های واقعی از بازیکنان و والدین واقعی که تفاوت آکادمی ما را در 
              مسیر فوتبال خود تجربه کرده‌اند.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary-600 opacity-50" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ml-4"
                />
                <div className="text-right">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories Stats */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              داستان‌های موفقیت
            </h3>
            <p className="text-gray-600">
              بازیکنان ما به اهدافشان می‌رسند و انتظارات را پشت سر می‌گذارند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2 persian-numbers">۸۵%</div>
              <div className="text-gray-900 font-medium">پیشرفت مهارت</div>
              <div className="text-sm text-gray-500">طی ۶ ماه</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2 persian-numbers">۲۵+</div>
              <div className="text-gray-900 font-medium">بورسیه دانشگاهی</div>
              <div className="text-sm text-gray-500">در ۳ سال گذشته</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2 persian-numbers">۹۵%</div>
              <div className="text-gray-900 font-medium">رضایت والدین</div>
              <div className="text-sm text-gray-500">بطور مستمر</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2 persian-numbers">۱۵۰+</div>
              <div className="text-gray-900 font-medium">قهرمانی تورنمنت</div>
              <div className="text-sm text-gray-500">در تمام گروه‌های سنی</div>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              آماده نوشتن داستان موفقیت خود هستید؟
            </h3>
            <p className="text-primary-100 mb-6">
              به صدها بازیکن بپیوندید که بازی خود را در آکادمی فوتبال AP متحول کرده‌اند.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                سفر خود را شروع کنید
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 backdrop-blur-sm"
              >
                بازدید برنامه‌ریزی کنید
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 