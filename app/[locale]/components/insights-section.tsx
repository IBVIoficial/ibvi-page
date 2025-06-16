'use client';

import React from 'react';

const InsightsSection = () => {
  return (
    <section id="data-insights" className="py-16 md:py-24 bg-surface-primary luxury-shadow transition-opacity duration-500 animate-fade-in" data-delay="500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-0.5 bg-primary mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary text-center mb-6">
            Market <span className="text-primary">Insights</span>
          </h2>
          <p className="font-inter text-text-secondary text-lg leading-relaxed max-w-3xl mx-auto text-center mb-16">
            Comprehensive analysis of Brazil's luxury real estate market reveals significant opportunities for technological innovation and standardization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
          <div className="bg-surface-primary p-10 luxury-shadow border-b-2 border-primary group hover:translate-y-[-5px] transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-playfair font-semibold text-primary mb-3">$1.5 Trillion</p>
            <p className="font-inter text-text-secondary tracking-wide uppercase text-sm font-medium">Total Sector Value</p>
          </div>
          
          <div className="bg-surface-primary p-10 luxury-shadow border-b-2 border-primary group hover:translate-y-[-5px] transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-playfair font-semibold text-primary mb-3">$120 Billion</p>
            <p className="font-inter text-text-secondary tracking-wide uppercase text-sm font-medium">Annual Transactions</p>
          </div>
          
          <div className="bg-surface-primary p-10 luxury-shadow border-b-2 border-primary group hover:translate-y-[-5px] transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-playfair font-semibold text-primary mb-3">&gt;80%</p>
            <p className="font-inter text-text-secondary tracking-wide uppercase text-sm font-medium">Valuation Challenges</p>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <p className="font-inter text-text-secondary text-lg leading-relaxed">
            Brazil's luxury real estate sector currently lags in adopting AI and sophisticated data analytics, making IBVI's technology-driven approach a transformative opportunity for the market.
          </p>
          <div className="flex justify-center mt-8">
            <a href="#investment" className="inline-flex items-center text-primary border-b-2 border-primary pb-1 font-semibold transition-all hover:pb-2">
              Learn about our investment approach
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;