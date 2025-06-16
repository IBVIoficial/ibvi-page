'use client';

import React from 'react';

const ExpertiseSection = () => {
  return (
    <section className="py-16 md:py-24 bg-surface-secondary transition-opacity duration-500 animate-fade-in" data-delay="400">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-0.5 bg-primary mb-6 mx-auto"></div>
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-8">
            Our <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-lg text-text-tertiary mb-12 leading-relaxed">
            IBVI brings together experts in real estate, artificial intelligence, data science, and Brazilian market dynamics to deliver unparalleled insights and solutions.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-playfair font-semibold text-primary mb-2">15+</div>
              <p className="text-text-tertiary">Years Combined Real Estate Experience</p>
            </div>
            <div>
              <div className="text-4xl font-playfair font-semibold text-primary mb-2">50M+</div>
              <p className="text-text-tertiary">Data Points Analyzed</p>
            </div>
            <div>
              <div className="text-4xl font-playfair font-semibold text-primary mb-2">95%</div>
              <p className="text-text-tertiary">Valuation Accuracy Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;