'use client';

import {useContext} from 'react';
import {SidebarContext} from '@/contexts/SidebarContext';

export const useSidebar = () => {
   const context = useContext(SidebarContext);
   if (!context) throw new Error('useSidebar must be used inside SidebarProvider');
   return context;
};
export default useSidebar;
