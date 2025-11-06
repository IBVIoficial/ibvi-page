import {Photo} from './photo';

export type Property = {
   id: string;
   ref: string;
   bathrooms: number;
   bedrooms: number;
   city: string;
   commercial_neighborhood: string;
   condo_details?: string;
   condo_fee?: number;
   description?: string;
   iptu?: number;
   is_for_rent: number;
   is_for_sale: number;
   neighborhood: string;
   parking_spaces: number;
   promotion?: string;
   property_type: string;
   region: string;
   rent_value: number;
   sale_value: number;
   state?: string;
   suites: number;
   system_rule?: string;
   title: string;
   new_title?: string;
   total_area: number;
   unit_details?: string;
   usable_area: number;
   value?: number;
   photos?: Photo[];
   location?: {
      type?: 'Point';
      coordinates: [number, number];
   };
};

export type PropertyList = {
   id: string;
   ref: string;
   bathrooms: number;
   bedrooms: number;
   city: string;
   commercial_neighborhood: string;
   is_for_rent: number;
   is_for_sale: number;
   neighborhood: string;
   parking_spaces: number;
   property_type: string;
   region: string;
   rent_value: number;
   sale_value: number;
   suites: number;
   title: string;
   total_area: number;
   usable_area: number;
};

export interface PropertyPreview {
   title: string;
   imageUrl: string | null;
}

export interface PropertyPreviewData {
   [reference: string]: PropertyPreview | {error: boolean} | null;
}
