'use client';
import {createContext, useState, ReactNode} from 'react';

interface SidebarContextType {
   isOpen: boolean;
   toggleSidebar: () => void;
   closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({children}: {children: ReactNode}) => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleSidebar = () => setIsOpen((prev) => !prev);
   const closeSidebar = () => setIsOpen(false);

   return <SidebarContext.Provider value={{isOpen, toggleSidebar, closeSidebar}}>{children}</SidebarContext.Provider>;
};

export {SidebarContext};
