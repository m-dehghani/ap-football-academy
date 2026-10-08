import { useState } from 'react';
import {
  TrophyIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { getIcon } from '@/lib/icons';
import {
  SUCCESS_ACHIEVEMENTS,
  SUCCESS_TESTIMONIALS,
  SUCCESS_STATISTICS,
  SUCCESS_MILESTONES,
} from '@/constants/content';

export default function SuccessStories() {
  const [activeTab, setActiveTab] = useState('achievements');

  const achievements = SUCCESS_ACHIEVEMENTS;
  const testimonials = SUCCESS_TESTIMONIALS;
  const statistics = SUCCESS_STATISTICS;
  const milestones = SUCCESS_MILESTONES;

  return (
    <section className="py-20 bg-linear-to-br from-emerald-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium mb-4">
            <TrophyIcon className="w-4 h-4 ml-2" />
            داستان‌های موفقیت
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            افتخارات <span className="text-emerald-600">دانش‌آموزان</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            بازیکنان ما در مسیر رسیدن به اهدافشان موفقیت‌های بزرگی کسب کرده‌اند
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'achievements'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              دستاوردهای بزرگ
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'testimonials'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              نظرات و تجربیات
            </button>
            <button
              onClick={() => setActiveTab('statistics')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'statistics'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              آمار موفقیت
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="bg-linear-to-r from-emerald-500 to-emerald-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <TrophyIcon className="w-8 h-8" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm opacity-90">
                        {achievement.date}
                      </div>
                      <div className="text-xs opacity-75">
                        {achievement.program}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {achievement.playerName}
                  </h3>
                  <p className="text-emerald-100 text-sm">
                    {achievement.age} ساله
                  </p>
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    {achievement.achievement}
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {achievement.description}
                  </p>

                  {/* Quote */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-emerald-600 mb-2" />
                    <p className="text-gray-700 italic text-sm">
                      {achievement.quote}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-600">
                        {achievement.stats.goals}
                      </div>
                      <div className="text-xs text-gray-500">گل</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-600">
                        {achievement.stats.assists}
                      </div>
                      <div className="text-xs text-gray-500">پاس گل</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-600">
                        {achievement.stats.matches}
                      </div>
                      <div className="text-xs text-gray-500">بازی</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 border-t pt-4">
                    مربی: {achievement.coach}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold ml-4">
                    {testimonial.name.split(' ')[0].charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-emerald-600">
                      {testimonial.program}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </blockquote>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{testimonial.date}</span>
                  <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">
                    {testimonial.improvement}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'statistics' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {statistics.map((stat, index) => {
                const bgColors = [
                  'bg-yellow-100',
                  'bg-green-100',
                  'bg-blue-100',
                  'bg-purple-100',
                ];
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                  >
                    <div className="mb-6">
                      <div
                        className={`w-16 h-16 ${bgColors[index]} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        {getIcon(stat.icon, `w-8 h-8 ${stat.color}`)}
                      </div>
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-lg font-semibold text-gray-800 mb-2">
                        {stat.label}
                      </div>
                      <p className="text-sm text-gray-600">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Success Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                مسیر موفقیت آکادمی AP
              </h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl"
                  >
                    <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {milestone.year}
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-700 mb-1">
                        {milestone.event}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
