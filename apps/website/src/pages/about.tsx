import React from 'react';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import { TrophyIcon, UserGroupIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
  return (
    <Layout
      title="درباره ما - آکادمی فوتبال AP"
      description="آکادمی فوتبال AP با هدف آموزش حرفه‌ای فوتبال و پرورش نسل آینده فوتبال ایران تأسیس شده است. بیش از 10 سال تجربه در آموزش فوتبال."
      canonical="https://ap-football.com/about"
      openGraph={{
        title: 'درباره ما - آکادمی فوتبال AP',
        description: 'آکادمی فوتبال AP با هدف آموزش حرفه‌ای فوتبال و پرورش نسل آینده فوتبال ایران تأسیس شده است',
        images: [
          {
            url: 'https://ap-football.com/images/about-og.jpg',
            width: 1200,
            height: 630,
            alt: 'درباره آکادمی فوتبال AP',
          },
        ],
      }}
    >
      <NextSeo
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'درباره آکادمی فوتبال, تاریخچه, ماموریت, چشم انداز, ارزش‌ها',
          },
        ]}
      />
      
      <div className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              درباره آکادمی فوتبال AP
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              بیش از یک دهه تجربه در آموزش حرفه‌ای فوتبال و پرورش نسل آینده فوتبال ایران
            </p>
          </div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="card-glass p-8 rounded-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                داستان ما
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  آکادمی فوتبال AP در سال 1390 با هدف ایجاد یک مرکز آموزشی جامع و حرفه‌ای برای فوتبال تأسیس شد. 
                  ما با یک رویا آغاز کردیم: پرورش نسل جدیدی از فوتبالیست‌های ایرانی که هم از لحاظ فنی و هم از لحاظ اخلاقی در سطح بالایی قرار داشته باشند.
                </p>
                <p>
                  از همان ابتدا، تأکید ما بر کیفیت آموزش و رشد همه‌جانبه بازیکنان بوده است. 
                  ما معتقدیم که فوتبال تنها یک ورزش نیست، بلکه ابزاری برای یادگیری انضباط، کار تیمی و رسیدن به اهداف است.
                </p>
                <p>
                  امروز، پس از گذشت بیش از یک دهه، آکادمی ما به یکی از معتبرترین مراکز آموزش فوتبال کشور تبدیل شده است. 
                  صدها بازیکن جوان از آکادمی ما فارغ‌التحصیل شده‌اند و بسیاری از آنها در لیگ‌های مختلف کشور بازی می‌کنند.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="card-glass p-6 rounded-4xl">
                <div className="flex items-center space-x-4 mb-4">
                  <TrophyIcon className="w-8 h-8 text-primary-600" />
                  <h3 className="text-xl font-bold text-gray-900">ماموریت ما</h3>
                </div>
                <p className="text-gray-700">
                  آموزش حرفه‌ای فوتبال و پرورش نسل آینده فوتبال ایران با تأکید بر ارزش‌های اخلاقی و انسانی
                </p>
              </div>

              <div className="card-glass p-6 rounded-4xl">
                <div className="flex items-center space-x-4 mb-4">
                  <StarIcon className="w-8 h-8 text-secondary-600" />
                  <h3 className="text-xl font-bold text-gray-900">چشم‌انداز ما</h3>
                </div>
                <p className="text-gray-700">
                  تبدیل شدن به برترین آکادمی فوتبال خاورمیانه و تربیت بازیکنانی که در سطح بین‌المللی بدرخشند
                </p>
              </div>

              <div className="card-glass p-6 rounded-4xl">
                <div className="flex items-center space-x-4 mb-4">
                  <HeartIcon className="w-8 h-8 text-accent-600" />
                  <h3 className="text-xl font-bold text-gray-900">ارزش‌های ما</h3>
                </div>
                <ul className="text-gray-700 space-y-2">
                  <li>• کیفیت در آموزش</li>
                  <li>• احترام و صداقت</li>
                  <li>• کار تیمی و همکاری</li>
                  <li>• تعهد و پشتکار</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="card-glass p-8 rounded-4xl text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-900 font-semibold">بازیکن فعال</div>
            </div>
            <div className="card-glass p-8 rounded-4xl text-center">
              <div className="text-4xl font-bold text-secondary-600 mb-2">25+</div>
              <div className="text-gray-900 font-semibold">قهرمانی</div>
            </div>
            <div className="card-glass p-8 rounded-4xl text-center">
              <div className="text-4xl font-bold text-accent-600 mb-2">15+</div>
              <div className="text-gray-900 font-semibold">بازیکن حرفه‌ای</div>
            </div>
            <div className="card-glass p-8 rounded-4xl text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">10+</div>
              <div className="text-gray-900 font-semibold">سال تجربه</div>
            </div>
          </div>

          {/* Team Section */}
          <div className="card-glass p-8 rounded-4xl mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              تیم مدیریت
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                  AP
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">علی احمدی</h3>
                <p className="text-gray-600 mb-2">مدیر عامل و بنیانگذار</p>
                <p className="text-gray-500 text-sm">
                  بازیکن سابق تیم ملی با بیش از 15 سال تجربه مربیگری
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                  MK
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">محمد کریمی</h3>
                <p className="text-gray-600 mb-2">مدیر آموزش</p>
                <p className="text-gray-500 text-sm">
                  متخصص روانشناسی ورزشی و توسعه مهارت‌های فردی
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                  HM
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">حسن میرزایی</h3>
                <p className="text-gray-600 mb-2">مدیر آمادگی جسمانی</p>
                <p className="text-gray-500 text-sm">
                  کارشناس فیزیولوژی ورزش و پیشگیری از آسیب‌های ورزشی
                </p>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="card-glass p-8 rounded-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              امکانات ما
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">زمین‌های تمرین</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• 2 زمین چمن طبیعی استاندارد فیفا</li>
                  <li>• 1 زمین چمن مصنوعی</li>
                  <li>• سالن ورزشی سرپوشیده</li>
                  <li>• زمین‌های کوچک برای تمرینات تخصصی</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">تجهیزات</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• تجهیزات آمادگی جسمانی مدرن</li>
                  <li>• سیستم آنالیز ویدئو</li>
                  <li>• رختکن و دوش مجهز</li>
                  <li>• کافی‌شاپ و فروشگاه</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage; 