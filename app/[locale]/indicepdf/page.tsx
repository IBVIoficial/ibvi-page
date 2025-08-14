'use client';

import React, { useEffect, useState } from 'react'

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
          size: A4;
          margin: 15mm;
        }
        
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        .slide {
          page-break-after: always !important;
          page-break-inside: avoid !important;
          min-height: 100vh !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
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
      @page { size: A4; margin: 14mm; }
      @media print {
        html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .slide { break-after: page; page-break-inside: avoid; }
        .slide:last-child { break-after: auto; }
        .print-only { display: block !important; }
        .screen-only { display: none !important; }
      }
      @media screen { .print-only { display: none !important; } }
      
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
    <div className="bg-black text-white">
      {/* Screen-only action bar */}
      <div className="screen-only sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <img src="/images/ibvi-logo.png" alt="IBVI logo" className="h-7 w-auto" />
            <span className="text-sm text-gray-400">Índice IBVI - Imóveis de Alto Padrão</span>
          </div>
          <button
            onClick={exportToPDF}
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-sm font-medium text-white hover:bg-white/[0.05] active:scale-[0.99] transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Baixar PDF
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="screen-only fixed right-8 top-1/2 transform -translate-y-1/2 z-30 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
        {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => scrollToSlide(num)}
            className={`w-1 h-8 transition-all duration-300 cursor-pointer ${
              activeSlide === num ? 'bg-emerald-500 h-12' : 'bg-slate-700 hover:bg-emerald-500/50 hover:h-10'
            }`}
            aria-label={`Navigate to slide ${num}`}
          />
        ))}
      </div>

      {/* Slide 1: Hero */}
      <section id="slide1" className="slide relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-slate-950 to-emerald-950/20">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <div className="container mx-auto px-6 md:px-10 relative z-20">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="golden-ring w-32 h-32"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-thin text-white mb-6 animate-fadeIn">
              <span className="text-emerald-500">IBVI</span>: A Revolução da IA
            </h1>
            <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-8 animate-fadeIn" style={{animationDelay: '0.5s'}}>
              na Precificação e Venda de Imóveis no Brasil
            </h2>
            <div className="border-t border-emerald-500/30 pt-8 mt-8">
              <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed animate-fadeIn" style={{animationDelay: '1s'}}>
                Proptech brasileira pioneira em soluções de avaliação imobiliária baseadas em Inteligência Artificial, 
                revolucionando um mercado de <span className="text-emerald-500 font-semibold">US$ 4 trilhões</span> com avaliações 
                <span className="text-emerald-500 font-semibold">90% precisas em minutos</span>.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-fadeIn" style={{animationDelay: '1.5s'}}>
              <div>
                <div className="text-2xl md:text-3xl font-light text-emerald-500">US$ 4T</div>
                <div className="text-xs md:text-sm text-gray-500">Mercado Nacional</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-light text-emerald-500">90%</div>
                <div className="text-xs md:text-sm text-gray-500">Precisão IA</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-light text-emerald-500">60%</div>
                <div className="text-xs md:text-sm text-gray-500">Redução Tempo</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-light text-emerald-500">±6.2%</div>
                <div className="text-xs md:text-sm text-gray-500">Variância Testada</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 2: Executive Summary */}
      <section id="slide2" className="slide relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-slate-950">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-thin text-center text-white mb-8">
              Sumário <span className="text-emerald-500">Executivo</span>
            </h2>
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-lg mb-8">
              <p className="text-lg text-gray-200 leading-relaxed text-center">
                O IBVI é uma proptech brasileira pioneira no desenvolvimento de soluções de avaliação imobiliária baseadas em IA, 
                com foco inicial no mercado de alto padrão. Em um mercado nacional avaliado em <span className="text-emerald-400 font-semibold">US$ 4 trilhões</span>, 
                mas estruturalmente ineficiente, o IBVI corrige distorções históricas de precificação e acelera transações.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-6 rounded-lg">
                <h3 className="text-xl font-light text-emerald-500 mb-3">Problema</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Transações de 100-120 dias, 73% dos avaliadores usam planilhas manuais, 
                  erro médio de ±8.16% (até 50% no luxo)
                </p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-6 rounded-lg">
                <h3 className="text-xl font-light text-emerald-500 mb-3">Solução</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  AVM com IA + Google Cloud, 90% precisão em minutos, 
                  primeiro Índice Padronizado de Luxo do Brasil
                </p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-6 rounded-lg">
                <h3 className="text-xl font-light text-emerald-500 mb-3">Impacto</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  60% redução no tempo de transação, aliado estratégico 
                  para imobiliárias maximizarem resultados de vendas
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                <strong>Mercado Anual:</strong> <span className="text-emerald-500">US$ 100 bilhões</span> em transações • 
                <strong>Segmento Premium:</strong> <span className="text-emerald-500">R$ 7.1-9.2 bilhões</span> anuais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3: O Problema Estrutural */}
      <section id="slide3" className="slide relative flex items-center justify-center min-h-screen bg-slate-950">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-thin text-center text-white mb-4">
              O Problema <span className="text-emerald-500">Estrutural</span>
            </h2>
            <p className="text-center text-gray-400 mb-8 text-lg">
              Mercado de US$ 100 bi anuais com ineficiências crônicas
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-900/50 border border-slate-800 p-6 hover:border-emerald-500/50 transition-all duration-500">
                <div className="text-3xl font-thin text-emerald-500/40 mb-3">01</div>
                <h3 className="text-lg font-light text-white mb-3">Morosidade e Custo</h3>
                <p className="text-gray-400 text-sm">Liquidação em 100-120 dias devido fluxos manuais. Avaliações tradicionais: 5-15 dias.</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-6 hover:border-emerald-500/50 transition-all duration-500">
                <div className="text-3xl font-thin text-emerald-500/40 mb-3">02</div>
                <h3 className="text-lg font-light text-white mb-3">Imprecisão Subjetiva</h3>
                <p className="text-gray-400 text-sm">73% usam planilhas manuais. Erro médio ±8.16% (até 40-50% no luxo).</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-6 hover:border-emerald-500/50 transition-all duration-500">
                <div className="text-3xl font-thin text-emerald-500/40 mb-3">03</div>
                <h3 className="text-lg font-light text-white mb-3">Opacidade de Dados</h3>
                <p className="text-gray-400 text-sm">Ausência de índice centralizado gera insegurança para investidores de alta renda.</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-6 hover:border-emerald-500/50 transition-all duration-500">
                <div className="text-3xl font-thin text-emerald-500/40 mb-3">04</div>
                <h3 className="text-lg font-light text-white mb-3">Complexidade Regulatória</h3>
                <p className="text-gray-400 text-sm">CMN nº 4.951/2021 exige rigor técnico, mas infraestrutura atual dificulta cumprimento ágil.</p>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg text-center">
              <p className="text-red-400 font-light">
                <strong>Impacto:</strong> Bilhões em perdas anuais por avaliações imprecisas e transações lentas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: A Solução IBVI */}
      <section id="slide4" className="slide relative flex items-center justify-center min-h-screen bg-black">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-thin text-center text-white mb-6">
              A Solução <span className="text-emerald-500">IBVI</span>
            </h2>
            <p className="text-center text-gray-400 mb-8 text-lg">
              Modelo de Avaliação Automatizada (AVM) com IA e Machine Learning
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-light text-emerald-500 mb-4 text-center">Motor Tecnológico</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Sistema próprio de IA desenvolvido em parceria com <span className="text-emerald-400 font-semibold">Google Cloud</span>, 
                analisando centenas de variáveis simultaneamente com <span className="text-emerald-400 font-semibold">90% de precisão</span>
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg">
                <h4 className="text-lg font-light text-emerald-500 mb-3">Modelos Hedônicos Avançados</h4>
                <p className="text-gray-300 text-sm">Atribuem peso real a variáveis qualitativas e quantitativas (localização, área, amenidades, geografia)</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg">
                <h4 className="text-lg font-light text-emerald-500 mb-3">Dados Estruturados Oficiais</h4>
                <p className="text-gray-300 text-sm">Cartórios, CRIs, FIIs e Open Finance (150 milhões de transações)</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg">
                <h4 className="text-lg font-light text-emerald-500 mb-3">Validação Cruzada</h4>
                <p className="text-gray-300 text-sm">Precisão superior a 90% com variância testada de ±6.2% em minutos</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 px-6 py-3 rounded-lg">
                <span className="text-emerald-400 font-semibold">Primeiro Índice Padronizado de Imóveis de Luxo do Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5: Catalisador de Vendas */}
      <section id="slide5" className="slide relative flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 to-black">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-thin text-center text-white mb-8">
              IBVI como <span className="text-emerald-500">Catalisador de Vendas</span>
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg max-w-4xl mx-auto">
              Mais que números: destravando negociações, gerando confiança e otimizando estratégias comerciais
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-lg">
                <h3 className="text-2xl font-light text-emerald-500 mb-6">Para Imobiliárias</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">Precificação Assertiva</h4>
                      <p className="text-gray-400 text-sm">Valor fundamentado em dados objetivos reduz tempo de negociação</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">Inteligência Geográfica</h4>
                      <p className="text-gray-400 text-sm">Análise hiperlocalizada com comparáveis reais por proximidade</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">Autoridade e Confiança</h4>
                      <p className="text-gray-400 text-sm">Credibilidade imediata com investidores de alta renda</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-500/5 border border-blue-500/20 p-8 rounded-lg">
                <h3 className="text-2xl font-light text-blue-400 mb-6">Para Incorporadoras</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">Análise de Viabilidade</h4>
                      <p className="text-gray-400 text-sm">Decisões inteligentes na compra de terrenos e definição de produto</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">Otimização do VGV</h4>
                      <p className="text-gray-400 text-sm">Precificação granular maximiza Valor Geral de Vendas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-medium">Velocidade de Vendas</h4>
                      <p className="text-gray-400 text-sm">Tabelas alinhadas evitam estoque "encalhado" por sobrepreço</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6: Vantagens Competitivas */}
      <section id="slide6" className="slide relative flex items-center justify-center min-h-screen bg-black">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-thin text-center text-white mb-12">
              Vantagens <span className="text-emerald-500">Competitivas</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg">
                  <h3 className="text-xl font-light text-emerald-500 mb-3">vs. Avaliadores Tradicionais</h3>
                  <p className="text-gray-400 text-sm">Velocidade, escalabilidade e custo reduzido vs. lentidão, subjetividade e alto custo</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg">
                  <h3 className="text-xl font-light text-emerald-500 mb-3">vs. Plataformas (Loft, QuintoAndar)</h3>
                  <p className="text-gray-400 text-sm">Foco técnico B2B em avaliação vs. marketplace consumer com avaliação superficial</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg">
                  <h3 className="text-xl font-light text-emerald-500 mb-3">vs. Modelos Internacionais</h3>
                  <p className="text-gray-400 text-sm">Adaptado às particularidades jurídicas, fiscais e cartoriais do Brasil</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg">
                  <h3 className="text-xl font-light text-emerald-500 mb-3">Posicionamento Único</h3>
                  <p className="text-gray-400 text-sm">Facilitador neutro B2B - infraestrutura de precificação do mercado</p>
                </div>
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-light text-emerald-500 mb-4">Data Moat</h3>
              <p className="text-gray-300 leading-relaxed">
                Cada cliente que usa a plataforma gera dados proprietários, criando um ciclo virtuoso de melhoria contínua 
                e um "fosso de dados" defensável
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 7: Roadmap e Visão */}
      <section id="slide7" className="slide relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-slate-950">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-thin text-center text-white mb-12">
              Roadmap e <span className="text-emerald-500">Visão</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-lg">
                <div className="text-emerald-500 font-semibold mb-2">2025 - Fase 1</div>
                <h3 className="text-lg font-light text-white mb-4">Validação Intensiva</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>• Pilotos com brokers de luxo em SP</li>
                  <li>• Refinamento algorítmico</li>
                  <li>• Aquisição de dados proprietários</li>
                </ul>
              </div>
              <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-lg">
                <div className="text-emerald-500 font-semibold mb-2">2026 - Fase 2</div>
                <h3 className="text-lg font-light text-white mb-4">Expansão Nacional</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>• Grandes incorporadoras</li>
                  <li>• Mercados Rio, Brasília, Recife</li>
                  <li>• Integração com ERPs do setor</li>
                </ul>
              </div>
              <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-lg">
                <div className="text-emerald-500 font-semibold mb-2">2027+ - Fase 3</div>
                <h3 className="text-lg font-light text-white mb-4">América Latina</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>• Portugal e Miami</li>
                  <li>• Padrão regional de avaliação</li>
                  <li>• Bloomberg do real estate LATAM</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 px-8 py-6 rounded-lg inline-block">
                <h3 className="text-xl font-light text-emerald-400 mb-3">Visão de Longo Prazo</h3>
                <p className="text-gray-300 max-w-2xl">
                  Tornar-se a autoridade definitiva em avaliação imobiliária na América Latina, 
                  estabelecendo o padrão global para mercados emergentes de alto valor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 8: Call to Action */}
      <section id="slide8" className="slide relative flex items-center justify-center min-h-screen bg-slate-950">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-8">
              O Futuro do <span className="text-emerald-500">Mercado Imobiliário</span> Começa Agora
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Seja pioneiro na revolução da precificação inteligente. 
              Transforme dados em decisões, opacidade em transparência, e inefficiência em resultados excepcionais.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-lg">
                <h3 className="text-lg font-light text-emerald-500 mb-3">Para Imobiliárias</h3>
                <p className="text-gray-400 text-sm">Reduza ciclos de venda, aumente conversão e posicione-se como consultor técnico de referência</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
                <h3 className="text-lg font-light text-blue-400 mb-3">Para Incorporadoras</h3>
                <p className="text-gray-400 text-sm">Otimize VGV, acelere vendas e tome decisões de investimento com base em dados precisos</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button className="px-8 py-4 bg-emerald-500 text-black font-medium tracking-wider uppercase hover:bg-transparent hover:text-emerald-500 border border-emerald-500 transition-all duration-300">
                Agendar Demonstração
              </button>
              <button className="px-8 py-4 bg-transparent text-white font-medium tracking-wider uppercase hover:text-emerald-500 border border-slate-700 hover:border-emerald-500 transition-all duration-300">
                Baixar White Paper
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default IndicePdfPage
