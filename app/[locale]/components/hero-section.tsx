'use client';

import React, {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {useTheme} from 'next-themes';

const HeroSection = () => {
   const t = useTranslations('hero');
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const [globeSize, setGlobeSize] = useState(0);
   const {theme, systemTheme} = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

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
      if (globeSize === 0 || !mounted) return;

      // Detect current theme
      const currentTheme = theme === 'system' ? systemTheme : theme;
      const isDark = currentTheme === 'dark';

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
                  dark: isDark ? 1 : 0,
                  diffuse: isDark ? 0.8 : 1.2,
                  mapSamples: 20000,
                  mapBrightness: isDark ? 2 : 3,
                  baseColor: isDark ? [0.6, 0.5, 0.3] : [0.79, 0.67, 0.43], // Darker gold for dark mode
                  markerColor: isDark ? [0.7, 0.6, 0.35] : [0.8, 0.7, 0.45], // Adjusted marker color
                  glowColor: isDark ? [0.6, 0.5, 0.3] : [0.8, 0.7, 0.45], // Darker glow for dark mode
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
   }, [globeSize, theme, systemTheme, mounted]);

   return (
      <header className="min-h-screen flex items-center bg-surface-primary dark:bg-gray-900 overflow-hidden w-full">
         <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-16 sm:py-20 md:py-24 max-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center w-full max-w-full">
               {/* Left Content - Text */}
               <div className="order-2 lg:order-1 text-center lg:text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-inter font-light leading-[1.1] text-text-primary mb-6 sm:mb-8">
                     {t('title')}
                     <br />
                     <span className="font-normal text-[#005A6B]">{t('subtitle')}</span>
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl font-inter font-light text-text-secondary mb-4 sm:mb-6 leading-relaxed">{t('tagline')}</p>

                  <p className="text-sm sm:text-base font-inter font-light text-text-tertiary mb-8 sm:mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
                     {t('description')}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                     <a
                        href="#solution"
                        className="bg-[#005A6B] rounded-full inline-block text-white text-surface-primary font-inter font-normal text-sm sm:text-sm tracking-wide px-6 sm:px-8 py-3 sm:py-4 hover:bg-text-secondary transition-colors duration-200 text-center"
                     >
                        {t('cta_primary')}
                     </a>
                     <a
                        href="#challenges"
                        className="inline-block rounded-full border border-text-primary text-black bg-gray-100 dark:text-black font-inter font-normal text-sm sm:text-sm tracking-wide px-6 sm:px-8 py-3 sm:py-4 hover:bg-text-primary hover:text-surface-primary transition-colors duration-200 dark:bg-white text-center"
                     >
                        {t('cta_secondary')}
                     </a>
                  </div>
               </div>

               {/* Right Content - Globe */}
               <div className="order-1 lg:order-2 flex justify-center lg:justify-end overflow-hidden w-full">
                  <div
                     ref={containerRef}
                     className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] overflow-hidden flex-shrink-0 bg-transparent"
                  >
                     {/* Globe canvas */}
                     <canvas
                        ref={canvasRef}
                        id="cobe-canvas"
                        style={{
                           width: '100%',
                           height: '100%',
                           aspectRatio: '1 / 1',
                           border: 'none',
                           outline: 'none',
                           display: 'block',
                           background: 'transparent',
                           opacity: mounted ? 1 : 0,
                           transition: 'opacity 0.3s ease-in-out',
                        }}
                        className="relative z-10"
                     />

                     {/* Minimal decorative circles */}
                     <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 right-2 sm:right-4 md:right-6 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 border border-primary/10 rounded-full"></div>
                     <div className="absolute top-2 sm:top-4 md:top-6 left-2 sm:left-4 md:left-6 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border border-primary/5 rounded-full"></div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
};

export default HeroSection;
