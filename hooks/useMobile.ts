import {useState, useEffect} from 'react';

const MOBILE_BREAKPOINT = 768;

function useMobile(): boolean {
   const [isMobile, setIsMobile] = useState<boolean>(false);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const checkIsMobile = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
         };

         checkIsMobile();
         window.addEventListener('resize', checkIsMobile);
         return () => {
            window.removeEventListener('resize', checkIsMobile);
         };
      }
   }, []);

   return isMobile;
}

export default useMobile;
