import React from 'react';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

const ContactPage: React.FC = () => {
  return (
    <Layout
      title="تماس با ما - آکادمی فوتبال AP"
      description="با آکادمی فوتبال AP در تماس باشید. آدرس، شماره تلفن، ایمیل و ساعات کاری آکادمی."
      canonical="https://ap-football.com/contact"
      openGraph={{
        title: 'تماس با ما - آکادمی فوتبال AP',
        description: 'با آکادمی فوتبال AP در تماس باشید',
        images: [
          {
            url: 'https://ap-football.com/images/contact-og.jpg',
            width: 1200,
            height: 630,
            alt: 'تماس با آکادمی فوتبال AP',
          },
        ],
      }}
    >
      <NextSeo
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'تماس با آکادمی فوتبال, شماره تلفن, آدرس, ایمیل, ساعات کاری',
          },
        ]}
      />
      
      <div className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              تماس با ما
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              برای کسب اطلاعات بیشتر، ثبت نام یا هر سوال دیگری با ما در تماس باشید
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card-glass p-8 rounded-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                پیام خود را ارسال کنید
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      نام
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      placeholder="نام شما"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      placeholder="نام خانوادگی شما"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="ایمیل شما"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    شماره تلفن
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="شماره تلفن شما"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    پیام
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="پیام شما"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  ارسال پیام
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card-glass p-8 rounded-4xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  اطلاعات تماس
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <PhoneIcon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">تلفن</h3>
                      <p className="text-gray-600">021-12345678</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                      <EnvelopeIcon className="w-6 h-6 text-secondary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">ایمیل</h3>
                      <p className="text-gray-600">info@ap-football.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                      <MapPinIcon className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">آدرس</h3>
                      <p className="text-gray-600">تهران، میدان آزادی، مجموعه ورزشی</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <ClockIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">ساعات کاری</h3>
                      <p className="text-gray-600">شنبه تا چهارشنبه: 8:00 - 22:00</p>
                      <p className="text-gray-600">پنج‌شنبه: 8:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="card-glass p-8 rounded-4xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  موقعیت مکانی
                </h2>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <p className="text-gray-600">نقشه در اینجا نمایش داده می‌شود</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage; 