'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const AboutHero = () => {
   const t = useTranslations('about');

   return (
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream to-white dark:from-[#0a0f12] dark:to-[#111827]">
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

         {/* Gradient Orbs */}
         <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#005A6B]/10 to-transparent rounded-full blur-3xl"></div>
         <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-[#007A8F]/10 to-transparent rounded-full blur-3xl"></div>

         {/* Content */}
         <div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
               {/* Badge */}
               <div className="inline-flex items-center gap-2 mb-8 animate-fade-in" data-delay="0">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#005A6B]"></div>
                  <span className="text-xs font-medium tracking-[0.2em] text-[#005A6B] dark:text-[#005A6B] uppercase">Sobre a IBVI</span>
                  <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#005A6B]"></div>
               </div>

               {/* Title with animation */}
               <h1 className="animate-fade-in" data-delay="100">
                  <span className="block text-5xl md:text-7xl lg:text-7xl font-inter font-semibold text-[#1f2937] dark:text-white mb-4">
                     {t('title').split(' ').slice(0, 2).join(' ')}
                  </span>
                  <span className="block text-5xl md:text-7xl lg:text-7xl font-inter font-semibold">
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F]">
                        {t('title').split(' ').slice(2).join(' ')}
                     </span>
                  </span>
               </h1>

               {/* Subtitle */}
               <p
                  className="text-xl md:text-2xl lg:text-2xl font-inter font-light text-text-secondary dark:text-gray-300 mt-8 mb-6 leading-relaxed animate-fade-in"
                  data-delay="200"
               >
                  {t('subtitle')}
               </p>

               {/* Description */}
               <p
                  className="text-base md:text-lg lg:text-md font-inter font-light text-text-tertiary dark:text-gray-400 max-w-4xl mx-auto leading-relaxed animate-fade-in"
                  data-delay="300"
               >
                  {t('description')}
               </p>

               {/* CTA Buttons */}
               <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in" data-delay="400">
                  <a
                     href="#mission"
                     className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide text-white bg-gradient-to-r from-[#005A6B] to-[#007A8F] rounded-full hover:shadow-xl hover:scale-105 transform transition-all duration-300"
                  >
                     Nossa Missão
                     <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                  </a>
                  <a
                     href="#technology"
                     className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide text-[#005A6B] bg-white border-2 border-[#005A6B] rounded-full hover:bg-[#005A6B] hover:text-white transform transition-all duration-300"
                  >
                     Nossa Tecnologia
                  </a>
               </div>
            </div>
         </div>

         {/* Decorative Elements */}
         <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-24 fill-white dark:fill-[#111827]" viewBox="0 0 1440 100" preserveAspectRatio="none">
               <path d="M0,50 Q720,0 1440,50 L1440,100 L0,100 Z"></path>
            </svg>
         </div>
      </section>
   );
};

export default AboutHero;
