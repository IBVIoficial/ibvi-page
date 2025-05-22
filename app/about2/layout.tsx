"use client"

import Head from 'next/head';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* Preconnect and Font links are better here or via next/font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </Head>
      <body className="bg-black text-white">
        {/* Tailwind CSS CDN Script - For production, prefer installing Tailwind CSS as a PostCSS plugin */}
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        
        {/* Global Styles - These would typically be in app/globals.css */}
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Geist', 'Inter', sans-serif;
          }
          
          body, html {
            height: 100%;
            overflow-x: hidden; /* Allow vertical scroll, hide horizontal */
            scroll-behavior: smooth;
          }
          
          .spline-container {
            position: fixed; /* Fixed to stay in background during scroll */
            width: 100%;
            height: 100%;
            z-index: -1;
            top: 0;
            left: 0;
          }
          
          .content-container {
            position: relative;
            z-index: 10;
          }
          section {
            padding-top: 4rem; /* 64px */
            padding-bottom: 4rem; /* 64px */
          }
          section:first-of-type {
              padding-top: 2rem; /* Less padding for the first content section after nav */
          }
        `}</style>

        {/* Spline Background */}
        <div className="spline-container">
          <iframe src='https://my.spline.design/claritystream-a72K0KUwFoZV82QBzvu52Kai/' frameBorder='0' width='100%' height='100%'></iframe>
        </div>

        {/* Content Overlay */}
        <div className="content-container">
          {children}
        </div>
      </body>
    </html>
  );
}
