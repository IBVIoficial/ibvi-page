export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '4943944062283476';

export const pageview = () => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
   }
};

export const event = (name: string, options = {}) => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', name, options);
   }
};

export const init = () => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('init', FB_PIXEL_ID);
   }
};

export const lead = (customData: any = {}, userData: any = {}) => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', customData, {
         eventID: customData.event_id || `lead_${Date.now()}`,
      });
   }
};

export const viewContent = (customData: any = {}) => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', customData);
   }
};

export const addToCart = (customData: any = {}) => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', customData);
   }
};

export const initiateCheckout = (customData: any = {}) => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', customData);
   }
};

export const purchase = (customData: any = {}) => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', customData);
   }
};

export const completeRegistration = (customData: any = {}) => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', customData);
   }
};

export const contact = (customData: any = {}) => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', customData);
   }
};

export const schedule = (customData: any = {}) => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Schedule', customData);
   }
};

export const submitApplication = (customData: any = {}) => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'SubmitApplication', customData);
   }
};

export const search = (customData: any = {}) => {
   if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Search', customData);
   }
};
