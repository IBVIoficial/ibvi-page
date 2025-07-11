'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const CTASection = () => {
   const t = useTranslations('about');

   return (
      <section className="py-16 md:py-24 bg-surface-primary transition-opacity duration-500 animate-fade-in" data-delay="500">
         <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
               <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-6">{t('cta.title')}</h2>
               <p className="text-lg text-text-tertiary mb-10 leading-relaxed">{t('cta.description')}</p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                     href="/#solution"
                     className="bg-primary text-text-inverse font-medium tracking-wide rounded-md px-8 py-4 hover:bg-primary-hover transition-all text-sm uppercase shadow-md"
                  >
                     {t('cta.explore_solution')}
                  </a>
                  <a
                     href="/#contact"
                     className="border-2 border-primary text-primary font-medium tracking-wide rounded-md px-8 py-3.5 hover:bg-primary hover:text-text-inverse hover:border-transparent transition-all text-sm uppercase shadow-md"
                  >
                     {t('cta.get_in_touch')}
                  </a>
               </div>
            </div>
         </div>
      </section>
   );
};

export default CTASection;
