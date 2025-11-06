'use client';

import React, {createContext, useContext, ReactNode} from 'react';
import {useChatState, UseChatStateReturn} from '@/hooks/useChatState';

type ChatStateContextType = UseChatStateReturn | undefined;

const ChatStateContext = createContext<ChatStateContextType>(undefined);

interface ChatStateProviderProps {
   children: ReactNode;
}

export const ChatStateProvider: React.FC<ChatStateProviderProps> = ({children}) => {
   const chatStateHookValues = useChatState();

   return <ChatStateContext.Provider value={chatStateHookValues}>{children}</ChatStateContext.Provider>;
};

export const useSharedChatState = (): UseChatStateReturn => {
   const context = useContext(ChatStateContext);
   if (context === undefined) {
      throw new Error('useSharedChatState must be used within a ChatStateProvider');
   }
   return context;
};
