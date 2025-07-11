'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const TechnologySection = () => {
   const t = useTranslations('about');
   return (
      <section className="py-16 md:py-24 bg-surface-primary transition-opacity duration-500 animate-fade-in" data-delay="300">
         <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-16">
                  <div className="w-16 h-0.5 bg-primary mb-6 mx-auto"></div>
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-8">{t('technology.title')}</h2>
                  <p className="text-lg text-text-tertiary max-w-3xl mx-auto">{t('technology.description')}</p>
               </div>

               <div className="grid md:grid-cols-2 gap-12">
                  <div className="bg-surface-primary p-8 luxury-shadow border-l-4 border-primary">
                     <h3 className="text-2xl font-playfair font-semibold text-text-primary mb-4">{t('technology.machine_learning.title')}</h3>
                     <p className="text-text-tertiary leading-relaxed mb-6">{t('technology.machine_learning.description')}</p>
                     <ul className="space-y-2 text-text-tertiary">
                        <li className="flex items-center">
                           <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                           {t('technology.machine_learning.feature_1')}
                        </li>
                        <li className="flex items-center">
                           <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                           {t('technology.machine_learning.feature_2')}
                        </li>
                        <li className="flex items-center">
                           <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                           {t('technology.machine_learning.feature_3')}
                        </li>
                     </ul>
                  </div>

                  <div className="bg-surface-primary p-8 luxury-shadow border-l-4 border-primary">
                     <h3 className="text-2xl font-playfair font-semibold text-text-primary mb-4">{t('technology.intelligent_search.title')}</h3>
                     <p className="text-text-tertiary leading-relaxed mb-6">{t('technology.intelligent_search.description')}</p>
                     <ul className="space-y-2 text-text-tertiary">
                        <li className="flex items-center">
                           <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                           {t('technology.intelligent_search.feature_1')}
                        </li>
                        <li className="flex items-center">
                           <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                           {t('technology.intelligent_search.feature_2')}
                        </li>
                        <li className="flex items-center">
                           <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                           {t('technology.intelligent_search.feature_3')}
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default TechnologySection;
