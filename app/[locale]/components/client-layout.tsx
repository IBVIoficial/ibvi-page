'use client';

import {useState, useEffect} from 'react';
import {usePathname} from 'next/navigation';
// import MetaPixel from '@/lib/meta-pixel/meta-pixel';

export default function ClientLayout({children}: {children: React.ReactNode}) {
   const [theme, setTheme] = useState('light');
   const pathname = usePathname();

   useEffect(() => {
      // Check for saved theme preference or system preference
      const savedTheme = localStorage.getItem('ibvi-theme');
      if (savedTheme) {
         setTheme(savedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
         setTheme('dark');
      }
   }, []);

   useEffect(() => {
      // Apply theme to document
      if (theme === 'dark') {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
      // Save theme preference
      localStorage.setItem('ibvi-theme', theme);
   }, [theme]);

   const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
   };

   return (
      <>
         {/*<MetaPixel /> */}
         {/* Theme Switch Button - Fixed Position - Visible on all pages */}
         <button
            onClick={toggleTheme}
            className="fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 bg-surface-primary dark:bg-primary text-primary dark:text-text-inverse hover:bg-surface-secondary dark:hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 print:hidden"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
         >
            {theme === 'light' ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
               </svg>
            ) : (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
               </svg>
            )}
         </button>

         <div className="texture-overlay"></div>
         <div className="animate-page-load">{children}</div>
      </>
   );
}
