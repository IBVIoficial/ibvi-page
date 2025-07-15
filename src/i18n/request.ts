import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
   // requestLocale is a Promise from next-intl so we need to await it
   let locale = await requestLocale;

   if (!locale || !routing.locales.includes(locale as any)) {
      locale = routing.defaultLocale;
   }

   return {
      locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
   };
});
