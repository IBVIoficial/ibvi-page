'use client';

import React, { useEffect, useState } from 'react'

// TypeScript interfaces
interface SlideProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  tone?: 'primary' | 'secondary';
}

interface StatCardProps {
  value: string | number;
  label: string;
}

interface ContentBoxProps {
  title?: string;
  children: React.ReactNode;
  highlight?: boolean;
  className?: string;
}

// Luxury design components
const Slide: React.FC<SlideProps> = ({ id, children, className = '', tone = 'primary' }) => (
  <section
    id={id}
    className={`slide relative flex items-center justify-center min-h-screen ${
      tone === 'primary' ? 'bg-surface-primary' : 'bg-surface-secondary'
    } ${className}`}
  >
    {/* Subtle gradient overlay for luxury feel */}
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 pointer-events-none" />
    
    {/* Content Container */}
    <div className="container mx-auto px-8 md:px-12 lg:px-16 relative z-10 w-full max-w-7xl">
      {children}
    </div>
    
    {/* Slide Footer for Print - Removed for clean PDFs */}
  </section>
);

const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <div className="p-6 bg-surface-primary/50 border border-black/10 rounded-2xl luxury-shadow transition-all duration-300 hover:scale-105">
    <div className="text-2xl lg:text-3xl font-playfair font-semibold text-primary tabular-nums">{value}</div>
    <div className="text-sm lg:text-base mt-3 text-text-secondary font-inter">{label}</div>
  </div>
);

const ContentBox: React.FC<ContentBoxProps> = ({ title, children, highlight = false, className }) => (
  <div className={`${highlight ? 'bg-primary/10 border-l-4 border-primary' : 'bg-surface-primary'} p-8 md:p-10 rounded-2xl luxury-shadow border border-black/5 ${className}`}>
    {title && <h3 className="text-xl md:text-2xl font-playfair font-semibold text-text-primary mb-6">{title}</h3>}
    <div className="text-text-secondary text-base md:text-xl leading-relaxed">
      {children}
    </div>
  </div>
);

const IndicePdfPage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(1)
  const totalSlides = 8

  const exportToPDF = () => {
    // Hide screen-only elements for printing
    const screenOnlyElements = document.querySelectorAll('.screen-only')
    screenOnlyElements.forEach(el => {
      (el as HTMLElement).style.display = 'none'
    })

    // Add print-specific styles
    const printStyle = document.createElement('style')
    printStyle.id = 'print-styles'
    printStyle.textContent = `
      @media print {
        @page {
          size: A4 landscape;
          margin: 15mm;
        }
        
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        .slide {
          page-break-after: always !important;
          page-break-inside: avoid !important;
        }
        
        .slide:last-child {
          page-break-after: auto !important;
        }
        
        /* Ensure animations don't interfere with printing */
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        
        /* Fix golden ring for print */
        .golden-ring {
          border: 2px solid #10B981 !important;
          border-radius: 50% !important;
          animation: none !important;
        }
        
        /* Ensure colors print correctly */
        .text-emerald-500 {
          color: #10B981 !important;
        }
        
        .bg-emerald-500 {
          background-color: #10B981 !important;
        }
        
        .border-emerald-500 {
          border-color: #10B981 !important;
        }
        
        /* Remove luxury-shadow for print */
        .luxury-shadow {
          box-shadow: none !important;
        }

        /* Remove borders from cards for print */
        .rounded-2xl {
          border: none !important;
        }
        
        /* Fix for Executive Summary ContentBox in print */
        .print-fix-content-box {
          width: 80% !important;
          max-width: 800px !important;
          margin: 0 auto !important;
          display: block !important;
          padding: 8px !important;
          box-sizing: border-box !important;
        }
        
        /* Ensure the three pillar cards display correctly in print */
        .print-pillars-layout {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 24px !important;
          margin-top: 48px !important;
        }
        
        .print-pillars-layout > div {
          width: auto !important;
          height: auto !important;
          box-sizing: border-box !important;
        }
        
        /* Ensure the structural problem cards display correctly in print */
        .print-structural-problem-layout {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 24px !important;
          margin-top: 48px !important;
        }
        
        .print-structural-problem-layout > div {
          width: auto !important;
          height: auto !important;
          box-sizing: border-box !important;
        }
        
        /* Ensure the solution pillar cards display correctly in print */
        .print-solution-pillars-layout {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 24px !important;
          margin-top: 48px !important;
        }
        
        .print-solution-pillars-layout > div {
          width: auto !important;
          height: auto !important;
          box-sizing: border-box !important;
        }
        
        /* Ensure the sales catalyst cards display correctly in print */
        .print-sales-catalyst-layout {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 24px !important;
          margin-top: 48px !important;
        }
        
        .print-sales-catalyst-layout > div {
          width: auto !important;
          height: auto !important;
          box-sizing: border-box !important;
        }
        
        /* Ensure the competitive advantages cards display correctly in print */
        .print-competitive-advantages-layout {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 24px !important;
          margin-top: 48px !important;
        }
        
        .print-competitive-advantages-layout > div {
          width: auto !important;
          height: auto !important;
          box-sizing: border-box !important;
        }
        .print-flex-full {
          flex-direction: row !important;
          width: 100% !important;
          justify-content: space-around !important;
          align-items: stretch !important;
          gap: 12px !important; /* Smaller gap for print */
          page-break-inside: avoid !important;
        }
        .print-card-compact {
          flex: 1 !important;
          padding: 10px !important;
          margin: 0 !important;
          box-sizing: border-box !important;
          height: auto !important;
        }
      }
    `
    document.head.appendChild(printStyle)

    // Restore elements after printing
    const restoreElements = () => {
      screenOnlyElements.forEach(el => {
        (el as HTMLElement).style.display = ''
      })
      
      const printStyleEl = document.getElementById('print-styles')
      if (printStyleEl) {
        printStyleEl.remove()
      }
    }

    // Listen for print events
    window.addEventListener('afterprint', restoreElements, { once: true })
    
    // Fallback timeout in case afterprint doesn't fire
    setTimeout(restoreElements, 3000)
    
    // Open print dialog
    window.print()
  }
  
  useEffect(() => {
    // Hide site chrome on mount
    const nav = document.querySelector<HTMLElement>('nav')
    const footer = document.querySelector<HTMLElement>('footer')
    const prevNavDisplay = nav?.style.display
    const prevFooterDisplay = footer?.style.display

    if (nav) nav.style.display = 'none'
    if (footer) footer.style.display = 'none'

    // Print-first styles
    const style = document.createElement('style')
    style.textContent = `
      /* Import luxury fonts */
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
      
      @page { size: A4 landscape; margin: 14mm; }
      @media print {
        html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .slide { 
          break-after: page; 
          page-break-inside: avoid;
        }
        .slide:last-child { break-after: auto; }
        .print-only { display: block !important; }
        .screen-only { display: none !important; }

        /* Remove borders from cards for print */
        .rounded-2xl {
          border: none !important;
        }
        
        /* Fix for Executive Summary ContentBox in print */
        .print-fix-content-box {
          width: 80% !important;
          max-width: 800px !important;
          margin: 0 auto !important;
          display: block !important;
          padding: 8px !important;
          box-sizing: border-box !important;
        }
        
        /* Ensure the three pillar cards display correctly in print */
        .print-pillars-layout {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 24px !important;
          margin-top: 48px !important;
        }
        
        .print-pillars-layout > div {
          width: auto !important;
          height: auto !important;
          box-sizing: border-box !important;
        }
        
        /* Ensure the structural problem cards display correctly in print */
        .print-structural-problem-layout {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 24px !important;
          margin-top: 48px !important;
        }
        
        .print-structural-problem-layout > div {
          width: auto !important;
          height: auto !important;
          box-sizing: border-box !important;
        }
        
        /* Ensure the solution pillar cards display correctly in print */
        .print-solution-pillars-layout {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 24px !important;
          margin-top: 48px !important;
        }
        
        .print-solution-pillars-layout > div {
          width: auto !important;
          height: auto !important;
          box-sizing: border-box !important;
        }
        
        /* Ensure the sales catalyst cards display correctly in print */
        .print-sales-catalyst-layout {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 24px !important;
          margin-top: 48px !important;
        }
        
        .print-sales-catalyst-layout > div {
          width: auto !important;
          height: auto !important;
          box-sizing: border-box !important;
        }
        
        /* Ensure the competitive advantages cards display correctly in print */
        .print-competitive-advantages-layout {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 24px !important;
          margin-top: 48px !important;
        }
        
        .print-competitive-advantages-layout > div {
          width: auto !important;
          height: auto !important;
          box-sizing: border-box !important;
        }
      }
      @media screen { .print-only { display: none !important; } }
      
      html {
        scroll-behavior: smooth;
        background-color: var(--background);
        font-family: 'Inter', sans-serif;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes expandLine {
        from { width: 0; opacity: 0; }
        to { width: 80px; opacity: 1; }
      }
      
      @keyframes rotateRing {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .animate-fadeIn {
        animation: fadeIn 1.5s ease-out forwards;
      }
      
      .hero-line {
        width: 80px;
        height: 1px;
        background: #10B981;
        margin: 40px auto;
        animation: expandLine 1s ease-out 0.5s forwards;
      }
      
      .golden-ring {
        animation: rotateRing 30s linear infinite;
      }
      
      .golden-ring-reverse {
        animation: rotateRing 25s linear infinite reverse;
      }
      
      .golden-ring-fast {
        animation: rotateRing 20s linear infinite;
      }
    `
    document.head.appendChild(style)

    return () => {
      if (nav) nav.style.display = prevNavDisplay || ''
      if (footer) footer.style.display = prevFooterDisplay || ''
      if (style.parentNode) document.head.removeChild(style)
    }
  }, [])

  const scrollToSlide = (slideNumber: number) => {
    const slide = document.getElementById(`slide${slideNumber}`)
    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth' })
      setActiveSlide(slideNumber)
    }
  }

  return (
    <div className="bg-background text-text-primary">
      {/* Screen-only action bar - Luxury Design with top spacing */}
      <div className="screen-only fixed top-0 left-0 right-0 z-[60] bg-surface-primary/95 backdrop-blur-xl luxury-shadow border-b border-black/5">
        <div className="mx-auto max-w-7xl px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/ibvi-logo.png" alt="IBVI logo" className="h-8 w-auto" />
            <div>
              <span className="text-base font-playfair font-semibold text-text-primary">Índice IBVI</span>
              <span className="text-xs text-text-tertiary ml-2">Pitch Deck Premium</span>
            </div>
          </div>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-inter font-medium tracking-wide text-text-inverse bg-primary rounded-lg hover:bg-primary-hover transition-all duration-300 luxury-shadow uppercase"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Navigation Dots - Luxury Design */}
      <div className="screen-only fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
        {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => scrollToSlide(num)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ease-out transform ${
              activeSlide === num 
                ? 'bg-primary scale-150 luxury-shadow' 
                : 'bg-text-tertiary/30 hover:bg-text-tertiary/50 hover:scale-110'
            }`}
            aria-label={`Navigate to slide ${num}`}
          />
        ))}
      </div>

      {/* Main Content with Top Spacing */}
      <div className='screen-only:pt-24'>
        {/* Additional spacer for better visibility */}
        <div className="screen-only h-4"></div>

      {/* Slide 1: Hero - Luxury Premium Design */}
      <Slide id="slide1" tone="primary" className="screen-only:pt-16">
        {/* Background Visual Element - Subtle Luxury */}
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20 screen-only">
           <div className="w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="text-center relative z-10 screen-only:mt-16">
          
          {/* Logo */}
          <img src="/images/ibvi-logo.png" alt="IBVI Logo" className="mx-auto h-16 w-auto mb-8 animate-fadeIn" />
          
          {/* Title - Luxury Typography */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-semibold text-text-primary mb-6 animate-fadeIn leading-[1.1]">
          <span className="text-primary">IA</span> Revolucionando o <span className="text-primary"><br></br>Mercado Imobiliário</span> <br className="hidden md:block" />
            
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl font-inter text-primary font-medium tracking-wide mb-12 animate-fadeIn uppercase" style={{animationDelay: '0.3s'}}>
            Índice IBVI · Inteligência Premium
          </p>

          {/* Core Proposition */}
          <div className="max-w-5xl mx-auto mb-16 animate-fadeIn" style={{animationDelay: '0.6s'}}>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              O IBVI é pioneiro em avaliação imobiliária com Inteligência Artificial. <br className="hidden md:block" />
              E está revolucionando um mercado de <span className="text-primary font-semibold">US$ 4 trilhões</span> com avaliações 
              <span className="text-primary font-semibold"> 90% precisas</span>, em minutos.
            </p>
          </div>

          {/* Key Metrics - Luxury Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-fadeIn" style={{animationDelay: '0.9s'}}>
            <StatCard value="US$ 4T" label="Mercado Nacional" />
            <StatCard value="90%" label="Precisão do Modelo" />
            <StatCard value="-60%" label="Redução de Tempo" />
            <StatCard value="±6.2%" label="Variância Testada" />
          </div>
        </div>
      </Slide>

      {/* Slide 2: Executive Summary - Luxury Design */}
      <Slide id="slide2" tone="secondary">
        <div>
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-center text-text-primary mb-12">
            Sumário <span className="text-primary">Executivo</span>
          </h2>
          
          <ContentBox className="print-fix-content-box">
              <p className="text-lg md:text-xl text-center">
              O IBVI é a proptech pioneira no Brasil focada em avaliação imobiliária de alto padrão através de IA. Corrigimos ineficiências estruturais em um mercado de <span className="text-primary font-semibold">US$ 4 trilhões</span>, acelerando transações e trazendo transparência inédita.
              </p>
          </ContentBox>

          {/* Three Pillars Layout - Luxury Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-12 print-pillars-layout">
            <div className="p-8 bg-surface-primary rounded-2xl luxury-shadow border border-black/5">
              <div className="w-12 h-1 bg-primary mb-6 rounded-full"></div>
              <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">Dificuldades do Mercado</h3>
              <p className="text-text-secondary leading-relaxed">
                Transações lentas (100+ dias), dependência de métodos manuais (73% usam planilhas) e erros drásticos de avaliação (até 50% no segmento de luxo).
              </p>
            </div>
            <div className="p-8 bg-surface-primary rounded-2xl luxury-shadow border border-black/5">
              <div className="w-12 h-1 bg-primary mb-6 rounded-full"></div>
              <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">Nossa Solução Tecnológica</h3>
              <p className="text-text-secondary leading-relaxed">
                Utilizamos um AVM (Automated Valuation Model) com IA + Google Cloud. Precisão de 90% em minutos. Criação do 1º Índice Padronizado de Luxo do Brasil.
              </p>
            </div>
            <div className="p-8 bg-surface-primary rounded-2xl luxury-shadow border border-black/5">
              <div className="w-12 h-1 bg-primary mb-6 rounded-full"></div>
              <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">O Impacto no Setor</h3>
              <p className="text-text-secondary leading-relaxed">
                Redução de 60% no tempo de transação. Ferramenta estratégica para Imobiliárias e Incorporadoras maximizarem VGV e velocidade de vendas.
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl">
            <p className="text-text-primary text-base md:text-lg font-medium text-center">
              Mercado Transacionado Anual: <span className="text-primary font-bold">US$ 100 bilhões</span> · 
              Segmento Premium: <span className="text-primary font-bold">R$ 7.1-9.2 bilhões/ano</span>
            </p>
          </div>
        </div>
      </Slide>

      {/* Slide 3: O Problema Estrutural - Luxury Design */}
      <Slide id="slide3" tone="primary">
        <div>
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-center text-text-primary mb-6">
            O Problema <span className="text-primary">Estrutural</span>
          </h2>
          <p className="text-center text-text-secondary mb-12 text-lg md:text-xl font-inter">
            Um mercado de US$ 100 bilhões/ano operando com ineficiências crônicas
          </p>

          {/* Grid Layout with Numbered Items - Luxury Style */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 print-structural-problem-layout">
            
            <div className="bg-surface-secondary p-8 rounded-2xl luxury-shadow border border-black/5 hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-playfair font-bold text-primary">01</span>
                </div>
                <h3 className="text-lg font-playfair font-semibold text-text-primary">Morosidade e Custo Elevado</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Ciclo médio de liquidação de 100-120 dias. Avaliações tradicionais demoram 5-15 dias e dependem de processos manuais caros.
              </p>
            </div>

            <div className="bg-surface-secondary p-8 rounded-2xl luxury-shadow border border-black/5 hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-playfair font-bold text-primary">02</span>
                </div>
                <h3 className="text-lg font-playfair font-semibold text-text-primary">Imprecisão Técnica</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">
              Muitos avaliadores ainda dependem de planilhas. Em imóveis comerciais, estudos NCREIF mostram ~11% de diferença média absoluta entre avaliação e venda, maior em ativos únicos de altíssimo padrão pela escassez de comparáveis.
              </p>
            </div>

            <div className="bg-surface-secondary p-8 rounded-2xl luxury-shadow border border-black/5 hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-playfair font-bold text-primary">03</span>
                </div>
                <h3 className="text-lg font-playfair font-semibold text-text-primary">Lacunas nos Setor</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Ausência de um índice centralizado e confiável gera insegurança jurídica e afasta investidores de alta renda.
              </p>
            </div>

            <div className="bg-surface-secondary p-8 rounded-2xl luxury-shadow border border-black/5 hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-playfair font-bold text-primary">04</span>
                </div>
                <h3 className="text-lg font-playfair font-semibold text-text-primary">Complexidade Regulatória</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">
                O CMN nº 4.951/2021 exige rigor técnico na avaliação de garantias, mas a infraestrutura atual não suporta um cumprimento ágil.
              </p>
            </div>
          </div>
          
          {/* Impact Statement - Luxury Style */}
         
            <p className="text-lg md:text-xl font-medium text-center">
              <strong className="text-primary">Consequência Direta:</strong> Bilhões em perdas anuais devido á avaliações errôneas e transações fracassadas.
            </p>
          
        </div>
      </Slide>

      {/* Slide 4: A Solução IBVI - Luxury Design */}
      <Slide id="slide4" tone="secondary">
        <div>
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-center text-text-primary mb-6">
            Solução <span className="text-primary">IBVI</span>
          </h2>
          <p className="text-center text-text-secondary mb-12 text-lg md:text-xl font-inter">
            AVM (Automated Valuation Model) impulsionado por Inteligência Artificial
          </p>
          
          <div className="mb-12 text-center">
              <ContentBox title="Motor Tecnológico Central">
                  <p className="text-center">
                      Sistema proprietário de IA desenvolvido em parceria estratégica com <span className="text-primary font-semibold">Google Cloud</span>. 
                      Análise simultânea de centenas de variáveis macro e microeconômicas, garantindo <span className="text-primary font-semibold">90% de precisão</span>.
                  </p>
              </ContentBox>
          </div>
          {/* Technology Pillars with Icons - Luxury Style */}
          <div className="grid md:grid-cols-3 gap-8 print-solution-pillars-layout mb-5">
            <div className="bg-surface-primary p-8 rounded-2xl text-center luxury-shadow border border-black/5 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-lg font-playfair font-semibold text-text-primary mb-3">Modelos Hedônicos Avançados</h4>
              <p className="text-text-secondary text-base">Atribuição de peso real á variáveis qualitativas e quantitativas (localização, área, amenidades).</p>
            </div>
            <div className="bg-surface-primary p-8 rounded-2xl text-center luxury-shadow border border-black/5 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h4 className="text-lg font-playfair font-semibold text-text-primary mb-3">Dados Estruturados Oficiais</h4>
              <p className="text-text-secondary text-base">Base robusta com Cartórios, CRIs, FIIs e Open Finance (150+ milhões de transações).</p>
            </div>
            <div className="bg-surface-primary p-8 rounded-2xl text-center luxury-shadow border border-black/5 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-playfair font-semibold text-text-primary mb-3">Validação Cruzada Contínua</h4>
              <p className="text-text-secondary text-base">Precisão superior a 90% com variância testada de ±6.2%. Resultado em minutos.</p>
            </div>
          </div>
          
          {/* Main Value Proposition Banner - Luxury Style */}
     
            
              
            
        
        </div>
      </Slide>

      {/* Slide 5: Catalisador de Vendas - Luxury Design */}
      <Slide id="slide5" tone="primary">
        <div>
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-center text-text-primary mb-8">
            IBVI como <span className="text-primary">Catalisador de Vendas</span>
          </h2>
          <p className="text-center text-text-secondary mb-16 text-lg md:text-xl max-w-4xl mx-auto font-inter">
            Destravando negociações, gerando confiança e otimizando estratégias comerciais.
          </p>
          
          <div className="grid md:grid-cols-2 gap-10 print-sales-catalyst-layout">
            
            {/* For Imobiliárias - Luxury Card */}
            <div className="bg-surface-secondary p-10 rounded-2xl luxury-shadow border border-black/5">
              <div className="mb-8">
                <div className="w-16 h-1 bg-primary mb-4 rounded-full"></div>
                <h3 className="text-xl md:text-2xl font-playfair font-semibold text-text-primary">Para Imobiliárias e Corretores</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-playfair font-bold text-base flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-base font-playfair font-medium text-text-primary mb-2">Precificação Assertiva</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">Valor fundamentado em dados objetivos e metodologia analítica, reduzindo tempo de negociação.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-playfair font-bold text-base flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-base font-playfair font-medium text-text-primary mb-2">Inteligência Geográfica</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">Análise detalhada com comparáveis reais, validados por proximidade.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-playfair font-bold text-base flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-base font-playfair font-medium text-text-primary mb-2">Autoridade e Confiança</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">Ganho de credibilidade junto a proprietários e investidores de alta renda.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Incorporadoras - Luxury Card */}
            <div className="bg-surface-secondary p-10 rounded-2xl luxury-shadow border border-black/5">
              <div className="mb-8">
                <div className="w-16 h-1 bg-primary mb-4 rounded-full"></div>
                <h3 className="text-xl md:text-2xl font-playfair font-semibold text-text-primary">Para Incorporadoras</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-playfair font-bold text-base flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-base font-playfair font-medium text-text-primary mb-2">Análise de Viabilidade</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">Decisões inteligentes na aquisição de terrenos e definição das características ideais.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-playfair font-bold text-base flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-base font-playfair font-medium text-text-primary mb-2">Otimização do VGV</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">Precificação granular que maximiza o retorno do empreendimento.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-playfair font-bold text-base flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-base font-playfair font-medium text-text-primary mb-2">Aceleração de Vendas</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">Tabelas de preço alinhadas com a realidade do mercado.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 6: Vantagens Competitivas - Luxury Design */}
      <Slide id="slide6" tone="secondary">
        <div>
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-center text-text-primary mb-16">
            Vantagens <span className="text-primary">Competitivas</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16 print-competitive-advantages-layout">
            
            <div className="bg-surface-primary p-8 rounded-2xl luxury-shadow border border-black/5">
              <h3 className="text-lg font-playfair font-semibold text-primary mb-6">vs. Avaliadores Tradicionais</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1.5">•</span>
                  <p className="text-text-secondary text-base"><span className='font-semibold text-text-primary'>IBVI:</span> Velocidade (minutos), escalabilidade infinita e custo marginal baixo.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-text-tertiary mt-1.5">•</span>
                  <p className="text-text-tertiary text-base"><span className='font-medium'>Mercado Atual:</span> Lentidão (dias/semanas), subjetividade humana e alto custo fixo.</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-primary p-8 rounded-2xl luxury-shadow border border-black/5">
              <h3 className="text-lg font-playfair font-semibold text-primary mb-6">vs. Plataformas Digitais</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1.5">•</span>
                  <p className="text-text-secondary text-base"><span className='font-semibold text-text-primary'>IBVI:</span> Foco técnico B2B em avaliação profunda e neutra.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-text-tertiary mt-1.5">•</span>
                  <p className="text-text-tertiary text-base"><span className='font-medium'>Mercado Atual:</span> Marketplace B2C com avaliação superficial como ferramenta de captação.</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-primary p-8 rounded-2xl luxury-shadow border border-black/5">
              <h3 className="text-lg font-playfair font-semibold text-primary mb-6">vs. Modelos Internacionais</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1.5">•</span>
                  <p className="text-text-secondary text-base"><span className='font-semibold text-text-primary'>IBVI:</span> Adaptado às complexidades jurídicas e cartoriais do Brasil.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-text-tertiary mt-1.5">•</span>
                  <p className="text-text-tertiary text-base"><span className='font-medium'>Mercado Atual:</span> Ineficazes no Brasil devido à falta de dados padronizados.</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-primary p-8 rounded-2xl luxury-shadow border border-black/5">
              <h3 className="text-lg font-playfair font-semibold text-primary mb-6">Posicionamento Único</h3>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1.5">•</span>
                <p className="text-text-secondary text-base"><span className='font-semibold text-text-primary'>IBVI:</span> Facilitador neutro B2B. Somos a infraestrutura de precificação do mercado.</p>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 7: Roadmap e Visão - Luxury Design */}
      <Slide id="slide7" tone="primary">
        <div className="flex flex-col items-center justify-center min-h-screen-md w-full px-4 py-8 md:py-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-center text-text-primary mb-8">
            Roadmap e <span className="text-primary">Visão Futura</span>
          </h2>
          
          {/* Timeline Implementation - Compact Horizontal Layout */}
          <div className="flex flex-col md:flex-row justify-center items-stretch w-full max-w-6xl gap-4 md:gap-6 print-flex-full">
            
            {/* Fase 1 */}
            <div className="flex-1 bg-surface-secondary rounded-xl luxury-shadow p-5 border border-black/5 flex flex-col items-center text-center print-card-compact">
              <div className="z-20 flex items-center bg-primary luxury-shadow w-10 h-10 rounded-full justify-center mb-3">
                <h1 className="font-playfair font-semibold text-sm text-text-inverse">2025</h1>
              </div>
              <h3 className="mb-2 font-playfair font-semibold text-primary text-base">Fase 1: Validação Intensiva</h3>
              <ul className="text-text-secondary text-xs space-y-1 list-disc list-inside text-left w-full">
                <li>Pilotos estratégicos com top brokers de luxo em São Paulo.</li>
                <li>Refinamento do algoritmo composto de dados proprietários.</li>
                <li>Consolidação da base de dados oficial.</li>
              </ul>
            </div>

            {/* Fase 2 */}
            <div className="flex-1 bg-surface-secondary rounded-xl luxury-shadow p-5 border border-black/5 flex flex-col items-center text-center print-card-compact">
              <div className="z-20 flex items-center bg-primary luxury-shadow w-10 h-10 rounded-full justify-center mb-3">
                <h1 className="mx-auto font-playfair font-semibold text-sm text-text-inverse">2026</h1>
              </div>
              <h3 className="mb-2 font-playfair font-semibold text-primary text-base">Fase 2: Expansão Nacional</h3>
              <ul className="text-text-secondary text-xs space-y-1 list-disc list-inside text-left w-full">
                <li>Parceiria com grandes incorporadoras nacionais.</li>
                <li>Expansão para mercados-chave: Rio, Brasília, Recife.</li>
                <li>Integração via API com ERPs e CRMs do setor.</li>
              </ul>
            </div>
            
            {/* Fase 3 */}
            <div className="flex-1 bg-surface-secondary rounded-xl luxury-shadow p-5 border border-black/5 flex flex-col items-center text-center print-card-compact">
              <div className="z-20 flex items-center bg-primary luxury-shadow w-10 h-10 rounded-full justify-center mb-3">
                <h1 className="mx-auto font-playfair font-semibold text-sm text-text-inverse">2027+</h1>
              </div>
              <h3 className="mb-2 font-playfair font-semibold text-primary text-base">Fase 3: Liderança LATAM</h3>
              <ul className="text-text-secondary text-xs space-y-1 list-disc list-inside text-left w-full">
                <li>Expansão Internacional: Portugal e Miami.</li>
                <li>Estabelecimento como Padrão Regional de Avaliação.</li>
                <li>Visão: Tornar-se o "Bloomberg" do Real Estate na América Latina.</li>
              </ul>
            </div>
          </div>

          {/* Visão de Longo Prazo - Integrada e Compacta */}
          <div className="mt-8 w-full max-w-4xl">
              <ContentBox title="Visão a Longo Prazo" highlight={true} className="px-6 py-4 text-center">
                  <p className="text-sm text-center leading-relaxed">
                      Ser a autoridade definitiva em Avaliação Imobiliária na América Latina, estabelecendo um padrão global de transparência e eficiência para mercados emergentes de alto valor.
                  </p>
              </ContentBox>
          </div>
        </div>
      </Slide>

      {/* Slide 8: Call to Action - Luxury Design */}
      <Slide id="slide8" tone="secondary">
        <div className="max-w-6xl mx-auto text-center py-8 px-4">
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold text-text-primary mb-6 leading-tight">
            O Futuro da Precificação Imobiliária <br className="hidden md:block" />
            <span className="text-primary">Começa Agora</span>
          </h2>
          
          <p className="text-base md:text-lg text-text-secondary mb-10 max-w-4xl mx-auto font-inter leading-relaxed">
            Seja pioneiro na revolução da inteligência artificial. Transforme dados em decisões estratégicas, opacidade em transparência e ineficiência em resultados excepcionais.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-surface-primary p-6 rounded-2xl luxury-shadow border border-black/5 text-left">
              <div className="w-10 h-1 bg-primary mb-3 rounded-full"></div>
              <h3 className="text-lg font-playfair font-semibold text-text-primary mb-3">Para Imobiliárias</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Reduza ciclos de venda em 60%, aumente taxas de conversão e posicione-se como líder tecnológico no mercado de luxo.</p>
            </div>
            <div className="bg-surface-primary p-6 rounded-2xl luxury-shadow border border-black/5 text-left">
              <div className="w-10 h-1 bg-primary mb-3 rounded-full"></div>
              <h3 className="text-lg font-playfair font-semibold text-text-primary mb-3">Para Incorporadoras</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Otimize seu VGV, acelere a velocidade de vendas e tome decisões de investimento com precisão inédita.</p>
            </div>
          </div>

          {/* Action Button - Luxury Style */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="mailto:contato@ibvi.com.br" 
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-inter font-medium tracking-widest uppercase text-text-inverse bg-primary rounded-lg hover:bg-primary-hover transition-all duration-300 luxury-shadow transform hover:scale-105"
            >
              Agendar Demonstração Exclusiva
            </a>
          </div>
          
          {/* Final Brand Statement */}
          <div className="mt-16 pt-8 border-t border-black/10 screen-only">
            <img src="/images/ibvi-logo.png" alt="IBVI Logo" className="mx-auto h-12 w-auto mb-4 opacity-80" />
            <p className="text-text-tertiary text-xs font-inter tracking-wide uppercase">
              Inteligência Imobiliária Premium
            </p>
          </div>
        </div>
      </Slide>
      </div>
    </div>
  )
}

export default IndicePdfPage
