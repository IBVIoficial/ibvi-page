'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const ChallengesSection = () => {
   const t = useTranslations('challenges');
   return (
      <section id="challenges" className="py-24 md:py-32 bg-surface-primary">
         <div className="container mx-auto px-8 lg:px-16">
            <div className="flex flex-col items-center mb-16">
               <div className="w-12 h-[1px] bg-text-primary/20 mb-8"></div>
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-light text-text-primary text-center leading-tight mb-8">
                  {t.rich('title', {primary: (chunks) => <span className="font-normal">{chunks}</span>})}
               </h2>
               <p className="font-inter font-light text-text-secondary text-base md:text-lg max-w-3xl text-center leading-relaxed">{t('main_paragraph')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
               <div className="group">
                  <div className="flex items-start mb-6">
                     <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#005A6B] mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                     </div>
                     <h3 className="text-lg font-inter font-normal text-text-primary pt-2">{t('standardization_gaps.title')}</h3>
                  </div>
                  <p className="font-inter font-light text-text-tertiary text-sm leading-relaxed pl-14">{t('standardization_gaps.description')}</p>
               </div>

               <div className="group">
                  <div className="flex items-start mb-6">
                     <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#005A6B] mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                           />
                        </svg>
                     </div>
                     <h3 className="text-lg font-inter font-normal text-text-primary pt-2">{t('buyer_hurdles.title')}</h3>
                  </div>
                  <p className="font-inter font-light text-text-tertiary text-sm leading-relaxed pl-14">{t('buyer_hurdles.description')}</p>
               </div>

               <div className="group">
                  <div className="flex items-start mb-6">
                     <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#005A6B] mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                     <h3 className="text-lg font-inter font-normal text-text-primary pt-2">{t('outdated_methods.title')}</h3>
                  </div>
                  <p className="font-inter font-light text-text-tertiary text-sm leading-relaxed pl-14">{t('outdated_methods.description')}</p>
               </div>

               <div className="group">
                  <div className="flex items-start mb-6">
                     <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#005A6B] mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                           />
                        </svg>
                     </div>
                     <h3 className="text-lg font-inter font-normal text-text-primary pt-2">{t('transaction_delays.title')}</h3>
                  </div>
                  <p className="font-inter font-light text-text-tertiary text-sm leading-relaxed pl-14">{t('transaction_delays.description')}</p>
               </div>
            </div>

            <div className="flex justify-center mt-20">
               <div className="w-12 h-[1px] bg-text-primary/20"></div>
            </div>
         </div>
      </section>
   );
};

export default ChallengesSection;
