'use client';

import {useEffect} from 'react';
import {Property} from '@/types/property';
import {EventData} from '@/interface/meta';
import {getFbcFbp, event as trackPixelEvent} from './meta-pixel';
import {getFBP, generateFBC} from './meta-utils';

interface PropertyViewData {
   property: Property;
   userAgent?: string;
   referrer?: string;
}

export async function trackPropertyView({property, userAgent, referrer}: PropertyViewData) {
   try {
      const {fbc, fbp} = getFbcFbp();

      const finalFbc = fbc || generateFBC();
      const finalFbp = fbp || getFBP();

      const eventId = `view_content_${property.ref}_${Date.now()}`;

      const customData = {
         content_type: 'product',
         content_ids: [property.ref],
         content_name: property.title || property.new_title || '',
         content_category: property.property_type,
         value: property.sale_value || property.rent_value || 0,
         currency: 'BRL',
         contents: [
            {
               id: property.ref,
               quantity: 1,
            },
         ],
         num_bedrooms: property.bedrooms,
         num_bathrooms: property.bathrooms,
         num_parking_spaces: property.parking_spaces,
         city: property.city,
         neighborhood: property.neighborhood,
         commercial_neighborhood: property.commercial_neighborhood,
         region: property.region,
         total_area: property.total_area,
         usable_area: property.usable_area,
         property_id: property.id,
         is_for_sale: property.is_for_sale === 1,
         is_for_rent: property.is_for_rent === 1,
         referrer: referrer || (typeof document !== 'undefined' ? document.referrer : ''),
      };

      if (typeof window !== 'undefined') {
         trackPixelEvent('ViewContent', {
            ...customData,
            eventID: eventId,
         });
      }

      const eventData: EventData = {
         event_name: 'ViewContent',
         event_time: Math.floor(Date.now() / 1000),
         action_source: 'website',
         event_source_url: typeof window !== 'undefined' ? window.location.href : '',
         event_id: eventId,
         user_data: {
            client_user_agent: userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : ''),
            fbp: finalFbp || undefined,
            fbc: finalFbc || undefined,
         },
         custom_data: customData,
      };

      const response = await fetch('/api/event', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(eventData),
      });

      if (!response.ok) {
         await response.json();
      } else {
         // ViewContent event sent successfully
      }

      return {success: true, eventId};
   } catch (error) {
      return {success: false, error};
   }
}

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
