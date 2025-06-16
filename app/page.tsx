'use client'; // Required for useEffect and DOM manipulation

import React, { useEffect, useRef } from 'react';

const IBVILandingPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Fade-in animation effect
    const animatedElements = document.querySelectorAll<HTMLElement>('.animate-fade-in');
    animatedElements.forEach((element: HTMLElement) => {
      element.classList.add('opacity-0');
      const delay = element.dataset.delay ? parseInt(element.dataset.delay, 10) : 0;
      setTimeout(() => {
        element.classList.remove('opacity-0');
        element.classList.add('opacity-100');
      }, delay);
    });
    
    // Globe animation
    let globeInstance: any; 
    import('cobe').then(cobeModule => {
      const createGlobe = cobeModule.default; 

      if (canvasRef.current && createGlobe) { 
        let phi = 0;
        globeInstance = createGlobe(canvasRef.current, {
          devicePixelRatio: 2,
          width: 1000, // Render at higher res
          height: 1000,
          phi: 0,
          theta: 0.2, // Initial rotation
          dark: 0, // 0 for light theme, 1 for dark
          diffuse: 1.2,
          mapSamples: 20000,
          mapBrightness: 3, 
          baseColor: [0.79, 0.67, 0.43], // Luxury gold base [R,G,B]
          markerColor: [0.8, 0.7, 0.45], // Gold marker
          glowColor: [0.8, 0.7, 0.45], // Gold glow
          scale: 1,
          offset: [0,0],
          markers: [ // Brazilian context markers
            { location: [-14.2350, -51.9253], size: 0.1 }, // Brazil center
            { location: [-23.5505, -46.6333], size: 0.05 }, // São Paulo
            { location: [-22.9068, -43.1729], size: 0.05 }, // Rio de Janeiro
          ],
          onRender: (state: any) => {
            state.phi = phi;
            phi += 0.003; // Slower rotation
            state.width = 1000; // Ensure size consistency
            state.height = 1000;
          },
        });
      }
    }).catch(err => console.error("Failed to load Cobe dynamically:", err));

    return () => {
      
      if (globeInstance && typeof globeInstance.destroy === 'function') {
        globeInstance.destroy();
      }
      
    };
  }, []);

  return (
    <>
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

      <main className="pt-20 pb-16">
        <header className="py-20 md:py-28 bg-surface-primary luxury-shadow transition-opacity duration-500 animate-fade-in" data-delay="100">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-5xl md:text-7xl font-playfair font-semibold leading-tight text-text-primary mb-6">
                  <span className="text-primary">Transforming</span> Brazilian Real Estate
                </h1>
                <p className="text-xl md:text-2xl font-inter text-primary mb-8 max-w-xl mx-auto lg:mx-0 font-medium tracking-wide">
                  AI & Data Intelligence for a $1.5 Trillion Market
                </p>
                <p className="text-base md:text-lg text-text-tertiary max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
                  IBVI is revolutionizing property valuation with advanced data intelligence, bringing transparency and precision to Brazil's luxury real estate market.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#solution" className="bg-primary text-text-inverse font-medium tracking-wide rounded-md px-8 py-4 hover:bg-primary-hover transition-all text-sm uppercase shadow-md">
                    Discover Our Solution
                  </a>
                  <a href="#challenges" className="border-2 border-primary text-primary font-medium tracking-wide rounded-md px-8 py-3.5 hover:bg-primary hover:text-text-inverse hover:border-transparent transition-all text-sm uppercase shadow-md">
                    Market Challenges
                  </a>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
                <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30 rounded-full blur-3xl"></div>
                  <canvas
                    ref={canvasRef}
                    id="cobe-canvas"
                    style={{ width: '100%', height: '100%', aspectRatio: '1 / 1' }}
                    className="relative z-10"
                  ></canvas>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-primary/30 rounded-full"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 border border-primary/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <section id="overview" className="py-16 md:py-24 transition-opacity duration-500 animate-fade-in" data-delay="200">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-0.5 bg-primary mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary text-center mb-8">
                Brazilian Real Estate: <span className="text-primary">An Overview</span>
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="font-inter text-text-secondary text-lg md:text-xl leading-relaxed mx-auto text-center mb-10">
                Valued at $1.5 trillion, Brazil's luxury real estate market faces significant valuation inconsistencies. High-value transactions often suffer from disputes and discrepancies, directly impacting market efficiency and transparency.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center max-w-5xl mx-auto my-12">
                <div className="bg-surface-primary p-8 luxury-shadow border-b-2 border-primary group hover:translate-y-[-5px] transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-playfair font-semibold text-primary mb-2">$1.5T</p>
                  <p className="font-inter text-text-secondary text-sm font-medium">Total Market Value</p>
                </div>
                <div className="bg-surface-primary p-8 luxury-shadow border-b-2 border-primary group hover:translate-y-[-5px] transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-playfair font-semibold text-primary mb-2">$120B</p>
                  <p className="font-inter text-text-secondary text-sm font-medium">Annual Transactions</p>
                </div>
                <div className="bg-surface-primary p-8 luxury-shadow border-b-2 border-primary group hover:translate-y-[-5px] transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-playfair font-semibold text-primary mb-2">&gt;80%</p>
                  <p className="font-inter text-text-secondary text-sm font-medium">Valuation Challenges</p>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <div className="w-20 h-0.5 bg-primary/40"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="challenges" className="py-16 md:py-24 bg-surface-primary luxury-shadow transition-opacity duration-500 animate-fade-in" data-delay="300">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-0.5 bg-primary mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary text-center mb-6">
                Key Market <span className="text-primary">Challenges</span>
              </h2>
              <p className="font-inter text-text-secondary max-w-2xl text-center mb-14">
                The Brazilian luxury real estate market faces several critical challenges that affect valuation precision and market efficiency.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-surface-primary p-8 luxury-shadow border-t border-primary/20 group hover:border-primary transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-text-primary">Standardization Gaps</h3>
                </div>
                <p className="font-inter text-text-tertiary leading-relaxed pl-14">Inconsistent valuation methodologies lead to significant price discrepancies, particularly in the high-end market segment.</p>
              </div>
              
              <div className="bg-surface-primary p-8 luxury-shadow border-t border-primary/20 group hover:border-primary transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-text-primary">Buyer Valuation Hurdles</h3>
                </div>
                <p className="font-inter text-text-tertiary leading-relaxed pl-14">Over 80% of luxury property buyers struggle to assess fair market value, creating uncertainty and hesitation in high-value transactions.</p>
              </div>
              
              <div className="bg-surface-primary p-8 luxury-shadow border-t border-primary/20 group hover:border-primary transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-text-primary">Outdated Methods</h3>
                </div>
                <p className="font-inter text-text-tertiary leading-relaxed pl-14">Traditional manual appraisal processes lack the precision, consistency, and efficiency demanded by today's sophisticated market.</p>
              </div>
              
              <div className="bg-surface-primary p-8 luxury-shadow border-t border-primary/20 group hover:border-primary transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-text-primary">Transaction Delays</h3>
                </div>
                <p className="font-inter text-text-tertiary leading-relaxed pl-14">Valuation disputes significantly extend negotiation timelines, hindering market fluidity and increasing opportunity costs for all parties.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="py-16 md:py-24 bg-surface-secondary transition-opacity duration-500 animate-fade-in" data-delay="400">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-0.5 bg-primary mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary text-center mb-6">
                IBVI's <span className="text-primary">AI-Powered</span> Solution
              </h2>
              <p className="font-inter text-text-secondary text-lg leading-relaxed max-w-3xl mx-auto text-center mb-16">
                IBVI introduces Brazil's first artificial intelligence valuation platform, utilizing sophisticated analytics for precise, standardized results and creating a benchmark "FIPE-like" market index for luxury properties.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="bg-surface-primary p-8 luxury-shadow group hover:translate-y-[-5px] transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-sm mb-6 group-hover:bg-primary/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-text-primary mb-3">Data-Driven Valuations</h3>
                <p className="font-inter text-text-tertiary">Proprietary AI algorithms process vast datasets to minimize subjectivity and deliver precise valuations for high-value properties.</p>
              </div>
              
              <div className="bg-surface-primary p-8 luxury-shadow group hover:translate-y-[-5px] transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-sm mb-6 group-hover:bg-primary/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-text-primary mb-3">Predictive Analytics</h3>
                <p className="font-inter text-text-tertiary">Sophisticated forecasting models anticipate market trends, empowering investors with valuable insights for strategic decision-making.</p>
              </div>
              
              <div className="bg-surface-primary p-8 luxury-shadow group hover:translate-y-[-5px] transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-sm mb-6 group-hover:bg-primary/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-text-primary mb-3">Intelligent Search</h3>
                <p className="font-inter text-text-tertiary">Machine learning algorithms enhance property matching, connecting discerning clients with properties that precisely meet their unique criteria.</p>
              </div>
              
              <div className="bg-surface-primary p-8 luxury-shadow group hover:translate-y-[-5px] transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-sm mb-6 group-hover:bg-primary/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-text-primary mb-3">Standardized Index</h3>
                <p className="font-inter text-text-tertiary">A reliable FIPE-like benchmark for luxury property valuations, establishing a trusted standard for the Brazilian high-end real estate market.</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-16">
              <div className="bg-primary/10 border border-primary/20 px-10 py-8 max-w-3xl text-center">
                <p className="font-playfair text-xl text-text-primary mb-0">"IBVI's proprietary valuation platform represents a paradigm shift in how Brazilian luxury real estate is evaluated and transacted."</p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="data-insights" className="py-16 md:py-24 bg-surface-primary luxury-shadow transition-opacity duration-500 animate-fade-in" data-delay="500">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-0.5 bg-primary mb-6"></div>
                    <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary text-center mb-6">
                        Market <span className="text-primary">Insights</span>
                    </h2>
                    <p className="font-inter text-text-secondary text-lg leading-relaxed max-w-3xl mx-auto text-center mb-16">
                        Comprehensive analysis of Brazil's luxury real estate market reveals significant opportunities for technological innovation and standardization.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
                    <div className="bg-surface-primary p-10 luxury-shadow border-b-2 border-primary group hover:translate-y-[-5px] transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-playfair font-semibold text-primary mb-3">$1.5 Trillion</p>
                        <p className="font-inter text-text-secondary tracking-wide uppercase text-sm font-medium">Total Sector Value</p>
                    </div>
                    
                    <div className="bg-surface-primary p-10 luxury-shadow border-b-2 border-primary group hover:translate-y-[-5px] transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-playfair font-semibold text-primary mb-3">$120 Billion</p>
                        <p className="font-inter text-text-secondary tracking-wide uppercase text-sm font-medium">Annual Transactions</p>
                    </div>
                    
                    <div className="bg-surface-primary p-10 luxury-shadow border-b-2 border-primary group hover:translate-y-[-5px] transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-playfair font-semibold text-primary mb-3">&gt;80%</p>
                        <p className="font-inter text-text-secondary tracking-wide uppercase text-sm font-medium">Valuation Challenges</p>
                    </div>
                </div>
                
                <div className="max-w-3xl mx-auto mt-16 text-center">
                    <p className="font-inter text-text-secondary text-lg leading-relaxed">
                        Brazil's luxury real estate sector currently lags in adopting AI and sophisticated data analytics, making IBVI's technology-driven approach a transformative opportunity for the market.
                    </p>
                    <div className="flex justify-center mt-8">
                        <a href="#investment" className="inline-flex items-center text-primary border-b-2 border-primary pb-1 font-semibold transition-all hover:pb-2">
                  Learn about our investment approach
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section id="investment" className="py-20 md:py-28 bg-surface-darker text-text-inverse relative overflow-hidden transition-opacity duration-500 animate-fade-in" data-delay="600">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-black"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-16 h-0.5 bg-primary mb-6"></div>
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-center mb-8">
                  <span className="text-primary">Investment & Future Growth</span>
                </h2>
              </div>
              
              <div className="bg-surface-dark/50 p-10 border border-primary/30 shadow-xl mb-12 rounded-lg">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-playfair font-semibold text-primary mb-4">Vision</h3>
                    <p className="font-inter text-text-light leading-relaxed mb-6">
                      IBVI is positioned to become Brazil's premier property valuation platform by establishing unprecedented levels of transparency, precision, and efficiency in the luxury real estate market.
                    </p>
                    <p className="font-inter text-primary-light">
                      Our proprietary AI technology sets a new standard for property valuation, addressing longstanding challenges within the industry.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-playfair font-semibold text-primary mb-4">Expansion</h3>
                    <p className="font-inter text-text-light leading-relaxed mb-6">
                      Following our establishment in Brazil, IBVI's strategic expansion across Latin America promises to transform property valuation across the region, particularly in markets facing similar challenges.
                    </p>
                    <p className="font-inter text-primary-light">
                      Our scalable AI platform is designed to accommodate the nuances of diverse real estate markets while maintaining consistent valuation excellence.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <a href="#contact" className="inline-block bg-primary text-text-inverse font-medium tracking-wide rounded-md px-10 py-4 hover:bg-primary-hover transition-all text-sm uppercase shadow-md">
                  Discuss Investment Opportunities
                </a>
              </div>
            </div>
          </div>
        </section>

      <footer id="contact" className="pt-16 pb-10 bg-surface-secondary border-t border-border-default transition-opacity duration-500 animate-fade-in" data-delay="700">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-12">
            <div>
              <h3 className="text-2xl font-playfair font-semibold text-text-primary mb-4">IBVI</h3>
              <p className="font-inter text-text-secondary leading-relaxed mb-6">
                Transforming Brazilian real estate through artificial intelligence and data intelligence.
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
              <p className="font-inter text-text-tertiary text-sm">&copy; {new Date().getFullYear()} IBVI. All rights reserved.</p>
              <p className="font-inter text-text-tertiary text-sm mt-2 md:mt-0">Pioneering Luxury Real Estate Intelligence</p>
            </div>
          </div>
        </div>
      </footer>
      </main>
      
      <style jsx global>{`
        .animate-fade-in {
          transition: opacity 0.8s ease-in-out, transform 0.8s ease-out;
          opacity: 0;
        }
        .animate-fade-in.opacity-100 {
          opacity: 1;
          transform: translateY(0);
        }
        .animate-fade-in.opacity-0 {
          transform: translateY(20px);
        }
      `}</style>
    </>
  );
};

export default IBVILandingPage;
