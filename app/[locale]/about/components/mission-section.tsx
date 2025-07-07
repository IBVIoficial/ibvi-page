"use client";

import React from "react";

const MissionSection = () => {
  return (
    <section className="py-16 md:py-24 bg-surface-secondary transition-opacity duration-500 animate-fade-in" data-delay="200">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-0.5 bg-primary mb-6 mx-auto"></div>
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-zinc-800 dark:text-zinc-900 mb-8">
              Our <span className="text-primary">Mission</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-teal-800 dark:text-teal-900 mb-4">Transparency</h3>
              <p className="text-text-tertiary leading-relaxed">
                Bringing clear, standardized valuations to eliminate uncertainty and disputes in luxury real estate transactions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-teal-800 dark:text-teal-900 mb-4">Precision</h3>
              <p className="text-text-tertiary leading-relaxed">
                Leveraging AI and machine learning to deliver the most accurate property valuations in the Brazilian market.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-teal-800 dark:text-teal-900 mb-4">Innovation</h3>
              <p className="text-text-tertiary leading-relaxed">Pioneering the first FIPE-like index for luxury properties, setting new industry standards.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
