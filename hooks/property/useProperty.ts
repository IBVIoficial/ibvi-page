'use client';
import {useState, useEffect, useCallback} from 'react';
import {Property} from '@/types/property';
import {fetchProperty} from '@/lib/property';

export const useProperty = (initialRef?: string, initialProperty?: Property | null) => {
   const [loading, setLoading] = useState(true);
   const [property, setProperty] = useState<Property | null>(initialProperty || null);
   const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

   const init = useCallback(async () => {
      let ref = initialRef;
      if (!ref) {
         const pathParts = window.location.pathname.split('/').filter(Boolean);

         if (pathParts.length > 0) {
            ref = pathParts[pathParts.length - 1];
         }
      }

      if (initialProperty) {
         setProperty(initialProperty);
         setLoading(false);
         setHasAttemptedFetch(true);
         return;
      }

      if (ref) {
         ref = ref.toUpperCase();
         setLoading(true);

         const property = await fetchProperty(ref);

         setProperty(property);
         setLoading(false);
         setHasAttemptedFetch(true);
      } else {
         setLoading(false);
         setHasAttemptedFetch(true);
         setProperty(null);
      }
   }, [initialRef, initialProperty]);

   useEffect(() => {
      init();
   }, [initialRef, initialProperty, init]);

   return {property, loading, hasAttemptedFetch};
};
