'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const MissionSection = () => {
   const t = useTranslations('about');

   return (
      <section id="mission" className="py-20 md:py-28 bg-white dark:bg-gray-900 relative overflow-hidden">
         {/* Subtle background pattern */}
         <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
            <div
               className="absolute inset-0"
               style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #005A6B 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
               }}
            />
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
               {/* Section Header */}
               <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 mb-6 animate-fade-in" data-delay="0">
                     <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#005A6B]"></div>
                     <span className="text-xs font-medium tracking-[0.2em] text-[#005A6B] dark:text-[#005A6B] uppercase">Nossa Missão</span>
                     <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#005A6B]"></div>
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-inter font-semibold mb-6 animate-fade-in" data-delay="100">
                     <span className="text-[#1f2937] dark:text-white">{t('mission.title').split(' ').slice(0, -1).join(' ')} </span>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F]">
                        {t('mission.title').split(' ').slice(-1).join(' ')}
                     </span>
                  </h2>
               </div>

               {/* Mission Cards */}
               <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                  {/* Card 1 - Transparency */}
                  <div className="group relative animate-fade-in" data-delay="200">
                     <div className="bg-surface-primary dark:bg-gray-800 rounded-2xl p-8 border border-border-light dark:border-gray-700 hover:border-[#005A6B]/30 dark:hover:border-[#005A6B]/40 hover:shadow-lg hover:shadow-[#005A6B]/10 hover:-translate-y-1 transition-all duration-300 h-full">
                        {/* Icon Container */}
                        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              />
                           </svg>
                        </div>

                        <h3 className="text-xl font-inter font-semibold text-text-primary dark:text-white mb-4 group-hover:text-[#005A6B] dark:group-hover:text-[#00758f] transition-colors">
                           {t('mission.transparency.title')}
                        </h3>

                        <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed group-hover:text-text-secondary dark:group-hover:text-gray-300 transition-colors duration-300">
                           {t('mission.transparency.description')}
                        </p>
                     </div>
                  </div>

                  {/* Card 2 - Precision */}
                  <div className="group relative animate-fade-in" data-delay="300">
                     <div className="bg-surface-primary dark:bg-gray-800 rounded-2xl p-8 border border-border-light dark:border-gray-700 hover:border-[#005A6B]/30 dark:hover:border-[#005A6B]/40 hover:shadow-lg hover:shadow-[#005A6B]/10 hover:-translate-y-1 transition-all duration-300 h-full">
                        {/* Icon Container */}
                        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                           </svg>
                        </div>

                        <h3 className="text-xl font-inter font-semibold text-text-primary dark:text-white mb-4 group-hover:text-[#005A6B] dark:group-hover:text-[#00758f] transition-colors">
                           {t('mission.precision.title')}
                        </h3>

                        <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed group-hover:text-text-secondary dark:group-hover:text-gray-300 transition-colors duration-300">
                           {t('mission.precision.description')}
                        </p>
                     </div>
                  </div>

                  {/* Card 3 - Innovation */}
                  <div className="group relative animate-fade-in" data-delay="400">
                     <div className="bg-surface-primary dark:bg-gray-800 rounded-2xl p-8 border border-border-light dark:border-gray-700 hover:border-[#005A6B]/30 dark:hover:border-[#005A6B]/40 hover:shadow-lg hover:shadow-[#005A6B]/10 hover:-translate-y-1 transition-all duration-300 h-full">
                        {/* Icon Container */}
                        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                           </svg>
                        </div>

                        <h3 className="text-xl font-inter font-semibold text-text-primary dark:text-white mb-4 group-hover:text-[#005A6B] dark:group-hover:text-[#00758f] transition-colors">
                           {t('mission.innovation.title')}
                        </h3>

                        <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed group-hover:text-text-secondary dark:group-hover:text-gray-300 transition-colors duration-300">
                           {t('mission.innovation.description')}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Stats Section */}
               <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center animate-fade-in" data-delay="500">
                     <div className="text-4xl md:text-5xl font-inter font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F] mb-4">
                        90%+
                     </div>
                     <p className="text-sm font-inter font-medium text-text-tertiary dark:text-gray-400 uppercase tracking-wider">Precisão nas Avaliações</p>
                  </div>

                  <div className="text-center animate-fade-in" data-delay="600">
                     <div className="text-4xl md:text-5xl font-inter font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F] mb-4">
                        1M+
                     </div>
                     <p className="text-sm font-inter font-medium text-text-tertiary dark:text-gray-400 uppercase tracking-wider">Avaliações por Dia</p>
                  </div>

                  <div className="text-center animate-fade-in" data-delay="700">
                     <div className="text-4xl md:text-5xl font-inter font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F] mb-4">
                        60%
                     </div>
                     <p className="text-sm font-inter font-medium text-text-tertiary dark:text-gray-400 uppercase tracking-wider">Redução de Tempo</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default MissionSection;
