'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const ExpertiseSection = () => {
   const t = useTranslations('about');

   return (
      <section className="py-16 md:py-24 bg-surface-secondary transition-opacity duration-500 animate-fade-in" data-delay="400">
         <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
               <div className="w-16 h-0.5 bg-primary mb-6 mx-auto"></div>
               <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-zinc-800 dark:text-zinc-900 mb-8">{t('expertise.title')}</h2>
               <p className="text-lg text-text-tertiary mb-12 leading-relaxed">{t('expertise.description')}</p>

               <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                     <div className="text-4xl font-playfair font-semibold text-primary mb-2">{t('expertise.experience_years')}</div>
                     <p className="text-text-tertiary">{t('expertise.experience_description')}</p>
                  </div>
                  <div>
                     <div className="text-4xl font-playfair font-semibold text-primary mb-2">{t('expertise.data_points')}</div>
                     <p className="text-text-tertiary">{t('expertise.data_points_description')}</p>
                  </div>
                  <div>
                     <div className="text-4xl font-playfair font-semibold text-primary mb-2">{t('expertise.accuracy_rate')}</div>
                     <p className="text-text-tertiary">{t('expertise.accuracy_description')}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default ExpertiseSection;
