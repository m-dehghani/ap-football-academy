import { useState } from 'react';
import {
  StarIcon,
  TrophyIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Coach from '@/viewModels/coach';

export default function CoachSpotlight({
  coaches = [],
}: {
  coaches?: Coach[];
}) {
  const [currentCoach, setCurrentCoach] = useState(0);

  if (!coaches || coaches.length === 0) return null;

  const nextCoach = () => {
    setCurrentCoach((prev) => (prev + 1) % coaches.length);
  };

  const prevCoach = () => {
    setCurrentCoach((prev) => (prev - 1 + coaches.length) % coaches.length);
  };

  const coach = coaches[currentCoach];

  if (!coach) return null;

  return (
    <section className="section-padding bg-linear-to-br from-slate-50 to-slate-100">
      <div className="container-custom">
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
                  <div className="w-48 h-48 bg-linear-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-6xl font-bold mx-auto mb-6">
                    {coach.firstName.split(' ')[0].charAt(0)}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {coach.firstName} {coach.lastName}
                  </h3>
                  <p className="text-lg text-primary-600 font-medium mb-2">
                    {coach.title}
                  </p>
                  <p className="text-gray-600">{coach.specialization}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">
                      {coach.experience}
                    </div>
                    <div className="text-sm text-gray-600">تجربه</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">
                      {coach.studentsCount}
                    </div>
                    <div className="text-sm text-gray-600">دانش‌آموز</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-2xl font-bold text-amber-600">
                        {coach.rating}
                      </span>
                      <StarIcon className="w-5 h-5 text-amber-400 fill-current mr-1" />
                    </div>
                    <div className="text-sm text-gray-600">امتیاز</div>
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="text-4xl text-primary-600 mb-4">"</div>
                  <p className="text-gray-700 italic text-lg leading-relaxed">
                    {coach.quote}
                  </p>
                </div>
              </div>
            </div>

            {/* Coach Details */}
            <div className="space-y-8">
              {/* Bio */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  معرفی مربی
                </h4>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {coach.bio}
                </p>

                {/* Social Media */}
                <div className="flex space-x-4 space-x-reverse">
                  <a
                    href="#"
                    className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-shadow"
                  >
                    📱 {coach.instagram}
                  </a>
                  <a
                    href="#"
                    className="bg-linear-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-shadow"
                  >
                    🐦 {coach.twitter}
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
                    <div
                      key={index}
                      className="flex items-center p-3 bg-primary-50 rounded-lg"
                    >
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
                    <div
                      key={index}
                      className="flex items-center p-3 bg-emerald-50 rounded-lg"
                    >
                      <TrophyIcon className="w-4 h-4 text-emerald-600 ml-3 shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Programs */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  برنامه‌های تدریس
                </h4>
                <div className="flex flex-wrap gap-2">
                  {coach.programs.map((program, index) => (
                    <span
                      key={index}
                      className="bg-linear-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-full text-sm"
                    >
                      {program.name}
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
                    index === currentCoach
                      ? 'bg-primary-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
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
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            تمام مربیان ما
          </h3>
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
                  <div className="w-20 h-20 bg-linear-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {coachItem.firstName.split(' ')[0].charAt(0)}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {coachItem.firstName} {coachItem.lastName}
                  </h4>
                  <p className="text-sm text-primary-600 mb-2">
                    {coachItem.title}
                  </p>
                  <div className="flex items-center justify-center mb-2">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 mr-1">
                      {coachItem.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {coachItem.experience} تجربه
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
