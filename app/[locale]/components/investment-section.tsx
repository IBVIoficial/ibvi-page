'use client';

import React, {useEffect, useRef} from 'react';
import {useTranslations} from 'next-intl';

const InvestmentSection = () => {
   const t = useTranslations('investment');
   const sectionRef = useRef<HTMLElement>(null);
   const cardsRef = useRef<HTMLDivElement[]>([]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('animate-fade-in-up');
               }
            });
         },
         {threshold: 0.1},
      );

      if (sectionRef.current) {
         observer.observe(sectionRef.current);
      }

      cardsRef.current.forEach((card) => {
         if (card) observer.observe(card);
      });

      return () => observer.disconnect();
   }, []);

   return (
      <section ref={sectionRef} id="investment" className="relative py-24 md:py-32 dark:from-gray-900 dark:to-gray-900 overflow-hidden">
         {/* Background decoration - removed blue glow in dark mode */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 dark:bg-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 dark:bg-transparent rounded-full blur-3xl"></div>
         </div>

         <div className="container mx-auto px-8 lg:px-16 relative z-10">
            <div className="max-w-6xl mx-auto">
               {/* Header Section */}
               <div className="flex flex-col items-center mb-16">
                  <div className="flex items-center justify-center mb-6">
                     <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/40 dark:to-[#0098b4]/40"></div>
                     <div className="mx-4 w-2 h-2 bg-primary dark:bg-[#0098b4] rounded-full"></div>
                     <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary/40 dark:to-[#0098b4]/40"></div>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-light text-slate-900 dark:text-white text-center leading-tight">
                     {t.rich('title', {
                        primary: (chunks) => (
                           <span className="font-medium bg-gradient-to-r from-[#005A6B] to-[#007A8B] dark:from-[#005A6B] dark:to-[#007A8B] bg-clip-text text-transparent">
                              {chunks}
                           </span>
                        ),
                     })}
                  </h2>

                  <div className="w-20 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 dark:from-[#0098b4]/20 dark:via-[#0098b4]/40 dark:to-[#0098b4]/20 mt-4"></div>
               </div>

               {/* Content Grid */}
               <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 mb-20">
                  {/* Mission Card */}
                  <div
                     ref={(el) => {
                        if (el) cardsRef.current[0] = el;
                     }}
                     className="group opacity-0 transform-gpu"
                  >
                     <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-[#0098b4]/10 transition-all duration-500 p-8 lg:p-10 border border-slate-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-[#0098b4]/30">
                        <div className="relative z-10">
                           <div className="flex items-center mb-6">
                              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary dark:from-[#0098b4] dark:to-[#00c5e5] rounded-lg flex items-center justify-center mr-3 shadow-md">
                                 <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                 </svg>
                              </div>
                              <h3 className="text-2xl font-inter font-semibold text-slate-900 dark:text-white">{t('vision.title')}</h3>
                           </div>

                           <div className="space-y-4">
                              <p className="font-inter text-base text-slate-700 dark:text-gray-300 leading-relaxed">{t('vision.p1')}</p>
                              <div className="pl-4 border-l-2 border-primary/30 dark:border-[#0098b4]/30">
                                 <p className="font-inter text-sm text-slate-600 dark:text-gray-400 leading-relaxed italic">{t('vision.p2')}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Expansion Card */}
                  <div
                     ref={(el) => {
                        if (el) cardsRef.current[1] = el;
                     }}
                     className="group opacity-0 transform-gpu"
                     style={{animationDelay: '100ms'}}
                  >
                     <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-[#0098b4]/10 transition-all duration-500 p-8 lg:p-10 border border-slate-100 dark:border-gray-700 hover:border-secondary/20 dark:hover:border-[#0098b4]/30">
                        <div className="relative z-10">
                           <div className="flex items-center mb-6">
                              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary dark:from-[#00c5e5] dark:to-[#0098b4] rounded-lg flex items-center justify-center mr-3 shadow-md">
                                 <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                                    />
                                 </svg>
                              </div>
                              <h3 className="text-2xl font-inter font-semibold text-slate-900 dark:text-white">{t('expansion.title')}</h3>
                           </div>

                           <div className="space-y-4">
                              <p className="font-inter text-base text-slate-700 dark:text-gray-300 leading-relaxed">{t('expansion.p1')}</p>
                              <div className="pl-4 border-l-2 border-secondary/30 dark:border-[#00c5e5]/30">
                                 <p className="font-inter text-sm text-slate-600 dark:text-gray-400 leading-relaxed italic">{t('expansion.p2')}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Bottom decoration */}
               <div className="flex justify-center mt-16">
                  <div className="flex items-center">
                     <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-slate-300 dark:to-gray-600"></div>
                     <div className="mx-2 w-1.5 h-1.5 bg-slate-400 dark:bg-[#0098b4] rounded-full"></div>
                     <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-slate-300 dark:to-gray-600"></div>
                  </div>
               </div>
            </div>
         </div>

         <style jsx>{`
            @keyframes fade-in-up {
               from {
                  opacity: 0;
                  transform: translateY(20px);
               }
               to {
                  opacity: 1;
                  transform: translateY(0);
               }
            }

            .animate-fade-in-up {
               animation: fade-in-up 0.6s ease-out forwards;
            }
         `}</style>
      </section>
   );
};

export default InvestmentSection;
