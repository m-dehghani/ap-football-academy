import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="description" content="آکادمی فوتبال AP - بهترین آموزش فوتبال برای همه سنین" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Google Fonts for Persian */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="آکادمی فوتبال AP" />
        <meta name="keywords" content="فوتبال, آکادمی فوتبال, آموزش فوتبال, تمرین فوتبال, مربی فوتبال, ورزش" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="آکادمی فوتبال AP" />
        <meta property="og:description" content="بهترین آموزش فوتبال برای همه سنین" />
        <meta property="og:site_name" content="آکادمی فوتبال AP" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="آکادمی فوتبال AP" />
        <meta property="twitter:description" content="بهترین آموزش فوتبال برای همه سنین" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              "name": "آکادمی فوتبال AP",
              "description": "بهترین آموزش فوتبال برای همه سنین",
              "sport": "فوتبال",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "تهران",
                "addressCountry": "IR"
              }
            })
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 