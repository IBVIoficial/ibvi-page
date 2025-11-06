'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const TechnologySection = () => {
   const t = useTranslations('about');

   return (
      <section id="technology" className="py-20 md:py-28 bg-gradient-to-b from-white to-cream dark:from-gray-900 dark:to-[#0a0f12] relative overflow-hidden">
         {/* Background Elements */}
         <div className="absolute inset-0">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-[#005A6B]/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-tl from-[#007A8F]/5 to-transparent rounded-full blur-3xl"></div>
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
               {/* Section Header */}
               <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 mb-6 animate-fade-in" data-delay="0">
                     <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#005A6B]"></div>
                     <span className="text-xs font-medium tracking-[0.2em] text-[#005A6B] dark:text-[#005A6B] uppercase">{t('technology_badge')}</span>
                     <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#005A6B]"></div>
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-inter font-semibold mb-6 animate-fade-in" data-delay="100">
                     <span className="text-[#1f2937] dark:text-white">{t('technology.title').split(' ').slice(0, -1).join(' ')} </span>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F]">
                        {t('technology.title').split(' ').slice(-1).join(' ')}
                     </span>
                  </h2>

                  <p
                     className="text-base md:text-lg lg:text-xl font-inter font-light text-text-tertiary dark:text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in"
                     data-delay="200"
                  >
                     {t('technology.description')}
                  </p>
               </div>

               {/* Technology Cards Grid */}
               <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
                  {/* Machine Learning Card */}
                  <div className="group animate-fade-in" data-delay="300">
                     <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-border-light dark:border-gray-700 hover:border-[#005A6B]/30 dark:hover:border-[#005A6B]/40 hover:shadow-xl hover:shadow-[#005A6B]/10 hover:-translate-y-2 transition-all duration-300 h-full">
                        {/* Card Header with Gradient */}
                        <div className="bg-gradient-to-br from-[#005A6B] to-[#007A8F] p-8 relative overflow-hidden group-hover:bg-gradient-to-tr transition-all duration-300">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                           <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                           <div className="relative z-10">
                              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                 </svg>
                              </div>
                              <h3 className="text-2xl font-inter font-semibold text-white">{t('technology.machine_learning.title')}</h3>
                           </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-8">
                           <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed mb-8 group-hover:text-text-secondary dark:group-hover:text-gray-300 transition-colors duration-300">
                              {t('technology.machine_learning.description')}
                           </p>

                           <div className="space-y-4">
                              {/* Feature 1 */}
                              <div className="flex items-start gap-3">
                                 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#005A6B] to-[#007A8F] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                 </div>
                                 <span className="font-inter font-medium text-sm text-text-primary dark:text-gray-200 group-hover:text-[#005A6B] dark:group-hover:text-[#007A8F] transition-colors duration-300">
                                    {t('technology.machine_learning.feature_1')}
                                 </span>
                              </div>

                              {/* Feature 2 */}
                              <div className="flex items-start gap-3">
                                 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#005A6B] to-[#007A8F] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                 </div>
                                 <span className="font-inter font-medium text-sm text-text-primary dark:text-gray-200 group-hover:text-[#005A6B] dark:group-hover:text-[#007A8F] transition-colors duration-300">
                                    {t('technology.machine_learning.feature_2')}
                                 </span>
                              </div>

                              {/* Feature 3 */}
                              <div className="flex items-start gap-3">
                                 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#005A6B] to-[#007A8F] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                 </div>
                                 <span className="font-inter font-medium text-sm text-text-primary dark:text-gray-200 group-hover:text-[#005A6B] dark:group-hover:text-[#007A8F] transition-colors duration-300">
                                    {t('technology.machine_learning.feature_3')}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Intelligent Search Card */}
                  <div className="group animate-fade-in" data-delay="400">
                     <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-border-light dark:border-gray-700 hover:border-[#005A6B]/30 dark:hover:border-[#005A6B]/40 hover:shadow-xl hover:shadow-[#005A6B]/10 hover:-translate-y-2 transition-all duration-300 h-full">
                        {/* Card Header with Gradient */}
                        <div className="bg-gradient-to-br from-[#007A8F] to-[#005A6B] p-8 relative overflow-hidden group-hover:bg-gradient-to-tr transition-all duration-300">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                           <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                           <div className="relative z-10">
                              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                 </svg>
                              </div>
                              <h3 className="text-2xl font-inter font-semibold text-white">{t('technology.intelligent_search.title')}</h3>
                           </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-8">
                           <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed mb-8 group-hover:text-text-secondary dark:group-hover:text-gray-300 transition-colors duration-300">
                              {t('technology.intelligent_search.description')}
                           </p>

                           <div className="space-y-4">
                              {/* Feature 1 */}
                              <div className="flex items-start gap-3">
                                 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#007A8F] to-[#005A6B] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                 </div>
                                 <span className="font-inter font-medium text-sm text-text-primary dark:text-gray-200 group-hover:text-[#005A6B] dark:group-hover:text-[#007A8F] transition-colors duration-300">
                                    {t('technology.intelligent_search.feature_1')}
                                 </span>
                              </div>

                              {/* Feature 2 */}
                              <div className="flex items-start gap-3">
                                 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#007A8F] to-[#005A6B] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                 </div>
                                 <span className="font-inter font-medium text-sm text-text-primary dark:text-gray-200 group-hover:text-[#005A6B] dark:group-hover:text-[#007A8F] transition-colors duration-300">
                                    {t('technology.intelligent_search.feature_2')}
                                 </span>
                              </div>

                              {/* Feature 3 */}
                              <div className="flex items-start gap-3">
                                 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#007A8F] to-[#005A6B] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                 </div>
                                 <span className="font-inter font-medium text-sm text-text-primary dark:text-gray-200 group-hover:text-[#005A6B] dark:group-hover:text-[#007A8F] transition-colors duration-300">
                                    {t('technology.intelligent_search.feature_3')}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default TechnologySection;
