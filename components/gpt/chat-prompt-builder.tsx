import {useState, useRef, useEffect} from 'react';
import {Building, Building2, DollarSign, House, Receipt, MoreHorizontal} from 'lucide-react';
import {Button} from '../ui/button';
import {AnimatePresence, motion} from 'framer-motion';

const suggestions: ChatSuggestion[] = [
   {
      label: 'Coberturas',
      value: 'Coberturas',
      icon: <House className="text-yellow-500" />,
   },
   {
      label: 'Casas',
      value: 'Casas',
      icon: <House className="text-blue-300" />,
   },
   {
      label: 'Apartamentos',
      value: 'Apartamentos',
      icon: <Building className="text-blue-200" />,
   },
   {
      label: 'Comerciais',
      value: 'Comerciais',
      icon: <Building2 className="text-purple-900" />,
   },
   {
      label: 'Venda',
      value: 'Venda',
      icon: <DollarSign className="text-purple-700" />,
   },
   {
      label: 'Locação',
      value: 'Locação',
      icon: <Receipt className="text-orange-400" />,
   },
];

function Suggestion({suggestion, handleSuggestionClick}: {suggestion: ChatSuggestion; handleSuggestionClick: (suggestion: string) => void}) {
   return (
      <Button
         variant="outline"
         className="font-light !px-4 h-11 border border-[rgb(81,81,81)] !bg-transparent hover:!bg-input/10 hover:text-white/75 !rounded-4xl text-white/75"
         onClick={() => handleSuggestionClick(suggestion.value || suggestion.label)}
      >
         {suggestion.icon}
         {suggestion.label}
      </Button>
   );
}

export default function ChatPromptBuilder({handleSuggestionClick}: {handleSuggestionClick: (suggestion: string) => void}) {
   const containerRef = useRef<HTMLDivElement>(null);
   const [maxVisible, setMaxVisible] = useState(suggestions.length);
   const [showAll, setShowAll] = useState(false);

   useEffect(() => {
      if (showAll) {
         setMaxVisible(suggestions.length);
         return;
      }
      const container = containerRef.current;
      if (!container) return;

      const children = Array.from(container.children) as HTMLElement[];
      if (children.length === 0) return;

      const firstTop = children[0].offsetTop;
      let visibleCount = 0;
      for (let i = 0; i < children.length; i++) {
         if (children[i].offsetTop !== firstTop) break;
         visibleCount++;
      }
      setMaxVisible(visibleCount < suggestions.length ? visibleCount - 1 : suggestions.length);
   }, [showAll]);

   const visibleSuggestions = showAll ? suggestions : suggestions.slice(0, maxVisible > 0 ? maxVisible : 1);
   const hiddenSuggestions = suggestions.length - visibleSuggestions.length;

   return (
      <div className="mt-7 w-full flex items-center gap-3 flex-wrap" ref={containerRef}>
         <AnimatePresence mode="popLayout">
            {visibleSuggestions.map((suggestion, idx) => (
               <motion.div
                  key={suggestion.value}
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 10}}
                  transition={{duration: 0.2, delay: idx * 0.04}}
                  style={{display: 'inline-block'}}
                  layout
               >
                  <Suggestion handleSuggestionClick={handleSuggestionClick} suggestion={suggestion} />
               </motion.div>
            ))}
            {!showAll && hiddenSuggestions > 0 && (
               <motion.div
                  key="more-button"
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 10}}
                  transition={{duration: 0.2, delay: visibleSuggestions.length * 0.04}}
                  style={{display: 'inline-block'}}
               >
                  <Button
                     variant="outline"
                     className="font-light !px-4 h-11 border border-[rgb(81,81,81)] !bg-transparent hover:!bg-input/10 hover:text-white/75 !rounded-4xl text-white/75"
                     onClick={() => {
                        setShowAll(true);
                     }}
                  >
                     <MoreHorizontal className="mr-2" />
                     Mais
                  </Button>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}
