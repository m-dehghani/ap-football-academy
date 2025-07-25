import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const SuccessPage: React.FC = () => {
  const [sessionData, setSessionData] = useState<any>(null);
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
      <Layout title="Processing - AP Football Academy">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your registration...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Registration Successful - AP Football Academy"
      description="Thank you for registering with AP Football Academy. Your registration has been confirmed and your training journey begins now."
      noindex={true}
    >
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-12">
              <div className="text-center">
                <CheckCircleIcon className="h-16 w-16 text-white mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-white mb-2">
                  Registration Successful!
                </h1>
                <p className="text-green-100 text-xl">
                  Welcome to the AP Football Academy family
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="space-y-8">
                {/* Confirmation Details */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    What happens next?
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-primary-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Confirmation Email</h3>
                        <p className="text-gray-600">
                          You'll receive a confirmation email with your registration details and payment receipt within the next few minutes.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-primary-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Welcome Package</h3>
                        <p className="text-gray-600">
                          Within 24 hours, you'll receive a welcome package with training schedules, facility information, and what to bring to your first session.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-primary-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">First Training Session</h3>
                        <p className="text-gray-600">
                          Our team will contact you to schedule your first training session and answer any questions you might have.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Information */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Important Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      <p className="text-gray-700">
                        <strong>Training Location:</strong> 123 Football Street, Sports City, SC 12345
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      <p className="text-gray-700">
                        <strong>Contact:</strong> (234) 567-8900 or info@apfootballacademy.com
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      <p className="text-gray-700">
                        <strong>What to Bring:</strong> Football boots, shin guards, water bottle, and comfortable training clothes
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      <p className="text-gray-700">
                        <strong>Monthly Billing:</strong> Your subscription will renew automatically each month. You can manage your subscription in your account portal.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Quick Links
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                      href="/programs"
                      className="bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
                    >
                      View Programs
                    </Link>
                    <Link
                      href="/coaches"
                      className="bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                    >
                      Meet Our Coaches
                    </Link>
                    <Link
                      href="/contact"
                      className="bg-secondary-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-secondary-600 transition-colors duration-200"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Need Help?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about your registration or need assistance, we're here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="tel:+12345678900"
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      📞 Call Us: (234) 567-8900
                    </a>
                    <a
                      href="mailto:info@apfootballacademy.com"
                      className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      ✉️ Email Us
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