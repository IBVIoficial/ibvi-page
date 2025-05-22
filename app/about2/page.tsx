"use client"

import { useEffect } from 'react';

export default function AboutPage() {
  return (
    <>
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 sticky top-0 z-50 bg-black/70 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl tracking-tight font-semibold">IBVI</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm text-gray-300">
            <a href="#overview" className="hover:text-white transition-colors">Overview</a>
            <a href="#challenges" className="hover:text-white transition-colors">Challenges</a>
            <a href="#solution" className="hover:text-white transition-colors">Solution</a>
            <a href="#investment" className="hover:text-white transition-colors">Investment</a>
          </div>
          <div>
            <button className="text-sm border border-gray-700 rounded-md px-4 py-2 hover:bg-white/10 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {/* Hero / Overview */}
      <header id="overview" className="container mx-auto px-6 pt-16 md:pt-24 pb-12">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-emerald-400">IBVI:</span> Transforming Brazilian Real Estate
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-4 max-w-3xl font-light tracking-wide">
            Through AI and Data Intelligence.
          </p>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-3xl font-extralight">
            Brazil’s real estate market, valued at $1.5 trillion, struggles with inconsistent property valuations. IBVI introduces an AI-powered platform for precise, standardized valuations, enhancing market efficiency and transaction speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a href="#solution" className="bg-white text-black font-light rounded-md px-8 py-3 hover:bg-opacity-90 transition-all text-base">
              Discover Our Solution
            </a>
            <a href="#challenges" className="flex items-center text-gray-300 hover:text-white transition-colors py-3 px-2 group text-base">
              Market Challenges
              <span className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>
      </header>

      {/* Section: Identifying Key Challenges */}
      <section id="challenges" className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-12 text-center">Key Challenges in the Market</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/5 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold mb-3 text-sky-300">1. Lack of Standardization</h3>
            <p className="text-gray-300 font-light text-sm">Inconsistent valuations due to uneven application of standards (e.g., RICS), causing price discrepancies and uncertainty.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold mb-3 text-sky-300">2. Buyer Difficulties</h3>
            <p className="text-gray-300 font-light text-sm">Over 80% of buyers struggle to assess fair market value, relying on manual appraisals lacking data precision, especially in high-end segments.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold mb-3 text-sky-300">3. Outdated Assessment Methods</h3>
            <p className="text-gray-300 font-light text-sm">Reliance on manual methods lacking speed, consistency, and accuracy, prolonging negotiations and complicating valuations.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold mb-3 text-sky-300">4. Impact on Transaction Times</h3>
            <p className="text-gray-300 font-light text-sm">Valuation inconsistencies extend negotiations, hindering market fluidity, transparency, and efficient transactions.</p>
          </div>
        </div>
      </section>

      {/* Section: IBVI's Solution */}
      <section id="solution" className="container mx-auto px-6 my-10">
        <div className="bg-gray-900/50 p-8 md:p-12 rounded-xl shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">IBVI’s Solution: AI for Transparent Valuations</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 font-light">
              IBVI (Instituto Brasileiro de Valores Imobiliários) introduces Brazil’s first AI-powered property valuation platform. Using advanced data analytics and machine learning, we deliver precise, standardized valuations to reduce market inefficiencies and improve transaction speeds, establishing a “FIPE-like” index for real estate.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-10 max-w-5xl mx-auto">
            <div className="flex items-start space-x-4">
              <span className="material-symbols-outlined text-emerald-400 text-3xl mt-1">analytics</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Data-Driven Valuations</h3>
                <p className="text-gray-400 font-light text-sm">AI and machine learning provide standardized, data-backed valuations, minimizing subjective discrepancies.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="material-symbols-outlined text-emerald-400 text-3xl mt-1">model_training</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
                <p className="text-gray-400 font-light text-sm">Forecast property value trends, empowering investors with better-informed decisions.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="material-symbols-outlined text-emerald-400 text-3xl mt-1">manage_search</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Intelligent Search</h3>
                <p className="text-gray-400 font-light text-sm">Machine learning enhances property search, matching users with properties meeting unique criteria.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="material-symbols-outlined text-emerald-400 text-3xl mt-1">insights</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Standardized Index</h3>
                <p className="text-gray-400 font-light text-sm">A reliable benchmark for property valuations in Brazil, modeled after the FIPE index for the automotive industry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section: Supporting the Pitch with Market Data */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-12 text-center">Market Data Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="bg-white/5 p-6 rounded-lg shadow-xl">
            <p className="text-4xl font-semibold mb-2 tracking-tight text-sky-300">$1.5 Trillion</p>
            <p className="text-gray-300 font-light">Brazil's Real Estate Sector Value</p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg shadow-xl">
            <p className="text-4xl font-semibold mb-2 tracking-tight text-sky-300">$120 Billion</p>
            <p className="text-gray-300 font-light">Annual Transaction Volume</p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg shadow-xl sm:col-span-2 lg:col-span-1">
            <p className="text-4xl font-semibold mb-2 tracking-tight text-sky-300">&gt;80%</p>
            <p className="text-gray-300 font-light">Buyers Facing Valuation Difficulties</p>
          </div>
        </div>
         <p className="text-center text-gray-400 mt-8 font-extralight max-w-2xl mx-auto">
          Industry analyses suggest Brazil’s real estate sector lags in adopting AI and data analytics, making IBVI’s technology-driven approach a potential game-changer.
        </p>
      </section>

      {/* Section: Investment Potential */}
      <section id="investment" className="container mx-auto px-6 pb-16"> {/* Added pb-16 for bottom spacing */}
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-sky-600/30 to-emerald-600/30 p-8 md:p-12 rounded-xl shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">Investment Potential & Future Growth</h2>
          <p className="text-gray-200 text-lg md:text-xl mb-6 font-light">
            By providing transparency, precision, and efficiency, IBVI is positioned to become the preferred property valuation platform in Brazil.
          </p>
          <p className="text-gray-300 font-extralight">
            With further expansions planned across Latin America, IBVI’s AI-driven solution promises to disrupt not only the Brazilian market but also other regions facing similar valuation challenges.
          </p>
        </div>
      </section>
    </>
  );
}
