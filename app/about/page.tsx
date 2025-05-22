"use client"
// pages/about.js
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    // Animation effect for fade-ins
    const animatedElements = document.querySelectorAll<HTMLElement>('.animate-fade-in');
    animatedElements.forEach((element: HTMLElement) => {
      element.classList.add('opacity-0');
      const delay = element.dataset.delay ? parseInt(element.dataset.delay, 10) : 0;
      setTimeout(() => {
        element.classList.remove('opacity-0');
        element.classList.add('opacity-100');
      }, delay);
    });
  }, []);

  return (
    <>
      <Head>
        <title>About IBVI - Transforming Brazilian Real Estate</title>
        <meta name="description" content="Learn about how IBVI is revolutionizing the Brazilian real estate market through AI and data intelligence." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-slate-900 text-white min-h-screen font-['Inter']">
        <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 transition-all duration-300 animate-fade-in" data-delay="0">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-md bg-emerald-500 flex items-center justify-center text-white font-semibold text-xl">IB</div>
              <span className="ml-3 text-xl tracking-wide">IBVI</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <Link href="/about" className="text-emerald-400 border-b border-emerald-400 pb-1">About</Link>
              <Link href="/solutions" className="hover:text-emerald-400 transition-colors">Solutions</Link>
              <Link href="/market-data" className="hover:text-emerald-400 transition-colors">Market Data</Link>
              <Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link>
            </div>
            <div className="md:hidden">
              <button className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <main className="pt-20 pb-16">
          {/* Hero Section */}
          <section className="container mx-auto px-6 py-12 md:py-24 transition-opacity duration-500 animate-fade-in" data-delay="100">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-extralight tracking-wide leading-tight">
                Transforming <span className="text-emerald-500">Brazilian Real Estate</span> Through AI
              </h1>
              <p className="text-xl md:text-2xl mt-8 text-slate-300 font-light tracking-wide max-w-3xl">
                IBVI is revolutionizing property valuation with advanced data intelligence, bringing transparency and precision to a $1.5 trillion market.
              </p>
            </div>
          </section>

          {/* Bento Grid Layout */}
          <section className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Feature Cell */}
              <div className="md:col-span-2 md:row-span-2 bg-slate-800 rounded-xl p-8 transition-opacity duration-500 animate-fade-in" data-delay="200">
                <h2 className="text-2xl font-light text-emerald-400 mb-4 tracking-wide">The Brazilian Real Estate Challenge</h2>
                <p className="text-slate-300 mb-6">
                  Despite being one of Latin America's largest markets at $1.5 trillion, Brazil's real estate sector faces significant challenges in property valuation practices. Inconsistent methods and lack of standardization create uncertainty for buyers, sellers, and industry professionals.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  <div className="bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="text-xl font-light text-white mb-2">Market Size</h3>
                    <p className="text-4xl font-light text-emerald-500">$1.5T</p>
                    <p className="text-sm text-slate-400 mt-2">Total market valuation</p>
                  </div>
                  <div className="bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="text-xl font-light text-white mb-2">Transaction Volume</h3>
                    <p className="text-4xl font-light text-emerald-500">$120B</p>
                    <p className="text-sm text-slate-400 mt-2">Annual transactions</p>
                  </div>
                </div>
              </div>

              {/* Smaller Cell 1 */}
              <div className="bg-slate-800 rounded-xl p-6 flex flex-col transition-opacity duration-500 animate-fade-in" data-delay="300">
                <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light mb-2">Lack of Standardization</h3>
                <p className="text-slate-300 text-sm flex-grow">
                  Property valuations in Brazil are inconsistent, with uneven application of international standards leading to price discrepancies.
                </p>
              </div>

              {/* Smaller Cell 2 */}
              <div className="bg-slate-800 rounded-xl p-6 flex flex-col transition-opacity duration-500 animate-fade-in" data-delay="400">
                <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light mb-2">Buyer Challenges</h3>
                <p className="text-slate-300 text-sm flex-grow">
                  Over 80% of buyers struggle to determine fair market value due to inconsistent valuation methods and reliance on subjective assessments.
                </p>
              </div>

              {/* Smaller Cell 3 */}
              <div className="bg-slate-800 rounded-xl p-6 flex flex-col transition-opacity duration-500 animate-fade-in" data-delay="500">
                <div className="rounded-full bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light mb-2">Outdated Methods</h3>
                <p className="text-slate-300 text-sm flex-grow">
                  Manual assessment methods lack the speed, consistency, and accuracy that modern data-driven models can provide.
                </p>
              </div>
            </div>
          </section>

          {/* Our Solution Section */}
          <section className="container mx-auto px-6 py-12 transition-opacity duration-500 animate-fade-in" data-delay="600">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-wide mb-12">Our <span className="text-emerald-500">Solution</span></h2>
            
            <div className="bg-slate-800 rounded-xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-light text-emerald-400 mb-6 tracking-wide">AI-Powered Property Valuation</h3>
                  <p className="text-slate-300 mb-6">
                    IBVI is introducing Brazil's first AI-powered property valuation platform, using advanced data analytics and machine learning to deliver precise, standardized valuations.
                  </p>
                  <p className="text-slate-300 mb-6">
                    By establishing a "FIPE-like" index for real estate, we're bringing a much-needed benchmark to the market, reducing inefficiencies and improving transaction speeds.
                  </p>
                  <button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-md transition-colors">
                    Explore Our Platform
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-slate-700/50 p-6 rounded-lg flex items-start">
                    <div className="bg-emerald-500/10 rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-light mb-2">Data-Driven Valuations</h4>
                      <p className="text-sm text-slate-400">Standardized, data-backed valuations that minimize subjective discrepancies</p>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 p-6 rounded-lg flex items-start">
                    <div className="bg-emerald-500/10 rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-light mb-2">Predictive Analytics</h4>
                      <p className="text-sm text-slate-400">Advanced analytics to forecast property value trends for better investment decisions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Investment Potential Section */}
          <section className="container mx-auto px-6 py-12 transition-opacity duration-500 animate-fade-in" data-delay="700">
            <div className="bg-emerald-900/20 rounded-xl p-8 md:p-12">
              <h2 className="text-3xl font-light text-emerald-400 mb-6 tracking-wide">Investment Potential</h2>
              <p className="text-slate-300 mb-8 max-w-3xl">
                By providing transparency, precision, and efficiency, IBVI is positioned to become the preferred property valuation platform in Brazil. With further expansions planned across Latin America, our AI-driven solution promises to disrupt not only the Brazilian market but also other regions facing similar valuation issues.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-md transition-colors">
                  Partner With Us
                </button>
                <button className="bg-transparent border border-emerald-500 text-emerald-400 px-6 py-3 rounded-md hover:bg-emerald-500/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-slate-950 py-12 transition-opacity duration-500 animate-fade-in" data-delay="800">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="h-10 w-10 rounded-md bg-emerald-500 flex items-center justify-center text-white font-semibold text-xl">IB</div>
                <span className="ml-3 text-xl tracking-wide">IBVI</span>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-400">
                <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">About</Link>
                <Link href="/solutions" className="hover:text-emerald-400 transition-colors">Solutions</Link>
                <Link href="/market-data" className="hover:text-emerald-400 transition-colors">Market Data</Link>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
              </div>
            </div>
            <div className="h-px bg-slate-800 my-8"></div>
            <div className="text-sm text-slate-500 text-center">
              © {new Date().getFullYear()} IBVI - Instituto Brasileiro de Valores Imobiliários. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        .animate-fade-in {
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
}
