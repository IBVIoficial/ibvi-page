import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
   // Only three locales are served
   locales: ['pt-BR', 'en', 'es'],
   defaultLocale: 'pt-BR',

   // URL prefix only for EN / ES
   localePrefix: 'as-needed',

   // Disable implicit redirects; switch only via explicit prefix or click
   localeDetection: false,

   // hreflang headers for SEO
   alternateLinks: true,
});
