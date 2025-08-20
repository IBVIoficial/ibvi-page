'use client';

import React from 'react';

const VendasPage = () => {
   return (
      <div className="min-h-screen bg-surface-primary">
         {/* Hero Section */}
         <section className="py-20 md:py-28 bg-surface-primary luxury-shadow">
            <div className="container mx-auto px-6">
               <div className="text-center max-w-4xl mx-auto">
                  <h1 className="text-5xl md:text-7xl font-playfair font-semibold leading-tight text-text-primary mb-6">
                     IBVI — <span className="text-primary">Inteligência Geográfica</span> que Converte
                  </h1>
                  <p className="text-xl md:text-2xl font-inter text-primary mb-8 font-medium tracking-wide">
                     Otimizando a Prospecção, Conversão e Precificação no Mercado Imobiliário
                  </p>
               </div>
            </div>
         </section>

         {/* Resumo Executivo */}
         <section className="py-16 bg-surface-secondary">
            <div className="container mx-auto px-6">
               <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-8 text-center">
                     Resumo <span className="text-primary">Executivo</span>
                  </h2>
                  <div className="bg-surface-primary rounded-lg p-8 luxury-shadow">
                     <p className="text-lg text-text-secondary leading-relaxed">
                        O IBVI é uma plataforma de inteligência comercial que integra geoprocessamento e inteligência artificial para transformar a forma como
                        imobiliárias, corretores e incorporadoras identificam, abordam e convertem oportunidades no mercado imobiliário. Por meio de um modelo
                        proprietário de análise geográfica, o sistema gera listas de leads altamente qualificados com base em proximidade, comportamento de
                        valorização e contexto demográfico.
                     </p>
                     <div className="mt-6 p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                        <p className="text-lg font-medium text-text-primary">
                           <strong>O resultado:</strong> prospecções até <span className="text-primary font-bold">70% mais rápidas</span> e um ganho médio de{' '}
                           <span className="text-primary font-bold">40% em conversão comercial</span>.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Vantagem Competitiva */}
         <section className="py-16 bg-surface-primary">
            <div className="container mx-auto px-6">
               <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-8">
                     1. A Nova Vantagem Competitiva: <span className="text-primary">Geointeligência Comercial</span>
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                     A inteligência geográfica aplicada à venda de imóveis não se limita à localização — ela revela padrões ocultos de comportamento,
                     oportunidade e demanda latente. O IBVI permite que as equipes comerciais deixem de reagir e passem a antecipar o mercado, com dados
                     estruturados em tempo real.
                  </p>

                  <div className="bg-surface-secondary rounded-lg p-6 luxury-shadow">
                     <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">1.1 Varredura Sistêmica por Proximidade</h3>
                     <ul className="space-y-3 text-text-secondary">
                        <li className="flex items-start">
                           <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                           Geração de mapeamento completo em raio configurável
                        </li>
                        <li className="flex items-start">
                           <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                           Identificação de padrões de valorização, perfil de moradores e densidade comercial
                        </li>
                        <li className="flex items-start">
                           <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                           Inteligência de micromercado para suportar campanhas hipersegmentadas e decisões de precificação
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </section>

         {/* Ferramentas de Venda */}
         <section className="py-16 bg-surface-secondary">
            <div className="container mx-auto px-6">
               <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-8">
                     2. Da Análise à Ação: <span className="text-primary">Ferramentas de Venda Integradas</span>
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                     A plataforma IBVI transforma dados em movimento comercial através de funcionalidades projetadas para ativar os leads certos no momento
                     certo — com mínimo atrito e máxima eficiência operacional.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="bg-surface-primary rounded-lg p-6 luxury-shadow">
                        <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">2.1 Disparo Inteligente de Mala Direta e Prospecção</h3>
                        <ul className="space-y-3 text-text-secondary">
                           <li className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Segmentação automatizada por valor, metragem, tipologia e perfil de imóvel
                           </li>
                           <li className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Identificação de proprietários na vizinhança para ofertas de permuta ou upgrade
                           </li>
                           <li className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Geração de mensagens personalizadas por tipo de lead, com suporte a campanhas de cross/up-selling
                           </li>
                        </ul>
                     </div>

                     <div className="bg-surface-primary rounded-lg p-6 luxury-shadow">
                        <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">2.2 Dashboards e Análises Comerciais em Tempo Real</h3>
                        <ul className="space-y-3 text-text-secondary">
                           <li className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Visualização interativa de imóveis ao redor com filtros dinâmicos
                           </li>
                           <li className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Alertas automáticos sobre novas oportunidades ou concorrência direta
                           </li>
                           <li className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Sugestões de precificação e posicionamento com base no contexto local
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Multiplicação de Resultados */}
         <section className="py-16 bg-surface-primary">
            <div className="container mx-auto px-6">
               <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-8">
                     3. <span className="text-primary">Multiplicação de Resultados</span> Comerciais
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                     O IBVI otimiza o trabalho comercial em todas as frentes: da captação inteligente à argumentação baseada em dados, acelerando conversões com
                     embasamento técnico e foco absoluto na assertividade.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="bg-surface-secondary rounded-lg p-6 luxury-shadow">
                        <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">3.1 Para Equipes Comerciais</h3>
                        <ul className="space-y-3 text-text-secondary">
                           <li className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Geração de listas de vizinhos com alto potencial de interesse
                           </li>
                           <li className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>
                                 Redução de <strong className="text-primary">70%</strong> no tempo médio de prospecção
                              </span>
                           </li>
                           <li className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>
                                 Aumento de até <strong className="text-primary">40%</strong> na taxa de conversão pela qualificação de leads
                              </span>
                           </li>
                        </ul>
                     </div>

                     <div className="bg-surface-secondary rounded-lg p-6 luxury-shadow">
                        <h3 className="text-xl font-playfair font-semibold text-text-primary mb-4">3.2 Para Incorporadoras e Lançamentos</h3>
                        <ul className="space-y-3 text-text-secondary">
                           <li className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Campanhas de pré-lançamento com foco nos moradores do entorno
                           </li>
                           <li className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Identificação dos moradores e investidores do entorno com maior potencial de conversão
                           </li>
                           <li className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Precificação dinâmica baseada na absorção local e gaps de produto na microrregião
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Plataforma na Prática */}
         <section className="py-16 bg-surface-secondary">
            <div className="container mx-auto px-6">
               <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-8">
                     4. Plataforma na Prática: <span className="text-primary">Fluxo de Uso</span>
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                     O IBVI foi desenhado para usabilidade ágil e integração direta com CRMs e plataformas de marketing existentes.
                  </p>

                  <div className="bg-surface-primary rounded-lg p-8 luxury-shadow">
                     <h3 className="text-xl font-playfair font-semibold text-text-primary mb-6">Etapas operacionais:</h3>
                     <div className="space-y-4">
                        {[
                           'Inserir o endereço do imóvel ou lançamento',
                           'Visualizar propriedades ao redor via mapa interativo com filtros configuráveis',
                           'Segmentar e exportar listas com base em critérios estratégicos',
                           'Acionar campanhas diretamente a partir do CRM com mensagens personalizadas',
                        ].map((step, index) => (
                           <div key={index} className="flex items-start">
                              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                                 {index + 1}
                              </div>
                              <p className="text-text-secondary text-lg pt-1">{step}</p>
                           </div>
                        ))}
                     </div>

                     <div className="mt-8 p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                        <p className="text-text-secondary">
                           <strong>Além disso,</strong> a plataforma sugere continuamente ações otimizadas via IA com base em padrões de resposta, comportamento
                           e performance regional.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* O Futuro do Mercado Imobiliário */}
         <section className="py-16 bg-surface-primary">
            <div className="container mx-auto px-6">
               <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-8 text-center">
                     O Futuro do Mercado Imobiliário é <span className="text-primary">Geointeligente</span>
                  </h2>

                  <div className="bg-surface-secondary rounded-lg p-8 luxury-shadow">
                     <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                        Enquanto o mercado tradicional ainda opera com intuição e conexões fragmentadas, as equipes que adotam o IBVI já colhem resultados
                        concretos:
                     </p>

                     <ul className="space-y-3 text-text-secondary mb-6">
                        <li className="flex items-start">
                           <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                           <span>Campanhas atingem os vizinhos certos com precisão otimizada</span>
                        </li>
                        <li className="flex items-start">
                           <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                           <span>Precificação dinâmica baseada em dados reais do micromercado</span>
                        </li>
                        <li className="flex items-start">
                           <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                           <span>Decisões de alta precisão, com menos esforço e mais conversões</span>
                        </li>
                     </ul>

                     <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                        A pergunta não é mais "se" você vai adotar inteligência geográfica — mas <strong>"quando"</strong>. E se será antes ou depois dos seus
                        concorrentes.
                     </p>

                     <div className="text-center mb-6">
                        <blockquote className="text-2xl md:text-3xl font-playfair font-semibold text-primary italic">
                           "Dados transformam geografia em estratégia.
                           <br />O IBVI transforma estratégia em resultado."
                        </blockquote>
                     </div>

                     <div className="text-center">
                        <a
                           href="mailto:contato@ibvi.com.br"
                           className="inline-block bg-primary text-white font-medium tracking-wide rounded-md px-8 py-4 hover:bg-primary-hover transition-all text-sm uppercase shadow-md"
                        >
                           Comece sua transformação agora
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-16 bg-primary text-white">
            <div className="container mx-auto px-6 text-center">
               <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6">Pronto para Revolucionar suas Vendas?</h2>
                  <p className="text-xl mb-8 opacity-90">Descubra como o IBVI pode transformar sua estratégia comercial no mercado imobiliário.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <a
                        href="mailto:contato@ibvi.com.br"
                        className="bg-white text-primary font-medium tracking-wide rounded-md px-8 py-4 hover:bg-gray-100 transition-all text-sm uppercase shadow-md"
                     >
                        Solicitar Demo
                     </a>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default VendasPage;
