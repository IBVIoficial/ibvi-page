'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const InvestmentSection = () => {
   const t = useTranslations('investment');
   return (
      <section
         id="investment"
         className="py-20 md:py-28 bg-surface-darker text-text-inverse relative overflow-hidden transition-opacity duration-500 animate-fade-in"
         data-delay="600"
      >
         <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-black"></div>
         </div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
               <div className="flex flex-col items-center">
                  <div className="w-16 h-0.5 bg-primary mb-6"></div>
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-center mb-8">
                     {t.rich('title', {primary: (chunks) => <span className="text-primary">{chunks}</span>})}
                  </h2>
               </div>

               <div className="bg-surface-dark/50 p-10 border border-primary/30 shadow-xl mb-12 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-12">
                     <div>
                        <h3 className="text-2xl font-playfair font-semibold text-primary mb-4">{t('vision.title')}</h3>
                        <p className="font-inter text-text-light leading-relaxed mb-6">{t('vision.p1')}</p>
                        <p className="font-inter text-primary-light">{t('vision.p2')}</p>
                     </div>

                     <div>
                        <h3 className="text-2xl font-playfair font-semibold text-primary mb-4">{t('expansion.title')}</h3>
                        <p className="font-inter text-text-light leading-relaxed mb-6">{t('expansion.p1')}</p>
                        <p className="font-inter text-primary-light">{t('expansion.p2')}</p>
                     </div>
                  </div>
               </div>

               <div className="text-center">
                  <a
                     href="#contact"
                     className="inline-block bg-primary text-text-inverse font-medium tracking-wide rounded-md px-10 py-4 hover:bg-primary-hover transition-all text-sm uppercase shadow-md"
                  >
                     {t('button_text')}
                  </a>
               </div>
            </div>
         </div>
      </section>
   );
};

export default InvestmentSection;
