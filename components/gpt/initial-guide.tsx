import React from 'react';
import {motion} from 'framer-motion';
// import {useAuth} from '@/auth/AuthProvider';

interface InitialGuideProps {
   onSuggestionClick: (suggestion: string) => void;
}

export const InitialGuide: React.FC<InitialGuideProps> = () => {
   // const {user} = useAuth();
   const user: any = null;

   return (
      <motion.div
         className="text-white flex flex-col items-center justify-center h-full text-center p-6"
         initial={{opacity: 0, y: 20}}
         animate={{opacity: 1, y: 0}}
         transition={{duration: 0.5}}
      >
         {user ? (
            <h2 className="text-5xl mb-12">
               Olá, <b>{user?.user_metadata?.name}</b>!
            </h2>
         ) : (
            <h3 className="text-3xl font-semibold mb-4 text-white font-inter">IbviGPT</h3>
         )}

         {/* <div className="w-full max-w-md">
            <h3 className="text-lg font-medium mb-4 text-foreground flex items-center justify-center">
               <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
               Experimente perguntar:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {initialSuggestions.map((suggestion, index) => (
                  <motion.div
                     key={index}
                     initial={{opacity: 0, scale: 0.9}}
                     animate={{opacity: 1, scale: 1}}
                     transition={{duration: 0.3, delay: index * 0.1}}
                     className="flex"
                  >
                     <Button
                        variant="outline"
                        size="sm"
                        className="w-full h-full flex flex-col justify-center text-left py-2 px-3 whitespace-normal text-sm border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/50 "
                        onClick={() => onSuggestionClick(suggestion)}
                     >
                        {suggestion}
                     </Button>
                  </motion.div>
               ))}
            </div>
         </div> */}
      </motion.div>
   );
};
