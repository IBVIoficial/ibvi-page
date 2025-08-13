'use client';

import React, { useEffect, useState } from 'react'
import html2pdf from 'html2pdf.js'

const IndicePdfPage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(1)
  const totalSlides = 15

  const exportToPDF = () => {
    const element = document.body
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: 'IBVI-Indice-Imoveis-Alto-Padrao.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: false
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }

    // Hide navigation dots and header during PDF generation
    const navDots = document.querySelector('.screen-only')
    const header = document.querySelector('.fixed.top-0')
    
    if (navDots) (navDots as HTMLElement).style.display = 'none'
    if (header) (header as HTMLElement).style.display = 'none'

    html2pdf().set(opt).from(element).save().then(() => {
      // Restore elements after PDF generation
      if (navDots) (navDots as HTMLElement).style.display = ''
      if (header) (header as HTMLElement).style.display = ''
    })
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
      <section id="slide1" className="slide relative flex items-center justify-center min-h-screen bg-black">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8">
              <img src="/images/ibvi-logo.png" alt="IBVI" className="h-16 w-auto mx-auto opacity-80" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight text-white mb-6 animate-fadeIn">
              Revolucionando o Mercado Imobiliário com
              <span className="block text-emerald-500 font-light mt-2">Inteligência Artificial</span>
            </h1>
            <div className="hero-line"></div>
            <p className="text-xl md:text-2xl font-light text-gray-400 animate-fadeIn" style={{ animationDelay: '1s' }}>
              Avaliações precisas em minutos • Redução de 60% no tempo de transação
            </p>
            <div className="mt-12 text-sm text-gray-500 animate-fadeIn" style={{ animationDelay: '1.5s' }}>
              <p>O primeiro Índice Padronizado de Imóveis de Luxo do Brasil</p>
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

      {/* Slide 4: Tecnologia */}
      <section id="slide4" className="slide relative flex items-center justify-center min-h-screen bg-slate-950">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 flex items-center justify-center">
                <div className="absolute w-96 h-96 border border-emerald-500/30 rounded-full golden-ring"></div>
                <div className="absolute w-72 h-72 border border-emerald-500/50 rounded-full golden-ring-reverse"></div>
                <div className="absolute w-48 h-48 border border-emerald-500/70 rounded-full golden-ring-fast"></div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-thin text-white mb-8">TECNOLOGIA</h2>
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-6">
                    <h3 className="text-xl font-light text-white mb-2">Modelos Hedônicos Avançados</h3>
                    <p className="text-gray-400">Ponderação inteligente de variáveis como área privativa, localização privilegiada e amenidades exclusivas.</p>
                  </div>
                  <div className="border-b border-slate-800 pb-6">
                    <h3 className="text-xl font-light text-white mb-2">Integração de Dados Oficiais</h3>
                    <p className="text-gray-400">Conexão direta com CRIs, FIIs, cartórios e registros públicos, garantindo informações verificadas.</p>
                  </div>
                  <div className="border-b border-slate-800 pb-6">
                    <h3 className="text-xl font-light text-white mb-2">Machine Learning Proprietário</h3>
                    <p className="text-gray-400">Algoritmos treinados em mais de 500 mil transações reais do mercado brasileiro de alto padrão.</p>
                  </div>
                  <div className="pb-6">
                    <h3 className="text-xl font-light text-white mb-2">Infraestrutura Google Cloud</h3>
                    <p className="text-gray-400">Capacidade para processar mais de 1 milhão de avaliações diárias com máxima confiabilidade.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5: Impacto */}
      <section id="slide5" className="slide relative flex items-center justify-center min-h-screen bg-black">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-12">IMPACTO</h2>
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div className="relative">
                <div className="text-5xl font-thin text-emerald-500 mb-4">9,2 bi</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Mercado Endereçável</div>
              </div>
              <div className="relative border-x border-slate-800">
                <div className="text-5xl font-thin text-emerald-500 mb-4">±6,2%</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Precisão Superior</div>
              </div>
              <div className="relative">
                <div className="text-5xl font-thin text-emerald-500 mb-4">60%</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Redução de Tempo</div>
              </div>
            </div>
            <div className="max-w-4xl mx-auto border-l-4 border-emerald-500 pl-8 text-left">
              <p className="text-xl text-gray-300 italic font-light leading-relaxed">
                "Mais do que um termômetro de mercado, o Índice IBVI é o instrumento definitivo para investidores, incorporadoras e fundos tomarem decisões fundamentadas no mercado de luxo."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6: CTA */}
      <section id="slide6" className="slide relative flex items-center justify-center min-h-screen bg-slate-950">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-8">
              O Futuro do <span className="text-emerald-500">Luxo</span> Começa Agora
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Seja pioneiro na revolução do mercado imobiliário de alto padrão no Brasil.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button className="px-8 py-4 bg-emerald-500 text-black font-medium tracking-wider uppercase hover:bg-transparent hover:text-emerald-500 border border-emerald-500 transition-all duration-300">
                Agendar Apresentação
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
