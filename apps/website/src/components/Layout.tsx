import React from 'react';
import { NextSeo } from 'next-seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  noindex?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'AP Football Academy - Professional Football Training',
  description = 'Join AP Football Academy for professional football training programs for ages 8-30. Expert coaches, modern facilities, and comprehensive development programs.',
  canonical,
  openGraph,
  noindex = false,
}) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        noindex={noindex}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          site_name: 'AP Football Academy',
          title: openGraph?.title || title,
          description: openGraph?.description || description,
          images: openGraph?.images || [
            {
              url: 'https://your-domain.com/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'AP Football Academy',
            },
          ],
        }}
        twitter={{
          handle: '@apfootballacademy',
          site: '@apfootballacademy',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'football academy, soccer training, youth sports, professional coaching, football skills development, sports training programs',
          },
          {
            name: 'author',
            content: 'AP Football Academy',
          },
          {
            name: 'robots',
            content: noindex ? 'noindex, nofollow' : 'index, follow',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
          },
          {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'anonymous',
          },
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap',
          },
        ]}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout; 