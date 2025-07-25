export function getFbpCookie(): string | null {
   const match = document.cookie.match(/_fbp=([^;]+)/);
   return match ? match[1] : null;
}

export function getFbcFromUrl(): string | null {
   const urlParams = new URLSearchParams(window.location.search);
   const fbclid = urlParams.get('fbclid');

   if (!fbclid) return null;

   const timestamp = Math.floor(Date.now() / 1000);
   return `fb.1.${timestamp}.${fbclid}`;
}

export function getFBP(): string | null {
   if (typeof document === 'undefined') return null;
   return getFbpCookie();
}

export function generateFBC(): string | null {
   if (typeof window === 'undefined') return null;
   return getFbcFromUrl();
}
