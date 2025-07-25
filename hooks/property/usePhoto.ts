'use client';
import {useState, useEffect, useCallback} from 'react';
import {fetchPhotoIds} from '@/lib/property';

export const usePhoto = (ref: string) => {
   const [photoIds, setPhotoIds] = useState<string[]>([]);
   const [loading, setLoading] = useState(false);

   const init = useCallback(async () => {
      if (ref) {
         setLoading(false);

         const photoIds = await fetchPhotoIds(ref);

         setPhotoIds(photoIds);
         setLoading(false);
      }
   }, [ref]);

   useEffect(() => {
      init();
   }, [ref, init]);

   return {photoIds, loading};
};
