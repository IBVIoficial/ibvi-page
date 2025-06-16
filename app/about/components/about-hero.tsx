'use client';

import React from 'react';

const AboutHero = () => {
  return (
    <header className="py-20 md:py-28 bg-surface-primary luxury-shadow transition-opacity duration-500 animate-fade-in" data-delay="100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-playfair font-semibold leading-tight text-text-primary mb-6">
            About <span className="text-primary">IBVI</span>
          </h1>
          <p className="text-xl md:text-2xl font-inter text-primary mb-8 font-medium tracking-wide">
            Revolutionizing Brazilian Real Estate with AI Intelligence
          </p>
          <p className="text-base md:text-lg text-text-tertiary max-w-3xl mx-auto mb-10 leading-relaxed">
            IBVI is at the forefront of transforming Brazil's $1.5 trillion real estate market through cutting-edge artificial intelligence and data analytics, bringing unprecedented transparency and precision to property valuations.
          </p>
        </div>
      </div>
    </header>
  );
};

export default AboutHero;