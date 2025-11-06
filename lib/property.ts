import goApi from '@/services/go-api.service';
import {PhotoIdsResponse} from '@/types/photo';

export const fetchPhotoIds = async (ref: any) => {
   try {
      const response = await goApi.get(`/api/photos-all/${ref}`);
      const data: PhotoIdsResponse = response.data;
      return data.photo_ids || [];
   } catch (error: any) {
      console.error('error searching for photos (goApi):', error.message || error);
      return [];
   }
};

export const fetchProperty = async (propertyRef: string) => {
   try {
      const response = await goApi.get(`/api/properties-ref/${propertyRef}`);
      const data = response.data.property;
      return Array.isArray(data) ? data[0] || null : data || null;
   } catch (error: any) {
      console.error('error searching for properties (goApi):', error.message || error);
      return null;
   }
};
