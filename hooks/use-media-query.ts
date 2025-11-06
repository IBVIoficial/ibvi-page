import {useState, useEffect} from 'react';

/**
 * Custom hook to check if a media query matches.
 * Handles server-side rendering by returning false initially.
 * @param query The media query string (e.g., '(max-width: 768px)')
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
   const [matches, setMatches] = useState(false);

   useEffect(() => {
      // Ensure window is defined (runs only on client-side)
      if (typeof window !== 'undefined') {
         const mediaQueryList = window.matchMedia(query);

         const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
         };

         // Set initial state based on current match
         setMatches(mediaQueryList.matches);

         // Add listener for changes
         mediaQueryList.addEventListener('change', listener);

         // Cleanup listener on component unmount
         return () => {
            mediaQueryList.removeEventListener('change', listener);
         };
      }
   }, [query]); // Re-run effect if query changes

   return matches;
}
