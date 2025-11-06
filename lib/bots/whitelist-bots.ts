// lib/whitelist-bots.js
export const knownBots = {
   google: [
      'Googlebot',
      'Googlebot-Image',
      'Googlebot-Video',
      'Googlebot-News',
      'Google-InspectionTool',
      'Google-Extended',
      'APIs-Google',
      'AdsBot-Google',
      'AdsBot-Google-Mobile',
      'Mediapartners-Google',
      'Google-Site-Verification',
   ],
   bing: ['bingbot', 'BingPreview', 'msnbot', 'msnbot-media', 'MicrosoftPreview', 'BinglocSearch'],
   yandex: ['YandexBot', 'YandexImages', 'YandexVideo', 'YandexMedia', 'YandexMobileBot'],
   baidu: ['Baiduspider', 'Baiduspider-image', 'Baiduspider-video', 'Baiduspider-news'],
   duckduckgo: ['DuckDuckBot', 'DuckDuckGo-Favicons-Bot'],
   meta: ['facebookexternalhit', 'InstagramBot', 'WhatsApp'],
   other: ['Applebot', 'Slurp', 'ia_archiver', 'Sogou web spider', 'SeznamBot', 'Exabot', 'Qwantify'],
};

export function isKnownBot(userAgent: string | null): boolean {
   if (!userAgent) return false;
   const Bots = Object.values(knownBots).flat();
   return Bots.some((bot) => userAgent.includes(bot));
}
