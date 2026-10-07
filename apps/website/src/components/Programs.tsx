import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  CalendarDaysIcon,
  UserGroupIcon,
  ClockIcon,
  TrophyIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

import Program from '@/viewModels/program';
import Schedule from '@/viewModels/schedule';
import { formatToman, toPersianDigits } from '@/lib/format';

export default function Programs({ programs }: { programs: Program[] }) {
  const router = useRouter();
  // Footer links open a specific program via /programs?program=<id>.
  const [selectedProgram, setSelectedProgram] = useState(() =>
    Math.max(
      0,
      programs.findIndex((p) => p.id === router.query.program),
    ),
  );

  const currentProgram = programs[selectedProgram];

  if (!currentProgram) {
    return (
      <section className="section-padding text-center text-gray-600">
        در حال حاضر برنامه آموزشی فعالی وجود ندارد.
      </section>
    );
  }

  return (
    <section className="section-padding bg-linear-to-br from-gray-50 to-gray-100 relative overflow-hidden">
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
            برنامه‌های آموزشی
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 text-balance">
            مسیر <span className="gradient-text">تمرین خود</span> را انتخاب کنید
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            برنامه‌های حرفه‌ای برای هر سن و سطح مهارت، با مربیان متخصص و امکانات
            مدرن
          </p>
        </div>

        {/* Program Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {programs.map((program: Program, index: number) => (
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
                  <div
                    className={`text-sm ${selectedProgram === index ? 'text-primary-200' : 'text-gray-500'}`}
                  >
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
            <div
              className={`card-glass p-8 rounded-4xl bg-linear-to-br ${currentProgram.color} text-white relative overflow-hidden`}
            >
              {currentProgram.popular && (
                <div className="absolute top-6 right-6 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  محبوب‌ترین
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">
                      {currentProgram.name}
                    </h3>
                    <p className="text-lg opacity-90 ">
                      {currentProgram.ageRange}
                    </p>
                  </div>
                  <div className="text-6xl">{currentProgram.icon}</div>
                </div>

                <p className="text-lg opacity-90 mb-8 leading-relaxed">
                  {currentProgram.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold persian-numbers">
                      {formatToman(currentProgram.price)}
                    </div>
                    <div className="text-sm opacity-80">
                      در هر {currentProgram.period}
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">
                      {toPersianDigits(currentProgram.sessionCount)}
                    </div>
                    <div className="text-sm opacity-80">مجموع جلسات</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(currentProgram.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm opacity-90">
                      امتیاز {toPersianDigits(currentProgram.rating)}
                    </span>
                  </div>
                  <div className="text-sm opacity-80">
                    {toPersianDigits(currentProgram.studentsEnrolled)} بازیکن ثبت
                    نام شده
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
                آنچه شامل می‌شود
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {currentProgram.features.map(
                  (feature: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Training Details */}
          <div className="space-y-8">
            {/* Coach Information */}
            <div className="card-glass p-8 rounded-4xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <UserGroupIcon className="w-6 h-6 text-primary-600 mr-3" />
                مربی شما
              </h4>
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-linear-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  {currentProgram.coach.fullName.charAt(0)}
                </div>
                <div>
                  <h5 className="text-xl font-semibold text-gray-900 mb-2">
                    {currentProgram.coach.fullName}
                  </h5>
                  {currentProgram.coach.title && (
                    <p className="text-gray-600 mb-2">
                      {currentProgram.coach.title}
                    </p>
                  )}
                  <div className="flex items-center space-x-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${i < Math.round(currentProgram.coach.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      امتیاز {toPersianDigits(currentProgram.coach.rating)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-primary-600">
                    {toPersianDigits(currentProgram.coach.experience)}
                  </div>
                  <div className="text-sm text-gray-600">سال تجربه</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-primary-600">
                    {toPersianDigits(currentProgram.coach.studentsCount)}
                  </div>
                  <div className="text-sm text-gray-600">بازیکن آموزش‌دیده</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-primary-600">
                    {currentProgram.level}
                  </div>
                  <div className="text-sm text-gray-600">سطح</div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="card-glass p-8 rounded-4xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CalendarDaysIcon className="w-6 h-6 text-primary-600 mr-3" />
                برنامه تمرینی
              </h4>
              <div className="space-y-4">
                {currentProgram.schedule.map((value: Schedule) => (
                  <div
                    key={value.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <ClockIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-semibold text-gray-900">
                        {value.day}
                      </span>
                    </div>
                    <span className="text-primary-600 font-bold persian-numbers">
                      {toPersianDigits(value.time)}
                    </span>
                  </div>
                ))}
                {currentProgram.schedule.length === 0 && (
                  <p className="text-gray-500">
                    برنامه زمانی به‌زودی اعلام می‌شود.
                  </p>
                )}
              </div>
            </div>

            {/* Program Stats */}
            <div className="card-glass p-8 rounded-4xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AcademicCapIcon className="w-6 h-6 text-primary-600 mr-3" />
                جزئیات برنامه
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {toPersianDigits(currentProgram.duration)} ماه
                  </div>
                  <div className="text-sm text-gray-600">مدت برنامه</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {toPersianDigits(currentProgram.maxStudents)}
                  </div>
                  <div className="text-sm text-gray-600">حداکثر بازیکن</div>
                </div>
              </div>
            </div>

            {/* Enrollment CTA */}
            <div className="card-glass p-8 rounded-4xl bg-linear-to-br from-primary-50 to-primary-100 border border-primary-200">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  آماده پیوستن هستید؟
                </h4>
                <p className="text-gray-600 mb-6">
                  سفر فوتبالی خود را با {currentProgram.name} شروع کنید!
                </p>
                <Link
                  href={`/register?program=${currentProgram.id}`}
                  className="w-full btn btn-primary shadow-elegant-lg"
                >
                  <span className="flex items-center justify-center">
                    ثبت نام در {currentProgram.name}
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </span>
                </Link>
                <p className="text-sm text-gray-500 mt-3">
                  اولین جلسه رایگان • بدون هزینه ثبت نام
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* All Programs Overview */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            مقایسه همه برنامه‌ها
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program: Program, index: number) => (
              <div
                key={program.id}
                onClick={() => setSelectedProgram(index)}
                className={`card-glass p-6 rounded-4xl cursor-pointer transition-all duration-300 hover:shadow-elegant-lg hover:scale-105 ${
                  index === selectedProgram
                    ? 'ring-2 ring-primary-600 shadow-elegant-lg'
                    : ''
                }`}
              >
                {program.popular && (
                  <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                    محبوب‌ترین
                  </div>
                )}
                <div className="text-center">
                  <div className="text-4xl mb-4">{program.icon}</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {program.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {program.ageRange}
                  </p>
                  <div className="text-xl font-bold text-primary-600 mb-2 persian-numbers">
                    {formatToman(program.price)}
                    <span className="text-sm text-gray-500 font-normal">
                      {' '}
                      / {program.period}
                    </span>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600 mr-1">
                      {toPersianDigits(program.rating)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {toPersianDigits(program.studentsEnrolled)} بازیکن •{' '}
                    {program.level}
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
