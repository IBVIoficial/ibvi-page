import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import MbrasAI from '@/components/ai-icon';
import {AnimatedGradientText} from '../magicui/animated-gradient-text';

interface MinimizedChatProps {
   onRestore: () => void;
}

const buttonVariants = {
   collapsed: {
      width: 56,
      borderRadius: 0,
      transition: {duration: 0.5, type: 'spring', stiffness: 300, damping: 25},
   },
   expanded: {
      width: 140,
      borderRadius: 0,
      transition: {duration: 0.5, type: 'spring', stiffness: 300, damping: 25},
   },
};

const textVariants = {
   collapsed: {
      opacity: 0,
      x: 10,
      pointerEvents: 'none' as const,
      transition: {duration: 0.2},
   },
   expanded: {
      opacity: 1,
      x: 0,
      pointerEvents: 'auto' as const,
      transition: {delay: 0.2, duration: 0.3},
   },
};

const MinimizedChat: React.FC<MinimizedChatProps> = ({onRestore}) => {
   const [hovered, setHovered] = React.useState(false);

   return (
      <motion.div
         key="chat-minimized"
         className="fixed bottom-6 right-6 z-50"
         initial={{opacity: 0, scale: 0.5, y: 50}}
         animate={{opacity: 1, scale: 1, y: 0}}
         exit={{opacity: 0, scale: 0.5, y: 50, transition: {duration: 0.3}}}
         transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            duration: 0.4,
         }}
      >
         <motion.button
            type="button"
            aria-label="Restore Chat"
            onClick={onRestore}
            variants={buttonVariants}
            initial="collapsed"
            animate={hovered ? 'expanded' : 'collapsed'}
            whileHover="expanded"
            className="group flex items-center justify-center overflow-hidden h-14 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white focus:outline-none"
            style={{minWidth: 56, height: 56, padding: 0}}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
         >
            <MbrasAI className="group-hover:text-white" />
            <AnimatePresence>
               {hovered && (
                  <motion.span variants={textVariants} initial="collapsed" animate="expanded" exit="collapsed" className="ml-3 font-semibold whitespace-nowrap">
                     <AnimatedGradientText colorTo="rgb(145,184,186)">Guide</AnimatedGradientText>
                  </motion.span>
               )}
            </AnimatePresence>
         </motion.button>
      </motion.div>
   );
};

export default MinimizedChat;
