'use client';

import {motion, AnimatePresence} from 'framer-motion';
import {ChatMessage} from './chat-message';
import {CompactPropertyCard} from '../property/compact-property-card';
import {SendingIndicator} from './sending-indicator';
import {springTransition} from '@/lib/animations';
import {Search, Loader2} from 'lucide-react';
import Animated from '@/components/animated';

import TalkToBrokerCard from './talk-to-broker';
import {useEffect, useRef, useState} from 'react';
import {ExtendedProperty} from '@/types/gpt/extended-property';
import {Button} from '../ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../ui/select';
import {Table, TableBody, TableHead, TableHeader, TableRow, TableCell} from '../ui/table';
import gptApi from '@/services/gpt-api.service';

interface MessageListProps {
   messages: any[];
   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
   onSelectQuestion: (question: string) => void;
   isLoading?: boolean;
   isSending?: boolean;
   onPropertyClick?: (property: ExtendedProperty) => void;
   onMinimizeAndNavigate: (href: string) => void;
}

export function MessageList({
   messages,
   setMessages,
   onSelectQuestion,
   isLoading,
   isSending,
   onMinimizeAndNavigate,
}: MessageListProps & {
   isLoading?: boolean;
   isSending?: boolean;
}) {
   const [isLoadingMore, setIsLoadingMore] = useState(false);

   const containerVariants = {
      hidden: {opacity: 0},
      show: {
         opacity: 1,
         transition: {
            staggerChildren: 0.2,
         },
      },
   };

   const scrollContainerRef = useRef<HTMLDivElement | null>(null);
   const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const container = scrollContainerRef.current;
      if (container) {
         container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth',
         });
      }
   }, [messages, isLoading, isSending]);

   const fetchNextPage = async (message: any, overrideParams?: any) => {
      setIsLoadingMore(true);
      try {
         console.log('Fetching next page of properties...');

         const params = overrideParams || message.content?.params;
         const properties = await gptApi.post('/chat/search-properties', {
            ...params,
         });

         setMessages((msgs) => {
            if (!msgs.length) return [message];
            let currentMessages = msgs;
            let currentMessage = msgs.find((m) => m?.id === message?.id);
            let currentMessageIndex = msgs.findIndex((m) => m?.id === message?.id);

            if (currentMessageIndex !== -1) {
               const existingPropertyIds = new Set(currentMessage?.properties?.map((p: any) => p.id) || []);

               const newProperties = properties.data.hits.filter((property: any) => !existingPropertyIds.has(property.id));

               currentMessages[currentMessageIndex] = {
                  ...currentMessage,
                  properties: overrideParams ? [...newProperties] : [...(currentMessage?.properties || []), ...newProperties],
                  content: {
                     ...properties.data,
                     hits: overrideParams ? [...newProperties] : [...(currentMessage?.content?.hits || []), ...newProperties],
                     params: params,
                  },
               };
            }
            return [...currentMessages];
         });
      } catch (error) {
         console.error('Error fetching more properties:', error);
      } finally {
         setIsLoadingMore(false);
      }
   };

   const handleStreetNameChange = (message: any, newStreetName: string) => {
      const newParams = {
         ...message.content?.params,
         property_street_name: newStreetName,
         street_name: newStreetName,
         page: 0,
      };
      fetchNextPage(message, newParams);
   };

   const renderSearchParams = (params: any, message?: any) => {
      if (!params) return null;

      const paramLabels: {[key: string]: string} = {
         property_type: 'Tipo de Propriedade',
         property_codlog: 'Código Logradouro',
         property_street_name: 'Nome da Rua',
         property_number: 'Número',
         property_complement: 'Complemento',
         property_postal_code: 'Código Postal',
         property_min_land_area: 'Área Terreno Mín.',
         property_max_land_area: 'Área Terreno Máx.',
         property_min_occupied_area: 'Área Ocupada Mín.',
         property_max_occupied_area: 'Área Ocupada Máx.',
         property_min_built_area: 'Área Construída Mín.',
         property_max_built_area: 'Área Construída Máx.',
         property_min_value: 'Valor Mínimo',
         property_max_value: 'Valor Máximo',
         return_only_with_transactions: 'Com transações',
      };

      const displayParams = Object.entries(params)
         .filter(([key, value]) => key !== 'page' && key !== 'possible_street_names' && value !== null && value !== undefined && value !== '')
         .map(([key, value]) => ({
            label: paramLabels[key] || key,
            value: value,
         }));

      if (displayParams.length === 0 && !params.possible_street_names) return null;

      return (
         <motion.div
            className="mt-4 mb-4 p-4 bg-[rgb(84,84,84)] rounded-lg"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.1, duration: 0.4}}
         >
            <h4 className="font-semibold text-base text-white mb-2 font-inter">Parâmetros de Busca:</h4>

            {params.possible_street_names && params.possible_street_names.length > 0 && (
               <div className="mb-4">
                  <span className="text-white/80 text-xs">Nome da Rua:</span>
                  <Select value={params.property_street_name || ''} onValueChange={(value) => handleStreetNameChange(message, value)}>
                     <SelectTrigger className="w-full mt-1 bg-[rgb(72,72,72)] text-white border-[rgb(41,41,41)] cursor-pointer">
                        <SelectValue placeholder="Selecione uma rua" />
                     </SelectTrigger>
                     <SelectContent className="bg-[rgb(72,72,72)] text-white border-[rgb(41,41,41)] cursor-pointer">
                        {params.possible_street_names.map((streetNameObj: any, index: number) => (
                           <SelectItem
                              key={index}
                              value={streetNameObj.property_street_name || streetNameObj}
                              className="!bg-transparent !text-white cursor-pointer"
                           >
                              {streetNameObj.property_street_name || streetNameObj}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
            )}

            {displayParams.length > 0 && (
               <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {displayParams.map(({label, value}, index) =>
                     value ? (
                        <div key={index} className="flex flex-col">
                           <span className="text-white/80 text-xs">{label}:</span>
                           <span className="text-white font-medium">{String(value)}</span>
                        </div>
                     ) : null,
                  )}
               </div>
            )}
         </motion.div>
      );
   };

   return (
      <motion.div
         ref={scrollContainerRef}
         variants={containerVariants}
         initial="hidden"
         animate="show"
         className="flex flex-col gap-7 p-4 h-[calc(100%-14rem)] overflow-y-auto scroll-smooth"
      >
         <AnimatePresence>
            {messages.map((message, index) => (
               <motion.div key={index} layout className="message-container">
                  {message.type !== 'tool' && message.content.trim() !== '' && (
                     <ChatMessage
                        type={message.type}
                        content={message.content}
                        suggestedQuestions={message.suggestedQuestions}
                        onSelectQuestion={onSelectQuestion}
                        onMinimizeAndNavigate={onMinimizeAndNavigate}
                     />
                  )}

                  {message.type === 'tool' && message.name === 'request_login' && (
                     <Animated
                        incorporate={false}
                        className="ml-[3.25rem] w-fit flex items-center justify-center bg-secondary border border-emerald-100 dark:border-emerald-900"
                     >
                        <></>
                        {/* <AuthPopup>
                           <Button>Entre aqui</Button>
                        </AuthPopup> */}
                     </Animated>
                  )}

                  {message.type === 'tool' && message.name === 'suggest_broker_contact' && (
                     <Animated
                        incorporate={false}
                        className="md:ml-[3.25rem] w-fit flex items-center justify-center bg-secondary border border-emerald-100 dark:border-emerald-900"
                     >
                        <TalkToBrokerCard whatsappNumber={message.content?.phone} initialMessage={message.content?.message} ref={message.content?.ref} />
                     </Animated>
                  )}

                  {(message.properties && message.properties.length > 0) ||
                  (message.content?.params && message.properties && message.properties.length === 0) ? (
                     <div className="mt-8">
                        <Animated incorporate={false} className="flex flex-row items-center justify-between text-white">
                           <div className="flex flex-row items-center gap-3">
                              <div className="w-fit bg-gradient-to-r from-cyan-800 to-cyan-700 p-3 rounded-4xl">
                                 <Search size={18} />
                              </div>
                              <p className="font-semibold text-xl">
                                 {message.properties && message.properties.length > 0 ? 'Imóveis encontrados' : 'Busca realizada'}
                              </p>
                           </div>
                           <div className="flex flex-col items-end text-sm text-white/80">
                              <span>{message.content?.hits_real_count || message.properties?.length || 0} imóveis encontrados</span>
                              <span>
                                 Página {message.content?.params?.page || 1} de {message.content?.pages_count || 1}
                              </span>
                           </div>
                        </Animated>

                        {renderSearchParams(message.content?.params, message)}

                        {isLoadingMore && (
                           <motion.div
                              className="mt-4 mb-4 flex items-center justify-center gap-2 text-white/80"
                              initial={{opacity: 0}}
                              animate={{opacity: 1}}
                              exit={{opacity: 0}}
                           >
                              <Loader2 size={16} className="animate-spin" />
                              <span>Carregando propriedades...</span>
                           </motion.div>
                        )}

                        <motion.div
                           className="mt-4 overflow-x-auto"
                           initial={{opacity: 0, y: 10}}
                           animate={{opacity: 1, y: 0}}
                           transition={{delay: 0.3, duration: 0.4}}
                        >
                           <Table>
                              <TableHeader>
                                 <TableRow className="bg-[rgb(33,33,33)]">
                                    <TableHead className="p-3 text-left text-white w-[12rem]">Nº Contribuinte</TableHead>
                                    <TableHead className="p-3 text-left text-white">Localização</TableHead>
                                    {/* <TableHead className="p-3 text-left text-white">Preço</TableHead> */}
                                    <TableHead className="p-3 text-left text-white">Áreas</TableHead>
                                 </TableRow>
                              </TableHeader>
                              <TableBody>
                                 {message.properties && message.properties.length > 0 ? (
                                    message.properties.map((property: any) => <CompactPropertyCard key={property.id} property={property} />)
                                 ) : (
                                    <TableRow>
                                       <TableCell colSpan={3} className="p-8 text-center text-white/60">
                                          Nenhum imóvel encontrado com os critérios selecionados.
                                       </TableCell>
                                    </TableRow>
                                 )}
                              </TableBody>
                           </Table>
                        </motion.div>

                        {message.content?.pages_count > 1 && message.properties && message.properties.length > 0 && (
                           <motion.div
                              className="mt-4 flex justify-center"
                              initial={{opacity: 0, y: 10}}
                              animate={{opacity: 1, y: 0}}
                              transition={{delay: 0.5, duration: 0.4}}
                           >
                              <Button onClick={() => fetchNextPage(message)} disabled={isLoadingMore} variant="outline" className="cursor-pointer px-6 py-2">
                                 {isLoadingMore ? 'Carregando...' : 'Carregar mais imóveis'}
                              </Button>
                           </motion.div>
                        )}
                     </div>
                  ) : null}
               </motion.div>
            ))}

            {/* Indicador de digitação quando estiver carregando */}
            {isLoading && isSending && (
               <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} transition={springTransition as any}>
                  <SendingIndicator />
               </motion.div>
            )}
         </AnimatePresence>
         <div ref={endOfMessagesRef} />
      </motion.div>
   );
}
