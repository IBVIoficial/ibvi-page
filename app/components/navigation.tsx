'use client';

import React from 'react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-surface-primary backdrop-blur-md z-50 transition-all duration-300 animate-fade-in border-b border-border-default luxury-shadow" data-delay="0">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img 
              src="/images/ibvi-logo.png" 
              alt="IBVI Logo" 
              className="h-10 w-auto"
              width={160}
              height={40}
            />
          </a>
          <div className="hidden md:flex space-x-10 text-sm">
            <a href="#overview" className="text-text-primary hover:text-link transition-colors font-medium">Overview</a>
            <a href="#challenges" className="text-text-primary hover:text-link transition-colors font-medium">Challenges</a>
            <a href="#solution" className="text-text-primary hover:text-link transition-colors font-medium">Solution</a>
            <a href="#investment" className="text-text-primary hover:text-link transition-colors font-medium">Investment</a>
          </div>
          <div className="hidden md:block">
            <a href="#contact" className="text-sm bg-primary text-text-inverse rounded-md px-6 py-3.5 hover:bg-primary-hover transition-all font-medium tracking-wide shadow-md">
              Contact Us
            </a>
          </div>
          <div className="md:hidden">
            <button className="text-primary p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" aria-label="Toggle menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;