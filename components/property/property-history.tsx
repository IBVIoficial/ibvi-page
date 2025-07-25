'use client';

import {useState, useEffect} from 'react';
import Image from 'next/image';
import {Clock, ChevronLeft, ChevronRight} from 'lucide-react';
import {useMediaQuery} from '@/hooks/use-media-query';
import {cn} from '@/lib/utils';
import {motion, AnimatePresence} from 'framer-motion';
import {easeTransition} from '@/lib/animations';
import {Button} from '../ui/button';
import {ExtendedProperty} from '@/types/guide/extended-property';
import Animated from '../Animated';
import {formatCurrency} from '@/utils/format-currency';

interface PropertyHistoryProps {
   recentProperties: ExtendedProperty[];
   onSelectProperty: (property: ExtendedProperty) => void;
   fullFill?: boolean;
}

export function PropertyHistory({recentProperties, onSelectProperty, fullFill = false}: PropertyHistoryProps) {
   const isMobile = useMediaQuery('(max-width: 768px)');
   const [isCollapsed, setIsCollapsed] = useState(fullFill || isMobile);

   useEffect(() => {
      setIsCollapsed(fullFill || isMobile);
   }, [fullFill, isMobile]);

   const sidebarVariants = {
      expanded: {width: 256},
      collapsed: {width: 48},
   };

   const headerVariants = {
      expanded: {opacity: 1, x: 0},
      collapsed: {opacity: 0, x: -10},
   };

   const itemVariants = {
      expanded: (i: number) => ({
         opacity: 1,
         x: 0,
         transition: {
            delay: i * 0.05,
            ...easeTransition,
         },
      }),
      collapsed: {opacity: 0, x: -20},
      exit: {opacity: 0, x: -20, transition: {duration: 0.2}},
   };

   return (
      <motion.div
         className="h-full bg-background hidden sm:flex flex-col flex-shrink-0"
         variants={sidebarVariants}
         initial={false}
         animate={isCollapsed ? 'collapsed' : 'expanded'}
         transition={easeTransition}
      >
         <div className="h-20 flex items-center justify-between p-4">
            <AnimatePresence mode="wait">
               {!isCollapsed && (
                  <motion.h2
                     key="sidebar-title"
                     className="font-semibold text-white flex items-center gap-2"
                     variants={headerVariants}
                     initial="collapsed"
                     animate="expanded"
                     exit="collapsed"
                     transition={easeTransition}
                  >
                     <Clock className="h-4 w-4 text-emerald-500" />
                     Recentes
                  </motion.h2>
               )}
            </AnimatePresence>

            <Animated incorporate={false}>
               <Button size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="rounded-4xl">
                  <AnimatePresence mode="wait">
                     {!isCollapsed ? (
                        <motion.div
                           key="chevron-right"
                           initial={{rotate: -90, opacity: 0}}
                           animate={{rotate: 0, opacity: 1}}
                           exit={{rotate: 90, opacity: 0}}
                           transition={{duration: 0.2}}
                        >
                           <ChevronRight className="h-4 w-4 text-white" />
                        </motion.div>
                     ) : (
                        <motion.div
                           key="chevron-left"
                           initial={{rotate: 90, opacity: 0}}
                           animate={{rotate: 0, opacity: 1}}
                           exit={{rotate: -90, opacity: 0}}
                           transition={{duration: 0.2}}
                        >
                           <ChevronLeft className="h-4 w-4 text-white" />
                        </motion.div>
                     )}
                  </AnimatePresence>
               </Button>
            </Animated>
         </div>

         <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
               {recentProperties.map((property, index) => (
                  <motion.div
                     key={property.id}
                     custom={index}
                     variants={itemVariants}
                     initial="collapsed"
                     animate="expanded"
                     exit="exit"
                     className={cn('hover:bg-emerald-50 dark:hover:!bg-emerald-900/50 transition-colors cursor-pointer', isCollapsed ? 'p-2' : 'p-2.5')}
                     onClick={() => onSelectProperty(property)}
                     whileHover={{backgroundColor: 'rgb(236 253 245)'}}
                  >
                     {isCollapsed ? (
                        <motion.div className="relative w-8 h-8 mx-auto overflow-hidden rounded-radius" whileHover={{scale: 1.1}} transition={{duration: 0.2}}>
                           <Image src={property.imageUrls?.[0] || '/placeholder.svg'} alt={property.title ?? ''} fill className="object-cover" />
                        </motion.div>
                     ) : (
                        <div className="flex items-center space-x-2">
                           <motion.div
                              className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-radius"
                              whileHover={{scale: 1.05}}
                              transition={{duration: 0.2}}
                           >
                              <Image src={property.imageUrls?.[0] || '/placeholder.svg'} alt={property.title ?? ''} fill className="object-cover" />
                           </motion.div>
                           <div className="flex-1 min-w-0">
                              <h3 className="text-xs font-medium text-foreground truncate">{property.title}</h3>
                              <p className="text-xs text-emerald-600 dark:text-emerald-400 truncate">{formatCurrency(property.value ?? 0)}</p>
                           </div>
                        </div>
                     )}
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </motion.div>
   );
}
