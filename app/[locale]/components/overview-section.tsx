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
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
               />
            </svg>
         ),
         delay: 0,
         accent: 'bg-[#005A6B]/5 dark:bg-[#005A6B]/20 text-[#005A6B] dark:text-[#0098b4]',
      },
      {
         value: t('annual_transactions_stat_value'),
         label: t('annual_transactions_stat_label'),
         icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
               />
            </svg>
         ),
         delay: 100,
         accent: 'bg-[#005A6B]/5 dark:bg-[#005A6B]/20 text-[#005A6B] dark:text-[#0098b4]',
      },
      {
         value: t('valuation_challenges_stat_value'),
         label: t('valuation_challenges_stat_label'),
         icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
               />
            </svg>
         ),
         delay: 200,
         accent: 'bg-[#005A6B]/5 dark:bg-[#005A6B]/20 text-[#005A6B] dark:text-[#0098b4]',
      },
   ];

   return (
      <section ref={sectionRef} id="overview" className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950">
         <div className="container mx-auto px-8 lg:px-16 max-w-7xl">
            {/* Section Header */}
            <div className="flex flex-col items-center mb-16">
               <div className="w-12 h-[1px] bg-text-primary/20 dark:bg-gray-700 mb-8"></div>
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-light text-text-primary dark:text-white text-center leading-tight">
                  {t.rich('title', {
                     primary: (chunks) => (
                        <span className="font-normal bg-gradient-to-r from-[#005A6B] to-[#007A8F] dark:from-[#0098b4] dark:to-[#00c5e5] bg-clip-text text-transparent">
                           {chunks}
                        </span>
                     ),
                  })}
               </h2>
            </div>

            <div className="max-w-5xl mx-auto">
               <p className="font-inter font-light text-text-secondary dark:text-gray-300 text-base md:text-lg leading-relaxed text-center mb-20 max-w-4xl mx-auto">
                  {t('main_paragraph')}
               </p>

               {/* Stats Cards */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  {stats.map((stat, index) => (
                     <div
                        key={index}
                        className={`
                           group relative
                           transform transition-all duration-700 ease-out
                           hover:-translate-y-1
                           ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                        `}
                        style={{
                           transitionDelay: `${stat.delay}ms`,
                        }}
                     >
                        {/* Card */}
                        <div className="relative h-full bg-white dark:bg-gray-900 rounded-xl border border-[#005A6B]/10 dark:border-[#005A6B]/30 hover:border-[#005A6B]/20 dark:hover:border-[#005A6B]/40 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-2xl dark:hover:shadow-black/20 transition-all duration-300 overflow-hidden">
                           {/* Subtle gradient overlay on hover */}
                           <div className="absolute inset-0 bg-gradient-to-br from-[#005A6B]/5 to-transparent dark:from-[#005A6B]/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                           {/* Content */}
                           <div className="relative p-8 lg:p-10">
                              {/* Icon */}
                              <div className="mb-6">
                                 <div className={`inline-flex p-3 rounded-lg ${stat.accent} transition-transform duration-300 group-hover:scale-110`}>
                                    {stat.icon}
                                 </div>
                              </div>

                              {/* Value */}
                              <div className="mb-3">
                                 <p className="text-2xl md:text-3xl font-inter font-semibold text-gray-900 dark:text-white tracking-tight">{stat.value}</p>
                              </div>

                              {/* Label */}
                              <p className="font-inter text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                           </div>

                           {/* Decorative element */}
                           <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#005A6B] dark:via-[#0098b4] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="flex justify-center mt-20">
                  <div className="w-12 h-[1px] bg-text-primary/20 dark:bg-gray-700"></div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default OverviewSection;
