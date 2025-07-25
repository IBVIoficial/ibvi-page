'use client';

import {useState, useRef, useEffect, useCallback, memo, useMemo} from 'react';
import {v4 as uuidv4} from 'uuid';
import {AnimatePresence, motion} from 'framer-motion';
import {useRouter} from 'next/navigation';
import {Maximize2, Minimize2} from 'lucide-react';

import {ChatHeader} from '@/components/gpt/chat-header';
import {ChatInput} from '@/components/gpt/chat-input';
import {MessageList} from '@/components/gpt/message-list';
import {PropertyHistory} from '@/components/property/property-history';
import {ChatHistory} from '@/components/gpt/chat-history';
import {PropertyModal} from '@/components/property/property-modal';
import {InitialGuide} from '@/components/gpt/initial-guide';
import {Button} from '@/components/ui/button';
import gptApi from '@/services/gpt-api.service';
import {useUserId} from '@/hooks/useGuideIdentifier';
import {useChatThreadManager} from '@/hooks/useChatThreadManager';
import {useSharedChatState} from '@/contexts/ChatStateContext';
import {BlurFade} from '@/components/magicui/blur-fade';
import MbrasAI from '@/components/gpt/ai-icon';
import {AnimatedGradientText} from '@/components/magicui/animated-gradient-text';
import {ExtendedProperty} from '@/types/gpt/extended-property';
import {rawHandleToolMessage} from '@/lib/guide/handle-tool-message';
import {handleRemoteAction} from '@/lib/guide/handle-remote-action';
import MapComponent from '@/components/map/map';
import {cn} from '@/lib/utils';
import Animated from '@/components/animated';
import Link from 'next/link';
import ChatAuthSection from './chat-auth-section';

function PropertyChat({fullFill}: {fullFill?: boolean}) {
   const {userId} = useUserId();
   const router = useRouter();

   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [input, setInput] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [isSending, setIsSending] = useState(false);
   const [selectedProperty, setSelectedProperty] = useState<ExtendedProperty | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [, setRecentProperties] = useState<ExtendedProperty[]>([]);
   const [usingMap, setUsingMap] = useState<boolean>(false);

   const eventSourceRef = useRef<EventSource | null>(null);

   const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
         setInput(e.target.value);
      },
      [setInput],
   );

   const {chatState, targetUrl, maximizeChat, minimizeChat, fullyMinimizeChat} = useSharedChatState();

   const {threads, currentThreadId, selectThread, createNewThread, isLoadingThreads} = useChatThreadManager(userId ?? null);

   const handleToolMessage = useCallback(rawHandleToolMessage, []);

   const getMessages = useCallback(
      async (threadId: string | null) => {
         if (!threadId || !userId) {
            setMessages([]);
            return;
         }
         setIsLoading(true);
         try {
            const response = await gptApi.get(`/chat/list-messages/${threadId}?user_id=${userId}`);
            const processedMessages = handleToolMessage(response.data || [], mapHitToPropertyData);
            setMessages(processedMessages);
         } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
         }
         setIsLoading(false);
      },
      [handleToolMessage, userId],
   );

   const handleNewChat = useCallback((): string | null => {
      const newThreadId = createNewThread();
      if (newThreadId) {
         // setMessages([]);
         if (chatState !== 'maximized') maximizeChat();
         selectThread(newThreadId);
         return newThreadId;
      } else {
         console.error('Falha ao iniciar novo chat (provavelmente sem userId).');

         return null;
      }
   }, [createNewThread, maximizeChat, chatState, selectThread]);

   const mapHitToPropertyData = (hit: any): ExtendedProperty => {
      const imageUrls = hit?.photos?.map((photo: any) => photo?.src?.imagekit).filter(Boolean) || [];
      const finalImageUrls = imageUrls.length > 0 ? imageUrls : ['/placeholder-property.jpg'];

      const propertyData: ExtendedProperty = {
         ...hit,
         imageUrls: finalImageUrls,
      };
      return propertyData;
   };

   const startChatStream = useCallback(
      (prompt: string, threadId: string) => {
         if (!userId) {
            console.error('user ID not available for starting chat stream.');
            return;
         }

         if (eventSourceRef.current) {
            console.log('------------ CLEARING STREAMS ------------');
            eventSourceRef.current.close();
         }

         setIsLoading(true);
         setIsSending(true);
         const aiMessageId = uuidv4();
         const initialAiMessage: ChatMessage = {
            id: aiMessageId,
            type: 'assistant',
            content: '',
            properties: [],
            suggestedQuestions: [],
            streaming: true,
         };

         setMessages((prevMessages) => [...prevMessages, initialAiMessage]);

         const apiUrl = `/chat/stream?user_id=${userId}&thread_id=${threadId}&prompt=${encodeURIComponent(prompt)}`;
         const es = new EventSource(process.env.NEXT_PUBLIC_GUIDE_API_URL + apiUrl);
         eventSourceRef.current = es;

         es.onmessage = (event) => {
            try {
               const parsedData: any = JSON.parse(event.data);
               const {event: eventType, data} = parsedData;

               setMessages((prevMessages) => {
                  let currentMessages = [...prevMessages];
                  const placeholderIndex = currentMessages.findIndex((msg) => msg.id === aiMessageId && msg.streaming);

                  switch (eventType) {
                     case 'validation_failure': {
                        console.error('Event: validation_failure', data);
                        const reason = data?.reason || 'Falha na validação da mensagem.';
                        const validationErrorMsg = `**Erro de Validação:** ${reason}`;

                        if (placeholderIndex !== -1) {
                           currentMessages[placeholderIndex] = {
                              ...currentMessages[placeholderIndex],
                              content: validationErrorMsg,
                              streaming: false,
                           };
                        } else {
                           currentMessages.push({
                              id: uuidv4(),
                              type: 'assistant',
                              content: validationErrorMsg,
                              streaming: false,
                           });
                        }
                        setIsLoading(false);
                        setIsSending(false);
                        eventSourceRef.current?.close();
                        eventSourceRef.current = null;
                        break;
                     }

                     case 'validate_message_before_tool':
                     case 'llm_message': {
                        const messageData = data || {};
                        const textContent = messageData.content || '';
                        const suggestions = messageData.suggestedQuestions || [];

                        // console.log("placeholderIndex", placeholderIndex);

                        // if (placeholderIndex !== -1) {
                        //   console.log(
                        //     "different of -1",
                        //     currentMessages[placeholderIndex].content
                        //   );
                        //   const newContent =
                        //     eventType === "llm_message"
                        //       ? (currentMessages[placeholderIndex].content || "") +
                        //         textContent
                        //       : textContent;

                        //   currentMessages[placeholderIndex] = {
                        //     ...currentMessages[placeholderIndex],
                        //     content: newContent,
                        //     suggestedQuestions:
                        //       suggestions.length > 0
                        //         ? suggestions
                        //         : currentMessages[placeholderIndex].suggestedQuestions,
                        //     streaming: true,
                        //   };

                        //   console.log("newMessage", currentMessages[placeholderIndex]);
                        // } else if (textContent || suggestions.length > 0) {
                        //   console.log("Is placeholder -1");
                        currentMessages.push({
                           id: aiMessageId,
                           type: 'assistant',
                           content: textContent,
                           suggestedQuestions: suggestions,
                           streaming: true,
                        });
                        // console.log(currentMessages);
                        // }
                        break;
                     }
                     case 'tool_start': {
                        console.log('Tool Start:', data.name);

                        break;
                     }
                     case 'tool_end': {
                        console.log('Tool End:', data);
                        if (data.content) {
                           const processedMessages = handleToolMessage([data], mapHitToPropertyData);
                           currentMessages.push({
                              ...processedMessages[0],
                              streaming: true,
                           });

                           handleRemoteAction(router, processedMessages[0]);
                        }
                        break;
                     }
                     case 'suggestions': {
                        const lastMessageIndex = currentMessages.length - 1;
                        if (lastMessageIndex >= 0 && currentMessages[lastMessageIndex].type === 'assistant') {
                           currentMessages[lastMessageIndex] = {
                              ...currentMessages[lastMessageIndex],
                              suggestedQuestions: data || [],
                           };
                        }
                        break;
                     }
                     case 'error': {
                        console.error('SSE Error Event:', data);
                        const errorMessageContent = `\n\n**Erro:** ${data?.message || 'Erro desconhecido'}`;
                        let errorHandled = false;

                        const lastStreamingIndex = currentMessages.findLastIndex((msg) => msg.type === 'assistant' && msg.streaming);

                        if (lastStreamingIndex !== -1) {
                           currentMessages[lastStreamingIndex] = {
                              ...currentMessages[lastStreamingIndex],
                              content: (currentMessages[lastStreamingIndex].content || '') + errorMessageContent,
                              streaming: false,
                           };
                           errorHandled = true;
                        }

                        if (!errorHandled) {
                           currentMessages.push({
                              id: uuidv4(),
                              type: 'assistant',
                              content: errorMessageContent.trim(),
                              streaming: false,
                           });
                        }

                        setIsLoading(false);
                        setIsSending(false);
                        eventSourceRef.current?.close();
                        eventSourceRef.current = null;
                        break;
                     }
                     case 'stream_end': {
                        console.log('SSE Stream Ended Normally');
                        const lastMessageIndex = currentMessages.length - 1;
                        if (lastMessageIndex >= 0 && currentMessages[lastMessageIndex].type === 'assistant') {
                           currentMessages[lastMessageIndex].streaming = false;
                        }
                        setIsSending(false);
                        setTimeout(() => setIsLoading(false), 300);
                        eventSourceRef.current?.close();
                        eventSourceRef.current = null;
                        break;
                     }
                  }

                  if (eventType === 'stream_end' || eventType === 'error' || eventType === 'validation_failure') {
                     currentMessages = currentMessages.filter(
                        (msg) => !(msg.id === aiMessageId && !msg.content && (!msg.properties || msg.properties.length === 0) && !msg.streaming),
                     );

                     const finalStreamingIndex = currentMessages.findIndex((msg) => msg.streaming);
                     if (finalStreamingIndex !== -1) {
                        currentMessages[finalStreamingIndex].streaming = false;
                     }
                  }
                  return currentMessages;
               });
            } catch (error) {
               console.error('Failed to parse SSE event:', event.data, error);
               setIsLoading(false);
               setIsSending(false);
               eventSourceRef.current?.close();
               eventSourceRef.current = null;

               setMessages((prev) => {
                  const errorMsg: ChatMessage = {
                     id: uuidv4(),
                     type: 'assistant',
                     content: '**Erro ao processar resposta do servidor.**',
                     streaming: false,
                  };

                  const updatedPrev = prev.map((m) => (m.streaming ? {...m, streaming: false} : m));
                  return [...updatedPrev, errorMsg];
               });
            }
         };

         es.onerror = () => {
            setIsLoading(false);
            setIsSending(false);
            eventSourceRef.current?.close();
            eventSourceRef.current = null;

            // setMessages((prev) =>
            //   prev.map((msg) => {
            //     if (msg.streaming) {
            //       return {
            //         ...msg,
            //         streaming: false,
            //         content: (msg.content || "") + "\n\n**Erro de conexão.**",
            //       };
            //     }
            //     return msg;
            //   })
            // );
         };

         es.onopen = () => {
            console.log('SSE Connection Opened');
         };
      },
      [handleToolMessage, userId, router],
   );

   const handleSend = useCallback(() => {
      const trimmedInput = input.trim();
      if (trimmedInput && !isSending && !isLoadingThreads && userId) {
         let targetThreadId = currentThreadId;

         if (!targetThreadId) {
            const newId = handleNewChat();
            if (newId) {
               targetThreadId = newId;
            } else {
               console.error('Falha ao criar novo thread via handleNewChat. Mensagem não enviada.');
               return;
            }
         }

         const humanMessage: ChatMessage = {
            id: uuidv4(),
            type: 'human',
            content: trimmedInput,
         };
         setMessages((prevMessages) => [...prevMessages, humanMessage]);
         setInput('');

         if (targetThreadId) {
            startChatStream(trimmedInput, targetThreadId);
         } else {
            console.error('No valid targetThreadId found after attempting creation. Cannot send message.');
         }
      } else if (!userId) {
         console.error('human ID não encontrado. Não é possível enviar mensagem.');
      } else if (isSending) {
         console.warn('Attempted to send message while stream is active.');
      }
   }, [input, isSending, isLoadingThreads, userId, currentThreadId, handleNewChat, setMessages, setInput, startChatStream]);

   const handleSuggestionClick = (suggestion: string) => {
      if (suggestion.trim() && !isSending && !isLoadingThreads && userId) {
         let targetThreadId = currentThreadId;

         if (!targetThreadId) {
            const newId = handleNewChat();
            if (newId) {
               targetThreadId = newId;
            } else {
               console.error('Falha ao criar novo thread via handleNewChat. Sugestão não enviada.');
               return;
            }
         }

         const humanMessage: ChatMessage = {
            id: uuidv4(),
            type: 'human',
            content: suggestion,
         };
         setMessages((prevMessages) => [...prevMessages, humanMessage]);

         if (targetThreadId) {
            startChatStream(suggestion, targetThreadId);
         } else {
            console.error('No valid targetThreadId found after attempting creation. Cannot send suggestion.');
         }
      }
   };

   const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
         if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
         }
      },
      [handleSend],
   );

   const handleCancel = () => {
      if (eventSourceRef.current) {
         eventSourceRef.current.close();
         eventSourceRef.current = null;
         console.log('SSE Stream Cancelled by human');
      }
      setIsSending(false);
      setIsLoading(false);

      setMessages((prev) =>
         prev
            .filter(
               (msg, index) =>
                  !(index === prev.length - 1 && msg.type === 'assistant' && msg.streaming && !msg.content && (!msg.properties || msg.properties.length === 0)),
            )
            .map((m) => ({...m, streaming: false})),
      );
   };

   // const handleHistoryPropertyClick = (property: ExtendedProperty) => {
   //    setSelectedProperty(property);
   //    setIsModalOpen(true);

   //    setRecentProperties((prev: ExtendedProperty[]) => {
   //       const exists = prev.some((p) => p.ref === property.ref);
   //       if (!exists) {
   //          return [property, ...prev.slice(0, 4)];
   //       }
   //       return prev;
   //    });
   // };

   const handlePropertyClick = (property: ExtendedProperty) => {
      setSelectedProperty(property);
      setIsModalOpen(true);

      setRecentProperties((prev: ExtendedProperty[]) => {
         const exists = prev.some((p) => p.ref === property.ref);
         if (!exists) {
            return [property, ...prev.slice(0, 4)];
         }
         return prev;
      });
   };

   const MemoizedMap = useMemo(() => {
      return (
         <MapComponent
            className="!w-full !h-full !shadow-none z-50 md:rounded-l-4xl absolute md:relative left-0 top-0"
            drawable={false}
            centralPoint={{
               lat: 0,
               lng: 0,
            }}
            initialMarker={true}
            pointClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            propertyIds={(() => {
               const lastToolMsg = [...messages].findLast((msg) => msg.type === 'tool' && Array.isArray(msg.properties) && msg.properties.length > 0);
               return lastToolMsg ? lastToolMsg?.artifact?.ids : [];
            })()}
            clickToDrawCallback={() => {}}
            immobileClick={handlePropertyClick}
         />
      );
   }, [messages]);

   useEffect(() => {
      if (isLoadingThreads || (!isLoadingThreads && !currentThreadId)) {
         setMessages([]);
      }

      if (!isLoadingThreads && currentThreadId) {
         getMessages(currentThreadId);
      }
   }, [currentThreadId, isLoadingThreads, getMessages]);

   useEffect(() => {
      if ((chatState === 'minimized' || chatState === 'fully-minimized') && typeof targetUrl === 'string' && targetUrl !== '') {
         router.push(targetUrl);
      }
   }, [chatState, targetUrl, router]);

   useEffect(() => {
      return () => {
         if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
         }
      };
   }, []);

   if (isLoadingThreads && chatState === 'maximized') {
      return (
         <div className="flex h-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300 overflow-hidden">
            <ChatHistory threads={[]} onSelectThread={() => {}} onNewChat={() => {}} />
            <BlurFade className="flex-1 flex items-center justify-center" delay={0.5}>
               <p>Carregando histórico de chats...</p>
            </BlurFade>
            <PropertyHistory recentProperties={[]} onSelectProperty={() => {}} />
         </div>
      );
   }

   if (chatState === 'maximized' || fullFill) {
      return (
         <div className={cn('flex flex-col h-full')}>
            <ChatAuthSection />
            <div className="flex h-[calc(100%-4rem)] transition-colors duration-300 overflow-hidden">
               <ChatHistory
                  threads={threads}
                  onSelectThread={(threadId) => {
                     selectThread(threadId);
                  }}
                  onNewChat={handleNewChat}
                  fullFill={fullFill}
               />
               <motion.div layoutId="chat-container" className="flex-1 flex flex-col h-full max-h-full overflow-hidden relative shadow-lg">
                  <ChatHeader
                     title={threads.find((t) => t.thread_id === currentThreadId)?.preview || 'Novo Chat'}
                     onNewChat={handleNewChat}
                     onMinimize={minimizeChat}
                     fullFill={fullFill}
                  />
                  {messages.length === 0 ? (
                     <div className="flex flex-1 flex-col items-center justify-center p-4">
                        <motion.div layout className="flex justify-center">
                           <InitialGuide onSuggestionClick={handleSuggestionClick} />
                        </motion.div>
                        <motion.div layoutId="chat-input-layout" layout className="w-full max-w-[49rem] mx-auto">
                           {/* <StarBorder> */}
                           <ChatInput
                              value={input}
                              onChange={handleInputChange}
                              onSend={handleSend}
                              isLoading={isSending}
                              onKeyDown={handleKeyDown}
                              onCancel={handleCancel}
                              disabled={isSending || isLoadingThreads || !currentThreadId}
                              handleSuggestionClick={handleSuggestionClick}
                           />
                           {/* </StarBorder> */}
                        </motion.div>
                        <div />
                     </div>
                  ) : (
                     <span className="flex-1 h-full flex flex-row justify-center relative">
                        <Animated direction="left" className="flex-1 flex flex-col max-w-[52rem] max-h-[calc(100dvh-5rem)]" incorporate={false}>
                           <MessageList
                              messages={messages}
                              setMessages={setMessages}
                              isLoading={isLoading}
                              isSending={isSending}
                              onPropertyClick={handlePropertyClick}
                              onSelectQuestion={handleSuggestionClick}
                              onMinimizeAndNavigate={minimizeChat}
                           />
                           <motion.div layoutId="chat-input-layout" layout className="h-56 bg-[rgb(33,33,33)] p-2">
                              <ChatInput
                                 map={[usingMap, setUsingMap]}
                                 value={input}
                                 onChange={handleInputChange}
                                 onSend={handleSend}
                                 isLoading={isSending}
                                 onKeyDown={handleKeyDown}
                                 onCancel={handleCancel}
                                 disabled={isSending || isLoadingThreads || !currentThreadId}
                                 promptBuilder={false}
                                 handleSuggestionClick={handleSuggestionClick}
                              />
                           </motion.div>
                        </Animated>
                        {/* <AnimatePresence>
                           <motion.div
                              animate={{
                                 width: usingMap ? '70%' : '0',
                              }}
                              transition={{
                                 type: 'spring',
                                 mass: 0.1,
                              }}
                           >
                              {usingMap && MemoizedMap}
                           </motion.div>
                        </AnimatePresence> */}
                     </span>
                  )}
                  <Animated
                     incorporate={false}
                     direction="bottom"
                     animate={{
                        left: usingMap ? '16rem' : '50%',
                     }}
                     className={cn('absolute w-[25rem] bottom-2.5 -translate-x-1/2 z-10')}
                  >
                     {input === '' ? (
                        <p className="text-xs text-center text-white">
                           Conversando com o IbviGPT, você aceita os nossos{' '}
                           <Link className="underline" href="/privacy-policy">
                              Termos
                           </Link>{' '}
                           e leu nossa{' '}
                           <Link className="underline" href="/privacy-policy">
                              Política de Privacidade
                           </Link>
                           .
                        </p>
                     ) : (
                        <p className="text-xs text-center text-white">IbviGPT pode cometer erros. Cheque informações importantes.</p>
                     )}
                  </Animated>
               </motion.div>
               {/* <PropertyHistory recentProperties={recentProperties} onSelectProperty={handleHistoryPropertyClick} fullFill={fullFill} /> */}
               {isModalOpen && <PropertyModal ref={selectedProperty?.ref || ''} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
            </div>
         </div>
      );
   } else if (chatState === 'minimized') {
      return (
         <motion.div
            layoutId="chat-container"
            className="fixed bottom-4 right-4 z-[998] min-h-[25rem] md:min-h-[30rem] min-w-[90dvw] md:min-w-[30rem] max-h-[80dvh] max-w-[50dvw] backdrop-blur-md border border-border rounded-radius shadow-xl flex flex-col"
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.2, ease: 'circOut'}}
         >
            <div
               className="resize-handle-tl absolute -top-2 -left-2 w-4 h-4 bg-emerald-500 cursor-nwse-resize -z-10"
               onMouseDown={(e) => {
                  e.preventDefault();
                  const container = e.currentTarget.parentElement as HTMLElement;
                  if (!container) return;
                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startWidth = container.offsetWidth;
                  const startHeight = container.offsetHeight;
                  const doDrag = (e: MouseEvent) => {
                     const newWidth = startWidth - (e.clientX - startX);
                     const newHeight = startHeight - (e.clientY - startY);
                     container.style.width = `${newWidth}px`;
                     container.style.height = `${newHeight}px`;
                  };
                  const stopDrag = () => {
                     document.removeEventListener('mousemove', doDrag);
                     document.removeEventListener('mouseup', stopDrag);
                  };
                  document.addEventListener('mousemove', doDrag);
                  document.addEventListener('mouseup', stopDrag);
               }}
            />
            <div className="flex items-center justify-between p-2 px-3 bg-muted/40 border-b border-border flex-shrink-0">
               <span className="flex items-center gap-2">
                  <MbrasAI size={16} className="text-emerald-400" />
                  <h3 className="text-sm font-semibold">
                     MBRAS <AnimatedGradientText>Guide</AnimatedGradientText>
                  </h3>
               </span>
               <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => fullyMinimizeChat()} aria-label="Minimizar Completamente">
                     <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => maximizeChat()} aria-label="Maximizar Chat">
                     <Maximize2 className="h-4 w-4" />
                  </Button>
               </div>
            </div>
            {isLoading && messages.length === 0 && (
               <div className="flex justify-center items-center h-full mt-3">
                  <p className="text-muted-foreground text-sm">Carregando histórico...</p>
               </div>
            )}
            <MessageList
               messages={messages}
               setMessages={setMessages}
               isLoading={isLoading}
               isSending={isSending}
               onPropertyClick={handlePropertyClick}
               onSelectQuestion={handleSuggestionClick}
               onMinimizeAndNavigate={minimizeChat}
            />
            <div className="p-2 border-border bg-[rgb(33,33,33)] flex-shrink-0">
               <ChatInput
                  value={input}
                  onChange={handleInputChange}
                  onSend={handleSend}
                  isLoading={isSending}
                  onKeyDown={handleKeyDown}
                  onCancel={handleCancel}
                  placeholder={'Digite sua mensagem...'}
                  disabled={isSending || isLoading}
               />
            </div>
         </motion.div>
      );
   } else {
      return null;
   }
}

export default memo(PropertyChat);
