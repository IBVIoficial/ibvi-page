'use client';

import React from 'react';

const SolutionSection = () => {
  return (
    <section id="solution" className="py-16 md:py-24 bg-surface-secondary transition-opacity duration-500 animate-fade-in" data-delay="400">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-0.5 bg-primary mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary text-center mb-6">
            IBVI's <span className="text-primary">AI-Powered</span> Solution
          </h2>
          <p className="font-inter text-text-secondary text-lg leading-relaxed max-w-3xl mx-auto text-center mb-16">
            IBVI introduces Brazil's first artificial intelligence valuation platform, utilizing sophisticated analytics for precise, standardized results and creating a benchmark "FIPE-like" market index for luxury properties.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-surface-primary p-8 luxury-shadow group hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-sm mb-6 group-hover:bg-primary/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-semibold text-text-primary mb-3">Data-Driven Valuations</h3>
            <p className="font-inter text-text-tertiary">Proprietary AI algorithms process vast datasets to minimize subjectivity and deliver precise valuations for high-value properties.</p>
          </div>
          
          <div className="bg-surface-primary p-8 luxury-shadow group hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-sm mb-6 group-hover:bg-primary/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-semibold text-text-primary mb-3">Predictive Analytics</h3>
            <p className="font-inter text-text-tertiary">Sophisticated forecasting models anticipate market trends, empowering investors with valuable insights for strategic decision-making.</p>
          </div>
          
          <div className="bg-surface-primary p-8 luxury-shadow group hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-sm mb-6 group-hover:bg-primary/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-semibold text-text-primary mb-3">Intelligent Search</h3>
            <p className="font-inter text-text-tertiary">Machine learning algorithms enhance property matching, connecting discerning clients with properties that precisely meet their unique criteria.</p>
          </div>
          
          <div className="bg-surface-primary p-8 luxury-shadow group hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-sm mb-6 group-hover:bg-primary/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-semibold text-text-primary mb-3">Standardized Index</h3>
            <p className="font-inter text-text-tertiary">A reliable FIPE-like benchmark for luxury property valuations, establishing a trusted standard for the Brazilian high-end real estate market.</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <div className="bg-primary/10 border border-primary/20 px-10 py-8 max-w-3xl text-center">
            <p className="font-playfair text-xl text-text-primary mb-0">"IBVI's proprietary valuation platform represents a paradigm shift in how Brazilian luxury real estate is evaluated and transacted."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;