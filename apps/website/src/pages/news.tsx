import React, { useState } from 'react';
import Layout from '../components/Layout';
import EnhancedNewsUpdates from '../components/EnhancedNewsUpdates';
import FootballNewsDashboard from '../components/FootballNewsDashboard';
import { NewspaperIcon, GlobeAltIcon, HomeIcon } from '@heroicons/react/24/outline';

const NewsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mixed' | 'dashboard'>('mixed');

  return (
    <Layout
      title="اخبار و رویدادها - آکادمی فوتبال AP"
      description="آخرین اخبار آکادمی فوتبال AP و دنیای فوتبال ایران. اخبار انتقالات، نتایج بازی‌ها، و رویدادهای آکادمی."
      canonical="https://ap-football.com/news"
      openGraph={{
        title: 'اخبار و رویدادها - آکادمی فوتبال AP',
        description: 'آخرین اخبار آکادمی فوتبال AP و دنیای فوتبال ایران',
        images: [
          {
            url: 'https://ap-football.com/images/news-og.jpg',
            width: 1200,
            height: 630,
            alt: 'اخبار آکادمی فوتبال AP',
          },
        ],
      }}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-600 to-navy-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                مرکز اخبار آکادمی AP
              </h1>
              <p className="text-xl text-navy-100 max-w-3xl mx-auto">
                آخرین اخبار آکادمی، دنیای فوتبال ایران و تحلیل‌های تخصصی
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-8 space-x-reverse">
              <button
                onClick={() => setActiveTab('mixed')}
                className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'mixed'
                    ? 'border-navy-600 text-navy-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <HomeIcon className="w-5 h-5 ml-2" />
                  اخبار ترکیبی
                </div>
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'dashboard'
                    ? 'border-navy-600 text-navy-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <GlobeAltIcon className="w-5 h-5 ml-2" />
                  دشبورد فوتبال
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="py-0">
          {activeTab === 'mixed' ? (
            <EnhancedNewsUpdates />
          ) : (
            <FootballNewsDashboard />
          )}
        </div>

        {/* Additional Features */}
        <div className="bg-navy-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">ویژگی‌های خبری ما</h2>
              <p className="text-navy-100 max-w-2xl mx-auto">
                مرکز اخبار آکادمی AP با هوش مصنوعی، آخرین اخبار فوتبال را تحلیل و ارائه می‌دهد
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-navy-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <NewspaperIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">تحلیل هوشمند</h3>
                <p className="text-navy-100">
                  هوش مصنوعی اخبار را تحلیل کرده و مهم‌ترین موضوعات را شناسایی می‌کند
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-navy-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GlobeAltIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">منابع معتبر</h3>
                <p className="text-navy-100">
                  از بهترین منابع خبری کشور مانند ورزش سه، فوتبال ایران و ایسنا
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-navy-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HomeIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">اخبار آکادمی</h3>
                <p className="text-navy-100">
                  آخرین اخبار، رویدادها و دستاوردهای آکادمی فوتبال AP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage; 