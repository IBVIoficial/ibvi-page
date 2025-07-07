// meta-conversions-api.ts
import crypto from 'crypto';

interface UserData {
   em?: string | null; // Email
   ph?: string | null; // Phone
   fn?: string | null; // First name
   ln?: string | null; // Last name
   db?: string | null; // Date of birth (YYYYMMDD)
   ge?: string | null; // Gender (f/m)
   ct?: string | null; // City
   st?: string | null; // State
   zp?: string | null; // Zip code
   country?: string | null; // Country
   external_id?: string | null;
   client_ip_address?: string | null;
   client_user_agent?: string | null;
   fbp?: string | null;
   fbc?: string | null;
   subscription_id?: string | null;
   fb_login_id?: number | null;
   lead_id?: number | null;
   anon_id?: string | null;
   madid?: string | null;
   page_id?: string | null;
   page_scoped_user_id?: string | null;
   ctwa_clid?: string | null;
   ig_account_id?: string | null;
   ig_sid?: string | null;
}

interface EventData {
   event_name: string;
   event_time: number;
   action_source: string;
   event_source_url?: string;
   user_data: UserData;
   custom_data?: Record<string, any>;
   event_id?: string;
   data_processing_options?: string[];
   data_processing_options_country?: number;
   data_processing_options_state?: number;
}

function hashDataMeta(data: string | null | undefined): string | null {
   if (!data) return null;
   return crypto.createHash('sha256').update(data).digest('hex');
}

// Normalização conforme documentação do Meta
function normalizeEmail(email: string | null | undefined): string | null {
   if (!email) return null;
   return email.toLowerCase().trim();
}

function normalizePhone(phone: string | null | undefined): string | null {
   if (!phone) return null;
   // Remove todos os não-dígitos
   let normalized = phone.replace(/\D/g, '');
   // Remove zeros à esquerda
   normalized = normalized.replace(/^0+/, '');
   return normalized;
}

function normalizeName(name: string | null | undefined): string | null {
   if (!name) return null;
   // Converte para minúsculas e remove pontuação
   return name
      .toLowerCase()
      .replace(/[^\p{L}\s]/gu, '')
      .trim();
}

function normalizeGender(gender: string | null | undefined): string | null {
   if (!gender) return null;
   const g = gender.toLowerCase().trim();
   if (g === 'f' || g === 'female' || g === 'feminino') return 'f';
   if (g === 'm' || g === 'male' || g === 'masculino') return 'm';
   return null;
}

function normalizeCity(city: string | null | undefined): string | null {
   if (!city) return null;
   return city
      .toLowerCase()
      .replace(/[^\p{L}]/gu, '')
      .trim();
}

function normalizeState(state: string | null | undefined): string | null {
   if (!state) return null;
   return state
      .toLowerCase()
      .replace(/[^a-z]/g, '')
      .substring(0, 2);
}

function normalizeZipCode(zip: string | null | undefined): string | null {
   if (!zip) return null;
   // Remove espaços e traços, apenas os primeiros 5 dígitos para US
   return zip.toLowerCase().replace(/[\s-]/g, '').substring(0, 5);
}

function normalizeCountry(country: string | null | undefined): string | null {
   if (!country) return null;
   // Código ISO 3166-1 alfa-2 em minúsculas
   return country.toLowerCase().substring(0, 2);
}

function normalizeDateOfBirth(dob: string | null | undefined): string | null {
   if (!dob) return null;
   // Espera formato YYYYMMDD
   const cleaned = dob.replace(/\D/g, '');
   if (cleaned.length !== 8) return null;
   return cleaned;
}

export async function sendServerEventMeta(eventData: EventData) {
   const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
   const ACCESS_TOKEN = process.env.NEXT_PUBLIC_META_ACCESS_TOKEN;

   if (!PIXEL_ID || !ACCESS_TOKEN) {
      console.error('Meta Pixel ID or Access Token is not configured for Server-Side API.');
      return {success: false, error: 'Missing Pixel ID or Access Token configuration.'};
   }

   const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

   // Normalizar e fazer hash dos dados conforme documentação
   const normalizedUserData: UserData = {
      // Campos que devem ser hasheados
      em: hashDataMeta(normalizeEmail(eventData.user_data.em)),
      ph: hashDataMeta(normalizePhone(eventData.user_data.ph)),
      fn: hashDataMeta(normalizeName(eventData.user_data.fn)),
      ln: hashDataMeta(normalizeName(eventData.user_data.ln)),
      db: hashDataMeta(normalizeDateOfBirth(eventData.user_data.db)),
      ge: hashDataMeta(normalizeGender(eventData.user_data.ge)),
      ct: hashDataMeta(normalizeCity(eventData.user_data.ct)),
      st: hashDataMeta(normalizeState(eventData.user_data.st)),
      zp: hashDataMeta(normalizeZipCode(eventData.user_data.zp)),
      country: hashDataMeta(normalizeCountry(eventData.user_data.country)),

      // Campos que NÃO devem ser hasheados
      external_id: eventData.user_data.external_id || null,
      client_ip_address: eventData.user_data.client_ip_address || null,
      client_user_agent: eventData.user_data.client_user_agent || null,
      fbp: eventData.user_data.fbp || null,
      fbc: eventData.user_data.fbc || null,
      subscription_id: eventData.user_data.subscription_id || null,
      fb_login_id: eventData.user_data.fb_login_id || null,
      lead_id: eventData.user_data.lead_id || null,
      anon_id: eventData.user_data.anon_id || null,
      madid: eventData.user_data.madid || null,
      page_id: eventData.user_data.page_id || null,
      page_scoped_user_id: eventData.user_data.page_scoped_user_id || null,
      ctwa_clid: eventData.user_data.ctwa_clid || null,
      ig_account_id: eventData.user_data.ig_account_id || null,
      ig_sid: eventData.user_data.ig_sid || null,
   };

   // Remover campos null/undefined
   Object.keys(normalizedUserData).forEach((key) => {
      if (normalizedUserData[key as keyof UserData] === null || normalizedUserData[key as keyof UserData] === undefined) {
         delete normalizedUserData[key as keyof UserData];
      }
   });

   const payload = {
      data: [
         {
            event_name: eventData.event_name,
            event_time: eventData.event_time,
            action_source: eventData.action_source,
            event_source_url: eventData.event_source_url,
            user_data: normalizedUserData,
            custom_data: eventData.custom_data,
            event_id: eventData.event_id, // Para deduplicação
            data_processing_options: eventData.data_processing_options || [],
            data_processing_options_country: eventData.data_processing_options_country || 0,
            data_processing_options_state: eventData.data_processing_options_state || 0,
         },
      ],
   };

   try {
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
         console.error('Error sending event to Meta Conversions API:', responseData);
         return {success: false, error: responseData.error?.message || 'API Error', details: responseData};
      }

      console.log('Successfully sent event to Meta Conversions API:', {
         event_name: eventData.event_name,
         event_id: eventData.event_id,
         response: responseData,
      });

      return {success: true, data: responseData};
   } catch (error) {
      console.error('Network or other error sending event to Meta Conversions API:', error);
      if (error instanceof Error) {
         return {success: false, error: error.message};
      }
      return {success: false, error: 'Unknown error'};
   }
}

// Exemplo de uso atualizado
/*
async function sendLeadEventExample() {
  const leadEventData: EventData = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: 'https://yourdomain.com/thank-you-page',
    user_data: {
      em: 'testuser@example.com',
      ph: '5511999998888', // Com código do país
      fn: 'Test',
      ln: 'User',
      country: 'br',
      client_ip_address: '123.123.123.123',
      client_user_agent: 'Mozilla/5.0...',
      fbp: 'fb.1.1558571054389.1098115397',
      fbc: 'fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890',
    },
    custom_data: {
      content_name: 'Lead Form XYZ',
      value: 50,
      currency: 'BRL',
      status: 'new_lead',
    },
    event_id: `lead_${Date.now()}` // ID único para deduplicação
  };
  
  await sendServerEventMeta(leadEventData);
}
*/
