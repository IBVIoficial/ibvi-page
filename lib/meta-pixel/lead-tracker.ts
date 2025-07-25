// import {EventData} from '@/interface/meta';
import {getFbcFbp, lead as trackPixelLead, initWithUserData} from './meta-pixel';
import {getFBP, generateFBC} from './meta-utils';
import {parsePhoneNumber} from 'libphonenumber-js';

interface LeadData {
   // Basic user info
   name: string;
   email: string;
   phone: string;

   // Lead context
   formName: string;
   formType: 'property_inquiry' | 'advertise_listing' | 'contact' | 'newsletter' | 'custom';
   leadSource?: string;

   // Property-specific data (if applicable)
   propertyRef?: string;
   propertyTitle?: string;
   propertyType?: string;
   propertyValue?: number;
   propertyNeighborhood?: string;
   propertyCity?: string;

   // Additional data
   message?: string;
   details?: string;
   utmSource?: string;
   utmMedium?: string;
   utmCampaign?: string;

   // User location
   userLatitude?: number;
   userLongitude?: number;
   userCity?: string;
   userState?: string;
   userCountry?: string;

   // Page context
   pageUrl?: string;
   pageTitle?: string;
   referrer?: string;
   userAgent?: string;
}

interface LeadTrackingResult {
   success: boolean;
   eventId: string;
   pixelResult?: any;
   serverResult?: any;
   error?: any;
}

/**
 * Formats Brazilian phone numbers to international format with country code
 * Handles various input formats and adds +55 country code
 */
function formatBrazilianPhone(phone: string): string {
   try {
      const phoneNumber = parsePhoneNumber(phone, 'BR');
      if (phoneNumber.isValid()) {
         return phoneNumber.number.replace('+', '');
      }
   } catch {
      // Ignore parse errors and fall back to basic cleanup
   }

   // Fallback formatting
   const cleaned = phone.replace(/\D/g, '').replace(/^0+/, '');
   if (cleaned.startsWith('55')) {
      if (cleaned.length >= 12 && cleaned.length <= 13) {
         return cleaned;
      }
   }
   if (cleaned.length === 10 || cleaned.length === 11) {
      return '55' + cleaned;
   }
   return cleaned;
}

/**
 * Calculates a lead quality score based on available data
 */
function calculateLeadScore(data: LeadData): number {
   let score = 0;

   // Basic contact info (40 points)
   if (data.email) score += 15;
   if (data.phone) score += 15;
   if (data.name && data.name.split(' ').length > 1) score += 10; // Full name

   // Engagement indicators (30 points)
   if (data.message && data.message.length > 20) score += 15;
   if (data.propertyRef) score += 10; // Interested in specific property
   if (data.userLatitude && data.userLongitude) score += 5; // Shared location

   // Lead source quality (20 points)
   if (data.formType === 'property_inquiry') score += 20;
   else if (data.formType === 'advertise_listing') score += 15;
   else if (data.formType === 'contact') score += 10;

   // Additional context (10 points)
   if (data.utmSource) score += 5;
   if (data.referrer && !data.referrer.includes('google')) score += 5; // Direct/referral traffic

   return Math.min(score, 100); // Cap at 100
}

/**
 * Enhanced lead tracking function with comprehensive data collection
 */
export async function trackLead(data: LeadData): Promise<LeadTrackingResult> {
   try {
      // Get or generate Facebook cookies
      const {fbc, fbp} = getFbcFbp();
      const finalFbc = fbc || generateFBC();
      const finalFbp = fbp || getFBP();

      // Generate unique event ID
      const eventId = `lead_${data.formType}_${Date.now()}`;
      const eventTime = Math.floor(Date.now() / 1000);

      // Format phone number for Brazil
      const formattedPhone = formatBrazilianPhone(data.phone);

      // Parse name into first and last
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Calculate lead score
      const leadScore = calculateLeadScore(data);

      // Prepare custom data for the event
      const customData: Record<string, any> = {
         // Standard e-commerce parameters
         content_type: 'product',
         content_name: data.formName,
         content_category: data.formType,
         currency: 'BRL',
         value: data.propertyValue || leadScore, // Use property value or lead score as value

         // Lead-specific data
         lead_event_source: data.leadSource || data.formType,
         form_name: data.formName,
         form_type: data.formType,
         lead_score: leadScore,

         // Property data (if applicable)
         ...(data.propertyRef && {
            content_ids: [data.propertyRef],
            property_ref: data.propertyRef,
            property_title: data.propertyTitle,
            property_type: data.propertyType,
            property_neighborhood: data.propertyNeighborhood,
            property_city: data.propertyCity,
         }),

         // User engagement data
         ...(data.message && {user_message: data.message}),
         ...(data.details && {additional_details: data.details}),

         // Attribution data
         ...(data.utmSource && {utm_source: data.utmSource}),
         ...(data.utmMedium && {utm_medium: data.utmMedium}),
         ...(data.utmCampaign && {utm_campaign: data.utmCampaign}),

         // Page context
         page_url: data.pageUrl || (typeof window !== 'undefined' ? window.location.href : ''),
         page_title: data.pageTitle || (typeof document !== 'undefined' ? document.title : ''),
         referrer: data.referrer || (typeof document !== 'undefined' ? document.referrer : ''),
      };

      // Prepare user data for enhanced matching
      const userData = {
         em: data.email.toLowerCase().trim(),
         ph: formattedPhone,
         fn: firstName.toLowerCase(),
         ln: lastName.toLowerCase(),
         // Location data for better matching
         ...(data.userCity && {ct: data.userCity}),
         ...(data.userState && {st: data.userState}),
         ...(data.userCountry && {country: data.userCountry || 'br'}),
         // Additional identifiers
         external_id: data.email, // Use email as external ID for consistency
         lead_id: eventId,
      };

      // Track with client-side pixel
      let pixelResult;
      if (typeof window !== 'undefined') {
         try {
            // Initialize pixel with user data for better matching
            initWithUserData(userData);

            // Track lead event
            trackPixelLead(customData, {eventID: eventId});
            pixelResult = {success: true};
         } catch (error) {
            console.error('Error tracking lead with pixel:', error);
            pixelResult = {success: false, error};
         }
      }

      const serverEventData: any = {
         event_name: 'Lead',
         event_time: eventTime,
         action_source: 'website',
         event_source_url: data.pageUrl || (typeof window !== 'undefined' ? window.location.href : ''),
         event_id: eventId,
         user_data: {
            ...userData,
            client_user_agent: data.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : ''),
            fbp: finalFbp,
            fbc: finalFbc,
         },
         custom_data: customData,
      };

      let serverResult;
      try {
         const response = await fetch('/api/event', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(serverEventData),
         });

         if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to send Lead event to CAPI:', errorData);
            serverResult = {success: false, error: errorData};
         } else {
            serverResult = await response.json();
            console.log('Lead event sent successfully:', eventId);
         }
      } catch (error) {
         console.error('Error sending lead to server:', error);
         serverResult = {success: false, error};
      }

      return {
         success: true,
         eventId,
         pixelResult,
         serverResult,
      };
   } catch (error) {
      console.error('Error in trackLead:', error);
      return {
         success: false,
         eventId: '',
         error,
      };
   }
}

export async function trackSimpleLead(
   name: string,
   email: string,
   phone: string,
   formName: string,
   additionalData?: Partial<LeadData>,
): Promise<LeadTrackingResult> {
   return trackLead({
      name,
      email,
      phone,
      formName,
      formType: 'contact',
      ...additionalData,
   });
}
