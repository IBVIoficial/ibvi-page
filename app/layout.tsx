import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./components/client-layout";

// Metadata can only be used in a Server Component
export const metadata: Metadata = {
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

// Server Component for layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="/images/ibvi-logo.png" />
      </head>
      <body className="font-inter min-h-screen overflow-x-hidden">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
