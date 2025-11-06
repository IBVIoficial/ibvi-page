export default function FloatingChatBubble() {
   return null;
}

// 'use client';

// import {motion, AnimatePresence} from 'framer-motion';

// import MinimizedChat from '@/components/chat/minimized-chat';
// import {useSharedChatState} from '@/contexts/ChatStateContext';
// import PropertyChat from './property-chat';
// import {usePathname} from 'next/navigation';

// export default function FloatingChatBubble() {
//    const {chatState, minimizeChat} = useSharedChatState();
//    const pathname = usePathname();

//    const chatContainerVariants = {
//       hidden: {opacity: 0, scale: 0.95},
//       visible: {opacity: 1, scale: 1},
//       exit: {opacity: 0, scale: 0.95},
//    };

//    if (pathname === '/gpt') return null;

//    if (pathname !== '/guide') return null;

//    return (
//       <AnimatePresence mode="popLayout">
//          {chatState === 'fully-minimized' && <MinimizedChat onRestore={minimizeChat} />}

//          {(chatState === 'minimized' || chatState === 'maximized') && (
//             <motion.div
//                key="chat-active"
//                variants={chatContainerVariants}
//                initial="hidden"
//                animate="visible"
//                exit="exit"
//                transition={{duration: 0.3, ease: 'easeInOut'}}
//                className={chatState === 'maximized' ? 'fixed inset-0 top-[var(--navbar-height)] z-[100] flex flex-col bg-background/75 backdrop-blur-md' : ''}
//             >
//                <PropertyChat />
//             </motion.div>
//          )}
//       </AnimatePresence>
//    );
// }
