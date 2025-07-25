import React from 'react';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import CoachSpotlight from '../components/CoachSpotlight';

const CoachesPage: React.FC = () => {
  return (
    <Layout
      title="مربیان - آکادمی فوتبال AP"
      description="آشنایی با تیم مربیگری حرفه‌ای آکادمی فوتبال AP. مربیان فیفا، تجربه بین‌المللی و تخصص در آموزش فوتبال."
      canonical="https://ap-football.com/coaches"
      openGraph={{
        title: 'مربیان - آکادمی فوتبال AP',
        description: 'آشنایی با تیم مربیگری حرفه‌ای آکادمی فوتبال AP',
        images: [
          {
            url: 'https://ap-football.com/images/coaches-og.jpg',
            width: 1200,
            height: 630,
            alt: 'مربیان آکادمی فوتبال AP',
          },
        ],
      }}
    >
      <NextSeo
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'مربی فوتبال, مربی فیفا, آموزش فوتبال حرفه‌ای, مربی با تجربه, تیم مربیگری',
          },
        ]}
      />
      <CoachSpotlight />
    </Layout>
  );
};

export default CoachesPage; 