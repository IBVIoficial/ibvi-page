'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const ChallengesSection = () => {
   const t = useTranslations('challenges');

   return (
      <section id="challenges" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50/50">
         <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            {/* Header Section */}
            <div className="flex flex-col items-center mb-20">
               <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-gray-300"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-gray-300"></div>
               </div>

               <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-light text-center mb-6">
                  {t.rich('title', {
                     primary: (chunks) => <span className="font-medium text-[#00A6AB]">{chunks}</span>,
                  })}
               </h2>

               <p className="font-inter font-light text-gray-600 text-base md:text-lg max-w-3xl text-center leading-relaxed">{t('main_paragraph')}</p>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
               {/* Card 1 - Padronização com IA */}
               <div className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-gray-200">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-600 to-teal-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex items-start gap-4 mb-4">
                     <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 group-hover:from-teal-100 group-hover:to-teal-200 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                     </div>
                     <div className="flex-1">
                        <h3 className="text-lg font-inter font-medium text-gray-900 mb-2">{t('standardization_gaps.title')}</h3>
                        <p className="font-inter text-sm text-gray-600 leading-relaxed">{t('standardization_gaps.description')}</p>
                     </div>
                  </div>
               </div>

               {/* Card 2 - Precificação Técnica */}
               <div className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-gray-200">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-600 to-teal-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex items-start gap-4 mb-4">
                     <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 group-hover:from-teal-100 group-hover:to-teal-200 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                           />
                        </svg>
                     </div>
                     <div className="flex-1">
                        <h3 className="text-lg font-inter font-medium text-gray-900 mb-2">{t('buyer_hurdles.title')}</h3>
                        <p className="font-inter text-sm text-gray-600 leading-relaxed">{t('buyer_hurdles.description')}</p>
                     </div>
                  </div>
               </div>

               {/* Card 3 - Alta Escalabilidade */}
               <div className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-gray-200">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-600 to-teal-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex items-start gap-4 mb-4">
                     <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 group-hover:from-teal-100 group-hover:to-teal-200 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                     <div className="flex-1">
                        <h3 className="text-lg font-inter font-medium text-gray-900 mb-2">{t('outdated_methods.title')}</h3>
                        <p className="font-inter text-sm text-gray-600 leading-relaxed">{t('outdated_methods.description')}</p>
                     </div>
                  </div>
               </div>

               {/* Card 4 - Compliance e Rastreabilidade */}
               <div className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-gray-200">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-600 to-teal-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex items-start gap-4 mb-4">
                     <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 group-hover:from-teal-100 group-hover:to-teal-200 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                           />
                        </svg>
                     </div>
                     <div className="flex-1">
                        <h3 className="text-lg font-inter font-medium text-gray-900 mb-2">{t('transaction_delays.title')}</h3>
                        <p className="font-inter text-sm text-gray-600 leading-relaxed">{t('transaction_delays.description')}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Accent */}
            <div className="flex justify-center mt-16">
               <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300"></div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default ChallengesSection;
