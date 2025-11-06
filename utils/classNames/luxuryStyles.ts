import {cn} from '@/lib/utils';

export const getLuxuryControlClass = (isActive: boolean = false) => {
   return cn(
      'border transition-all duration-200 bg-muted hover:border-primary',
      isActive
         ? 'border-blue-700 bg-blue-700/10 text-blue-700 shadow-md'
         : 'border-secondary bg-secondary text-secondary-foreground hover:bg-muted hover:border-primary hover:shadow-md',
   );
};

export const getLuxuryPopoverContentClass = () => cn('luxury-glass-card !rounded-md shadow-xl p-6 md:p-8 border border-primary/25 z-[999]', 'w-auto');

export const getLuxuryToggleItemClass = () =>
   cn(
      'h-10 rounded-standard border border-secondary shadow-sm bg-secondary text-secondary-foreground',
      'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:border-accent',
      'hover:border-primary hover:bg-secondary/80 transition-all',
   );

export const getLuxurySliderClass = () =>
   cn(
      'my-2',
      // Estilos para a trilha (Track)
      "[&_[data-slot='slider-track']]:h-2", // Altura da trilha
      "[&_[data-slot='slider-track']]:rounded-lg", // Cantos arredondados da trilha
      "[&_[data-slot='slider-track']]:bg-neutral-300", // Cor de fundo da trilha (cinza escuro)
      "[&_[data-slot='slider-track']]:shadow-inner", // Sombra interna sutil para a trilha
      // Estilos para a parte preenchida (Range)
      "[&_[data-slot='slider-range']]:bg-gray-700", // Cor de fundo da parte preenchida (dourado)
      "[&_[data-slot='slider-range']]:rounded-lg", // Cantos arredondados da parte preenchida
      "[&_[data-slot='slider-range']]:h-full", // Altura total da parte preenchida

      // Estilos para o botão (Thumb)
      "[&_[data-slot='slider-thumb']]:size-4", // Tamanho do botão (ajustado)
      "[&_[data-slot='slider-thumb']]:rounded-lg", // Cantos arredondados do botão
      "[&_[data-slot='slider-thumb']]:border-2", // Largura da borda do botão
      "[&_[data-slot='slider-thumb']]:border-gray-700", // Cor da borda do botão (dourado)
      "[&_[data-slot='slider-thumb']]:bg-neutral-300", // Cor de fundo do botão (cinza escuro)
      "[&_[data-slot='slider-thumb']]:shadow-md", // Sombra externa discreta para o botão
      "[&_[data-slot='slider-thumb']]:transition-all", // Transição suave para todas as propriedades
      "[&_[data-slot='slider-thumb']]:duration-200", // Duração da transição
      "[&_[data-slot='slider-thumb']]:ease-out", // Curva da transição

      // Estilos de interação para o botão (Thumb)
      "[&_[data-slot='slider-thumb']]:hover:shadow-lg", // Sombra mais pronunciada no hover
      "[&_[data-slot='slider-thumb']]:hover:bg-neutral-600", // Cor de fundo mais clara no hover
      "[&_[data-slot='slider-thumb']]:focus-visible:outline-none", // Remove outline padrão no foco
      "[&_[data-slot='slider-thumb']]:focus-visible:ring-2", // Anel no foco
      "[&_[data-slot='slider-thumb']]:focus-visible:ring-amber-500/60", // Cor e opacidade do anel no foco
      "[&_[data-slot='slider-thumb']]:focus-visible:ring-offset-2", // Espaçamento do anel
      "[&_[data-slot='slider-thumb']]:focus-visible:ring-offset-neutral-800", // Cor do espaçamento do anel
      // Estilos para estado desabilitado (Thumb)
      "[&_[data-slot='slider-thumb']]:disabled:pointer-events-none",
      "[&_[data-slot='slider-thumb']]:disabled:opacity-50",
   );

export const getLuxuryInputClass = () => cn('h-9 rounded-standard border border-primary/40 shadow-sm', 'bg-background hover:border-primary transition-all');

export const getLuxuryButtonClass = () => cn('!h-10 !px-2 xlg:!px-4 !border !border-gray-200');
