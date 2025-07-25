export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '';

export const pageview = () => {
   if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
   }
};

export const initWithUserData = (userData: Record<string, any>) => {
   if (typeof window !== 'undefined' && (window as any).fbq && FB_PIXEL_ID) {
      (window as any).fbq('init', FB_PIXEL_ID, userData);
   }
};

export const lead = (customData: Record<string, any> = {}, options: {eventID?: string} = {}) => {
   if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', customData, {eventID: options.eventID});
   }
};

export const event = (name: string, options: Record<string, any> = {}) => {
   if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', name, options);
   }
};

export const getFbcFbp = (): {fbc: string | null; fbp: string | null} => {
   if (typeof document === 'undefined') {
      return {fbc: null, fbp: null};
   }

   const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
         return parts.pop()?.split(';').shift() || null;
      }
      return null;
   };

   const fbc = getCookie('_fbc');
   const fbp = getCookie('_fbp');

   return {fbc, fbp};
};
