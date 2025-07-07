export const getFbpCookie = (): string | null => {
   if (typeof window === 'undefined') return null;
   const match = document.cookie.match(/_fbp=([^;]+)/);
   return match ? match[1] : null;
};

export const getFbcFromUrl = (): string | null => {
   if (typeof window === 'undefined') return null;
   const urlParams = new URLSearchParams(window.location.search);
   const fbclid = urlParams.get('fbclid');
   if (!fbclid) return null;
   const timestamp = Math.floor(Date.now() / 1000);
   return `fb.1.${timestamp}.${fbclid}`;
};

export const generateEventId = (prefix: string = 'event'): string => {
   return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const formatPhoneForMeta = (phoneNumber: string, countryCode: string): string => {
   const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
   const cleanedCountryCode = countryCode.replace('+', '');
   return cleanedCountryCode + cleanedPhoneNumber;
};

export const getClientInfo = () => {
   if (typeof window === 'undefined') return {};

   return {
      client_user_agent: navigator.userAgent,
      fbp: getFbpCookie(),
      fbc: getFbcFromUrl(),
   };
};
