'use client';

import React from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import LocaleSwitch from './locale-switch';
import {usePathname} from 'next/navigation';

const Navigation = () => {
   const t = useTranslations('navigation');
   const pathname = usePathname();
   const hrefHome = pathname === '/' ? '' : '/';

   if (pathname === '/gpt') return null;

   return (
      <nav
         className="fixed top-0 w-full bg-surface-primary backdrop-blur-md z-50 transition-all duration-300 animate-fade-in border-b border-border-default luxury-shadow"
         data-delay="0"
      >
         <div className="container mx-auto px-6 py-4 md:px-3">
            <div className="flex items-center justify-between md:justify-start lg:justify-between">
               <Link href="/" className="flex items-center">
                  <img src="/images/ibvi-logo.png" alt="IBVI Logo" className="h-10 w-auto" width={160} height={40} />
               </Link>
               <div className="hidden md:flex space-x-10 text-sm md:space-x-0 ml-2">
                  <Link href={`${hrefHome}#overview}`} className="text-text-primaryhover:text-link md:mt-2 md:mr-4 transition-colors font-medium">
                     {t('overview')}
                  </Link>
                  <Link href={`${hrefHome}#challenges`} className="text-text-primary md:mr-4 md:mt-2 hover:text-link transition-colors font-medium">
                     {t('challenges')}
                  </Link>
                  <Link href={`${hrefHome}#solution`} className="text-text-primary md:mr-4 md:mt-2 hover:text-link transition-colors font-medium">
                     {t('solution')}
                  </Link>
                  <Link href={`${hrefHome}#investment`} className="text-text-primary md:mr-4 md:mt-2 hover:text-link transition-colors font-medium">
                     {t('investment')}
                  </Link>
                  <Link href="/about" className="text-text-primary md:mt-2 hover:text-link md:mr-4 transition-colors font-medium">
                     {t('about')}
                  </Link>
               </div>
               <div className="hidden md:flex items-center space-x-4">
                  <LocaleSwitch />
                  <a
                     href="#contact"
                     className="text-sm bg-[#005A6B] rounded-full text-text-inverse  px-6 py-2.5 hover:bg-primary-hover transition-all font-medium tracking-wide shadow-md"
                  >
                     {t('contact')}
                  </a>
               </div>
               <div className="md:hidden">
                  <LocaleSwitch />
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navigation;
