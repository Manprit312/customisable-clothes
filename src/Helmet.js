import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOWrapper = ({ children }) => {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Wardrobe Clothes - Custom T-Shirt Designer</title>
        <meta name="title" content="Wardrobe Clothes - Custom T-Shirt Designer" />
        <meta 
          name="description" 
          content="Create your own custom t-shirt design. Upload images, choose colors, and customize your perfect t-shirt with our easy-to-use online designer." 
        />

        {/* Google AdSense Verification */}
        <meta name="google-adsense-account" content="ca-pub-6342305342378595" />
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6342305342378595"
          crossOrigin="anonymous"
        />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/image/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/image/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordrobeclothes.netlify.app/" />
        <meta property="og:title" content="Wardrobe Clothes - Custom T-Shirt Designer" />
        <meta 
          property="og:description" 
          content="Design your perfect custom t-shirt with our online tool. Choose colors, upload images, and create unique designs." 
        />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://wordrobeclothes.netlify.app/" />
        <meta property="twitter:title" content="Wardrobe Clothes - Custom T-Shirt Designer" />
        <meta 
          property="twitter:description" 
          content="Design your perfect custom t-shirt with our online tool. Choose colors, upload images, and create unique designs." 
        />
        <meta property="twitter:image" content="/og-image.jpg" />

        {/* Keywords */}
        <meta 
          name="keywords" 
          content="custom t-shirt, t-shirt designer, custom clothing, wardrobe clothes, personalized t-shirts, custom apparel, online t-shirt maker" 
        />
      </Helmet>
      {children}
    </>
  );
};

export default SEOWrapper;