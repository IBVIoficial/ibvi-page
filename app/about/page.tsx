'use client';

import { useEffect } from 'react';
import AboutHero from './components/about-hero';
import MissionSection from './components/mission-section';
import TechnologySection from './components/technology-section';
import ExpertiseSection from './components/expertise-section';
import CTASection from './components/cta-section';

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
      <AboutHero />
      <MissionSection />
      <TechnologySection />
      <ExpertiseSection />
      <CTASection />
    </div>
  );
}