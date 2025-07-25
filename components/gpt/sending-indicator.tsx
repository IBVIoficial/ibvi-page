'use client';

import {motion} from 'framer-motion';
import ShinyText from '../react-bits/ShinyText';

export function SendingIndicator() {
   return (
      <motion.div
         className="flex justify-start items-center ml-12"
         initial={{opacity: 0}}
         animate={{opacity: 1}}
         exit={{opacity: 0}}
         transition={{duration: 0.2}}
      >
         <div className="flex space-x-2 items-center rounded-full bg-gradient-to-r from-cyan-800/45 to-cyan-700/45 rounded-radius px-4 py-2 shadow-sm">
            <ShinyText text="Pensando..." className="text-sm text-white font-medium mr-3" />
            <motion.div
               className="h-2 w-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
               animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
               }}
               transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: 0,
               }}
            />
            <motion.div
               className="h-2 w-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
               animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
               }}
               transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: 0.2,
               }}
            />
            <motion.div
               className="h-2 w-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
               animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
               }}
               transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: 0.4,
               }}
            />
         </div>
      </motion.div>
   );
}
