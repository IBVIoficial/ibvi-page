'use client';

import {motion, AnimatePresence} from 'framer-motion';
import {springTransition} from '@/lib/animations';

export function SuggestedQuestions({questions, onSelectQuestion}: SuggestedQuestionsProps) {
   if (!questions.length) return null;

   const containerVariants = {
      hidden: {opacity: 0},
      show: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
         },
      },
   };

   const itemVariants = {
      hidden: {opacity: 0, y: 10, scale: 0.95},
      show: {
         opacity: 1,
         y: 0,
         scale: 1,
         transition: springTransition,
      },
   };

   return (
      <AnimatePresence>
         <motion.div className="flex flex-wrap gap-1.5" variants={containerVariants} initial="hidden" animate="show">
            {questions.map((question, index) => (
               <motion.button
                  key={index}
                  className="text-muted-foreground text-xs px-2.5 py-1 rounded-full transition-colors border-[0.5px] border-emerald-200/50 dark:border-emerald-800/50 shadow-sm"
                  onClick={() => onSelectQuestion(question)}
                  variants={itemVariants}
                  whileHover={{
                     scale: 1.05,
                     backgroundColor: 'rgb(209 250 229)',
                     color: 'rgb(4 120 87)',
                     transition: {duration: 0.2},
                  }}
                  whileTap={{scale: 0.95}}
               >
                  {question}
               </motion.button>
            ))}
         </motion.div>
      </AnimatePresence>
   );
}
