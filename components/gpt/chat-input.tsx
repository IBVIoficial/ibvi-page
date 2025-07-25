'use client';

import {ArrowUp, Globe, Map, Paperclip, TrendingUp, X} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {AnimatePresence, motion} from 'framer-motion';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {cn} from '@/lib/utils';
import {Textarea} from '../ui/textarea';
import {Toggle} from '../ui/toggle';
import {Tooltip, TooltipContent, TooltipTrigger} from '../ui/tooltip';
import ChatPromptBuilder from './chat-prompt-builder';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
// import {useAuth} from '@/auth/AuthProvider';
import Silk from '../react-bits/Silk';
// import {ButtonAuth} from '../elements/Buttons';
import Animated from '@/components/animated';
import {Button} from '../ui/button';

interface ChatInputProps {
   className?: string;
   inputClassName?: string;
   value: string;
   onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
   onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
   onSend: () => void;
   isLoading?: boolean;
   onCancel?: () => void;
   placeholder?: string;
   disabled?: boolean;
   promptBuilder?: boolean;
   handleSuggestionClick?: (suggestion: string) => void;
   map?: [boolean, Dispatch<SetStateAction<boolean>>];
}

export function ChatInput({
   className,
   inputClassName,
   value,
   onChange,
   onKeyDown,
   onSend,
   isLoading = false,
   placeholder,
   disabled = false,
   promptBuilder = true,
   handleSuggestionClick,
   map,
}: ChatInputProps) {
   // const {user} = useAuth();
   const user = null;
   const [attachmentNotAuthenticatedPopover, setAttachmentNotAuthenticatedPopover] = useState<boolean>(false);
   const [showSearches, setShowSearches] = useState<boolean>(false);
   const [attachments, setAttachments] = useState<File[]>([]);

   const commonSearches = ['Apartamento com 2 quartos', 'Casa com piscina', 'Imóveis próximos ao metrô', 'Cobertura à venda', 'Aluguel mobiliado'];

   const removeAttachment = (idx: number) => {
      setAttachments((prev) => prev.filter((_, i) => i !== idx));
   };

   return (
      <div className="mb-7">
         <motion.div
            className={cn('border-emerald-100 dark:border-emerald-900 p-3 rounded-4xl bg-[rgb(48,48,48)] transition-colors duration-300', className)}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.3, duration: 0.5}}
         >
            <AnimatePresence>
               {attachments.length > 0 && (
                  <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}} className="mb-3 flex flex-wrap gap-2">
                     {attachments.map((file, idx) => (
                        <motion.div
                           key={file.name + file.size + idx}
                           className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 text-xs font-medium shadow-sm"
                           initial={{scale: 0.95, opacity: 0}}
                           animate={{scale: 1, opacity: 1}}
                           exit={{scale: 0.95, opacity: 0}}
                           transition={{duration: 0.15}}
                        >
                           <Paperclip size={16} className="opacity-70" />
                           <span className="truncate max-w-[8rem]" title={file.name}>
                              {file.name}
                           </span>
                           <button
                              type="button"
                              className="ml-1 p-0.5 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-colors"
                              onClick={() => removeAttachment(idx)}
                              aria-label="Remover anexo"
                           >
                              <X size={14} />
                           </button>
                        </motion.div>
                     ))}
                  </motion.div>
               )}
            </AnimatePresence>

            <Textarea
               value={value}
               onChange={onChange}
               onKeyDown={onKeyDown}
               placeholder={placeholder ?? (isLoading ? 'Aguarde...' : 'Pergunte para encontrar um imóvel')}
               className={cn(
                  'resize-none flex-1 p-0 border-0 !bg-transparent focus-visible:ring-0',
                  'focus-visible:ring-offset-0 text-white placeholder:text-white/50',
                  'cursor-text p-3 !min-h-14 max-h-72',
                  inputClassName,
               )}
               disabled={disabled || isLoading}
            />
            <span className="flex items-center justify-between">
               <span className="flex-1 flex items-center gap-2">
                  <span className="flex-1 flex items-center gap-2">
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <span>
                              <Popover open={attachmentNotAuthenticatedPopover} onOpenChange={setAttachmentNotAuthenticatedPopover}>
                                 <PopoverTrigger asChild>
                                    <Toggle
                                       className="bg-transparent border-[rgb(81,81,81)] data-[state=on]:bg-emerald-500/50 cursor-pointer rounded-4xl text-white"
                                       onClick={(e) => {
                                          e.preventDefault();

                                          if (!user) {
                                             setAttachmentNotAuthenticatedPopover(true);
                                          } else {
                                             document.getElementById('attachment-input')?.click();
                                          }
                                       }}
                                    >
                                       <Paperclip />
                                       Anexar
                                    </Toggle>
                                 </PopoverTrigger>
                                 <PopoverContent
                                    align="start"
                                    className="bg-[rgb(48,48,48)] border border-[rgb(81,81,81)] rounded-4xl overflow-hidden w-[19rem] p-0 shadow-xl"
                                 >
                                    <Silk />
                                    <div className="p-4 flex flex-col gap-2">
                                       <p className="text-white font-semibold text-lg">Teste funcionalidades avançadas de graça</p>
                                       <p className="text-sm text-muted-foreground">Receba respostas mais precisas, suba arquivos e mais fazendo login.</p>
                                       {/* <ButtonAuth
                                          className="rounded-4xl mt-4 bg-emerald-500/50 hover:bg-emerald-500/30 text-white"
                                          text="Entrar ou registrar gratuitamente"
                                          next="/gpt"
                                       /> */}
                                    </div>
                                 </PopoverContent>
                              </Popover>
                              <Input
                                 type="file"
                                 hidden
                                 id="attachment-input"
                                 multiple
                                 onChange={(e) => {
                                    if (e.target.files) {
                                       setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);

                                       e.target.value = '';
                                    }
                                 }}
                              />
                           </span>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>Envie arquivos e mais</p>
                        </TooltipContent>
                     </Tooltip>

                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Toggle
                              className={cn(
                                 'bg-transparent border-[rgb(81,81,81)] data-[state=on]:bg-emerald-500/50 cursor-pointer rounded-4xl text-white',
                                 showSearches && 'bg-emerald-500/20',
                              )}
                              pressed={showSearches}
                              onClick={(e) => {
                                 e.preventDefault();
                                 setShowSearches((prev) => !prev);
                              }}
                           >
                              <Globe />
                              Buscar
                           </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>Pesquisas sugeridas</p>
                        </TooltipContent>
                     </Tooltip>
                  </span>

                  {value !== '' ? (
                     <Button onClick={onSend} className="w-9 h-9 rounded-full bg-white text-black hover:bg-white hover:brightness-75">
                        <ArrowUp />
                     </Button>
                  ) : (
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Toggle
                              onClick={() => {
                                 map?.[1](!map?.[0]);
                              }}
                              data-state={map?.[0] ? 'on' : 'off'}
                              className={cn(
                                 'border-none bg-[rgb(81,81,81)] hover:bg-[rgb(95,95,95)] !text-white data-[state=on]:bg-emerald-500 md:data-[state=on]:bg-emerald-500/50 cursor-pointer rounded-4xl z-[9999]',
                                 {
                                    'text-2xl md:text-base w-32 md:w-auto h-auto': map?.[0],
                                 },
                              )}
                           >
                              <Map
                                 className={cn({
                                    '!w-6 !h-6 !md:w-auto !md:h-auto': map?.[0],
                                 })}
                              />
                              Mapa
                           </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>Interaja com nosso mapa enquanto conversa</p>
                        </TooltipContent>
                     </Tooltip>
                  )}
               </span>
            </span>
         </motion.div>
         <AnimatePresence mode="popLayout">
            {showSearches && (
               <Animated>
                  <div className="mt-4 shadow-inner flex flex-col gap-2">
                     {commonSearches.map((search, idx) => (
                        <Animated direction="left" delay={idx * 0.05} key={idx}>
                           <button
                              type="button"
                              className="flex items-center gap-3 cursor-pointer w-full text-sm text-left px-3 py-2 rounded-xl hover:brightness-75 transition-colors text-white"
                              onClick={() => {
                                 const event = {
                                    target: {value: search},
                                 } as React.ChangeEvent<HTMLTextAreaElement>;

                                 if (handleSuggestionClick) handleSuggestionClick(event.target.value);

                                 setShowSearches(false);
                              }}
                           >
                              <TrendingUp size={16} />
                              {search}
                           </button>
                        </Animated>
                     ))}
                  </div>
               </Animated>
            )}
            {!showSearches && promptBuilder && handleSuggestionClick && <ChatPromptBuilder handleSuggestionClick={handleSuggestionClick} />}
         </AnimatePresence>
      </div>
   );
}
