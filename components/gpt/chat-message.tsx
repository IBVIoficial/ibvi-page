'use client';

import {motion, AnimatePresence} from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {SuggestedQuestions} from './suggested-questions';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {springTransition} from '@/lib/animations';
import {HighlightKeywords} from './highlight-keywords';

export function ChatMessage({
   type,
   content,
   suggestedQuestions = [],
   onSelectQuestion = () => {},
   onMinimizeAndNavigate,
}: ChatMessageProps & {
   onMinimizeAndNavigate: (href: string) => void;
}) {
   if (type === 'system') {
      return (
         <motion.div
            className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-200 p-4 rounded-4xl inline-block max-w-[80%] shadow-sm"
            initial={{opacity: 0, scale: 0.8, x: -20}}
            animate={{opacity: 1, scale: 1, x: 0}}
            transition={springTransition}
         >
            <ReactMarkdown>{content}</ReactMarkdown>
         </motion.div>
      );
   }

   if (type === 'user' || type === 'human') {
      return (
         <div className="flex justify-end">
            <motion.div
               className="bg-primary-light text-white p-4 rounded-4xl inline-block max-w-[80%] shadow-md"
               initial={{opacity: 0, scale: 0.8, x: 20}}
               animate={{opacity: 1, scale: 1, x: 0}}
               transition={springTransition}
            >
               {content}
            </motion.div>
         </div>
      );
   }

   return (
      <AnimatePresence>
         <div className="space-y-1">
            <motion.div className="flex items-start space-x-3" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}}>
               <motion.div
                  initial={{scale: 0, opacity: 0}}
                  animate={{scale: 1, opacity: 1}}
                  transition={{
                     type: 'spring',
                     stiffness: 400,
                     damping: 17,
                     delay: 0.1,
                  }}
               >
                  <Avatar className="bg-primary-light p-1.5 rounded-lg shadow-sm">
                     <AvatarFallback className="bg-transparent text-white">AI</AvatarFallback>
                     <AvatarImage src="/white-logo.png" alt="Guide Logo" width={24} height={24} className="rounded" />
                  </Avatar>
               </motion.div>

               <div className="flex flex-col items-start">
                  <motion.div
                     className="inline-block max-w-md"
                     initial={{opacity: 0, scale: 0.8, y: 10}}
                     animate={{opacity: 1, scale: 1, y: 0}}
                     transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                        delay: 0.2,
                     }}
                  >
                     <div className="overflow-hidden prose prose-sm dark:prose-invert max-w-none prose-p:leading-normal prose-p:m-0 text-white">
                        <HighlightKeywords text={content} onMinimizeAndNavigate={onMinimizeAndNavigate} />
                     </div>
                     {/* {streaming && (
                <div className="animate-pulse flex space-x-1.5 mt-2">
                  <div className="rounded-4xl bg-current opacity-50 h-1.5 w-1.5"></div>
                  <div className="rounded-4xl bg-current opacity-50 h-1.5 w-1.5"></div>
                  <div className="rounded-4xl bg-current opacity-50 h-1.5 w-1.5"></div>
                </div>
              )} */}
                  </motion.div>

                  {suggestedQuestions.length > 0 && (
                     <div className="mt-1.5 mb-1">
                        <SuggestedQuestions questions={suggestedQuestions} onSelectQuestion={onSelectQuestion} />
                     </div>
                  )}
               </div>
            </motion.div>
         </div>
      </AnimatePresence>
   );
}
