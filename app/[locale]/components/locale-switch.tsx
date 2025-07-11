'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/navigation';
import {ChangeEvent} from 'react'; // Import ChangeEvent for the select handler

export default function LocaleSwitch() {
   const locale = useLocale(); // Current active locale (e.g., 'en', 'pt-BR')
   const router = useRouter();
   const basePath = usePathname(); // Current path without locale prefix (e.g., '/', '/about')

   // Define available locales and their display names
   const availableLocales = [
      {code: 'pt-BR', name: 'Português (Brasil)'},
      {code: 'en', name: 'English'},
      {code: 'es', name: 'Español'},
   ] as const;

   const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const newLocale = event.target.value;
      router.replace(basePath, {locale: newLocale});
   };

   return (
      <div className="relative inline-block text-left">
         <select
            value={locale}
            onChange={handleLocaleChange}
            className="text-sm font-medium text-text-primary bg-background-secondary border border-border-primary rounded-md shadow-sm px-3 py-2 hover:bg-background-tertiary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            aria-label="Change language"
         >
            {availableLocales.map((loc) => (
               <option className='text-black' key={loc.code} value={loc.code}>
                  {loc.name}
               </option>
            ))}
         </select>
      </div>
   );
}
