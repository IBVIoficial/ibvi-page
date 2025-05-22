import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./components/client-layout";

// Metadata can only be used in a Server Component
export const metadata: Metadata = {
  title: 'IBVI: Brazilian Real Estate Intelligence',
  description: 'Transforming Brazilian Real Estate through AI and Data Intelligence.',
};

// Server Component for layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-teal-100 text-slate-700 font-inter">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
