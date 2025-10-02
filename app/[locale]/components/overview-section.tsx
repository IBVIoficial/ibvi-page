'use client';

import React, {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';

const OverviewSection = () => {
   const t = useTranslations('overview');
   const [isVisible, setIsVisible] = useState(false);
   const sectionRef = useRef<HTMLElement>(null);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsVisible(true);
            }
         },
         {threshold: 0.1},
      );

      if (sectionRef.current) {
         observer.observe(sectionRef.current);
      }

      return () => {
         if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
         }
      };
   }, []);

   const stats = [
      {
         value: t('market_value_stat_value'),
         label: t('market_value_stat_label'),
         icon: (
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
               />
            </svg>
         ),
         delay: 0,
         gradient: 'from-[#005A6B] to-[#007A8F]',
      },
      {
         value: t('annual_transactions_stat_value'),
         label: t('annual_transactions_stat_label'),
         icon: (
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
               />
            </svg>
         ),
         delay: 100,
         gradient: 'from-[#007A8F] to-[#005A6B]',
      },
      {
         value: t('valuation_challenges_stat_value'),
         label: t('valuation_challenges_stat_label'),
         icon: (
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
               />
            </svg>
         ),
         delay: 200,
         gradient: 'from-[#005A6B] to-[#00758F]',
      },
   ];

   return (
      <section ref={sectionRef} id="overview" className="py-12 md:py-16 bg-white dark:bg-gray-900 relative overflow-hidden">
         {/* Background Elements */}
         <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
            <div
               className="absolute inset-0"
               style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #005A6B 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
               }}
            ></div>
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
               {/* Section Header */}
               <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 mb-4 animate-fade-in" data-delay="0">
                     <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#005A6B]"></div>
                     <span className="text-xs font-medium tracking-[0.2em] text-[#005A6B] dark:text-[#005A6B] uppercase">Mercado Imobiliário</span>
                     <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#005A6B]"></div>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-inter font-light mb-3 animate-fade-in" data-delay="100">
                     {t.rich('title', {
                        primary: (chunks) => (
                           <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F]">{chunks}</span>
                        ),
                     })}
                  </h2>

                  <p
                     className="mt-10 font-inter font-light text-text-secondary dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-4xl mx-auto text-center"
                     data-delay="200"
                  >
                     {t('main_paragraph')}
                  </p>
               </div>

               {/* Stats Cards Grid */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  {stats.map((stat, index) => (
                     <div
                        key={index}
                        className={`group animate-fade-in ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        data-delay={`${300 + stat.delay}`}
                        style={{transitionDelay: `${stat.delay}ms`}}
                     >
                        <div className="bg-surface-primary dark:bg-gray-800 rounded-3xl overflow-hidden border border-border-light dark:border-gray-700 hover:border-[#005A6B]/20 dark:hover:border-[#005A6B]/30 transition-all duration-300 h-full transform hover:-translate-y-1">
                           {/* Card Header with Gradient */}
                           <div className={`bg-gradient-to-br ${stat.gradient} p-5 relative overflow-hidden`}>
                              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-10 -translate-x-10"></div>

                              <div className="relative z-10">
                                 <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                 </div>
                                 <div className="text-xl md:text-2xl font-inter font-bold text-white">{stat.value}</div>
                              </div>
                           </div>

                           {/* Card Content */}
                           <div className="p-5">
                              <p className="font-inter font-medium text-xs text-text-primary dark:text-gray-200">{stat.label}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Additional Market Stats */}
               <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center animate-fade-in" data-delay="600">
                     <div className="text-2xl md:text-3xl font-inter font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F] mb-1">
                        R$ 1,5T
                     </div>
                     <p className="text-xs font-inter font-medium text-text-tertiary dark:text-gray-400 uppercase tracking-wider">Tamanho do Mercado</p>
                  </div>

                  <div className="text-center animate-fade-in" data-delay="700">
                     <div className="text-2xl md:text-3xl font-inter font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F] mb-1">
                        500K+
                     </div>
                     <p className="text-xs font-inter font-medium text-text-tertiary dark:text-gray-400 uppercase tracking-wider">Propriedades de Luxo</p>
                  </div>

                  <div className="text-center animate-fade-in" data-delay="800">
                     <div className="text-2xl md:text-3xl font-inter font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F] mb-1">
                        2M+
                     </div>
                     <p className="text-xs font-inter font-medium text-text-tertiary dark:text-gray-400 uppercase tracking-wider">Transações Anuais</p>
                  </div>

                  <div className="text-center animate-fade-in" data-delay="900">
                     <div className="text-2xl md:text-3xl font-inter font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F] mb-1">
                        8,5%
                     </div>
                     <p className="text-xs font-inter font-medium text-text-tertiary dark:text-gray-400 uppercase tracking-wider">Crescimento Anual</p>
                  </div>
               </div>

               <div className="flex justify-center mt-10">
                  <div className="w-12 h-[1px] bg-text-primary/20 dark:bg-gray-700"></div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default OverviewSection;
