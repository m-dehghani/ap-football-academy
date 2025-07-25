import { useState } from 'react';
import { StarIcon, TrophyIcon, AcademicCapIcon, UserGroupIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function CoachSpotlight() {
  const [currentCoach, setCurrentCoach] = useState(0);

  const coaches = [
    {
      id: 1,
      name: 'علی احمدی',
      title: 'مربی اصلی و بنیانگذار',
      experience: '15 سال',
      specialization: 'تکنیک و تاکتیک',
      certifications: ['مدرک فیفا', 'مدرک AFC', 'مدرک فدراسیون فوتبال ایران'],
      achievements: [
        'بازیکن سابق تیم ملی',
        'قهرمان لیگ برتر ایران',
        'بهترین مربی سال 1401',
        'آموزش بیش از 300 بازیکن'
      ],
      programs: ['برنامه نوجوانان', 'برنامه بزرگسالان'],
      rating: 4.9,
      studentsCount: 120,
      bio: 'علی احمدی با بیش از 15 سال تجربه در زمینه فوتبال، از بازیکنان سابق تیم ملی ایران است. او پس از پایان دوران بازیگری، تصمیم گرفت تجربیات خود را در اختیار نسل جدید قرار دهد.',
      image: '/api/placeholder/200/200',
      quote: 'فوتبال فقط یک بازی نیست، بلکه مدرسه‌ای برای یادگیری زندگی است.',
      socialMedia: {
        instagram: '@coach_ali_ahmadi',
        twitter: '@alicoach',
      }
    },
    {
      id: 2,
      name: 'حسن میرزایی',
      title: 'مربی آمادگی جسمانی',
      experience: '12 سال',
      specialization: 'آمادگی جسمانی و توانبخشی',
      certifications: ['مدرک NSCA', 'مدرک فیزیوتراپی', 'مدرک تغذیه ورزشی'],
      achievements: [
        'آمادگی‌ساز باشگاه‌های لیگ برتر',
        'متخصص پیشگیری از آسیب',
        'کارشناس تغذیه ورزشی',
        'برنده جایزه نوآوری در تمرین'
      ],
      programs: ['برنامه بزرگسالان', 'برنامه استادان'],
      rating: 4.8,
      studentsCount: 85,
      bio: 'حسن میرزایی کارشناس ارشد فیزیولوژی ورزش و مربی آمادگی جسمانی با تجربه کار در باشگاه‌های مطرح کشور است.',
      image: '/api/placeholder/200/200',
      quote: 'بدن قوی، ذهن قوی‌تر و بازی بهتر.',
      socialMedia: {
        instagram: '@hassan_fitness',
        twitter: '@hassanmirzaei',
      }
    },
    {
      id: 3,
      name: 'محمد کریمی',
      title: 'مربی توسعه بازیکن',
      experience: '10 سال',
      specialization: 'توسعه مهارت‌های فردی',
      certifications: ['مدرک یوفا', 'مدرک روانشناسی ورزشی', 'مدرک مربیگری کودکان'],
      achievements: [
        'مربی تیم‌های جوانان',
        'کارشناس توسعه استعداد',
        'بهترین مربی کودکان 1400',
        'رکورددار تربیت بازیکن حرفه‌ای'
      ],
      programs: ['برنامه کودکان', 'برنامه نوجوانان'],
      rating: 4.9,
      studentsCount: 95,
      bio: 'محمد کریمی متخصص در کار با بازیکنان جوان و توسعه مهارت‌های فردی است. او در زمینه روانشناسی ورزشی نیز تخصص دارد.',
      image: '/api/placeholder/200/200',
      quote: 'هر کودک یک ستاره است که باید درخشش آن را کشف کرد.',
      socialMedia: {
        instagram: '@mohammad_karimi_coach',
        twitter: '@mkarimi_coach',
      }
    },
    {
      id: 4,
      name: 'رضا صادقی',
      title: 'مربی تاکتیک و استراتژی',
      experience: '8 سال',
      specialization: 'تاکتیک و آنالیز بازی',
      certifications: ['مدرک تحلیل ویدئو', 'مدرک استراتژی فوتبال', 'مدرک هوش مصنوعی در ورزش'],
      achievements: [
        'تحلیلگر بازی‌های لیگ برتر',
        'طراح سیستم‌های تاکتیکی',
        'کارشناس آنالیز عملکرد',
        'نوآور در استفاده از تکنولوژی'
      ],
      programs: ['برنامه استادان', 'برنامه حرفه‌ای'],
      rating: 4.7,
      studentsCount: 60,
      bio: 'رضا صادقی در زمینه تاکتیک و آنالیز بازی تخصص دارد. او از تکنولوژی‌های مدرن برای بهبود عملکرد بازیکنان استفاده می‌کند.',
      image: '/api/placeholder/200/200',
      quote: 'فوتبال مدرن، علم و هنر را در کنار هم می‌آورد.',
      socialMedia: {
        instagram: '@reza_tactical',
        twitter: '@rsadegh_coach',
      }
    }
  ];

  const nextCoach = () => {
    setCurrentCoach((prev) => (prev + 1) % coaches.length);
  };

  const prevCoach = () => {
    setCurrentCoach((prev) => (prev - 1 + coaches.length) % coaches.length);
  };

  const coach = coaches[currentCoach];

  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 to-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-600 text-sm font-medium mb-4">
            <UserGroupIcon className="w-4 h-4 ml-2" />
            تیم مربیگری
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            مربیان <span className="text-primary-600">حرفه‌ای</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تیم مربیگری ما از بهترین و باتجربه‌ترین مربیان کشور تشکیل شده است
          </p>
        </div>

        {/* Coach Showcase */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Coach Image & Basic Info */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-48 h-48 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-6xl font-bold mx-auto mb-6">
                    {coach.name.split(' ')[0].charAt(0)}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{coach.name}</h3>
                  <p className="text-lg text-primary-600 font-medium mb-2">{coach.title}</p>
                  <p className="text-gray-600">{coach.specialization}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{coach.experience}</div>
                    <div className="text-sm text-gray-600">تجربه</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">{coach.studentsCount}</div>
                    <div className="text-sm text-gray-600">دانش‌آموز</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-2xl font-bold text-amber-600">{coach.rating}</span>
                      <StarIcon className="w-5 h-5 text-amber-400 fill-current mr-1" />
                    </div>
                    <div className="text-sm text-gray-600">امتیاز</div>
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="text-4xl text-primary-600 mb-4">"</div>
                  <p className="text-gray-700 italic text-lg leading-relaxed">{coach.quote}</p>
                </div>
              </div>
            </div>

            {/* Coach Details */}
            <div className="space-y-8">
              {/* Bio */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4">معرفی مربی</h4>
                <p className="text-gray-700 leading-relaxed mb-6">{coach.bio}</p>
                
                {/* Social Media */}
                <div className="flex space-x-4 space-x-reverse">
                  <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-shadow">
                    📱 {coach.socialMedia.instagram}
                  </a>
                  <a href="#" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-shadow">
                    🐦 {coach.socialMedia.twitter}
                  </a>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AcademicCapIcon className="w-5 h-5 text-primary-600 ml-2" />
                  مدارک و گواهینامه‌ها
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {coach.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center p-3 bg-primary-50 rounded-lg">
                      <div className="w-2 h-2 bg-primary-600 rounded-full ml-3"></div>
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrophyIcon className="w-5 h-5 text-primary-600 ml-2" />
                  افتخارات و دستاوردها
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {coach.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center p-3 bg-emerald-50 rounded-lg">
                      <TrophyIcon className="w-4 h-4 text-emerald-600 ml-3 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Programs */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4">برنامه‌های تدریس</h4>
                <div className="flex flex-wrap gap-2">
                  {coach.programs.map((program, index) => (
                    <span key={index} className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-full text-sm">
                      {program}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-12 space-x-4 space-x-reverse">
            <button
              onClick={prevCoach}
              className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow text-gray-600 hover:text-primary-600"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
            
            <div className="flex space-x-2">
              {coaches.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCoach(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentCoach ? 'bg-primary-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextCoach}
              className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow text-gray-600 hover:text-primary-600"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* All Coaches Grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">تمام مربیان ما</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coaches.map((coachItem, index) => (
              <div
                key={coachItem.id}
                onClick={() => setCurrentCoach(index)}
                className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl hover:scale-105 ${
                  index === currentCoach ? 'ring-2 ring-primary-600' : ''
                }`}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {coachItem.name.split(' ')[0].charAt(0)}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{coachItem.name}</h4>
                  <p className="text-sm text-primary-600 mb-2">{coachItem.title}</p>
                  <div className="flex items-center justify-center mb-2">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 mr-1">{coachItem.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">{coachItem.experience} تجربه</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 