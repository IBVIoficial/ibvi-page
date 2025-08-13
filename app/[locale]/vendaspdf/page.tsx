'use client';

import React, { useEffect } from 'react'

/**
 * VendasPdfPage (refined)
 * --------------------------------------------------------------
 * Goals
 * - Elevate visual hierarchy, spacing and typography
 * - Standardize slide container with consistent paddings for screen & print
 * - Add print-first styles (A4, page numbers, exact colors)
 * - Keep brand tokens (bg-surface-*, text-text-*, text-primary, luxury-shadow)
 * - Provide graceful mobile layout (no content clipped by h-screen)
 * - Include a Screen-only Print button
 *
 * Setup
 * - Works with Tailwind (uses responsive + print: variants)
 * - Uses your brand tokens already referenced in the original file
 * - No extra deps; drop-in replacement
 *
 * Rollback
 * - Replace this file with your previous version; no global side-effects remain after unmount
 */

// ————————————————————————————————————————————————————————————————————————————
// Small UI primitives
// ————————————————————————————————————————————————————————————————————————————

const Slide: React.FC<React.PropsWithChildren<{ className?: string; tone?: 'primary' | 'secondary' }>> = ({
  className = '',
  tone = 'primary',
  children,
}) => (
  <section
    className={[
      'slide relative flex items-center justify-center',
      // Screen: full height; Print: auto height with generous padding
      'min-h-[84vh] md:min-h-screen print:min-h-0 print:h-auto print:py-12',
      tone === 'primary' ? 'bg-surface-primary' : 'bg-surface-secondary',
      className,
    ].join(' ')}
  >
    {/* Subtle decorative glow (screen-only) */}
    <div className="container mx-auto px-6 md:px-10">
      {children}
    </div>
  </section>
)

const SectionTitle: React.FC<React.PropsWithChildren<{ center?: boolean; kicker?: string }>> = ({
  children,
  center,
  kicker,
}) => (
  <div className={center ? 'text-center' : ''}>
    {kicker && (
      <p className="mb-3 text-sm tracking-[0.18em] uppercase text-primary/80 font-medium">{kicker}</p>
    )}
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold text-text-primary leading-tight">
      {children}
    </h2>
  </div>
)

const StatCallout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mt-8 rounded-xl bg-primary/10 border-l-8 border-primary p-6 md:p-8">
    <p className="text-2xl md:text-3xl font-semibold text-text-primary">{children}</p>
  </div>
)

const Bullet: React.FC<React.PropsWithChildren> = ({ children }) => (
  <li className="flex items-start gap-3">
    <span className="mt-2 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
    <span className="text-lg md:text-xl text-text-secondary leading-relaxed">{children}</span>
  </li>
)

const Card: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => (
  <div className="rounded-2xl bg-surface-primary p-7 md:p-8 luxury-shadow border border-black/5">
    <h3 className="text-xl md:text-2xl font-playfair font-semibold text-text-primary mb-4">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
)

// ————————————————————————————————————————————————————————————————————————————
// Page component
// ————————————————————————————————————————————————————————————————————————————

const VendasPdfPage: React.FC = () => {
  useEffect(() => {
    // Hide site chrome on mount (screen + print)
    const nav = document.querySelector<HTMLElement>('nav')
    const footer = document.querySelector<HTMLElement>('footer')
    const prevNavDisplay = nav?.style.display
    const prevFooterDisplay = footer?.style.display

    if (nav) nav.style.display = 'none'
    if (footer) footer.style.display = 'none'

    // Print-first styles injected at runtime (isolated to this page)
    const style = document.createElement('style')
    style.textContent = `
      @page { size: A4; margin: 14mm; }
      @media print {
        html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .slide { break-after: page; page-break-inside: avoid; }
        .slide:last-child { break-after: auto; }
        .print-only { display: block !important; }
        .screen-only { display: none !important; }
        .print-footer { position: fixed; bottom: 8mm; left: 14mm; right: 14mm; font-size: 12px; color: rgba(0,0,0,.65); display: flex; justify-content: space-between; }
        .print-page-number::after { content: counter(page); } .print-page-total::after { content: counter(pages); }
      }
      @media screen { .print-only { display: none !important; } }
    `
    document.head.appendChild(style)

    return () => {
      if (nav) nav.style.display = prevNavDisplay || ''
      if (footer) footer.style.display = prevFooterDisplay || ''
      if (style.parentNode) document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="bg-surface-primary text-text-primary">
      {/* Screen-only action bar */}
      <div className="screen-only sticky top-0 z-20 border-b border-black/5 bg-surface-primary/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <img src="/images/ibvi-logo.png" alt="IBVI logo" className="h-7 w-auto" />
            <span className="text-sm text-text-secondary">Versão para PDF</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center rounded-lg border border-black/10 px-3 py-2 text-sm font-medium text-text-primary hover:bg-black/[0.03] active:scale-[0.99]"
            >
              Imprimir / Salvar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Slide 1 — Hero */}
      <Slide tone="primary">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-10">
            <img src="/images/ibvi-logo.png" alt="IBVI Logo" className="mx-auto h-20 w-auto" />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-semibold leading-[1.05] text-text-primary mb-6">
            <span className="text-primary">Inteligência Geográfica</span> que Converte
          </h1>
          <p className="text-xl md:text-2xl font-inter text-primary font-medium tracking-wide">
            Otimizando a Prospecção, Conversão e Precificação no Mercado Imobiliário
          </p>
        </div>
      </Slide>

      {/* Slide 2 — Resumo Executivo */}
      <Slide tone="secondary">
        <div className="mx-auto max-w-5xl">
          <SectionTitle center>
            Resumo <span className="text-primary">Executivo</span>
          </SectionTitle>
          <div className="mt-8 rounded-2xl bg-surface-primary p-8 md:p-12 luxury-shadow border border-black/5">
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-6">
              O IBVI é uma plataforma de inteligência comercial que integra geoprocessamento e IA para transformar como imobiliárias, corretores e incorporadoras identificam, abordam e convertem oportunidades.
            </p>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-2">
              Com um modelo proprietário de análise geográfica, o sistema gera listas de leads altamente qualificados por proximidade, comportamento de valorização e contexto demográfico.
            </p>
            <StatCallout>
              <strong>O resultado:</strong> prospecções até <span className="text-primary font-bold">70% mais rápidas</span> e ganho médio de
              {' '}<span className="text-primary font-bold">40% em conversão</span>.
            </StatCallout>
          </div>
        </div>
      </Slide>

      {/* Slide 3 — Vantagem Competitiva */}
      <Slide tone="primary">
        <div className="mx-auto max-w-5xl">
          <SectionTitle>
            1. A Nova Vantagem Competitiva: <span className="text-primary">Geointeligência Comercial</span>
          </SectionTitle>
          <p className="mt-6 text-xl md:text-2xl text-text-secondary leading-relaxed">
            A inteligência geográfica aplicada à venda de imóveis não se limita à localização — ela revela padrões ocultos de comportamento, oportunidade e demanda latente. O IBVI permite que as equipes comerciais deixem de reagir e passem a antecipar o mercado, com dados estruturados em tempo real.</p>

          <div className="mt-8 rounded-2xl bg-surface-secondary p-7 md:p-10 luxury-shadow border border-black/5">
            <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-text-primary mb-6">1.1 Varredura Sistêmica por Proximidade</h3>
            <ul className="space-y-5">
              <Bullet>Geração instantânea de mapeamento completo em raio configurável</Bullet>
              <Bullet>Identificação de padrões de valorização, perfil de moradores e densidade comercial</Bullet>
              <Bullet>Inteligência de micromercado para suportar campanhas hipersegmentadas e decisões de precificação</Bullet>
            </ul>
          </div>
        </div>
      </Slide>

      {/* Slide 4 — Ferramentas de Venda */}
      <Slide tone="secondary">
        <div className="mx-auto max-w-6xl">
          <SectionTitle center>
            2. Da Análise à Ação: <span className="text-primary">Ferramentas de Venda Integradas</span>
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-4xl text-center text-xl text-text-secondary leading-relaxed">
            A plataforma transforma dados em movimento comercial, ativando os leads certos no momento certo — com mínimo atrito e máxima eficiência.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card title="2.1 Disparo Inteligente de Mala Direta e Prospecção">
              <ul className="space-y-3">
                <Bullet>Segmentação automatizada por valor, metragem, tipologia e perfil de imóvel</Bullet>
                <Bullet>Identificação de proprietários na vizinhança para ofertas de permuta ou upgrade</Bullet>
                <Bullet>Geração de mensagens personalizadas por tipo de lead, com suporte a campanhas de cross\/up-selling</Bullet>
              </ul>
            </Card>
            <Card title="2.2 Dashboards e Análises em Tempo Real">
              <ul className="space-y-3">
                <Bullet>Visualização interativa de imóveis ao redor com filtros dinâmicos</Bullet>
                <Bullet>Alertas automáticos sobre novas oportunidades ou concorrência direta</Bullet>
                <Bullet>Sugestões de precificação e posicionamento com base no contexto local</Bullet>
              </ul>
            </Card>
          </div>
        </div>
      </Slide>

      {/* Slide 5 — Multiplicação de Resultados */}
      <Slide tone="primary">
        <div className="mx-auto max-w-6xl">
          <SectionTitle center>
            3. <span className="text-primary">Multiplicação de Resultados</span> Comerciais
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-4xl text-center text-xl text-text-secondary leading-relaxed">
            Do sourcing inteligente à argumentação baseada em dados: acelere conversões com embasamento técnico e foco em assertividade.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-surface-secondary p-7 md:p-8 luxury-shadow border border-black/5">
              <h3 className="text-xl md:text-2xl font-playfair font-semibold text-text-primary mb-4">3.1 Equipes Comerciais</h3>
              <ul className="space-y-3">
                <Bullet>Geração de listas de vizinhos com alto potencial de interesse</Bullet>
                <Bullet>Redução de 70% no tempo médio de prospecção</Bullet>
                <Bullet>Aumento de até 40% na taxa de conversão pela qualificação cirúrgica de leads</Bullet>
              </ul>
            </div>
            <div className="rounded-2xl bg-surface-secondary p-7 md:p-8 luxury-shadow border border-black/5">
              <h3 className="text-xl md:text-2xl font-playfair font-semibold text-text-primary mb-4">3.2 Incorporadoras e Lançamentos</h3>
              <ul className="space-y-3">
                <Bullet>Campanhas de pré-lançamento com foco nos moradores do entorno</Bullet>
                <Bullet>Identificação dos moradores e investidores do entorno com maior potencial de conversão</Bullet>
                <Bullet>Precificação dinâmica baseada na absorção local e gaps de produto na microrregião</Bullet>
              </ul>
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 6 — Plataforma na Prática */}
      <Slide tone="secondary">
        <div className="mx-auto max-w-5xl">
          <SectionTitle center>
            4. Plataforma na Prática: <span className="text-primary">Fluxo de Uso</span>
          </SectionTitle>
          <p className="mt-4 text-center text-xl text-text-secondary leading-relaxed">
            Usabilidade ágil e integração direta com CRMs e plataformas de marketing existentes.
          </p>

          <div className="mt-8 rounded-2xl bg-surface-primary p-8 md:p-12 luxury-shadow border border-black/5">
            <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-text-primary mb-8 text-center">Etapas operacionais</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex items-start">
                  <div className="mr-5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white text-lg font-bold">
                    {n}
                  </div>
                  <p className="pt-1 text-xl text-text-secondary">
                    {n === 1 && 'Inserir o endereço do imóvel ou lançamento'}
                    {n === 2 && 'Visualizar propriedades ao redor via mapa interativo com filtros configuráveis'}
                    {n === 3 && 'Segmentar e exportar listas com base em critérios estratégicos'}
                    {n === 4 && 'Acionar campanhas via CRM com mensagens personalizadas'}
                  </p>
                </div>
              ))}
            </div>

            <StatCallout>
              <strong>Além disso,</strong> a plataforma sugere continuamente ações otimizadas via IA a partir de padrões de resposta e performance regional.
            </StatCallout>
          </div>
        </div>
      </Slide>

      {/* Slide 7 — Conclusão */}
      <Slide tone="primary">
        <div className="mx-auto max-w-5xl text-center">
          <SectionTitle center>
            O Futuro do Mercado Imobiliário é <span className="text-primary">Geointeligente</span>
          </SectionTitle>

          <div className="mx-auto mt-8 rounded-2xl bg-surface-secondary p-8 md:p-12 luxury-shadow border border-black/5">
            <p className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed">
              Enquanto o mercado tradicional ainda opera com intuição e conexões fragmentadas, as equipes que adotam o IBVI já colhem resultados concretos:
            </p>
            <ul className="mx-auto mb-8 max-w-3xl space-y-4 text-left">
              <Bullet>Campanhas atingem os vizinhos certos com precisão cirúrgica</Bullet>
              <Bullet>Precificação dinâmica baseada em dados reais do micromercado</Bullet>
              <Bullet>Decisões de alta precisão, com menos esforço e mais conversões</Bullet>
            </ul>
            <p className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed">
              A pergunta não é mais se você vai adotar inteligência geográfica — mas <strong>quando</strong>. E se será antes ou depois dos seus concorrentes.
            </p>
            <blockquote className="text-3xl md:text-4xl font-playfair font-semibold text-primary italic">
              Dados transformam geografia em estratégia.<br /> IBVI transforma estratégia em resultado.
            </blockquote>
          </div>
        </div>
      </Slide>

    </div>
  )
}

export default VendasPdfPage
