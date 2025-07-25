import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import './globals.css'; // Styles for this locale
import ClientLayout from './components/client-layout';
import Navigation from './components/navigation';
import Footer from './components/footer';
import GoogleAnalytics from './components/google-analytics';
import {routing} from '@/i18n/routing';
import {ChatStateProvider} from '@/contexts/ChatStateContext';

import {Montserrat, Quicksand, Anek_Bangla} from 'next/font/google';

export function generateStaticParams() {
   return routing.locales.map((locale) => ({locale}));
}

// Metadata can only be used in a Server Component
export const metadata: Metadata = {
   metadataBase: new URL('https://ibvi.com.br'),
   title: 'IBVI: Brazilian Real Estate Intelligence',
   description: 'Transforming Brazilian Real Estate through AI and Data Intelligence.',
   keywords: 'IBVI, real estate, Brazil, property valuation, AI, data intelligence, luxury real estate',
   openGraph: {
      title: 'IBVI: Brazilian Real Estate Intelligence',
      description: 'Transforming Brazilian Real Estate through AI and Data Intelligence.',
      images: [
         {
            url: '/images/ibvi-logo.png',
            width: 800,
            height: 600,
            alt: 'IBVI Logo',
         },
      ],
   },
};

const quicksand = Quicksand({
   subsets: ['latin'],
   variable: '--font-questrial',
   display: 'swap',
});

const anekbangla = Anek_Bangla({
   subsets: ['latin'],
   variable: '--font-anekbangla',
   display: 'swap',
});

const montserrat = Montserrat({
   subsets: ['latin'],
   variable: '--font-montserrat',
   display: 'swap',
});

// Server Component for layout
export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
   const {locale} = await params;
   const messages = await getMessages();

   return (
      <html lang={locale} className="scroll-smooth">
         <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
               href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
               rel="stylesheet"
            />
            <link rel="icon" href="/images/ibvi-logo.png" />
         </head>
         <body
            className={`font-inter ${quicksand.variable}
     ${anekbangla.variable} ${montserrat.variable} bg-background text-bw font-montserrat`}
         >
            <ChatStateProvider>
               <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
               <NextIntlClientProvider locale={locale} messages={messages}>
                  <Navigation />
                  <ClientLayout>
                     <main>{children}</main>
                     <Footer />
                  </ClientLayout>
               </NextIntlClientProvider>
            </ChatStateProvider>
         </body>
      </html>
   );
}
