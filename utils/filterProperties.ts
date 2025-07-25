'use client';

import {Filters} from '@/types/filters';
import {Property} from '@/types/property';
export function filterProperties(properties: Property[], filters: Filters, mapIds: string[] | undefined): Property[] {
   if (typeof window === 'undefined') return [];

   const savedFilters = sessionStorage.getItem('userFilters');
   if (savedFilters) {
      filters = {...JSON.parse(savedFilters), ...filters};
   }

   sessionStorage.setItem('userFilters', JSON.stringify(filters));

   return properties.filter((p) => {
      let isValid = true;

      if (mapIds && mapIds.length > 0 && !mapIds.includes(p.id!)) {
         isValid = false;
      }

      if (filters.property_type && isValid) {
         if (
            !filters.property_type.includes('ALL') &&
            filters.property_type.length !== 0 &&
            !filters.property_type.some((type) => p.property_type?.toLowerCase()?.trim()?.includes(type.toLowerCase().trim()))
         ) {
            isValid = false;
         }
      }

      if (filters.listingType && (filters.listingType.includes('sale') || filters.listingType.includes('rent')) && isValid) {
         if (filters.listingType.includes('sale') && filters.listingType.includes('rent')) {
            if (p.is_for_sale !== 1 || p.is_for_rent !== 1) isValid = false;
         } else if (filters.listingType.includes('sale') && !filters.listingType.includes('rent')) {
            if (p.is_for_sale !== 1) isValid = false;
         } else if (filters.listingType.includes('rent') && !filters.listingType.includes('sale')) {
            if (p.is_for_rent !== 1) isValid = false;
         }
      }

      if (p.suites != null && filters.min_suites != null && isValid && p.suites < filters.min_suites) {
         isValid = false;
      }

      if (p.suites != null && filters.max_suites != null && isValid && p.suites > filters.max_suites) {
         isValid = false;
      }

      if (filters.min_parking_spaces != null && isValid && (p.parking_spaces || 0) < filters.min_parking_spaces) {
         isValid = false;
      }

      if (filters.max_parking_spaces != null && isValid && (p.parking_spaces || 0) > filters.max_parking_spaces) {
         isValid = false;
      }

      if (filters.min_bedrooms != null && isValid && (p.bedrooms || 0) < filters.min_bedrooms) {
         isValid = false;
      }

      if (filters.max_bedrooms != null && isValid && (p.bedrooms || 0) > filters.max_bedrooms) {
         isValid = false;
      }

      if (filters.min_bathrooms != null && isValid && (p.bathrooms || 0) < filters.min_bathrooms) {
         isValid = false;
      }

      if (filters.max_bathrooms != null && isValid && (p.bathrooms || 0) > filters.max_bathrooms) {
         isValid = false;
      }

      if (filters.min_total_area != null && isValid && (p.total_area || 0) < filters.min_total_area) {
         isValid = false;
      }

      if (filters.max_total_area != null && isValid && (p.total_area || 0) > filters.max_total_area) {
         isValid = false;
      }

      if (filters.min_usable_area != null && isValid && (p.total_area || 0) < filters.min_usable_area) {
         isValid = false;
      }

      if (filters.max_usable_area != null && isValid && (p.total_area || 0) > filters.max_usable_area) {
         isValid = false;
      }

      if ((filters.listingType?.includes('rent') || filters.listingType?.length === 0) && filters.min_rent_price != null && isValid) {
         const priceA = p.rent_value || 0;
         if (priceA < filters.min_rent_price) isValid = false;
      }

      if ((filters.listingType?.includes('rent') || filters.listingType?.length === 0) && filters.max_rent_price != null && isValid) {
         const priceA = p.rent_value || 0;
         if (priceA > filters.max_rent_price) isValid = false;
      }

      if ((filters.listingType?.includes('sale') || filters.listingType?.length === 0) && filters.min_sale_price != null && isValid) {
         const priceA = p.sale_value || 0;
         if (priceA < filters.min_sale_price) isValid = false;
      }

      if ((filters.listingType?.includes('sale') || filters.listingType?.length === 0) && filters.max_sale_price != null && isValid) {
         const priceA = p.sale_value || 0;
         if (priceA > filters.max_sale_price) isValid = false;
      }

      if (
         filters.city &&
         isValid &&
         filters.city.length > 0 &&
         p.city &&
         !filters.city.map((c) => c.toLowerCase().trim()).includes(p.city.toLowerCase().trim())
      ) {
         isValid = false;
      }

      if (
         filters.neighborhood &&
         isValid &&
         filters.neighborhood.length > 0 &&
         !(
            filters.neighborhood.map((n) => n.toLowerCase().trim()).includes(p.commercial_neighborhood?.toLowerCase().trim() ?? '') ||
            filters.neighborhood.map((n) => n.toLowerCase().trim()).includes(p.neighborhood?.toLowerCase().trim() ?? '')
         )
      ) {
         isValid = false;
      }

      return isValid;
   });
}
