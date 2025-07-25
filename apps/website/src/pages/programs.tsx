import React from 'react';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import Programs from '../components/Programs';

const ProgramsPage: React.FC = () => {
  return (
    <Layout
      title="برنامه‌های آموزشی - آکادمی فوتبال AP"
      description="برنامه‌های آموزشی جامع فوتبال برای تمام سنین از 8 تا 30 سال. مربیان حرفه‌ای، امکانات مدرن و روش‌های آموزشی نوین."
      canonical="https://ap-football.com/programs"
      openGraph={{
        title: 'برنامه‌های آموزشی - آکادمی فوتبال AP',
        description: 'برنامه‌های آموزشی جامع فوتبال برای تمام سنین از 8 تا 30 سال',
        images: [
          {
            url: 'https://ap-football.com/images/programs-og.jpg',
            width: 1200,
            height: 630,
            alt: 'برنامه‌های آموزشی آکادمی فوتبال AP',
          },
        ],
      }}
    >
      <NextSeo
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'برنامه آموزشی فوتبال, کلاس فوتبال, آموزش فوتبال کودکان, آموزش فوتبال نوجوانان, آموزش فوتبال بزرگسالان',
          },
        ]}
      />
      <Programs />
    </Layout>
  );
};

export default ProgramsPage; 