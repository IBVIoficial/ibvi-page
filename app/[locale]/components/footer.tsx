'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

const Footer = () => {
   const t = useTranslations('footer');
   const currentYear = new Date().getFullYear();
   return (
      <footer
         id="contact"
         className="pt-16 pb-10 bg-surface-secondary border-t border-border-default transition-opacity duration-500 animate-fade-in"
         data-delay="700"
      >
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-12">
               <div>
                  <h3 className="text-2xl font-playfair font-semibold text-teal-800 dark:text-teal-900 mb-4">IBVI</h3>
                  <p className="font-inter text-zinc-800/90 dark:text-zinc-900/90 leading-relaxed mb-6">{t('description')}</p>
                  <div className="flex space-x-4">
                     <a
                        href="https://www.linkedin.com/company/ibviproptech/"
                        className="text-primary hover:text-link-hover transition-colors p-2 rounded-full hover:bg-primary/10"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                     </a>
                     <a
                        href="https://www.instagram.com/institutobvi/"
                        className="text-primary hover:text-link-hover transition-colors p-2 rounded-full hover:bg-primary/10"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
                           <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                        </svg>
                     </a>
                  </div>
               </div>

               <div>
                  <h3 className="text-xl font-playfair font-semibold text-teal-800 dark:text-teal-900 mb-4">{t('contact_title')}</h3>
                  <p className="font-inter text-zinc-800/90 dark:text-zinc-900/90 mb-4 flex items-start">
                     <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="1.5"
                           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                     <span>{t.rich('address', {br: () => <br />})}</span>
                  </p>
                  <p className="font-inter text-zinc-800/90 dark:text-zinc-900/90 mb-4 flex items-start">
                     <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="1.5"
                           d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                     </svg>
                     <span>contato@ibvi.com.br</span>
                  </p>
                  <p className="font-inter text-zinc-800/90 dark:text-zinc-900/90 flex items-start">
                     <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="1.5"
                           d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                     </svg>
                     <span>+55 11 5185 6999</span>
                  </p>
               </div>

               <div>
                  <h3 className="text-xl font-playfair font-semibold text-teal-800 dark:text-teal-900 mb-4">{t('subscribe_title')}</h3>
                  <p className="font-inter text-zinc-800/90 dark:text-zinc-900/90 mb-4">{t('subscribe_description')}</p>
                  <div className="flex">
                     <input
                        type="email"
                        placeholder={t('email_placeholder')}
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
                  <p className="font-inter text-text-tertiary text-sm">{t('copyright', {currentYear})}</p>
                  <p className="font-inter text-text-tertiary text-sm mt-2 md:mt-0">{t('tagline')}</p>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
