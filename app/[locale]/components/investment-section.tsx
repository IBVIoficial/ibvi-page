'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const InvestmentSection = () => {
   const t = useTranslations('investment');
   return (
      <section id="investment" className="py-24 md:py-32 bg-surface-primary">
         <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
               <div className="flex flex-col items-center mb-16">
                  <div className="w-12 h-[1px] bg-text-primary/20 mb-8"></div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-light text-text-primary text-center leading-tight">
                     {t.rich('title', {primary: (chunks) => <span className="font-normal">{chunks}</span>})}
                  </h2>
               </div>

               <div className="grid md:grid-cols-2 gap-16 mb-20">
                  <div>
                     <h3 className="text-2xl font-inter font-normal text-text-primary mb-6">{t('vision.title')}</h3>
                     <p className="font-inter font-light text-text-secondary text-base leading-relaxed mb-6">{t('vision.p1')}</p>
                     <p className="font-inter font-light text-text-tertiary text-base leading-relaxed">{t('vision.p2')}</p>
                  </div>

                  <div>
                     <h3 className="text-2xl font-inter font-normal text-text-primary mb-6">{t('expansion.title')}</h3>
                     <p className="font-inter font-light text-text-secondary text-base leading-relaxed mb-6">{t('expansion.p1')}</p>
                     <p className="font-inter font-light text-text-tertiary text-base leading-relaxed">{t('expansion.p2')}</p>
                  </div>
               </div>

               <div className="text-center">
                  <a
                     href="#contact"
                     className="inline-block bg-[#005A6B] rounded-full text-white font-inter font-normal text-sm tracking-wide px-8 py-4 hover:bg-text-secondary transition-colors duration-200"
                  >
                     {t('button_text')}
                  </a>
               </div>

               <div className="flex justify-center mt-20">
                  <div className="w-12 h-[1px] bg-text-primary/20"></div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default InvestmentSection;
