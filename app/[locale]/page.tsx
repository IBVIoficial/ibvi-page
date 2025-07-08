'use client';

import React, {useEffect} from 'react';
import HeroSection from './components/hero-section';
import OverviewSection from './components/overview-section';
import ChallengesSection from './components/challenges-section';
import SolutionSection from './components/solution-section';

import InvestmentSection from './components/investment-section';

const IBVILandingPage = () => {
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
   }, []);

   return (
      <>
         <HeroSection />
         <OverviewSection />
         <ChallengesSection />
         <SolutionSection />

         <InvestmentSection />

         <style jsx global>{`
            .animate-fade-in {
               transition:
                  opacity 0.8s ease-in-out,
                  transform 0.8s ease-out;
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
