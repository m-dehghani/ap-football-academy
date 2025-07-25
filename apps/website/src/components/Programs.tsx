import { useState } from 'react';
import { CalendarDaysIcon, UserGroupIcon, ClockIcon, TrophyIcon, StarIcon, CheckCircleIcon, ArrowRightIcon, SparklesIcon, AcademicCapIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function Programs() {
  const [selectedProgram, setSelectedProgram] = useState(0);

  const programs = [
    {
      id: 1,
      name: 'برنامه کودکان',
      ageRange: '8-12 سال',
      description: 'ایجاد مهارت‌های اساسی از طریق فعالیت‌های سرگرم‌کننده و جذاب طراحی شده برای بازیکنان جوان.',
      price: '150',
      currency: 'USD',
      period: 'ماه',
      duration: '3 ماه',
      sessions: '12 جلسه',
      maxStudents: '15 بازیکن',
      coach: 'مربی محمد احمد',
      level: 'مبتدی',
      schedule: [
        { day: 'شنبه', time: '16:00 - 17:30' },
        { day: 'دوشنبه', time: '16:00 - 17:30' },
        { day: 'چهارشنبه', time: '16:00 - 17:30' },
      ],
      features: [
        'مهارت‌های حرکتی پایه',
        'بازی‌ها و فعالیت‌های تیمی',
        'توسعه هماهنگی',
        'آشنایی با قوانین بازی',
        'ارائه تجهیزات کامل',
        'محیط یادگیری شاد'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      icon: '⚽',
      popular: false,
      rating: 4.8,
      studentsEnrolled: 45
    },
    {
      id: 2,
      name: 'برنامه نوجوانان',
      ageRange: '13-17 سال',
      description: 'تکنیک‌های پیشرفته و آموزش تاکتیکی برای بازیکنان جوان جدی که برای بازی رقابتی آماده هستند.',
      price: '200',
      currency: 'USD',
      period: 'ماه',
      duration: '4 ماه',
      sessions: '16 جلسه',
      maxStudents: '12 بازیکن',
      coach: 'مربی علی کریمی',
      level: 'متوسط',
      schedule: [
        { day: 'شنبه', time: '17:30 - 19:00' },
        { day: 'دوشنبه', time: '17:30 - 19:00' },
        { day: 'چهارشنبه', time: '17:30 - 19:00' },
      ],
      features: [
        'مهارت‌های فردی پیشرفته',
        'تاکتیک و استراتژی تیمی',
        'آمادگی جسمانی',
        'آموزش مهارت‌های ذهنی',
        'آماده‌سازی برای مسابقات',
        'تحلیل عملکرد'
      ],
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      icon: '🏃',
      popular: true,
      rating: 4.9,
      studentsEnrolled: 38
    },
    {
      id: 3,
      name: 'برنامه بزرگسالان',
      ageRange: '18-25 سال',
      description: 'آموزش سطح حرفه‌ای برای بزرگسالانی که به دنبال رقابت در لیگ‌ها و تورنمنت‌های محلی هستند.',
      price: '250',
      currency: 'USD',
      period: 'ماه',
      duration: '6 ماه',
      sessions: '24 جلسه',
      maxStudents: '10 بازیکن',
      coach: 'مربی حسن میرزایی',
      level: 'پیشرفته',
      schedule: [
        { day: 'شنبه', time: '19:00 - 20:30' },
        { day: 'دوشنبه', time: '19:00 - 20:30' },
        { day: 'چهارشنبه', time: '19:00 - 20:30' },
        { day: 'جمعه', time: '18:00 - 19:30' },
      ],
      features: [
        'روش‌های آموزشی حرفه‌ای',
        'جلسات تحلیل ویدئو',
        'برنامه‌ریزی تغذیه',
        'آماده‌سازی برای مسابقات',
        'ارتباط با باشگاه‌ها',
        'پیگیری عملکرد'
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      icon: '💪',
      popular: false,
      rating: 4.7,
      studentsEnrolled: 28
    },
    {
      id: 4,
      name: 'برنامه استادان',
      ageRange: '26-35 سال',
      description: 'آموزش تخصصی برای بازیکنان باتجربه با تمرکز بر حفظ آمادگی و برتری رقابتی.',
      price: '180',
      currency: 'USD',
      period: 'ماه',
      duration: '6 ماه',
      sessions: '20 جلسه',
      maxStudents: '8 بازیکن',
      coach: 'مربی رضا صادقی',
      level: 'متخصص',
      schedule: [
        { day: 'یکشنبه', time: '19:00 - 20:30' },
        { day: 'سه‌شنبه', time: '19:00 - 20:30' },
        { day: 'پنج‌شنبه', time: '19:00 - 20:30' },
      ],
      features: [
        'برنامه‌های آموزشی تخصصی',
        'تمرکز بر پیشگیری از آسیب',
        'بهینه‌سازی عملکرد',
        'مشاوره شخصی',
        'بازی‌های دوستانه',
        'حفظ آمادگی جسمانی'
      ],
      color: 'from-accent-500 to-accent-600',
      bgColor: 'bg-accent-50',
      icon: '🏆',
      popular: false,
      rating: 4.6,
      studentsEnrolled: 22
    },
  ];

  const currentProgram = programs[selectedProgram];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-600 text-sm font-medium mb-6">
            <TrophyIcon className="w-4 h-4 mr-2" />
            Training Programs
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 text-balance">
            Choose Your <span className="gradient-text">Training Path</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Professional training programs for every age and skill level, with expert coaches and modern facilities
          </p>
        </div>

        {/* Program Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {programs.map((program, index) => (
            <button
              key={program.id}
              onClick={() => setSelectedProgram(index)}
              className={`relative group px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                selectedProgram === index
                  ? 'bg-primary-600 text-white shadow-elegant-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-primary-200'
              }`}
            >
              {program.popular && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-500 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-2.5 h-2.5 text-white" />
                </div>
              )}
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{program.icon}</span>
                <div className="text-left">
                  <div className="font-bold">{program.name}</div>
                  <div className={`text-sm ${selectedProgram === index ? 'text-primary-200' : 'text-gray-500'}`}>
                    {program.ageRange}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Program Details */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Program Info Card */}
          <div className="space-y-8">
            {/* Main Program Card */}
            <div className={`card-glass p-8 rounded-4xl bg-gradient-to-br ${currentProgram.color} text-white relative overflow-hidden`}>
              {currentProgram.popular && (
                <div className="absolute top-6 right-6 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{currentProgram.name}</h3>
                    <p className="text-lg opacity-90">{currentProgram.ageRange}</p>
                  </div>
                  <div className="text-6xl">{currentProgram.icon}</div>
                </div>
                
                <p className="text-lg opacity-90 mb-8 leading-relaxed">{currentProgram.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">${currentProgram.price}</div>
                    <div className="text-sm opacity-80">per {currentProgram.period}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">{currentProgram.sessions}</div>
                    <div className="text-sm opacity-80">total sessions</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`w-4 h-4 ${i < Math.floor(currentProgram.rating) ? 'text-accent-400 fill-current' : 'text-white/50'}`} />
                      ))}
                    </div>
                    <span className="text-sm opacity-90">{currentProgram.rating} rating</span>
                  </div>
                  <div className="text-sm opacity-80">
                    {currentProgram.studentsEnrolled} students enrolled
                  </div>
                </div>
              </div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>
            </div>

            {/* Features List */}
            <div className="card-glass p-8 rounded-4xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <StarIcon className="w-6 h-6 text-primary-600 mr-3" />
                What's Included
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {currentProgram.features.map((feature, index) => (
                  <div key={index} className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Training Details */}
          <div className="space-y-8">
            {/* Coach Information */}
            <div className="card-glass p-8 rounded-4xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <UserGroupIcon className="w-6 h-6 text-primary-600 mr-3" />
                Your Coach
              </h4>
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  {currentProgram.coach.split(' ')[1]?.charAt(0) || 'C'}
                </div>
                <div>
                  <h5 className="text-xl font-semibold text-gray-900 mb-2">{currentProgram.coach}</h5>
                  <p className="text-gray-600 mb-2">FIFA Certified Coach</p>
                  <div className="flex items-center space-x-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 text-accent-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">5.0 rating</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-primary-600">8+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-primary-600">150+</div>
                  <div className="text-sm text-gray-600">Players Trained</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-primary-600">{currentProgram.level}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="card-glass p-8 rounded-4xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CalendarDaysIcon className="w-6 h-6 text-primary-600 mr-3" />
                Training Schedule
              </h4>
              <div className="space-y-4">
                {currentProgram.schedule.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <ClockIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-semibold text-gray-900">{session.day}</span>
                    </div>
                    <span className="text-primary-600 font-bold">{session.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Program Stats */}
            <div className="card-glass p-8 rounded-4xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AcademicCapIcon className="w-6 h-6 text-primary-600 mr-3" />
                Program Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{currentProgram.duration}</div>
                  <div className="text-sm text-gray-600">Program Duration</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{currentProgram.maxStudents}</div>
                  <div className="text-sm text-gray-600">Max Students</div>
                </div>
              </div>
            </div>

            {/* Enrollment CTA */}
            <div className="card-glass p-8 rounded-4xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join?</h4>
                <p className="text-gray-600 mb-6">
                  Start your football journey with {currentProgram.name} today!
                </p>
                <button className="w-full btn-primary shadow-elegant-lg">
                  <span className="flex items-center justify-center">
                    Enroll in {currentProgram.name}
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </span>
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Free trial session available • No setup fees
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* All Programs Overview */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Compare All Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div
                key={program.id}
                onClick={() => setSelectedProgram(index)}
                className={`card-glass p-6 rounded-4xl cursor-pointer transition-all duration-300 hover:shadow-elegant-lg hover:scale-105 ${
                  index === selectedProgram ? 'ring-2 ring-primary-600 shadow-elegant-lg' : ''
                }`}
              >
                {program.popular && (
                  <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                    Most Popular
                  </div>
                )}
                <div className="text-center">
                  <div className="text-4xl mb-4">{program.icon}</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{program.ageRange}</p>
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    ${program.price}
                    <span className="text-sm text-gray-500 font-normal">/{program.period}</span>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <StarIcon className="w-4 h-4 text-accent-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{program.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {program.studentsEnrolled} students • {program.level}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 