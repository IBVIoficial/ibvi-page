'use client';

import {useState, useEffect} from 'react';
import {MessageSquare, ChevronLeft, ChevronRight, PlusCircle, Trash2} from 'lucide-react';
import {useMediaQuery} from '@/hooks/use-media-query';
import {cn} from '@/lib/utils';
import {motion, AnimatePresence} from 'framer-motion';
import {easeTransition} from '@/lib/animations';
import Animated from '@/components/animated';
import {Button} from '@/components/ui/button';
import gptApi from '@/services/gpt-api.service';
import {toast} from 'sonner';
import {useUserId} from '@/hooks/useGuideIdentifier';

const formatChatTime = (isoString: string) => {
   try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
   } catch {
      return 'Inválido';
   }
};

type Thread = {
   thread_id: string;
   preview?: string;
   startTime: string;
};

type ChatHistoryProps = {
   threads: Thread[];
   onSelectThread: (threadId: string) => void;
   onNewChat: () => void;
   fullFill?: boolean;
};

export function ChatHistory({threads, onSelectThread, onNewChat, fullFill = false}: ChatHistoryProps) {
   const {userId} = useUserId();

   const isMobile = useMediaQuery('(max-width: 768px)');
   const [isCollapsed, setIsCollapsed] = useState(fullFill || isMobile);
   const [hoveredThreadId, setHoveredThreadId] = useState<string | null>(null);
   const [deletingId, setDeletingId] = useState<string | null>(null);
   const [localThreads, setLocalThreads] = useState<Thread[]>(threads);

   useEffect(() => {
      setIsCollapsed(fullFill || isMobile);
   }, [fullFill, isMobile]);

   useEffect(() => {
      setLocalThreads(threads);
   }, [threads]);

   const handleDelete = async (threadId: string) => {
      setDeletingId(threadId);
      try {
         if (userId) await gptApi.delete(`/chat/${threadId}`);

         setLocalThreads((prev) => prev.filter((t) => t.thread_id !== threadId));
      } catch (e) {
         toast.error('Erro', {
            description: String(e),
         });
      } finally {
         setDeletingId(null);
      }
   };

   const sidebarVariants = {
      expanded: {width: 256},
      collapsed: {width: 0},
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
         className="h-full bg-[rgb(33,33,33)] flex flex-col flex-shrink-0"
         variants={sidebarVariants}
         initial={false}
         animate={isCollapsed ? 'collapsed' : 'expanded'}
         transition={easeTransition as any}
      >
         <div className="h-16 flex items-center justify-between p-4 z-[99999]">
            <AnimatePresence mode="wait">
               {!isCollapsed && (
                  <motion.div
                     key="chat-header-expanded"
                     className="flex items-center justify-between w-full"
                     variants={headerVariants}
                     initial="collapsed"
                     animate="expanded"
                     exit="collapsed"
                     transition={easeTransition as any}
                  >
                     <h2 className="font-semibold text-white flex items-center gap-2 font-inter">
                        <MessageSquare className="h-4 w-4 text-primary-light" />
                        Conversas
                     </h2>
                     <Button variant="ghost" size="sm" className="p-1 h-auto cursor-pointer" onClick={onNewChat} title="Novo Chat">
                        <PlusCircle className="h-4 w-4 text-primary-light" />
                     </Button>
                  </motion.div>
               )}
            </AnimatePresence>

            <Animated incorporate={false}>
               <Button size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="rounded-4xl absolute top-4 left-4 cursor-pointer">
                  <AnimatePresence mode="wait">
                     {isCollapsed ? (
                        <motion.div
                           key="chevron-right-chat"
                           initial={{rotate: -90, opacity: 0}}
                           animate={{rotate: 0, opacity: 1}}
                           exit={{rotate: 90, opacity: 0}}
                           transition={{duration: 0.2}}
                        >
                           <ChevronRight className="h-4 w-4 text-primary-foreground" />
                        </motion.div>
                     ) : (
                        <motion.div
                           key="chevron-left-chat"
                           initial={{rotate: 90, opacity: 0}}
                           animate={{rotate: 0, opacity: 1}}
                           exit={{rotate: -90, opacity: 0}}
                           transition={{duration: 0.2}}
                        >
                           <ChevronLeft className="h-4 w-4 text-primary-foreground" />
                        </motion.div>
                     )}
                  </AnimatePresence>
               </Button>
            </Animated>
         </div>

         <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
               {[...localThreads].reverse().map((thread, index) => (
                  <motion.div
                     key={thread.thread_id}
                     custom={index}
                     variants={itemVariants as any}
                     initial="collapsed"
                     animate="expanded"
                     exit="exit"
                     className={cn('relative group hover:bg-primary/50 transition-colors cursor-pointer flex items-center', isCollapsed ? 'p-2' : 'p-2.5')}
                     onClick={() => onSelectThread(thread.thread_id)}
                     onMouseEnter={() => setHoveredThreadId(thread.thread_id)}
                     onMouseLeave={() => setHoveredThreadId(null)}
                  >
                     {isCollapsed ? (
                        <motion.div className="flex items-center justify-center w-8 h-8 mx-auto" whileHover={{scale: 1.1}} transition={{duration: 0.2}}>
                           <MessageSquare className="h-5 w-5 text-white" />
                        </motion.div>
                     ) : (
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                           <motion.div
                              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-4xl bg-primary-light"
                              whileHover={{scale: 1.05}}
                              transition={{duration: 0.2}}
                           >
                              <MessageSquare className="h-4 w-4 text-white" />
                           </motion.div>
                           <div className="flex-1 min-w-0">
                              <h3 className="text-xs font-medium text-white truncate font-inter">
                                 {thread.preview || `Chat ${formatChatTime(thread.startTime)}`}{' '}
                              </h3>
                           </div>
                        </div>
                     )}
                     {!isCollapsed && hoveredThreadId === thread.thread_id && (
                        <motion.div
                           initial={{opacity: 0, x: 10}}
                           animate={{opacity: 1, x: 0}}
                           exit={{opacity: 0, x: 10}}
                           transition={{duration: 0.15}}
                           className="absolute right-3"
                           onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(thread.thread_id);
                           }}
                        >
                           <Button size="icon" className="p-1 cursor-pointer" disabled={deletingId === thread.thread_id} title="Excluir conversa">
                              <Trash2 className="h-4 w-4 text-red-500" />
                           </Button>
                        </motion.div>
                     )}
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </motion.div>
   );
}
