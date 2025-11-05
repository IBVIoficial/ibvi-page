'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const ExpertiseSection = () => {
   const t = useTranslations('about');

   return (
      <section className="py-20 md:py-28 bg-white dark:bg-gray-900 relative overflow-hidden">
         {/* Background Pattern */}
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
                     <span className="text-xs font-medium tracking-[0.2em] text-[#005A6B] dark:text-[#005A6B] uppercase">{t('expertise_badge')}</span>
                     <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#005A6B]"></div>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-semibold mb-6 animate-fade-in" data-delay="100">
                     <span className="text-[#1f2937] dark:text-white">{t('expertise.title').split(' ').slice(0, -1).join(' ')} </span>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F]">
                        {t('expertise.title').split(' ').slice(-1).join(' ')}
                     </span>
                  </h2>

                  <p
                     className="text-base md:text-md lg:text-lg font-inter font-light text-text-tertiary dark:text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in"
                     data-delay="200"
                  >
                     {t('expertise.description')}
                  </p>
               </div>

               {/* Main Content Grid */}
               <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Left Side - Stats */}
                  <div className="grid grid-cols-1 gap-6 animate-fade-in" data-delay="300">
                     {/* Stat 1 */}
                     <div className="group relative">
                        <div className="bg-gradient-to-br from-white to-cream dark:from-gray-800 dark:to-gray-850 rounded-2xl p-5 border border-border-light dark:border-gray-700 hover:border-[#005A6B]/50 dark:hover:border-[#005A6B]/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#005A6B]/10 group-hover:-translate-y-1 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-[#005A6B]/5">
                           <div className="flex items-center justify-between">
                              <div>
                                 <div className="text-4xl md:text-5xl font-inter font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F] mb-1 group-hover:from-[#005A6B] group-hover:to-[#009AAF]">
                                    {t('expertise.experience_years')}
                                 </div>
                                 <p className="text-xs font-inter font-medium text-text-tertiary dark:text-gray-400 uppercase tracking-wider group-hover:text-[#005A6B]/80 dark:group-hover:text-[#005A6B]/90 transition-colors duration-300">
                                    {t('expertise.experience_description')}
                                 </p>
                              </div>
                              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#005A6B]/10 to-[#007A8F]/10 rounded-xl group-hover:scale-110 group-hover:from-[#005A6B]/20 group-hover:to-[#007A8F]/20 group-hover:rotate-6 transition-all duration-300">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[#005A6B] group-hover:text-[#005A6B]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                              </div>
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-[#005A6B]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 -z-10 group-hover:scale-105 transition-all duration-300"></div>
                     </div>

                     {/* Stat 2 */}
                     <div className="group relative">
                        <div className="bg-gradient-to-br from-white to-cream dark:from-gray-800 dark:to-gray-850 rounded-2xl p-5 border border-border-light dark:border-gray-700 hover:border-[#005A6B]/50 dark:hover:border-[#005A6B]/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#005A6B]/10 group-hover:-translate-y-1 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-[#005A6B]/5">
                           <div className="flex items-center justify-between">
                              <div>
                                 <div className="text-4xl md:text-5xl font-inter font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F] mb-1 group-hover:from-[#005A6B] group-hover:to-[#009AAF]">
                                    {t('expertise.data_points')}
                                 </div>
                                 <p className="text-xs font-inter font-medium text-text-tertiary dark:text-gray-400 uppercase tracking-wider group-hover:text-[#005A6B]/80 dark:group-hover:text-[#005A6B]/90 transition-colors duration-300">
                                    {t('expertise.data_points_description')}
                                 </p>
                              </div>
                              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#005A6B]/10 to-[#007A8F]/10 rounded-xl group-hover:scale-110 group-hover:from-[#005A6B]/20 group-hover:to-[#007A8F]/20 group-hover:rotate-6 transition-all duration-300">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[#005A6B] group-hover:text-[#005A6B]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                                    />
                                 </svg>
                              </div>
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-[#005A6B]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 -z-10 group-hover:scale-105 transition-all duration-300"></div>
                     </div>

                     {/* Stat 3 */}
                     <div className="group relative">
                        <div className="bg-gradient-to-br from-white to-cream dark:from-gray-800 dark:to-gray-850 rounded-2xl p-5 border border-border-light dark:border-gray-700 hover:border-[#005A6B]/50 dark:hover:border-[#005A6B]/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#005A6B]/10 group-hover:-translate-y-1 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-[#005A6B]/5">
                           <div className="flex items-center justify-between">
                              <div>
                                 <div className="text-4xl md:text-5xl font-inter font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F] mb-1 group-hover:from-[#005A6B] group-hover:to-[#009AAF]">
                                    {t('expertise.accuracy_rate')}
                                 </div>
                                 <p className="text-xs font-inter font-medium text-text-tertiary dark:text-gray-400 uppercase tracking-wider group-hover:text-[#005A6B]/80 dark:group-hover:text-[#005A6B]/90 transition-colors duration-300">
                                    {t('expertise.accuracy_description')}
                                 </p>
                              </div>
                              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#005A6B]/10 to-[#007A8F]/10 rounded-xl group-hover:scale-110 group-hover:from-[#005A6B]/20 group-hover:to-[#007A8F]/20 group-hover:rotate-6 transition-all duration-300">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[#005A6B] group-hover:text-[#005A6B]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                              </div>
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-[#005A6B]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 -z-10 group-hover:scale-105 transition-all duration-300"></div>
                     </div>
                  </div>

                  {/* Right Side - Team & Values */}
                  <div className="space-y-8 animate-fade-in" data-delay="400">
                     {/* Team Expertise Card */}
                     <div className="group relative">
                        <div className="bg-surface-primary dark:bg-gray-800 rounded-3xl p-8 border border-border-light dark:border-gray-700 hover:border-[#005A6B]/50 dark:hover:border-[#005A6B]/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#005A6B]/10 group-hover:-translate-y-1">
                           <h3 className="text-2xl font-inter font-semibold text-text-primary dark:text-white mb-6 group-hover:text-[#005A6B] transition-colors duration-300">
                              Equipe Multidisciplinar
                           </h3>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gradient-to-br from-[#005A6B]/5 to-[#007A8F]/5 rounded-xl p-4 hover:from-[#005A6B]/10 hover:to-[#007A8F]/10 transition-all duration-300 transform hover:scale-105">
                                 <div className="text-[#005A6B] font-semibold mb-1">Engenharia</div>
                                 <p className="text-xs text-text-tertiary dark:text-gray-400">Arquitetura de sistemas</p>
                              </div>
                              <div className="bg-gradient-to-br from-[#005A6B]/5 to-[#007A8F]/5 rounded-xl p-4 hover:from-[#005A6B]/10 hover:to-[#007A8F]/10 transition-all duration-300 transform hover:scale-105">
                                 <div className="text-[#005A6B] font-semibold mb-1">Ciência de Dados</div>
                                 <p className="text-xs text-text-tertiary dark:text-gray-400">Machine Learning & IA</p>
                              </div>
                              <div className="bg-gradient-to-br from-[#005A6B]/5 to-[#007A8F]/5 rounded-xl p-4 hover:from-[#005A6B]/10 hover:to-[#007A8F]/10 transition-all duration-300 transform hover:scale-105">
                                 <div className="text-[#005A6B] font-semibold mb-1">Economia</div>
                                 <p className="text-xs text-text-tertiary dark:text-gray-400">Análise de mercado</p>
                              </div>
                              <div className="bg-gradient-to-br from-[#005A6B]/5 to-[#007A8F]/5 rounded-xl p-4 hover:from-[#005A6B]/10 hover:to-[#007A8F]/10 transition-all duration-300 transform hover:scale-105">
                                 <div className="text-[#005A6B] font-semibold mb-1">Mercado Financeiro</div>
                                 <p className="text-xs text-text-tertiary dark:text-gray-400">Gestão de investimentos</p>
                              </div>
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-[#005A6B]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 -z-10 group-hover:scale-105 transition-all duration-300"></div>
                     </div>

                     {/* Recognition Card */}
                     <div className="group relative overflow-hidden">
                        <div className="bg-gradient-to-br from-[#005A6B] to-[#007A8F] rounded-3xl p-8 text-white relative overflow-hidden transition-all duration-500 group-hover:from-[#006A7B] group-hover:to-[#008AA0] group-hover:shadow-lg group-hover:shadow-[#005A6B]/30 group-hover:-translate-y-1">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500"></div>
                           <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500"></div>

                           <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-4">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    />
                                 </svg>
                                 <h3 className="text-xl font-inter text-white font-semibold group-hover:scale-105 transition-all duration-300">
                                    Reconhecimento do Mercado
                                 </h3>
                              </div>
                              <p className="text-white/90 font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                                 Referência em avaliação imobiliária com IA, reconhecida por instituições financeiras e gestores com mais de R$1,2 trilhão sob
                                 gestão.
                              </p>
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-[#005A6B]/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 -z-10 group-hover:scale-105 transition-all duration-300"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default ExpertiseSection;
