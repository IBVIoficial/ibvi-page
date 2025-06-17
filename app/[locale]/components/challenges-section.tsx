'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const ChallengesSection = () => {
  const t = useTranslations('challenges');
  return (
    <section id="challenges" className="py-16 md:py-24 bg-surface-primary luxury-shadow transition-opacity duration-500 animate-fade-in" data-delay="300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-0.5 bg-primary mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary text-center mb-6">
            {t.rich('title', { primary: (chunks) => <span className="text-primary">{chunks}</span> })}
          </h2>
          <p className="font-inter text-text-secondary max-w-2xl text-center mb-14">
            {t('main_paragraph')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-surface-primary p-8 luxury-shadow border-t border-primary/20 group hover:border-primary transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-text-primary">{t('standardization_gaps.title')}</h3>
            </div>
            <p className="font-inter text-text-tertiary leading-relaxed pl-14">{t('standardization_gaps.description')}</p>
          </div>
          
          <div className="bg-surface-primary p-8 luxury-shadow border-t border-primary/20 group hover:border-primary transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-text-primary">{t('buyer_hurdles.title')}</h3>
            </div>
            <p className="font-inter text-text-tertiary leading-relaxed pl-14">{t('buyer_hurdles.description')}</p>
          </div>
          
          <div className="bg-surface-primary p-8 luxury-shadow border-t border-primary/20 group hover:border-primary transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-text-primary">{t('outdated_methods.title')}</h3>
            </div>
            <p className="font-inter text-text-tertiary leading-relaxed pl-14">{t('outdated_methods.description')}</p>
          </div>
          
          <div className="bg-surface-primary p-8 luxury-shadow border-t border-primary/20 group hover:border-primary transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-text-primary">{t('transaction_delays.title')}</h3>
            </div>
            <p className="font-inter text-text-tertiary leading-relaxed pl-14">{t('transaction_delays.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;