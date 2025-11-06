import {useState, useEffect, useCallback} from 'react';
import {v4 as uuidv4} from 'uuid';
import gptApi from '@/services/gpt-api.service';

interface UseChatThreadManagerReturn {
   threads: ChatThread[];
   currentThreadId: string | null;
   selectThread: (threadId: string) => void;
   createNewThread: () => string | null;
   isLoadingThreads: boolean;
}

export function useChatThreadManager(userId: string | null): UseChatThreadManagerReturn {
   const [threads, setThreads] = useState<ChatThread[]>([]);
   const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
   const [isLoadingThreads, setIsLoadingThreads] = useState<boolean>(false);

   const fetchThreads = useCallback(async () => {
      if (!userId) {
         console.log('Tentativa de buscar threads sem userId');
         setThreads([]);
         setCurrentThreadId(uuidv4());
         setIsLoadingThreads(false);
         return;
      }

      // setIsLoadingThreads(true);
      try {
         const response = await gptApi.get<ChatThread[]>(`/chat/chats?user_id=${userId}`);
         const fetchedThreads = response.data || [];
         setThreads(fetchedThreads);

         if (fetchedThreads.length === 0 && !currentThreadId) {
            setCurrentThreadId(uuidv4());
         } else {
            let bestAlternative = fetchedThreads.find((t) => t.thread_id === currentThreadId);

            if (!bestAlternative) {
               bestAlternative = fetchedThreads.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())[0];
            }

            if (bestAlternative) {
               setCurrentThreadId(bestAlternative.thread_id);
            }
         }
      } catch (error) {
         console.error('Erro ao buscar threads:', error);
         setThreads([]);
         setCurrentThreadId(null);
      }
      setIsLoadingThreads(false);
   }, [userId]);

   useEffect(() => {
      fetchThreads();
   }, [fetchThreads]);

   const selectThread = useCallback(
      (threadId: string) => {
         if (threads.some((t) => t.thread_id === threadId)) {
            console.log('Selecionando thread:', threadId);
            setCurrentThreadId(threadId);
         } else {
            console.warn('Tentativa de selecionar thread inválido:', threadId);
         }
      },
      [threads],
   );

   const createNewThread = useCallback((): string | null => {
      if (!userId) {
         console.warn('Tentativa de criar novo thread sem userId');
         return null;
      }

      const newThreadId = uuidv4();
      const newThreadPlaceholder: ChatThread = {
         thread_id: newThreadId,
         startTime: new Date().toISOString(),
         preview: 'Novo Chat',
      };

      setThreads((prevThreads) => [newThreadPlaceholder, ...prevThreads]);
      console.log('Criando novo thread:', newThreadId);
      setCurrentThreadId(newThreadId);

      return newThreadId;
   }, [userId]);

   return {
      threads,
      currentThreadId,
      selectThread,
      createNewThread,
      isLoadingThreads,
   };
}
