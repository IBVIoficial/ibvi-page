'use client';

import React, {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';

const HeroSection = () => {
   const t = useTranslations('hero');
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const [globeSize, setGlobeSize] = useState(0);

   useEffect(() => {
      if (containerRef.current) {
         const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
               setGlobeSize(entry.contentRect.width);
            }
         });
         observer.observe(containerRef.current);
         return () => observer.disconnect();
      }
   }, []);

   useEffect(() => {
      if (globeSize === 0) return;
      // Globe animation
      let globeInstance: any;
      import('cobe')
         .then((cobeModule) => {
            const createGlobe = cobeModule.default;

            if (canvasRef.current && createGlobe) {
               let phi = 0;
               globeInstance = createGlobe(canvasRef.current, {
                  devicePixelRatio: 2,
                  width: globeSize * 2,
                  height: globeSize * 2,
                  phi: 0,
                  theta: 0.2,
                  dark: 0,
                  diffuse: 1.2,
                  mapSamples: 20000,
                  mapBrightness: 3,
                  baseColor: [0.79, 0.67, 0.43], // Luxury gold base [R,G,B]
                  markerColor: [0.8, 0.7, 0.45], // Gold marker
                  glowColor: [0.8, 0.7, 0.45], // Gold glow
                  scale: 1,
                  offset: [0, 0],
                  markers: [
                     // Brazilian context markers
                     {location: [-14.235, -51.9253], size: 0.1}, // Brazil center
                     {location: [-23.5505, -46.6333], size: 0.05}, // São Paulo
                     {location: [-22.9068, -43.1729], size: 0.05}, // Rio de Janeiro
                  ],
                  onRender: (state: any) => {
                     state.phi = phi;
                     phi += 0.003; // Slower rotation
                  },
               });
            }
         })
         .catch((err) => console.error('Failed to load Cobe dynamically:', err));

      return () => {
         if (globeInstance && typeof globeInstance.destroy === 'function') {
            globeInstance.destroy();
         }
      };
   }, [globeSize]);

   return (
      <header className="py-20 md:py-28 bg-surface-primary luxury-shadow transition-opacity duration-500 animate-fade-in" data-delay="100">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
               <div className="lg:w-1/2 text-center lg:text-left">
                  <h1 className="text-5xl md:text-7xl font-playfair font-semibold leading-tight text-text-primary mb-6">
                     {t('title')} <span className="text-primary">{t('subtitle')}</span>
                  </h1>
                  <p className="text-xl md:text-2xl font-inter text-primary mb-8 max-w-xl mx-auto lg:mx-0 font-medium tracking-wide">{t('tagline')}</p>
                  <p className="text-base md:text-lg text-text-tertiary max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">{t('description')}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                     <a
                        href="#solution"
                        className="bg-primary text-text-inverse font-medium tracking-wide rounded-md px-8 py-4 hover:bg-primary-hover transition-all text-sm uppercase shadow-md"
                     >
                        {t('cta_primary')}
                     </a>
                     <a
                        href="#challenges"
                        className="border-2 border-primary text-primary font-medium tracking-wide rounded-md px-8 py-3.5 hover:bg-primary hover:text-secondary hover:border-transparent transition-all text-sm uppercase shadow-md"
                     >
                        {t('cta_secondary')}
                     </a>
                  </div>
               </div>
               <div className="lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
                  <div ref={containerRef} className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px]">
                     <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30 rounded-full blur-3xl"></div>
                     <canvas ref={canvasRef} id="cobe-canvas" style={{width: '100%', height: '100%', aspectRatio: '1 / 1'}} className="relative z-10"></canvas>
                     <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-primary/30 rounded-full"></div>
                     <div className="absolute -top-4 -left-4 w-24 h-24 border border-primary/20 rounded-full"></div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
};

export default HeroSection;
