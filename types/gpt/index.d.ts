interface Message {
   id: string;
   name?: string;
   type: 'system' | 'user' | 'assistant' | 'human';
   content: string;
   properties?: ExtendedProperty[];
   suggestedQuestions?: string[];
   streaming?: boolean;
   artifact?: any;
}

interface ToolMessage extends Omit<Message, 'type' | 'content'> {
   type: 'tool';
   content: any;
   artifact?: any;
}

type ChatMessage = Message | ToolMessage;

interface SuggestedQuestionsProps {
   questions: string[];
   onSelectQuestion: (question: string) => void;
}

interface ChatMessageProps {
   type: 'system' | 'user' | 'assistant' | 'human' | 'tool';
   content: string;
   suggestedQuestions?: string[];
   onSelectQuestion?: (question: string) => void;
}

interface PropertyCardProps {
   property: ExtendedProperty;
   onClick: () => void;
}

interface PropertyHistoryProps {
   recentProperties: ExtendedProperty[];
   onSelectProperty: (property: ExtendedProperty) => void;
}

interface PropertyModalProps {
   property: ExtendedProperty | null;
   isOpen: boolean;
   onClose: () => void;
}

interface ChatInputProps {
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onKeyDown: (e: React.KeyboardEvent) => void;
   onSend: () => void;
   isLoading?: boolean;
   onCancel?: () => void;
}

interface AvatarProps {
   text: string;
   className?: string;
}

interface MessageListProps {
   messages: ChatMessage[];
   onSelectQuestion: (question: string) => void;
   onPropertyClick: (property: ExtendedProperty) => void;
}

interface ChatThread {
   thread_id: string;
   startTime: string;

   preview?: string;
}

interface ChatHistoryProps {
   threads: ChatThread[];
   onSelectThread: (threadId: string) => void;
   onNewChat: () => void;
   fullFill?: boolean;
}
