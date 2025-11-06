import {ReactNode} from 'react';
import {Metadata} from 'next';

export const metadata: Metadata = {
   title: 'IBVI | A FIPE do Mercado Imobiliário',
   description:
      'O IBVI utiliza análises avançadas, aprendizado de máquina e avaliações padronizadas para impulsionar a transparência, precisão e eficiência no mercado imobiliário brasileiro.',
   keywords: 'IBVI, FIPE, mercado imobiliário, avaliação de imóveis, transparência imobiliária, precisão imobiliária, eficiência imobiliária',
   applicationName: 'IBVI Luxury Real Estate',
   authors: [{name: 'IBVI', url: 'https://www.ibvi.com.br'}],
   generator: 'Next.js',
   creator: 'IBVI',
   publisher: 'IBVI',
   formatDetection: {
      email: false,
      telephone: false,
   },
   metadataBase: new URL('https://www.ibvi.com.br'),
   alternates: {
      canonical: '/',
   },
   openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: 'https://www.ibvi.com.br',
      title: 'IBVI | A FIPE do Mercado Imobiliário',
      description:
         'O IBVI utiliza análises avançadas, aprendizado de máquina e avaliações padronizadas para impulsionar a transparência, precisão e eficiência no mercado imobiliário brasileiro.',
      siteName: 'IBVI',
      images: [
         {
            url: '/images/icon.png',
            alt: 'IBVI Logo',
         },
      ],
   },
   twitter: {
      card: 'summary_large_image',
      title: 'IBVI | A FIPE do Mercado Imobiliário',
      description: 'O IBVI utiliza análises avançadas, aprendizado de máquina e avaliações padronizadas para impulsionar a transparência, precisão e eficiência no mercado imobiliário brasileiro.',
      images: ['https://img.mbras.com.br/ibvi/ibvi.png'],
   },
   robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
         index: true,
         follow: true,
         'max-image-preview': 'large',
         'max-snippet': -1,
      },
   },
   verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
   },
};

export default function RootLayout({children}: {children: ReactNode}) {
   return children;
}
