import {useState, useEffect, useCallback} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {PropertyList} from '@/types/property';
import {Filters} from '@/types/filters';
import goApi from '@/services/go-api.service';

export const usePropertyList = () => {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const [propertyList, setPropertyList] = useState<PropertyList[]>([]);
   const [totalPages, setTotalPages] = useState<number>(0);
   const [loading, setLoading] = useState(false);
   const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);
   const [filters, setFilters] = useState<Filters>({});

   const buildQueryString = (params: Filters): string => {
      const query = new URLSearchParams();

      const filterToApiMapping: Partial<Record<keyof Filters, string>> = {
         keyword: 'title',
         listingType: 'is_for_rent',
         min_rent_price: 'min_rent_value',
         max_rent_price: 'max_rent_value',
         min_sale_price: 'min_sale_value',
         max_sale_price: 'max_sale_value',
         min_total_area: 'min_total_area',
         max_total_area: 'max_total_area',
         min_bedrooms: 'bedrooms_min',
         min_bathrooms: 'bathrooms_min',
         min_parking_spaces: 'parking_spaces_min',
         min_suites: 'suites_min',
         city: 'cities',
         neighborhood: 'neighborhoods',
         property_type: 'property_type',
         page: 'page',
         sort_by: 'sort_by',
      };

      (Object.keys(params) as Array<keyof Filters>).forEach((key) => {
         const value = params[key];
         const apiKey = filterToApiMapping[key] || key;

         if (value !== undefined && value !== null && value !== '') {
            if (key === 'listingType' && Array.isArray(value)) {
               if (value.includes('rent')) {
                  query.append('is_for_rent', '1');
               }
               if (value.includes('sale')) {
                  query.append('is_for_sale', '1');
               }
            } else if (Array.isArray(value)) {
               if (value.length > 0) {
                  query.append(apiKey, value.join(','));
               }
            } else {
               query.append(apiKey, String(value));
            }
         }
      });
      return query.toString();
   };

   const fetchProperties = useCallback(async (currentFilters: Filters) => {
      setLoading(true);
      try {
         const queryString = buildQueryString(currentFilters);
         const response = await goApi.get(`/api/properties/list?${queryString}`);
         setPropertyList(response.data.properties || []);
         setTotalPages(response.data.totalPages || 0);
      } catch (error: any) {
         console.error('error searching for properties (goApi):', error.message || error);
         setPropertyList([]);
         setTotalPages(0);
      } finally {
         await new Promise((resolve) => setTimeout(resolve, 120));
         setLoading(false);
         setHasAttemptedFetch(true);
      }
   }, []);

   useEffect(() => {
      const currentParams = Object.fromEntries(searchParams.entries());
      const newFilters: Partial<Filters> = {};

      (Object.keys(currentParams) as Array<keyof Filters>).forEach((key) => {
         const value = currentParams[key];
         if (['property_type', 'listingType', 'city', 'neighborhood'].includes(key)) {
            (newFilters as any)[key] = value.split(',');
         } else if (
            [
               'min_rent_price',
               'max_rent_price',
               'min_sale_price',
               'max_sale_price',
               'min_total_area',
               'max_total_area',
               'min_bedrooms',
               'min_bathrooms',
               'min_parking_spaces',
               'min_suites',
               'page',
            ].includes(key)
         ) {
            (newFilters as any)[key] = Number(value);
         } else {
            (newFilters as any)[key] = value;
         }
      });

      setFilters(newFilters as Filters);
   }, [searchParams]);

   useEffect(() => {
      const handler = setTimeout(() => {
         if (Object.keys(filters).length > 0) {
            fetchProperties(filters);
         }
      }, 250);

      return () => {
         clearTimeout(handler);
      };
   }, [filters, fetchProperties]);

   const updateFilters = (newFilters: Partial<Filters>) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      let hasChanges = false;

      (Object.keys(newFilters) as Array<keyof Filters>).forEach((key) => {
         const value = newFilters[key];
         const currentUrlValue = currentParams.get(key);

         let newValueString: string | null = null;
         if (Array.isArray(value)) {
            newValueString = value.length > 0 ? value.join(',') : null;
         } else if (value !== undefined && value !== null && value !== '') {
            newValueString = String(value);
         }

         if (newValueString === null) {
            if (currentUrlValue !== null) {
               currentParams.delete(key);
               hasChanges = true;
            }
         } else {
            if (currentUrlValue !== newValueString) {
               currentParams.set(key, newValueString);
               hasChanges = true;
            }
         }
      });

      if (hasChanges) {
         router.push(`${pathname}?${currentParams.toString()}`, {scroll: false});
      }
   };

   const setCurrentPage = (page: number) => {
      updateFilters({page});
   };

   return {propertyList, totalPages, loading, hasAttemptedFetch, filters, updateFilters, setCurrentPage};
};
