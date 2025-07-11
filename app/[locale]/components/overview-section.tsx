'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const OverviewSection = () => {
   const t = useTranslations('overview');
   return (
      <section id="overview" className="py-16 md:py-24 transition-opacity duration-500 animate-fade-in" data-delay="200">
         <div className="container mx-auto px-6">
            <div className="flex flex-col items-center">
               <div className="w-16 h-0.5 bg-primary mb-6"></div>
               <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary text-center mb-8">
                  {t.rich('title', {primary: (chunks) => <span className="text-primary">{chunks}</span>})}
               </h2>
            </div>
            <div className="max-w-4xl mx-auto">
               <p className="font-inter text-text-secondary text-lg md:text-xl leading-relaxed mx-auto text-center mb-10">{t('main_paragraph')}</p>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center max-w-5xl mx-auto my-12">
                  <div className="bg-surface-primary p-8 luxury-shadow ibvi-card border-b-2 border-primary group hover:translate-y-[-5px] transition-all duration-300">
                     <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="1.5"
                                 d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                           </svg>
                        </div>
                     </div>
                     <p className="text-3xl font-playfair font-semibold text-primary mb-2">{t('market_value_stat_value')}</p>
                     <p className="font-inter text-text-secondary text-sm font-medium">{t('market_value_stat_label')}</p>
                  </div>
                  <div className="bg-surface-primary p-8 luxury-shadow ibvi-card border-b-2 border-primary group hover:translate-y-[-5px] transition-all duration-300">
                     <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="1.5"
                                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                           </svg>
                        </div>
                     </div>
                     <p className="text-3xl font-playfair font-semibold text-primary mb-2">{t('annual_transactions_stat_value')}</p>
                     <p className="font-inter text-text-secondary text-sm font-medium">{t('annual_transactions_stat_label')}</p>
                  </div>
                  <div className="bg-surface-primary p-8 luxury-shadow ibvi-card border-b-2 border-primary group hover:translate-y-[-5px] transition-all duration-300">
                     <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                        </div>
                     </div>
                     <p className="text-3xl font-playfair font-semibold text-primary mb-2">{t('valuation_challenges_stat_value')}</p>
                     <p className="font-inter text-text-secondary text-sm font-medium">{t('valuation_challenges_stat_label')}</p>
                  </div>
               </div>
               <div className="flex justify-center mt-8">
                  <div className="w-20 h-0.5 bg-primary/40"></div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default OverviewSection;
