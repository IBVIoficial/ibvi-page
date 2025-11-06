import {useEffect} from 'react';
import {Property} from '@/types/property';
import {trackPropertyView} from '@/lib/meta-pixel/property-view-tracker';

export function usePropertyViewTracker(property: Property | null | undefined) {
   useEffect(() => {
      if (!property) return;

      const timer = setTimeout(() => {
         trackPropertyView({
            property,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
         });
      }, 1000);

      return () => clearTimeout(timer);
   }, [property]);
}
