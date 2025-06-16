'use client';

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
    <div className="min-h-screen bg-surface-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-surface-primary backdrop-blur-md z-50 transition-all duration-300 animate-fade-in border-b border-border-default luxury-shadow" data-delay="0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img 
                src="/images/ibvi-logo.png" 
                alt="IBVI Logo" 
                className="h-10 w-auto"
                width={160}
                height={40}
              />
            </a>
            <div className="hidden md:flex space-x-10 text-sm">
              <a href="/#overview" className="text-text-primary hover:text-link transition-colors font-medium">Overview</a>
              <a href="/#challenges" className="text-text-primary hover:text-link transition-colors font-medium">Challenges</a>
              <a href="/#solution" className="text-text-primary hover:text-link transition-colors font-medium">Solution</a>
              <a href="/#investment" className="text-text-primary hover:text-link transition-colors font-medium">Investment</a>
            </div>
            <div className="hidden md:block">
              <a href="/#contact" className="text-sm bg-button-primary text-text-inverse rounded-md px-6 py-3.5 hover:bg-button-primary-hover transition-all font-medium tracking-wide shadow-md">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <header className="py-20 md:py-28 bg-surface-primary luxury-shadow transition-opacity duration-500 animate-fade-in" data-delay="100">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-playfair font-semibold leading-tight text-text-primary mb-6">
                About <span className="text-primary">IBVI</span>
              </h1>
              <p className="text-xl md:text-2xl font-inter text-primary mb-8 font-medium tracking-wide">
                Revolutionizing Brazilian Real Estate with AI Intelligence
              </p>
              <p className="text-base md:text-lg text-text-tertiary max-w-3xl mx-auto mb-10 leading-relaxed">
                IBVI is at the forefront of transforming Brazil's $1.5 trillion real estate market through cutting-edge artificial intelligence and data analytics, bringing unprecedented transparency and precision to property valuations.
              </p>
            </div>
          </div>
        </header>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-surface-secondary transition-opacity duration-500 animate-fade-in" data-delay="200">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="w-16 h-0.5 bg-primary mb-6 mx-auto"></div>
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-8">
                  Our <span className="text-primary">Mission</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">Transparency</h3>
                  <p className="text-text-tertiary leading-relaxed">
                    Bringing clear, standardized valuations to eliminate uncertainty and disputes in luxury real estate transactions.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">Precision</h3>
                  <p className="text-text-tertiary leading-relaxed">
                    Leveraging AI and machine learning to deliver the most accurate property valuations in the Brazilian market.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">Innovation</h3>
                  <p className="text-text-tertiary leading-relaxed">
                    Pioneering the first FIPE-like index for luxury properties, setting new industry standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 md:py-24 bg-surface-primary transition-opacity duration-500 animate-fade-in" data-delay="300">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="w-16 h-0.5 bg-primary mb-6 mx-auto"></div>
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-8">
                  Our <span className="text-primary">Technology</span>
                </h2>
                <p className="text-lg text-text-tertiary max-w-3xl mx-auto">
                  IBVI's proprietary AI platform represents years of research and development, specifically designed for the complexities of the Brazilian luxury real estate market.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-surface-primary p-8 luxury-shadow border-l-4 border-primary">
                  <h3 className="text-2xl font-playfair font-semibold text-text-primary mb-4">
                    Advanced Machine Learning
                  </h3>
                  <p className="text-text-tertiary leading-relaxed mb-6">
                    Our algorithms process vast datasets including property characteristics, market trends, location factors, and economic indicators to generate highly accurate valuations.
                  </p>
                  <ul className="space-y-2 text-text-tertiary">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Real-time market data analysis
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Comparative market analysis
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Predictive modeling
                    </li>
                  </ul>
                </div>
                
                <div className="bg-surface-primary p-8 luxury-shadow border-l-4 border-primary">
                  <h3 className="text-2xl font-playfair font-semibold text-text-primary mb-4">
                    Data Intelligence Platform
                  </h3>
                  <p className="text-text-tertiary leading-relaxed mb-6">
                    Our comprehensive platform integrates multiple data sources to provide a 360-degree view of property values and market dynamics.
                  </p>
                  <ul className="space-y-2 text-text-tertiary">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Standardized valuation methodology
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Market trend forecasting
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Risk assessment analytics
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-surface-secondary transition-opacity duration-500 animate-fade-in" data-delay="400">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-0.5 bg-primary mb-6 mx-auto"></div>
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-8">
                Our <span className="text-primary">Expertise</span>
              </h2>
              <p className="text-lg text-text-tertiary mb-12 leading-relaxed">
                IBVI brings together experts in real estate, artificial intelligence, data science, and Brazilian market dynamics to deliver unparalleled insights and solutions.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-playfair font-semibold text-primary mb-2">15+</div>
                  <p className="text-text-tertiary">Years Combined Real Estate Experience</p>
                </div>
                <div>
                  <div className="text-4xl font-playfair font-semibold text-primary mb-2">50M+</div>
                  <p className="text-text-tertiary">Data Points Analyzed</p>
                </div>
                <div>
                  <div className="text-4xl font-playfair font-semibold text-primary mb-2">95%</div>
                  <p className="text-text-tertiary">Valuation Accuracy Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-surface-primary transition-opacity duration-500 animate-fade-in" data-delay="500">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-6">
                Ready to Transform Your Real Estate Experience?
              </h2>
              <p className="text-lg text-text-tertiary mb-10 leading-relaxed">
                Join us in revolutionizing the Brazilian real estate market with cutting-edge AI technology and unmatched precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/#solution" className="bg-primary text-text-inverse font-medium tracking-wide rounded-md px-8 py-4 hover:bg-primary-hover transition-all text-sm uppercase shadow-md">
                  Explore Our Solution
                </a>
                <a href="/#contact" className="border-2 border-primary text-primary font-medium tracking-wide rounded-md px-8 py-3.5 hover:bg-primary hover:text-text-inverse hover:border-transparent transition-all text-sm uppercase shadow-md">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pt-16 pb-10 bg-surface-secondary border-t border-border-default">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <a href="/" className="inline-block mb-6">
              <img 
                src="/images/ibvi-logo.png" 
                alt="IBVI Logo" 
                className="h-10 w-auto"
                width={160}
                height={40}
              />
            </a>
            <p className="text-text-tertiary mb-6">
              Transforming Brazilian real estate through artificial intelligence and data intelligence.
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="/#overview" className="text-text-muted hover:text-primary transition-colors">Overview</a>
              <a href="/#challenges" className="text-text-muted hover:text-primary transition-colors">Challenges</a>
              <a href="/#solution" className="text-text-muted hover:text-primary transition-colors">Solution</a>
              <a href="/#investment" className="text-text-muted hover:text-primary transition-colors">Investment</a>
            </div>
            <div className="border-t border-border-light pt-6">
              <p className="text-text-light text-sm">
                © 2024 IBVI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}