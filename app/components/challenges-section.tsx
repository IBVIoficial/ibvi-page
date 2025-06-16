'use client';

import React from 'react';

const ChallengesSection = () => {
  return (
    <section id="challenges" className="py-16 md:py-24 bg-surface-primary luxury-shadow transition-opacity duration-500 animate-fade-in" data-delay="300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-0.5 bg-primary mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary text-center mb-6">
            Key Market <span className="text-primary">Challenges</span>
          </h2>
          <p className="font-inter text-text-secondary max-w-2xl text-center mb-14">
            The Brazilian luxury real estate market faces several critical challenges that affect valuation precision and market efficiency.
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
              <h3 className="text-xl font-playfair font-semibold text-text-primary">Standardization Gaps</h3>
            </div>
            <p className="font-inter text-text-tertiary leading-relaxed pl-14">Inconsistent valuation methodologies lead to significant price discrepancies, particularly in the high-end market segment.</p>
          </div>
          
          <div className="bg-surface-primary p-8 luxury-shadow border-t border-primary/20 group hover:border-primary transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-text-primary">Buyer Valuation Hurdles</h3>
            </div>
            <p className="font-inter text-text-tertiary leading-relaxed pl-14">Over 80% of luxury property buyers struggle to assess fair market value, creating uncertainty and hesitation in high-value transactions.</p>
          </div>
          
          <div className="bg-surface-primary p-8 luxury-shadow border-t border-primary/20 group hover:border-primary transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-text-primary">Outdated Methods</h3>
            </div>
            <p className="font-inter text-text-tertiary leading-relaxed pl-14">Traditional manual appraisal processes lack the precision, consistency, and efficiency demanded by today's sophisticated market.</p>
          </div>
          
          <div className="bg-surface-primary p-8 luxury-shadow border-t border-primary/20 group hover:border-primary transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-text-primary">Transaction Delays</h3>
            </div>
            <p className="font-inter text-text-tertiary leading-relaxed pl-14">Valuation disputes significantly extend negotiation timelines, hindering market fluidity and increasing opportunity costs for all parties.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;