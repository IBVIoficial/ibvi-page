// src/types/meta-pixel.ts

// Tipos para o window object com fbq
declare global {
   interface Window {
      fbq: any;
      dataLayer: any[];
   }
}

// Tipos de dados do usuário conforme documentação do Meta
export interface MetaUserData {
   // Campos que devem ser hasheados
   em?: string | null; // Email
   ph?: string | null; // Phone number
   fn?: string | null; // First name
   ln?: string | null; // Last name
   db?: string | null; // Date of birth (YYYYMMDD)
   ge?: string | null; // Gender (f/m)
   ct?: string | null; // City
   st?: string | null; // State
   zp?: string | null; // Zip code
   country?: string | null; // Country (ISO 3166-1 alpha-2)

   // Campos que NÃO devem ser hasheados
   external_id?: string | null;
   client_ip_address?: string | null;
   client_user_agent?: string | null;
   fbp?: string | null; // Facebook browser ID
   fbc?: string | null; // Facebook click ID
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

// Dados customizados do evento
export interface MetaCustomData {
   value?: number;
   currency?: string;
   content_name?: string;
   content_category?: string;
   content_ids?: string[];
   contents?: Array<{
      id: string;
      quantity?: number;
      price?: number;
   }>;
   content_type?: string;
   order_id?: string;
   predicted_ltv?: number;
   num_items?: number;
   status?: string;
   search_string?: string;
   [key: string]: any; // Permite campos customizados adicionais
}

// Estrutura completa do evento
export interface MetaEventData {
   event_name: string;
   event_time: number; // Unix timestamp
   action_source: 'website' | 'app' | 'email' | 'chat' | 'phone_call' | 'physical_store' | 'system_generated' | 'other';
   event_source_url?: string;
   user_data: MetaUserData;
   custom_data?: MetaCustomData;
   event_id?: string; // Para deduplicação
   data_processing_options?: string[];
   data_processing_options_country?: number;
   data_processing_options_state?: number;
   opt_out?: boolean;
}

// Tipos de eventos padrão do Meta
export type MetaStandardEvents =
   | 'AddPaymentInfo'
   | 'AddToCart'
   | 'AddToWishlist'
   | 'CompleteRegistration'
   | 'Contact'
   | 'CustomizeProduct'
   | 'Donate'
   | 'FindLocation'
   | 'InitiateCheckout'
   | 'Lead'
   | 'PageView'
   | 'Purchase'
   | 'Schedule'
   | 'Search'
   | 'StartTrial'
   | 'SubmitApplication'
   | 'Subscribe'
   | 'ViewContent';

// Resposta da API
export interface MetaApiResponse {
   events_received?: number;
   messages?: string[];
   fbtrace_id?: string;
   error?: {
      message: string;
      type: string;
      code: number;
      error_subcode?: number;
      fbtrace_id?: string;
   };
}
