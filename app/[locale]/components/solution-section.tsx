'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const SolutionSection = () => {
   const t = useTranslations('solution');
   return (
      <section id="solution" className="py-20 md:py-28 bg-surface-secondary relative overflow-hidden">
         {/* Subtle background pattern */}
         <div className="absolute inset-0 opacity-[0.02]">
            <div
               className="absolute inset-0"
               style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #005A6B 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
               }}
            ></div>
         </div>

         <div className="container mx-auto px-6 lg:px-12 relative z-10">
            {/* Header Section with enhanced typography */}
            <div className="flex flex-col items-center mb-20">
               <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#005A6B]"></div>
                  <span className="text-xs font-medium tracking-[0.2em] text-[#005A6B] uppercase">Tecnologia & Inovação</span>
                  <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#005A6B]"></div>
               </div>

               <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-inter font-light text-text-primary text-center leading-[1.1] mb-6">
                  {t.rich('title', {
                     primary: (chunks) => (
                        <span className="font-semibold bg-gradient-to-r from-[#005A6B] to-[#007A8F] bg-clip-text text-transparent">{chunks}</span>
                     ),
                  })}
               </h2>

               <p className="font-inter font-light text-text-secondary text-base md:text-lg leading-relaxed max-w-4xl mx-auto text-center">
                  {t('description')}
               </p>
            </div>

            {/* Cards Grid with modern styling */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
               {/* Card 1 - Redução de Prazo */}
               <div className="group relative bg-surface-primary border border-border-light rounded-3xl p-8 transition-all duration-300 hover:border-[#005A6B]/30 hover:shadow-2xl hover:shadow-[#005A6B]/5 hover:-translate-y-1 shadow-xl">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#005A6B]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                  <div className="relative z-10">
                     {/* Icon with modern container */}
                     <div className="relative mb-6">
                        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] rounded-2xl shadow-lg shadow-[#005A6B]/20 group-hover:scale-110 transition-transform duration-300">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                           </svg>
                        </div>
                     </div>

                     <h3 className="text-lg font-inter font-medium text-text-primary mb-3 group-hover:text-[#005A6B] transition-colors">
                        {t('data_driven_valuations.title')}
                     </h3>

                     <p className="font-inter font-light text-text-tertiary text-sm leading-relaxed">{t('data_driven_valuations.description')}</p>
                  </div>
               </div>

               {/* Card 2 - Eficiência Operacional */}
               <div className="group relative bg-surface-primary border border-border-light rounded-3xl p-8 transition-all duration-300 hover:border-[#005A6B]/30 hover:shadow-3xl hover:shadow-[#005A6B]/5 hover:-translate-y-1 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#005A6B]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                  <div className="relative z-10">
                     <div className="relative mb-6">
                        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] rounded-2xl shadow-lg shadow-[#005A6B]/20 group-hover:scale-110 transition-transform duration-300">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="1.5"
                                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                           </svg>
                        </div>
                     </div>

                     <h3 className="text-lg font-inter font-medium text-text-primary mb-3 group-hover:text-[#005A6B] transition-colors">
                        {t('predictive_analytics.title')}
                     </h3>

                     <p className="font-inter font-light text-text-tertiary text-sm leading-relaxed">{t('predictive_analytics.description')}</p>
                  </div>
               </div>

               {/* Card 3 - Índice Padronizado */}
               <div className="group relative bg-surface-primary border border-border-light rounded-3xl p-8 transition-all duration-300 hover:border-[#005A6B]/30 hover:shadow-3xl hover:shadow-[#005A6B]/5 hover:-translate-y-1 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#005A6B]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                  <div className="relative z-10">
                     <div className="relative mb-6">
                        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] rounded-2xl shadow-lg shadow-[#005A6B]/20 group-hover:scale-110 transition-transform duration-300">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="1.5"
                                 d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                           </svg>
                        </div>
                     </div>

                     <h3 className="text-lg font-inter font-medium text-text-primary mb-3 group-hover:text-[#005A6B] transition-colors">
                        {t('intelligent_search.title')}
                     </h3>

                     <p className="font-inter font-light text-text-tertiary text-sm leading-relaxed">{t('intelligent_search.description')}</p>
                  </div>
               </div>

               {/* Card 4 - Autoridade */}
               <div className="group relative bg-surface-primary border border-border-light rounded-3xl p-8 transition-all duration-300 hover:border-[#005A6B]/30 hover:shadow-3xl hover:shadow-[#005A6B]/5 hover:-translate-y-1 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#005A6B]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                  <div className="relative z-10">
                     <div className="relative mb-6">
                        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] rounded-2xl shadow-lg shadow-[#005A6B]/20 group-hover:scale-110 transition-transform duration-300">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="1.5"
                                 d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                           </svg>
                        </div>
                     </div>

                     <h3 className="text-lg font-inter font-medium text-text-primary mb-3 group-hover:text-[#005A6B] transition-colors">
                        {t('standardized_index.title')}
                     </h3>

                     <p className="font-inter font-light text-text-tertiary text-sm leading-relaxed">{t('standardized_index.description')}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default SolutionSection;
