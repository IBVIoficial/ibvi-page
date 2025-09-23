'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const OverviewSection = () => {
   const t = useTranslations('overview');
   return (
      <section id="overview" className="py-24 md:py-32 bg-surface-secondary">
         <div className="container mx-auto px-8 lg:px-16">
            <div className="flex flex-col items-center mb-16">
               <div className="w-12 h-[1px] bg-text-primary/20 mb-8"></div>
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-light text-text-primary text-center leading-tight">
                  {t.rich('title', {primary: (chunks) => <span className="font-normal">{chunks}</span>})}
               </h2>
            </div>

            <div className="max-w-5xl mx-auto">
               <p className="font-inter font-light text-text-secondary text-base md:text-lg leading-relaxed text-center mb-20 max-w-4xl mx-auto">
                  {t('main_paragraph')}
               </p>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                  <div className="bg-surface-primary border border-border-light p-10 text-center">
                     <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-tertiary">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="1.5"
                                 d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                           </svg>
                        </div>
                     </div>
                     <p className="text-3xl md:text-4xl font-inter font-normal text-text-primary mb-4">{t('market_value_stat_value')}</p>
                     <p className="font-inter font-light text-text-tertiary text-sm tracking-wide">{t('market_value_stat_label')}</p>
                  </div>

                  <div className="bg-surface-primary border border-border-light p-10 text-center">
                     <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-tertiary">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="1.5"
                                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                           </svg>
                        </div>
                     </div>
                     <p className="text-3xl md:text-4xl font-inter font-normal text-text-primary mb-4">{t('annual_transactions_stat_value')}</p>
                     <p className="font-inter font-light text-text-tertiary text-sm tracking-wide">{t('annual_transactions_stat_label')}</p>
                  </div>

                  <div className="bg-surface-primary border border-border-light p-10 text-center">
                     <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-tertiary">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                        </div>
                     </div>
                     <p className="text-3xl md:text-4xl font-inter font-normal text-text-primary mb-4">{t('valuation_challenges_stat_value')}</p>
                     <p className="font-inter font-light text-text-tertiary text-sm tracking-wide">{t('valuation_challenges_stat_label')}</p>
                  </div>
               </div>

               <div className="flex justify-center mt-20">
                  <div className="w-12 h-[1px] bg-text-primary/20"></div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default OverviewSection;
