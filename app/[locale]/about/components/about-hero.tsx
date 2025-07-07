'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const AboutHero = () => {
   const t = useTranslations('about');

   return (
      <header className="py-20 md:py-28 bg-surface-primary luxury-shadow transition-opacity duration-500 animate-fade-in" data-delay="100">
         <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
               <h1 className="text-5xl md:text-7xl font-playfair font-semibold leading-tight text-text-primary mb-6">{t('title')}</h1>
               <p className="text-xl md:text-2xl font-inter text-primary mb-8 font-medium tracking-wide">{t('subtitle')}</p>
               <p className="text-base md:text-lg text-text-tertiary max-w-3xl mx-auto mb-10 leading-relaxed">{t('description')}</p>
            </div>
         </div>
      </header>
   );
};

export default AboutHero;
