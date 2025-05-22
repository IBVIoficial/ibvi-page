"use client"
// pages/index.js
import Head from 'next/head'
import { useEffect, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    import('cobe').then(({ default: createGlobe }) => {
      let phi = 0;
      
      const canvas = canvasRef.current!;
      const globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: 1000,
        height: 1000,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        scale: 1,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.1, 0.4, 0.8],
        markerColor: [0.1, 0.8, 0.8],
        glowColor: [0.1, 0.4, 0.8],
        offset: [0, 0],
        markers: [
          // Major Brazilian cities
          { location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo
          { location: [-22.9068, -43.1729], size: 0.08 }, // Rio de Janeiro
          { location: [-15.7801, -47.9292], size: 0.07 }, // Brasília
          { location: [-19.9167, -43.9345], size: 0.06 }, // Belo Horizonte
          { location: [-3.7172, -38.5431], size: 0.05 }, // Fortaleza
          { location: [-8.0476, -34.8770], size: 0.05 }, // Recife
          { location: [-12.9714, -38.5014], size: 0.05 }, // Salvador
          { location: [-25.4284, -49.2733], size: 0.05 }, // Curitiba
          { location: [-30.0346, -51.2177], size: 0.05 }, // Porto Alegre
          // Other major global cities
          { location: [40.7128, -74.0060], size: 0.03 }, // New York
          { location: [51.5074, -0.1278], size: 0.03 }, // London
        ],
        onRender: (state) => {
          // Center on Brazil
          state.phi = phi
          state.theta = -0.3
          phi += 0.003
        },
      });
      
      return () => {
        globe.destroy();
      };
    });
  }, []);

  return (
    <div className="bg-black text-white font-light">
      <Head>
        <title>IBVI - Brazilian Real Estate Intelligence</title>
        <meta name="description" content="Transforming Brazilian Real Estate with AI and Data Intelligence" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
            </svg>
            <span className="ml-3 text-xl tracking-tight">IBVI</span>
          </div>
          <div className="hidden md:flex space-x-10 text-sm text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Solutions</a>
            <a href="#" className="hover:text-white transition-colors">Market Data</a>
            <a href="#" className="hover:text-white transition-colors">Technology</a>
            <a href="#" className="hover:text-white transition-colors">About Us</a>
          </div>
          <div>
            <button className="text-sm border border-gray-700 rounded-md px-4 py-2 hover:bg-white/5 transition-all">
              Sign in
            </button>
          </div>
        </div>
      </nav>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-black z-0">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            backgroundSize: '50px 50px',
          }}></div>
        </div>
        
        {/* Hero content */}
        <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            {/* Text content */}
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Transforming</span> Brazilian Real Estate
              </h1>
              <p className="text-gray-300 text-xl md:text-2xl mb-8 max-w-2xl font-extralight tracking-wide">
                IBVI is revolutionizing Brazil's $1.5T real estate market with AI-powered property valuations, bringing unprecedented transparency and accuracy to the industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white font-light rounded-md px-6 py-3 hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/20">
                  Request a Demo
                </button>
                <button className="bg-transparent border border-gray-700 rounded-md px-6 py-3 hover:bg-white/5 transition-all flex items-center gap-2">
                  <span>Watch Video</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Globe visualization */}
            <div className="md:w-1/2 relative">
              <div className="relative h-[500px] w-[500px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
                <canvas
                  ref={canvasRef}
                  style={{ width: '500px', height: '500px' }}
                  width="1000"
                  height="1000"
                  className="relative z-10"
                />
              </div>
            </div>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-16"></div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group hover:bg-gray-900/50 p-4 rounded-lg transition-all">
              <p className="text-4xl font-light mb-1 tracking-tight text-blue-400">$1.5T</p>
              <p className="text-gray-400 font-extralight">Brazilian Real Estate Market</p>
              <p className="text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Largest in Latin America</p>
            </div>
            <div className="group hover:bg-gray-900/50 p-4 rounded-lg transition-all">
              <p className="text-4xl font-light mb-1 tracking-tight text-teal-400">80%+</p>
              <p className="text-gray-400 font-extralight">Buyers face valuation issues</p>
              <p className="text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Due to inconsistent methods</p>
            </div>
            <div className="group hover:bg-gray-900/50 p-4 rounded-lg transition-all">
              <p className="text-4xl font-light mb-1 tracking-tight text-blue-400">95%</p>
              <p className="text-gray-400 font-extralight">Valuation accuracy</p>
              <p className="text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">With AI-powered analysis</p>
            </div>
            <div className="group hover:bg-gray-900/50 p-4 rounded-lg transition-all">
              <p className="text-4xl font-light mb-1 tracking-tight text-teal-400">40%</p>
              <p className="text-gray-400 font-extralight">Faster transactions</p>
              <p className="text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">With standardized valuations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
