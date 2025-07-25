import {useState, useCallback} from 'react';

export type ChatState = 'maximized' | 'minimized' | 'fully-minimized';

export interface UseChatStateReturn {
   chatState: ChatState;
   targetUrl: string | null;
   maximizeChat: () => void;
   minimizeChat: (url?: string) => void;
   fullyMinimizeChat: (url?: string) => void;
   setTargetUrl: (url: string | null) => void;
}

export function useChatState(initialState: ChatState = 'fully-minimized'): UseChatStateReturn {
   const [chatState, setChatState] = useState<ChatState>(initialState);
   const [targetUrl, setTargetUrl] = useState<string | null>(null);

   const maximizeChat = useCallback(() => {
      setChatState('maximized');
      setTargetUrl(null);
   }, []);

   const minimizeChat = useCallback((url?: string) => {
      setChatState('minimized');
      if (url) {
         setTargetUrl(url);
      }
   }, []);

   const fullyMinimizeChat = useCallback((url?: string) => {
      setChatState('fully-minimized');
      if (url) {
         setTargetUrl(url);
      }
   }, []);

   return {
      chatState,
      targetUrl,
      maximizeChat,
      minimizeChat,
      fullyMinimizeChat,
      setTargetUrl,
   };
}
