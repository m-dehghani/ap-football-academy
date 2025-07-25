import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  TrophyIcon, 
  AcademicCapIcon, 
  HeartIcon,
  ClockIcon,
  StarIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const Features: React.FC = () => {
  const features = [
    {
      icon: TrophyIcon,
      title: 'مربیگری متخصص',
      description: 'مربیان دارای مدرک فیفا با تجربه حرفه‌ای که در توسعه استعدادهای جوان و مهارت‌های پیشرفته تخصص دارند.',
      color: 'from-accent-500 to-accent-600',
      bgColor: 'bg-accent-50',
      iconColor: 'text-accent-600',
      stats: '12+ مربی'
    },
    {
      icon: UserGroupIcon,
      title: 'محیط حمایتی',
      description: 'فضای مثبت و تشویق‌کننده طراحی شده برای ایجاد اعتماد به نفس و رشد بازیکنان در تمام سطوح.',
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'bg-secondary-50',
      iconColor: 'text-secondary-600',
      stats: 'تمام سنین'
    },
    {
      icon: AcademicCapIcon,
      title: 'برنامه‌های تخصصی',
      description: 'برنامه‌های آموزشی اختصاصی که نیازهای رشد جسمی و ذهنی خاص هر گروه سنی را پوشش می‌دهد.',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      stats: '4 برنامه'
    },
    {
      icon: SparklesIcon,
      title: 'تجهیزات مدرن',
      description: 'تجهیزات آموزشی پیشرفته و تکنولوژی فوتبال مدرن برای بهترین تجربه یادگیری.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      stats: 'سطح حرفه‌ای'
    },
    {
      icon: ShieldCheckIcon,
      title: 'امنیت و انضباط',
      description: 'محیط امن و منضبط با بالاترین استانداردهای ایمنی و پیشگیری جامع از آسیب‌ها.',
      color: 'from-navy-500 to-navy-600',
      bgColor: 'bg-navy-50',
      iconColor: 'text-navy-600',
      stats: '100% امن'
    },
    {
      icon: LightBulbIcon,
      title: 'توسعه شخصیت',
      description: 'تمرکز بر ایجاد شخصیت قوی، مهارت‌های رهبری و مسئولیت‌پذیری در کنار تعالی فوتبال.',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600',
      stats: 'مهارت‌های زندگی'
    }
  ];

  const stats = [
    { 
      number: '500+', 
      label: 'بازیکن فعال',
      icon: UserGroupIcon,
      color: 'text-secondary-600'
    },
    { 
      number: '98%', 
      label: 'میزان رضایت',
      icon: StarIcon,
      color: 'text-accent-600'
    },
    { 
      number: '10+', 
      label: 'سال تجربه',
      icon: ClockIcon,
      color: 'text-emerald-600'
    },
    { 
      number: '25+', 
      label: 'قهرمانی',
      icon: TrophyIcon,
      color: 'text-primary-600'
    },
  ];

  const additionalFeatures = [
    {
      icon: RocketLaunchIcon,
      title: 'Goal-Oriented Training',
      description: 'Structured programs designed to achieve specific objectives and measurable progress.'
    },
    {
      icon: HeartIcon,
      title: 'Individual Attention',
      description: 'Personalized coaching approach ensuring every player receives dedicated support.'
    },
    {
      icon: CogIcon,
      title: 'Team Spirit',
      description: 'Building collaboration and teamwork skills essential for success on and off the field.'
    },
    {
      icon: SparklesIcon,
      title: 'High Standards',
      description: 'International-level training standards that prepare players for competitive excellence.'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkYzI2MjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] animate-rotate-slow"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-600 text-sm font-medium">
              <SparklesIcon className="w-4 h-4 mr-2" />
              چرا آکادمی AP
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 text-balance">
              چرا <span className="gradient-text">آکادمی فوتبال AP</span> را انتخاب کنیم؟
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto text-pretty">
              ما آموزش جامع فوتبال را با مربیان متخصص، امکانات مدرن و محیط حمایتی ارائه می‌دهیم که برای کمک به بازیکنان جهت رسیدن به حداکثر پتانسیل خود طراحی شده است.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="card-glass p-8 h-full hover:shadow-elegant-xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <span className="text-sm font-medium text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                      {feature.stats}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-20"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-4xl p-8 md:p-12 text-white shadow-elegant-xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Our Achievement Story
              </h3>
              <p className="text-primary-100 max-w-2xl mx-auto text-lg">
                Numbers that speak to our commitment to excellence and player development
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-primary-100 text-sm md:text-base font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-video rounded-4xl overflow-hidden shadow-elegant-xl">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Football Training"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-4xl"></div>
              
              {/* Floating Stats */}
              <div className="absolute top-6 right-6 glass-card p-4 rounded-xl">
                <div className="text-2xl font-bold text-white">4.9/5</div>
                <div className="text-white/80 text-sm">Player Rating</div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
                  A Different Experience in Football Training
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  AP Football Academy combines scientific training methods with modern approaches to provide the best football education. From basic skills to professional preparation, every player can find their path to success.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {additionalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <feature.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <motion.a
                  href="/about"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center"
                >
                  Learn More About Us
                  <SparklesIcon className="w-5 h-5 ml-2" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-4xl p-12 border border-secondary-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Football Journey?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of players who have transformed their game with professional training and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Start Training Today
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                Schedule a Visit
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 