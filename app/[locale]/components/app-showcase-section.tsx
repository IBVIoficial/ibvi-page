'use client';

import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

const AppShowcaseSection = () => {
   const t = useTranslations('appShowcase');
   const [isVisible, setIsVisible] = useState(false);
   const sectionRef = useRef<HTMLElement>(null);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsVisible(true);
            }
         },
         {threshold: 0.1},
      );

      if (sectionRef.current) {
         observer.observe(sectionRef.current);
      }

      return () => {
         if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
         }
      };
   }, []);

   const screens = [
      {
         src: '/fotos-app/1.png',
         title: t('busca_title'),
         desc: t('busca_desc'),
         alt: t('busca_alt'),
         delay: 0,
      },
      {
         src: '/fotos-app/2.png',
         title: t('mapa_title'),
         desc: t('mapa_desc'),
         alt: t('mapa_alt'),
         delay: 100,
      },
      {
         src: '/fotos-app/3.png',
         title: t('resumo_title'),
         desc: t('resumo_desc'),
         alt: t('resumo_alt'),
         delay: 200,
      },
   ];

   return (
      <section ref={sectionRef} id="app-showcase" className="pt-4 md:pt-6 pb-16 md:pb-20 bg-white dark:bg-gray-900 relative overflow-hidden">
         {/* Background Elements */}
         <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
            <div
               className="absolute inset-0"
               style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #005A6B 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
               }}
            ></div>
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
               {/* Connector thread from the platform section above */}
               <div className="flex justify-center" aria-hidden="true">
                  <div className="w-[1px] h-16 md:h-20 bg-gradient-to-b from-transparent via-[#005A6B]/25 to-[#005A6B]/50"></div>
               </div>

               {/* Section Header */}
               <div className="text-center mt-6 mb-12">
                  <div className="inline-flex items-center gap-2 mb-4 animate-fade-in" data-delay="0">
                     <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#005A6B]"></div>
                     <span className="text-xs font-medium tracking-[0.2em] text-[#005A6B] dark:text-[#005A6B] uppercase">{t('badge')}</span>
                     <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#005A6B]"></div>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-light mb-3 animate-fade-in" data-delay="100">
                     {t.rich('title', {
                        primary: (chunks) => (
                           <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-[#005A6B] to-[#007A8F]">{chunks}</span>
                        ),
                     })}
                  </h2>

                  <p
                     className="mt-8 font-inter font-light text-text-secondary dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center"
                     data-delay="200"
                  >
                     {t('subtitle')}
                  </p>
               </div>

               {/* Screenshots Grid */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                  {screens.map((screen, index) => (
                     <div
                        key={index}
                        className={`group flex flex-col items-center text-center animate-fade-in ${
                           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        data-delay={`${300 + screen.delay}`}
                        style={{transitionDelay: `${screen.delay}ms`}}
                     >
                        <div className="relative w-full max-w-[280px] aspect-[9/19.5] transition-transform duration-300 group-hover:-translate-y-2">
                           <Image src={screen.src} alt={screen.alt} fill sizes="(max-width: 768px) 80vw, 280px" className="object-contain" />
                        </div>

                        <h3 className="mt-6 font-inter font-semibold text-lg md:text-xl text-text-primary dark:text-gray-100">{screen.title}</h3>
                        <p className="mt-2 font-inter font-light text-sm text-text-secondary dark:text-gray-400 max-w-xs">{screen.desc}</p>
                     </div>
                  ))}
               </div>

               {/* CTA */}
               <div className="flex justify-center mt-14">
                  <a
                     href={t('cta_link')}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#005A6B] to-[#007A8F] px-8 py-4 font-inter font-medium text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                     <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.05 12.536c-.026-2.657 2.17-3.933 2.27-3.994-1.237-1.807-3.16-2.055-3.842-2.082-1.636-.166-3.192.964-4.02.964-.828 0-2.106-.94-3.463-.914-1.782.026-3.425 1.036-4.34 2.632-1.85 3.208-.474 7.95 1.328 10.552.88 1.274 1.93 2.703 3.31 2.652 1.328-.053 1.83-.858 3.436-.858 1.606 0 2.058.858 3.462.832 1.43-.026 2.334-1.3 3.207-2.578 1.01-1.478 1.426-2.912 1.45-2.986-.032-.014-2.782-1.067-2.81-4.232zM14.616 4.73c.733-.888 1.226-2.124 1.09-3.354-1.055.043-2.332.703-3.09 1.59-.68.786-1.274 2.043-1.114 3.25 1.176.092 2.38-.598 3.114-1.486z" />
                     </svg>
                     {t('cta')}
                  </a>
               </div>

               <div className="flex justify-center mt-12">
                  <div className="w-12 h-[1px] bg-text-primary/20 dark:bg-gray-700"></div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default AppShowcaseSection;
