'use client';

import React from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import LocaleSwitch from './locale-switch';

const Navigation = () => {
   const t = useTranslations('navigation');

   return (
      <nav
         className="fixed top-0 w-full bg-surface-primary backdrop-blur-md z-50 transition-all duration-300 animate-fade-in border-b border-border-default luxury-shadow"
         data-delay="0"
      >
         <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
               <Link href="/" className="flex items-center">
                  <img src="/images/ibvi-logo.png" alt="IBVI Logo" className="h-10 w-auto" width={160} height={40} />
               </Link>
               <div className="hidden md:flex space-x-10 text-sm">
                  <a href="#overview" className="text-text-primary hover:text-link transition-colors font-medium">
                     {t('overview')}
                  </a>
                  <a href="#challenges" className="text-text-primary hover:text-link transition-colors font-medium">
                     {t('challenges')}
                  </a>
                  <a href="#solution" className="text-text-primary hover:text-link transition-colors font-medium">
                     {t('solution')}
                  </a>
                  <a href="#investment" className="text-text-primary hover:text-link transition-colors font-medium">
                     {t('investment')}
                  </a>
                  <Link href="/about" className="text-text-primary hover:text-link transition-colors font-medium">
                     {t('about')}
                  </Link>
               </div>
               <div className="hidden md:flex items-center space-x-4">
                  <LocaleSwitch />
                  <a
                     href="#contact"
                     className="text-sm bg-primary text-text-inverse rounded-md px-6 py-3.5 hover:bg-primary-hover transition-all font-medium tracking-wide shadow-md"
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
