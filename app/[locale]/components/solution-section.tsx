'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const SolutionSection = () => {
   const t = useTranslations('solution');
   return (
      <section id="solution" className="py-24 md:py-32 bg-surface-secondary">
         <div className="container mx-auto px-8 lg:px-16">
            <div className="flex flex-col items-center mb-16">
               <div className="w-12 h-[1px] bg-text-primary/20 mb-8"></div>
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-light text-text-primary text-center leading-tight mb-8">
                  {t.rich('title', {primary: (chunks) => <span className="font-normal">{chunks}</span>})}
               </h2>
               <p className="font-inter font-light text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
                  {t('description')}
               </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10 max-w-7xl mx-auto">
               <div className="bg-surface-primary border border-border-light p-10">
                  <div className="w-10 h-10 flex items-center justify-center bg-surface-tertiary rounded-full mb-8">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="1.5"
                           d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                     </svg>
                  </div>
                  <h3 className="text-lg font-inter font-normal text-text-primary mb-4">{t('data_driven_valuations.title')}</h3>
                  <p className="font-inter font-light text-text-tertiary text-sm leading-relaxed">{t('data_driven_valuations.description')}</p>
               </div>

               <div className="bg-surface-primary border border-border-light p-10">
                  <div className="w-10 h-10 flex items-center justify-center bg-surface-tertiary rounded-full mb-8">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="1.5"
                           d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                     </svg>
                  </div>
                  <h3 className="text-lg font-inter font-normal text-text-primary mb-4">{t('predictive_analytics.title')}</h3>
                  <p className="font-inter font-light text-text-tertiary text-sm leading-relaxed">{t('predictive_analytics.description')}</p>
               </div>

               <div className="bg-surface-primary border border-border-light p-10">
                  <div className="w-10 h-10 flex items-center justify-center bg-surface-tertiary rounded-full mb-8">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                     </svg>
                  </div>
                  <h3 className="text-lg font-inter font-normal text-text-primary mb-4">{t('intelligent_search.title')}</h3>
                  <p className="font-inter font-light text-text-tertiary text-sm leading-relaxed">{t('intelligent_search.description')}</p>
               </div>

               <div className="bg-surface-primary border border-border-light p-10">
                  <div className="w-10 h-10 flex items-center justify-center bg-surface-tertiary rounded-full mb-8">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="1.5"
                           d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                     </svg>
                  </div>
                  <h3 className="text-lg font-inter font-normal text-text-primary mb-4">{t('standardized_index.title')}</h3>
                  <p className="font-inter font-light text-text-tertiary text-sm leading-relaxed">{t('standardized_index.description')}</p>
               </div>
            </div>

            <div className="flex justify-center mt-20">
               <div className="max-w-4xl text-center px-8">
                  <div className="border-l-2 border-text-primary/20 pl-8">
                     <p className="font-inter font-light text-text-secondary text-lg md:text-xl italic leading-relaxed">{t('quote')}</p>
                  </div>
               </div>
            </div>

            <div className="flex justify-center mt-20">
               <div className="w-12 h-[1px] bg-text-primary/20"></div>
            </div>
         </div>
      </section>
   );
};

export default SolutionSection;
