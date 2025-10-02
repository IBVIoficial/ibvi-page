'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const CTASection = () => {
   const t = useTranslations('about');

   return (
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#005A6B] via-[#006B7D] to-[#007A8F] relative overflow-hidden">
         {/* Background Patterns */}
         <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            <div
               className="absolute inset-0 opacity-10"
               style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
               }}
            />
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
               {/* Badge */}
               <div className="inline-flex items-center gap-2 mb-8 animate-fade-in" data-delay="0">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/50"></div>
                  <span className="text-xs font-medium tracking-[0.2em] text-white/80 uppercase">Próximos Passos</span>
                  <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-white/50"></div>
               </div>

               {/* Main Title */}
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-inter font-semibold text-white mb-6 animate-fade-in" data-delay="100">
                  {t('cta.title')}
               </h2>

               {/* Description */}
               <p className="text-lg md:text-xl font-inter font-light text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in" data-delay="200">
                  {t('cta.description')}
               </p>

               {/* CTA Buttons */}
               <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" data-delay="300">
                  <a
                     href="#contact"
                     className="group inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide text-white bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full hover:bg-white/30 hover:border-white/50 hover:scale-105 transform transition-all duration-300"
                  >
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                     </svg>
                     {t('cta.get_in_touch')}
                  </a>
               </div>

               {/* Decorative Elements */}
               <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in" data-delay="400">
                  <div className="text-center">
                     <div className="w-12 h-12 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                     </div>
                     <div className="text-3xl font-inter font-bold text-white mb-1">95%</div>
                     <p className="text-xs text-white/70 uppercase tracking-wider">Precisão</p>
                  </div>

                  <div className="text-center">
                     <div className="w-12 h-12 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                     <div className="text-3xl font-inter font-bold text-white mb-1">60%</div>
                     <p className="text-xs text-white/70 uppercase tracking-wider">Mais Rápido</p>
                  </div>

                  <div className="text-center">
                     <div className="w-12 h-12 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                           />
                        </svg>
                     </div>
                     <div className="text-3xl font-inter font-bold text-white mb-1">$4T</div>
                     <p className="text-xs text-white/70 uppercase tracking-wider">Mercado</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Wave Decoration at Bottom */}
         <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-24 fill-white dark:fill-[#111827]" viewBox="0 0 1440 100" preserveAspectRatio="none">
               <path d="M0,40 C80,60 200,20 360,40 C520,60 680,20 840,40 C1000,60 1160,20 1320,40 C1400,50 1440,45 1440,40 L1440,100 L0,100 Z"></path>
            </svg>
         </div>
      </section>
   );
};

export default CTASection;
