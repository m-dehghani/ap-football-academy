import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const SuccessPage: React.FC = () => {
  const [_sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    if (session_id) {
      // Fetch session data from Stripe
      fetch(`/api/get-session?session_id=${session_id}`)
        .then(res => res.json())
        .then(data => {
          setSessionData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching session data:', error);
          setLoading(false);
        });
    }
  }, [session_id]);

  if (loading) {
    return (
      <Layout title="در حال پردازش - آکادمی فوتبال AP">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">در حال پردازش ثبت نام شما...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="ثبت نام موفق - آکادمی فوتبال AP"
      description="Thank you for registering with AP Football Academy. Your registration has been confirmed and your training journey begins now."
      noindex={true}
    >
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Success Header */}
            <div className="bg-linear-to-r from-green-500 to-green-600 px-8 py-12">
              <div className="text-center">
                <CheckCircleIcon className="h-16 w-16 text-white mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-white mb-2">
                  ثبت نام موفقیت‌آمیز بود!
                </h1>
                <p className="text-green-100 text-xl">
                  به خانواده آکادمی فوتبال AP خوش آمدید
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="space-y-8">
                {/* Confirmation Details */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    مراحل بعدی چیست؟
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center ml-4 mt-1 shrink-0">
                        <span className="text-primary-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">ایمیل تأییدیه</h3>
                        <p className="text-gray-600">
                          ایمیل تأییدیه به همراه جزئیات ثبت نام و رسید پرداخت در چند دقیقه آینده ارسال می‌شود.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center ml-4 mt-1 shrink-0">
                        <span className="text-primary-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">بسته خوش‌آمدگویی</h3>
                        <p className="text-gray-600">
                          در طی ۲۴ ساعت، بسته خوش‌آمدگویی شامل برنامه تمرینی، اطلاعات مجموعه و راهنمای اولین جلسه ارسال می‌شود.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center ml-4 mt-1 shrink-0">
                        <span className="text-primary-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">اولین جلسه تمرین</h3>
                        <p className="text-gray-600">
                          تیم ما با شما تماس می‌گیرد تا اولین جلسه تمرینی را هماهنگ کند و به سوالات شما پاسخ دهد.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Information */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    اطلاعات مهم
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 mt-2 shrink-0"></div>
                      <p className="text-gray-700">
                        <strong>آدرس تمرین:</strong> تهران، میدان آزادی، مجموعه ورزشی مرکز شهر
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 mt-2 shrink-0"></div>
                      <p className="text-gray-700">
                        <strong>تماس:</strong> ۰۲۱-۱۲۳۴۵۶۷۸ یا info@apfootballacademy.com
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 mt-2 shrink-0"></div>
                      <p className="text-gray-700">
                        <strong>وسایل مورد نیاز:</strong> کفش فوتبال، ساق‌بند، بطری آب و لباس ورزشی مناسب
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 mt-2 shrink-0"></div>
                      <p className="text-gray-700">
                        <strong>پرداخت ماهانه:</strong> اشتراک شما هر ماه به صورت خودکار تمدید می‌شود. می‌توانید اشتراک خود را از پنل کاربری مدیریت کنید.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    لینک‌های سریع
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                      href="/programs"
                      className="bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
                    >
                      مشاهده برنامه‌ها
                    </Link>
                    <Link
                      href="/coaches"
                      className="bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                    >
                      آشنایی با مربیان
                    </Link>
                    <Link
                      href="/contact"
                      className="bg-secondary-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-secondary-600 transition-colors duration-200"
                    >
                      تماس با ما
                    </Link>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    نیاز به کمک دارید؟
                  </h3>
                  <p className="text-gray-600 mb-4">
                    در صورت داشتن هرگونه سوال، با ما در تماس باشید.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="tel:+982112345678"
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      📞 تماس: ۰۲۱-۱۲۳۴۵۶۷۸
                    </a>
                    <a
                      href="mailto:info@apfootballacademy.com"
                      className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      ✉️ ارسال ایمیل
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;
