import {PlusCircle, Minimize2} from 'lucide-react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';

interface ChatHeaderProps {
   title: string;
   onNewChat: () => void;
   onMinimize: () => void;
   fullFill?: boolean;
}

export function ChatHeader({title, onNewChat, onMinimize, fullFill = false}: ChatHeaderProps) {
   return (
      <header className="h-16 border-emerald-100 dark:border-emerald-900 p-3 px-4 flex items-center justify-between bg-[rgb(33,33,33)] sticky top-0 z-10 flex-shrink-0">
         <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-primary to-primary-light p-1.5 rounded-lg shadow-sm">
               <Image src="/images/icon.png" alt="Guide Logo" width={24} height={24} className="rounded" />
            </div>
            <div>
               <h1 className="text-base font-semibold text-white font-inter truncate max-w-[50dvw] md:max-w-[82.5dvw]" title={title}>
                  {title}
               </h1>
               {/* <p className="text-xs text-emerald-600 dark:text-emerald-400">
            Seu guia imobiliário
          </p> */}
            </div>
         </div>

         <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onNewChat} title="Novo Chat">
               <PlusCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </Button>
            {!fullFill && (
               <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onMinimize} title="Minimizar Chat">
                  <Minimize2 className="h-4 w-4 text-foreground" />
               </Button>
            )}
         </div>
      </header>
   );
}
