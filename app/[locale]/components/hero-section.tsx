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
      <header className="min-h-screen flex items-center bg-surface-primary">
         <div className="container mx-auto px-8 lg:px-16 py-24">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
               {/* Left Content - Text */}
               <div className="order-2 lg:order-1">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-inter font-light leading-[1.1] text-text-primary mb-8 ">
                     {t('title')}
                     <br />
                     <span className="font-normal text-[#005A6B]">{t('subtitle')}</span>
                  </h1>

                  <p className="text-lg md:text-xl font-inter font-light text-text-secondary mb-6 leading-relaxed">{t('tagline')}</p>

                  <p className="text-base font-inter font-light text-text-tertiary mb-12 leading-relaxed max-w-xl">{t('description')}</p>

                  <div className="flex flex-col sm:flex-row gap-4">
                     <a
                        href="#solution"
                        className="bg-[#005A6B] rounded-full inline-block text-white text-surface-primary font-inter font-normal text-sm tracking-wide px-8 py-4 hover:bg-text-secondary transition-colors duration-200"
                     >
                        {t('cta_primary')}
                     </a>
                     <a
                        href="#challenges"
                        className="inline-block rounded-full border border-text-primary text-text-primary font-inter font-normal text-sm tracking-wide px-8 py-4 hover:bg-text-primary hover:text-surface-primary transition-colors duration-200"
                     >
                        {t('cta_secondary')}
                     </a>
                  </div>
               </div>

               {/* Right Content - Globe */}
               <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                  <div ref={containerRef} className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px]">
                     {/* Subtle glow behind globe */}
                     <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full blur-3xl"></div>

                     {/* Globe canvas */}
                     <canvas ref={canvasRef} id="cobe-canvas" style={{width: '100%', height: '100%', aspectRatio: '1 / 1'}} className="relative z-10" />

                     {/* Minimal decorative circles */}
                     <div className="absolute -bottom-8 -right-8 w-40 h-40 border border-primary/10 rounded-full"></div>
                     <div className="absolute -top-8 -left-8 w-32 h-32 border border-primary/5 rounded-full"></div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
};

export default HeroSection;
