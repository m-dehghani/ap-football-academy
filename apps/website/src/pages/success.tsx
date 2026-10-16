import React from 'react';
import Layout from '@/components/Layout';
import SuccessStories from '@/components/SuccessStories';

const SuccessPage: React.FC = () => (
  <Layout
    title="داستان‌های موفقیت - آکادمی فوتبال AP"
    description="افتخارات، تجربه‌ها و مسیر پیشرفت بازیکنان آکادمی فوتبال AP."
    canonical="https://ap-football.com/success"
  >
    <SuccessStories />
  </Layout>
);

export default SuccessPage;
