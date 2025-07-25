'use client';
import {useState, useEffect} from 'react';
import {PhotoIdsResponse} from '@/types/photo';
import goApi from '@/services/go-api.service';

export const usePhotoThree = (ref: string) => {
   const [photoIds, setPhotoIds] = useState<string[]>([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchPhotoIds = async () => {
         setLoading(true);
         try {
            const response = await goApi.get(`/api/photos-three/${ref}`);
            const data: PhotoIdsResponse = response.data;
            setPhotoIds(data.photo_ids || []);
         } catch (error: any) {
            console.error('error searching for photos (goApi):', error.message || error);
            setPhotoIds([]);
         } finally {
            setLoading(false);
         }
      };

      if (ref) {
         fetchPhotoIds();
      }
   }, [ref]);

   return {photoIds, loading};
};
