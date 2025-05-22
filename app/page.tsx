'use client'; // Required for useEffect and DOM manipulation

import React, { useEffect, useRef } from 'react';
// Ensure createGlobe type is handled or use 'any' if types are not available/needed
// For Skypack, direct import in useEffect might be simpler if module resolution is an issue.

const IBVILandingPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let globeInstance: any; // To store the globe instance for potential cleanup

    // Using a dynamic import with 'any' type assertion to handle the CDN import
    // @ts-ignore - Ignoring TypeScript error for external CDN import
    import('https://cdn.skypack.dev/cobe' as any)
      .then((module) => {
        const createGlobe = module.default;
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
            mapBrightness: 3, // Adjusted for teal/sky theme
            baseColor: [0.2, 0.7, 0.8], // Teal-ish base [R,G,B]
            markerColor: [0.1, 0.5, 0.9], // Sky-ish marker
            glowColor: [0.2, 0.6, 0.85], // Teal/Sky glow
            scale: 1,
            offset: [0,0],
            markers: [ // Example markers, adjust to Brazilian context if desired
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
      })
      .catch(err => console.error("Failed to load globe:", err));

    return () => {
      // Optional: Cleanup globe instance if it has a destroy method
      if (globeInstance && typeof globeInstance.destroy === 'function') {
        globeInstance.destroy();
      }
    };
  }, []);

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 luxury-shadow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-2xl font-playfair font-semibold text-luxury-gold">IBVI</a>
            <div className="hidden md:flex space-x-10 text-sm font-light">
              <a href="#overview" className="hover:text-luxury-gold transition-colors btn-luxury">Overview</a>
              <a href="#challenges" className="hover:text-luxury-gold transition-colors btn-luxury">Challenges</a>
              <a href="#solution" className="hover:text-luxury-gold transition-colors btn-luxury">Solution</a>
              <a href="#investment" className="hover:text-luxury-gold transition-colors btn-luxury">Investment</a>
            </div>
            <div>
              <a href="#contact" className="text-sm bg-luxury-gold text-white rounded-sm px-6 py-3 hover:bg-opacity-90 transition-all font-light tracking-wide">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <header className="py-16 md:py-24 bg-white luxury-shadow">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-[64px] lg:text-[72px] font-playfair font-semibold leading-tight text-gray-900 mb-6">
                  IBVI: <span className="text-luxury-gold">Real Estate</span> Transformed
                </h1>
                <p className="text-xl sm:text-2xl md:text-[26px] font-inter text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0 font-light tracking-wide">
                  AI & Data Intelligence for Brazil's Luxury Market
                </p>
                <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto lg:mx-0 mb-10 font-light leading-relaxed">
                  Brazil's $1.5T real estate market, reimagined with precision. IBVI offers AI-driven valuations, enhancing market efficiency and transparency for discerning investors and luxury property transactions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#solution" className="bg-luxury-gold text-white font-light tracking-wide rounded-sm px-8 py-3.5 hover:bg-opacity-90 transition-all text-sm uppercase">
                    Discover Our Solution
                  </a>
                  <a href="#challenges" className="border border-luxury-gold text-gray-800 font-light tracking-wide rounded-sm px-8 py-3.5 hover:bg-gray-50 transition-all text-sm uppercase">
                    Market Challenges
                  </a>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
                <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 to-amber-100/30 rounded-full blur-3xl"></div>
                  <canvas
                    ref={canvasRef}
                    id="cobe-canvas"
                    style={{ width: '100%', height: '100%', aspectRatio: '1 / 1' }}
                    className="relative z-10"
                  ></canvas>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-luxury-gold/30 rounded-full"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 border border-luxury-gold/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <section id="overview" className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-0.5 bg-luxury-gold mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-gray-900 text-center mb-12">
                Brazilian Real Estate: An Overview
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="font-inter text-gray-700 text-lg md:text-xl leading-relaxed mx-auto text-center mb-10 font-light">
                Valued at $1.5 trillion, Brazil's luxury real estate market faces significant valuation inconsistencies. High-value transactions often suffer from disputes and discrepancies, directly impacting market efficiency.
              </p>
              <div className="flex justify-center">
                <div className="w-20 h-0.5 bg-luxury-gold/40"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="challenges" className="py-16 md:py-24 bg-white luxury-shadow">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-0.5 bg-luxury-gold mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-gray-900 text-center mb-6">
                Key Market Challenges
              </h2>
              <p className="font-inter text-gray-700 max-w-2xl text-center font-light mb-14">
                The Brazilian luxury real estate market faces several critical challenges that affect valuation precision and market efficiency.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 luxury-shadow border-t border-luxury-gold/20 group hover:border-luxury-gold transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold mr-4 group-hover:bg-luxury-gold/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-gray-900">Standardization Gaps</h3>
                </div>
                <p className="font-inter text-gray-600 leading-relaxed pl-14">Inconsistent valuation methodologies lead to significant price discrepancies, particularly in the high-end market segment.</p>
              </div>
              
              <div className="bg-white p-8 luxury-shadow border-t border-luxury-gold/20 group hover:border-luxury-gold transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold mr-4 group-hover:bg-luxury-gold/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-gray-900">Buyer Valuation Hurdles</h3>
                </div>
                <p className="font-inter text-gray-600 leading-relaxed pl-14">Over 80% of luxury property buyers struggle to assess fair market value, creating uncertainty and hesitation in high-value transactions.</p>
              </div>
              
              <div className="bg-white p-8 luxury-shadow border-t border-luxury-gold/20 group hover:border-luxury-gold transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold mr-4 group-hover:bg-luxury-gold/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-gray-900">Outdated Methods</h3>
                </div>
                <p className="font-inter text-gray-600 leading-relaxed pl-14">Traditional manual appraisal processes lack the precision, consistency, and efficiency demanded by today's sophisticated market.</p>
              </div>
              
              <div className="bg-white p-8 luxury-shadow border-t border-luxury-gold/20 group hover:border-luxury-gold transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold mr-4 group-hover:bg-luxury-gold/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-gray-900">Transaction Delays</h3>
                </div>
                <p className="font-inter text-gray-600 leading-relaxed pl-14">Valuation disputes significantly extend negotiation timelines, hindering market fluidity and increasing opportunity costs for all parties.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-0.5 bg-luxury-gold mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-gray-900 text-center mb-6">
                IBVI's <span className="text-luxury-gold">AI-Powered</span> Solution
              </h2>
              <p className="font-inter text-gray-700 text-lg font-light leading-relaxed max-w-3xl mx-auto text-center mb-16">
                IBVI introduces Brazil's first artificial intelligence valuation platform, utilizing sophisticated analytics for precise, standardized results and creating a benchmark "FIPE-like" market index for luxury properties.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-8 luxury-shadow group hover:translate-y-[-5px] transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center bg-luxury-gold/10 text-luxury-gold rounded-sm mb-6 group-hover:bg-luxury-gold/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-3">Data-Driven Valuations</h3>
                <p className="font-inter text-gray-600 font-light">Proprietary AI algorithms process vast datasets to minimize subjectivity and deliver precise valuations for high-value properties.</p>
              </div>
              
              <div className="bg-white p-8 luxury-shadow group hover:translate-y-[-5px] transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center bg-luxury-gold/10 text-luxury-gold rounded-sm mb-6 group-hover:bg-luxury-gold/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-3">Predictive Analytics</h3>
                <p className="font-inter text-gray-600 font-light">Sophisticated forecasting models anticipate market trends, empowering investors with valuable insights for strategic decision-making.</p>
              </div>
              
              <div className="bg-white p-8 luxury-shadow group hover:translate-y-[-5px] transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center bg-luxury-gold/10 text-luxury-gold rounded-sm mb-6 group-hover:bg-luxury-gold/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-3">Intelligent Search</h3>
                <p className="font-inter text-gray-600 font-light">Machine learning algorithms enhance property matching, connecting discerning clients with properties that precisely meet their unique criteria.</p>
              </div>
              
              <div className="bg-white p-8 luxury-shadow group hover:translate-y-[-5px] transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center bg-luxury-gold/10 text-luxury-gold rounded-sm mb-6 group-hover:bg-luxury-gold/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-3">Standardized Index</h3>
                <p className="font-inter text-gray-600 font-light">A reliable FIPE-like benchmark for luxury property valuations, establishing a trusted standard for the Brazilian high-end real estate market.</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-16">
              <div className="bg-luxury-gold/10 border border-luxury-gold/20 px-10 py-8 max-w-3xl text-center">
                <p className="font-playfair text-xl text-gray-900 mb-0">"IBVI's proprietary valuation platform represents a paradigm shift in how Brazilian luxury real estate is evaluated and transacted."</p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="data-insights" className="py-16 md:py-24 bg-white luxury-shadow">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-0.5 bg-luxury-gold mb-6"></div>
                    <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-gray-900 text-center mb-6">
                        Market <span className="text-luxury-gold">Insights</span>
                    </h2>
                    <p className="font-inter text-gray-700 text-lg font-light leading-relaxed max-w-3xl mx-auto text-center mb-16">
                        Comprehensive analysis of Brazil's luxury real estate market reveals significant opportunities for technological innovation and standardization.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
                    <div className="bg-white p-10 luxury-shadow border-b-2 border-luxury-gold group hover:translate-y-[-5px] transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold group-hover:bg-luxury-gold/20 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-playfair font-semibold text-luxury-gold mb-3">$1.5 Trillion</p>
                        <p className="font-inter text-gray-700 tracking-wide uppercase text-sm font-light">Total Sector Value</p>
                    </div>
                    
                    <div className="bg-white p-10 luxury-shadow border-b-2 border-luxury-gold group hover:translate-y-[-5px] transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold group-hover:bg-luxury-gold/20 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-playfair font-semibold text-luxury-gold mb-3">$120 Billion</p>
                        <p className="font-inter text-gray-700 tracking-wide uppercase text-sm font-light">Annual Transactions</p>
                    </div>
                    
                    <div className="bg-white p-10 luxury-shadow border-b-2 border-luxury-gold group hover:translate-y-[-5px] transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold group-hover:bg-luxury-gold/20 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-playfair font-semibold text-luxury-gold mb-3">&gt;80%</p>
                        <p className="font-inter text-gray-700 tracking-wide uppercase text-sm font-light">Valuation Challenges</p>
                    </div>
                </div>
                
                <div className="max-w-3xl mx-auto mt-16 text-center">
                    <p className="font-inter text-gray-700 text-lg leading-relaxed font-light">
                        Brazil's luxury real estate sector currently lags in adopting AI and sophisticated data analytics, making IBVI's technology-driven approach a transformative opportunity for the market.
                    </p>
                    <div className="flex justify-center mt-8">
                        <a href="#investment" className="inline-flex items-center text-luxury-gold border-b border-luxury-gold pb-1 font-light transition-all hover:pb-2">
                            Learn about our investment approach
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section id="investment" className="py-20 md:py-28 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/30 to-black"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-16 h-0.5 bg-luxury-gold mb-6"></div>
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-center mb-8">
                  Investment <span className="text-luxury-gold">&</span> Future Growth
                </h2>
              </div>
              
              <div className="bg-gray-800/50 p-10 border border-luxury-gold/20 luxury-shadow mb-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-playfair font-semibold text-luxury-gold mb-4">Vision</h3>
                    <p className="font-inter text-gray-300 leading-relaxed font-light mb-6">
                      IBVI is positioned to become Brazil's premier property valuation platform by establishing unprecedented levels of transparency, precision, and efficiency in the luxury real estate market.
                    </p>
                    <p className="font-inter text-gray-400 font-light">
                      Our proprietary AI technology sets a new standard for property valuation, addressing longstanding challenges within the industry.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-playfair font-semibold text-luxury-gold mb-4">Expansion</h3>
                    <p className="font-inter text-gray-300 leading-relaxed font-light mb-6">
                      Following our establishment in Brazil, IBVI's strategic expansion across Latin America promises to transform property valuation across the region, particularly in markets facing similar challenges.
                    </p>
                    <p className="font-inter text-gray-400 font-light">
                      Our scalable AI platform is designed to accommodate the nuances of diverse real estate markets while maintaining consistent valuation excellence.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <a href="#contact" className="inline-block bg-luxury-gold text-gray-900 font-light tracking-wide rounded-sm px-10 py-4 hover:bg-opacity-90 transition-all text-sm uppercase">
                  Discuss Investment Opportunities
                </a>
              </div>
            </div>
          </div>
        </section>

      <footer id="contact" className="pt-16 pb-10 bg-white border-t border-gray-100 luxury-shadow">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-12">
            <div>
              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-4">IBVI</h3>
              <p className="font-inter text-gray-600 font-light leading-relaxed mb-6">
                Transforming Brazilian real estate through artificial intelligence and data intelligence.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-luxury-gold hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                  </svg>
                </a>
                <a href="#" className="text-luxury-gold hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8.245V12H12v4h4v3.755l4-4v-3.51l-4-4zM12 4H4v16h8V4zm4-4v12h-4V0h4z" />
                  </svg>
                </a>
                <a href="#" className="text-luxury-gold hover:text-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-4">Contact</h3>
              <p className="font-inter text-gray-600 font-light mb-2 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Av. Paulista, 1000, São Paulo, Brazil</span>
              </p>
              <p className="font-inter text-gray-600 font-light mb-2 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contact@ibvi.com.br</span>
              </p>
              <p className="font-inter text-gray-600 font-light flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+55 11 3456-7890</span>
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-4">Subscribe</h3>
              <p className="font-inter text-gray-600 font-light mb-4">
                Stay informed about our latest developments and investment opportunities.
              </p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 w-full bg-gray-50 border border-gray-200 focus:outline-none" />
                <button className="bg-luxury-gold text-white px-4 hover:bg-opacity-90 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="font-inter text-gray-500 text-sm">&copy; {new Date().getFullYear()} IBVI. All rights reserved.</p>
              <p className="font-inter text-gray-400 text-sm mt-2 md:mt-0">Pioneering Luxury Real Estate Intelligence</p>
            </div>
          </div>
        </div>
      </footer>
      </main>
    </>
  );
};

export default IBVILandingPage;
