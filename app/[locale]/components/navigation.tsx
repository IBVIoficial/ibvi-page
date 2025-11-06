'use client';


import React, {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import LocaleSwitch from './locale-switch';
import {usePathname} from 'next/navigation';

const Navigation = () => {
   const t = useTranslations('navigation');
   const pathname = usePathname();
   const hrefHome = pathname === '/' ? '' : '/';
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   if (pathname === '/gpt') return null;

   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
   const closeMenu = () => setIsMenuOpen(false);

   return (
      <nav
         className="fixed top-0 w-full bg-white dark:bg-white z-50 transition-all duration-300 animate-fade-in border-b border-border-default luxury-shadow overflow-hidden"
         data-delay="0"
      >
         <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 md:px-3 max-w-full">
            <div className="flex items-center justify-between w-full max-w-full">
               <Link href="/" className="flex items-center" onClick={closeMenu}>
                  <img src="/images/ibvi-logo.png" alt="IBVI Logo" className="h-8 sm:h-10 w-auto" width={160} height={40} />
               </Link>

               {/* Desktop Navigation */}
               <div className="hidden lg:flex space-x-8 xl:space-x-10 text-sm ml-4">
                  <Link href={`${hrefHome}#overview`} className="text-text-primary hover:text-link transition-colors font-medium py-2">
                     {t('overview')}
                  </Link>
                  <Link href={`${hrefHome}#challenges`} className="text-text-primary hover:text-link transition-colors font-medium py-2">
                     {t('challenges')}
                  </Link>
                  <Link href={`${hrefHome}#solution`} className="text-text-primary hover:text-link transition-colors font-medium py-2">
                     {t('solution')}
                  </Link>
                  <Link href={`${hrefHome}#investment`} className="text-text-primary hover:text-link transition-colors font-medium py-2">
                     {t('investment')}
                  </Link>
                  <Link href="/about" className="text-text-primary hover:text-link transition-colors font-medium py-2">
                     {t('about')}
                  </Link>
               </div>

               {/* Desktop CTA and Locale */}
               <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
                  <LocaleSwitch />
                  <a
                     href="#contact"
                     className="text-sm bg-[#005A6B] rounded-full text-text-inverse px-5 xl:px-6 py-2 xl:py-2.5 hover:bg-primary-hover transition-all font-medium tracking-wide shadow-md whitespace-nowrap"
                  >
                     {t('contact')}
                  </a>
               </div>

               {/* Mobile Controls */}
               <div className="lg:hidden flex items-center space-x-3">
                  <LocaleSwitch />
                  <button
                     onClick={toggleMenu}
                     className="p-2 rounded-md text-text-primary hover:text-link hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                     aria-label="Toggle menu"
                  >
                     <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                     </svg>
                  </button>
               </div>
            </div>

            {/* Mobile Menu */}
            <div
               className={`lg:hidden transition-all duration-300 ease-in-out w-full max-w-full ${
                  isMenuOpen ? 'max-h-96 opacity-100 mt-4 pb-4' : 'max-h-0 opacity-0 overflow-hidden'
               }`}
            >
               <div className="flex flex-col space-y-3 px-2 w-full max-w-full">
                  <Link
                     href={`${hrefHome}#overview`}
                     className="text-text-primary hover:text-link transition-colors font-medium py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                     onClick={closeMenu}
                  >
                     {t('overview')}
                  </Link>
                  <Link
                     href={`${hrefHome}#challenges`}
                     className="text-text-primary hover:text-link transition-colors font-medium py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                     onClick={closeMenu}
                  >
                     {t('challenges')}
                  </Link>
                  <Link
                     href={`${hrefHome}#solution`}
                     className="text-text-primary hover:text-link transition-colors font-medium py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                     onClick={closeMenu}
                  >
                     {t('solution')}
                  </Link>
                  <Link
                     href={`${hrefHome}#investment`}
                     className="text-text-primary hover:text-link transition-colors font-medium py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                     onClick={closeMenu}
                  >
                     {t('investment')}
                  </Link>
                  <Link
                     href="/about"
                     className="text-text-primary hover:text-link transition-colors font-medium py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                     onClick={closeMenu}
                  >
                     {t('about')}
                  </Link>
                  <div className="pt-2 mt-2 border-t border-border-default">
                     <a
                        href="#contact"
                        className="block text-center text-sm bg-[#005A6B] rounded-full text-text-inverse px-6 py-3 hover:bg-primary-hover transition-all font-medium tracking-wide shadow-md"
                        onClick={closeMenu}
                     >
                        {t('contact')}
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navigation;