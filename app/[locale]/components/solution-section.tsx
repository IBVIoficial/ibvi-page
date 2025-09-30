'use client';

import React from 'react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';

const SolutionSection = () => {
   const t = useTranslations('solution');

   return (
      <section id="solution" className="py-20 md:py-28 bg-white dark:bg-gray-900 relative overflow-hidden">
         {/* Subtle background pattern */}
         <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
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
            <div className="flex flex-col items-center mb-8 md:mb-10">
               <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#005A6B]"></div>
                  <span className="text-xs font-medium tracking-[0.2em] text-[#005A6B] dark:text-[#005A6B] uppercase">Tecnologia & Inovação</span>
                  <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#005A6B]"></div>
               </div>

               <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-inter font-light text-text-primary dark:text-white text-center leading-[1.1] mb-6">
                  {t.rich('title', {
                     primary: (chunks) => (
                        <span className="font-semibold bg-gradient-to-r from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#007A8F] bg-clip-text text-transparent">
                           {chunks}
                        </span>
                     ),
                  })}
               </h2>

               <p className="font-inter font-light text-text-secondary dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-4xl mx-auto text-center">
                  {t('description')}
               </p>
            </div>

            {/* Main content with iPhone mockup and distributed features */}
            <div className="relative max-w-7xl mx-auto">
               {/* Mobile Layout (Stacked) */}
               <div className="lg:hidden space-y-6">
                  {/* iPhone Mockup */}
                  <div className="flex justify-center mb-12">
                     <div className="relative w-[280px] h-[560px]">
                        <Image src="/images/MockupIphone.png" alt="IBVI App" fill className="object-contain" priority />
                     </div>
                  </div>

                  {/* Features Grid for Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     {/* Feature 1 */}
                     <div className="bg-surface-primary dark:bg-gray-800 rounded-2xl p-6 border border-border-light dark:border-gray-700 hover:border-[#005A6B]/20 dark:hover:border-[#005A6B]/30 transition-all duration-300">
                        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-xl mb-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                           </svg>
                        </div>
                        <h3 className="text-base font-inter font-medium text-text-primary dark:text-white mb-2">Matching Inteligente</h3>
                        <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed">
                           Conecta compradores e imóveis com 95% de compatibilidade
                        </p>
                     </div>

                     {/* Feature 2 */}
                     <div className="bg-surface-primary dark:bg-gray-800 rounded-2xl p-6 border border-border-light dark:border-gray-700 hover:border-[#005A6B]/20 dark:hover:border-[#005A6B]/30 transition-all duration-300">
                        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-xl mb-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                           </svg>
                        </div>
                        <h3 className="text-base font-inter font-medium text-text-primary dark:text-white mb-2">Eficiência Operacional</h3>
                        <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed">
                           Automatiza validação e precificação
                        </p>
                     </div>

                     {/* Feature 3 */}
                     <div className="bg-surface-primary dark:bg-gray-800 rounded-2xl p-6 border border-border-light dark:border-gray-700 hover:border-[#005A6B]/20 dark:hover:border-[#005A6B]/30 transition-all duration-300">
                        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-xl mb-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                           </svg>
                        </div>
                        <h3 className="text-base font-inter font-medium text-text-primary dark:text-white mb-2">Índice Padronizado</h3>
                        <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed">
                           Primeiro índice de imóveis de luxo do Brasil
                        </p>
                     </div>

                     {/* Feature 4 */}
                     <div className="bg-surface-primary dark:bg-gray-800 rounded-2xl p-6 border border-border-light dark:border-gray-700 hover:border-[#005A6B]/20 dark:hover:border-[#005A6B]/30 transition-all duration-300">
                        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-xl mb-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                           </svg>
                        </div>
                        <h3 className="text-base font-inter font-medium text-text-primary dark:text-white mb-2">Predição de Tendências</h3>
                        <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed">
                           Antecipa movimentos de mercado com 87% de precisão
                        </p>
                     </div>
                  </div>
               </div>

               {/* Desktop Layout (Distributed around iPhone) */}
               <div className="hidden lg:grid lg:grid-cols-3 gap-x-12 items-center">
                  {/* Left Features */}
                  <div className="space-y-24">
                     {/* Feature 1 - Left Top */}
                     <div className="group text-right">
                        <div className="flex items-start justify-end gap-4">
                           <div className="flex-1">
                              <h3 className="text-lg font-inter font-medium text-text-primary dark:text-white mb-2 group-hover:text-[#005A6B] dark:group-hover:text-[#005A6B] transition-colors">
                                 Matching Inteligente
                              </h3>
                              <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed">
                                 Conecta compradores e imóveis com 95% de compatibilidade
                              </p>
                           </div>
                           <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-2xl shadow-lg shadow-[#005A6B]/20 dark:shadow-[#005A6B]/20 group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                           </div>
                        </div>
                     </div>

                     {/* Feature 2 - Left Bottom */}
                     <div className="group text-right">
                        <div className="flex items-start justify-end gap-4">
                           <div className="flex-1">
                              <h3 className="text-lg font-inter font-medium text-text-primary dark:text-white mb-2 group-hover:text-[#005A6B] dark:group-hover:text-[#005A6B] transition-colors">
                                 Eficiência Operacional
                              </h3>
                              <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed">
                                 Automatiza validação e precificação
                              </p>
                           </div>
                           <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-2xl shadow-lg shadow-[#005A6B]/20 dark:shadow-[#005A6B]/20 group-hover:scale-110 transition-transform duration-300">
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
                     </div>

                     <div className="group text-right">
                        <div className="flex items-start justify-end gap-4">
                           <div className="flex-1">
                              <h3 className="text-lg font-inter font-medium text-text-primary dark:text-white mb-2 group-hover:text-[#005A6B] dark:group-hover:text-[#0098b4] transition-colors">
                                 Redução de Prazo
                              </h3>
                              <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed">
                                 Acelera transações em até 60% com IA própria
                              </p>
                           </div>
                           <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-2xl shadow-lg shadow-[#005A6B]/20 dark:shadow-[#005A6B]/20 group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Center - iPhone Mockup */}
                  <div className="flex flex-col items-center justify-center py-8">
                     <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#005A6B]/20 to-[#007A8F]/20 blur-3xl opacity-50"></div>

                        {/* iPhone Mockup */}
                        <div className="relative w-[320px] h-[640px]">
                           <Image src="/images/MockupIphone.png" alt="IBVI App" fill className="object-contain drop-shadow-2xl" priority />
                        </div>
                     </div>

                     {/* Single Additional Feature Directly Below iPhone */}
                     <div className="mt-6 group bg-surface-primary/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 hover:border-[#005A6B]/20 dark:hover:border-[#005A6B]/30 transition-all duration-300 max-w-sm">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-xl">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </div>
                           <div className="flex-1">
                              <h4 className="font-inter font-medium text-text-primary dark:text-white text-lg mb-0.5">Decisões Data-Driven</h4>
                              <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed">
                                 Recomendações baseadas em mais de 50 variáveis de mercado atualizadas em tempo real
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Right Features */}
                  <div className="space-y-24">
                     {/* Feature 3 - Right Top */}
                     <div className="group">
                        <div className="flex items-start gap-4">
                           <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-2xl shadow-lg shadow-[#005A6B]/20 dark:shadow-[#005A6B]/20 group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                 />
                              </svg>
                           </div>
                           <div className="flex-1">
                              <h3 className="text-lg font-inter font-medium text-text-primary dark:text-white mb-2 group-hover:text-[#005A6B] dark:group-hover:text-[#005A6B] transition-colors">
                                 Índice Padronizado
                              </h3>
                              <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed">
                                 Primeiro índice de imóveis de luxo do Brasil
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Feature 4 - Right Bottom */}
                     <div className="group mt-20">
                        <div className="flex items-start gap-4">
                           <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-2xl shadow-lg shadow-[#005A6B]/20 dark:shadow-[#005A6B]/20 group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                 />
                              </svg>
                           </div>
                           <div className="flex-1">
                              <h3 className="text-lg font-inter font-medium text-text-primary dark:text-white mb-2 group-hover:text-[#005A6B] dark:group-hover:text-[#005A6B] transition-colors">
                                 Predição de Tendências
                              </h3>
                              <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed">
                                 Antecipa movimentos de mercado com 87% de precisão
                              </p>
                           </div>
                        </div>
                     </div>
                     {/* Feature 4 - Right Bottom */}
                     <div className="group">
                        <div className="flex items-start gap-4">
                           <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#005A6B] to-[#007A8F] dark:from-[#005A6B] dark:to-[#005A6B] rounded-2xl shadow-lg shadow-[#005A6B]/20 dark:shadow-[#005A6B]/20 group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                 />
                              </svg>
                           </div>
                           <div className="flex-1">
                              <h3 className="text-lg font-inter font-medium text-text-primary dark:text-white mb-2 group-hover:text-[#005A6B] dark:group-hover:text-[#005A6B] transition-colors">
                                 Autoridade em Avaliações
                              </h3>
                              <p className="font-inter font-light text-text-tertiary dark:text-gray-400 text-sm leading-relaxed">
                                 Referência em avaliação com IA avançada
                              </p>
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

export default SolutionSection;
