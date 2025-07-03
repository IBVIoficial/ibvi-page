declare global {
  interface Window {
    fbq: any;
    dataLayer: any[];
    _fbq: any;
  }
}

export interface MetaUserData {
  em?: string | null;
  ph?: string | null;
  fn?: string | null;
  ln?: string | null;
  db?: string | null;
  ge?: string | null;
  ct?: string | null;
  st?: string | null;
  zp?: string | null;
  country?: string | null;
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
  [key: string]: any;
}

export interface MetaEventData {
  event_name: string;
  event_time: number;
  action_source: 'website' | 'app' | 'email' | 'chat' | 'phone_call' | 'physical_store' | 'system_generated' | 'other';
  event_source_url?: string;
  user_data: MetaUserData;
  custom_data?: MetaCustomData;
  event_id?: string;
  data_processing_options?: string[];
  data_processing_options_country?: number;
  data_processing_options_state?: number;
  opt_out?: boolean;
}

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