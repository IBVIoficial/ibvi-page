'use client';

import React from 'react';

const TechnologySection = () => {
   return (
      <section className="py-16 md:py-24 bg-surface-primary transition-opacity duration-500 animate-fade-in" data-delay="300">
         <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-16">
                  <div className="w-16 h-0.5 bg-primary mb-6 mx-auto"></div>
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-8">
                     Our <span className="text-primary">Technology</span>
                  </h2>
                  <p className="text-lg text-text-tertiary max-w-3xl mx-auto">
                     IBVI's proprietary AI platform represents years of research and development, specifically designed for the complexities of the Brazilian
                     luxury real estate market.
                  </p>
               </div>

               <div className="grid md:grid-cols-2 gap-12">
                  <div className="bg-surface-primary p-8 luxury-shadow border-l-4 border-primary">
                     <h3 className="text-2xl font-playfair font-semibold text-text-primary mb-4">Advanced Machine Learning</h3>
                     <p className="text-text-tertiary leading-relaxed mb-6">
                        Our algorithms process vast datasets including property characteristics, market trends, location factors, and economic indicators to
                        generate highly accurate valuations.
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
                     <h3 className="text-2xl font-playfair font-semibold text-text-primary mb-4">Data Intelligence Platform</h3>
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
   );
};

export default TechnologySection;
