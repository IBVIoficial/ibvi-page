'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  return (
    <footer id="contact" className="pt-16 pb-10 bg-surface-secondary border-t border-border-default transition-opacity duration-500 animate-fade-in" data-delay="700">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-12">
          <div>
            <h3 className="text-2xl font-playfair font-semibold text-text-primary mb-4">IBVI</h3>
            <p className="font-inter text-text-secondary leading-relaxed mb-6">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-link-hover transition-colors p-2 rounded-full hover:bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                </svg>
              </a>
              <a href="#" className="text-primary hover:text-link-hover transition-colors p-2 rounded-full hover:bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8.245V12H12v4h4v3.755l4-4v-3.51l-4-4zM12 4H4v16h8V4zm4-4v12h-4V0h4z" />
                </svg>
              </a>
              <a href="#" className="text-primary hover:text-link-hover transition-colors p-2 rounded-full hover:bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">Contact</h3>
            <p className="font-inter text-text-secondary mb-4 flex items-start">
              <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>São Paulo<br/>Av. Magalhães de Castro 4.800, 23° andar<br/>Cidade Jardim - São Paulo - SP, 05676-120</span>
            </p>
            <p className="font-inter text-text-secondary mb-4 flex items-start">
              <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contact@ibvi.com.br</span>
            </p>
            <p className="font-inter text-text-secondary flex items-start">
              <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+55 11 5185 6999</span>
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">Subscribe</h3>
            <p className="font-inter text-text-secondary mb-4">
              Stay informed about our latest developments and investment opportunities.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-3 w-full bg-surface-primary border border-border-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all rounded-l-md" 
              />
              <button className="bg-button-primary text-text-inverse px-6 hover:bg-button-primary-hover transition-colors rounded-r-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border-default pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-inter text-text-tertiary text-sm">{t('copyright')}</p>
            <p className="font-inter text-text-tertiary text-sm mt-2 md:mt-0">Pioneering Luxury Real Estate Intelligence</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;