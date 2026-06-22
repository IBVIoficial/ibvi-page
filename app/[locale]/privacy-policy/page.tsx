'use client';

import {useTranslations} from 'next-intl';
import {useEffect} from 'react';

export default function PrivacyPolicy() {
   const t = useTranslations('privacyPolicy');

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return (
      <div className="bg-surface-primary min-h-screen">
         {/* Hero Section */}
         <section className="relative bg-gradient-to-br from-[#005a6b] to-[#003840] text-white pt-20 pb-10">
            <div className="max-w-4xl mx-auto px-6">
               <h1 className="font-inter text-4xl md:text-5xl font-bold text-white mb-3">{t('title')}</h1>
               <p className="font-inter text-lg text-[#cdeef5]">
                  {t('lastUpdated')}: {t('updateDate')}
               </p>
            </div>
         </section>

         {/* Content Section */}
         <section className="max-w-4xl mx-auto px-6 pt-10 pb-16">
            <div className="prose prose-lg max-w-none">
               {/* Introduction */}
               <div className="mb-12">
                  <h2 className="font-inter text-3xl font-bold text-[#005a6b] mb-4">{t('intro.title')}</h2>
                  <p className="text-text-secondary leading-relaxed">{t('intro.content')}</p>
               </div>

               {/* Data Collection */}
               <div className="mb-12">
                  <h2 className="font-inter text-3xl font-bold text-[#005a6b] mb-4">{t('dataCollected.title')}</h2>
                  <p className="text-text-secondary mb-4">{t('dataCollected.intro')}</p>
                  <ul className="space-y-3">
                     <li className="flex items-start">
                        <span className="text-[#00758f] mr-3 mt-1">•</span>
                        <div>
                           <strong className="text-text-primary">{t('dataCollected.registration.title')}:</strong>{' '}
                           <span className="text-text-secondary">{t('dataCollected.registration.content')}</span>
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="text-[#00758f] mr-3 mt-1">•</span>
                        <div>
                           <strong className="text-text-primary">{t('dataCollected.location.title')}:</strong>{' '}
                           <span className="text-text-secondary">{t('dataCollected.location.content')}</span>
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="text-[#00758f] mr-3 mt-1">•</span>
                        <div>
                           <strong className="text-text-primary">{t('dataCollected.usage.title')}:</strong>{' '}
                           <span className="text-text-secondary">{t('dataCollected.usage.content')}</span>
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="text-[#00758f] mr-3 mt-1">•</span>
                        <div>
                           <strong className="text-text-primary">{t('dataCollected.technical.title')}:</strong>{' '}
                           <span className="text-text-secondary">{t('dataCollected.technical.content')}</span>
                        </div>
                     </li>
                  </ul>
               </div>

               {/* How We Use Data */}
               <div className="mb-12">
                  <h2 className="font-inter text-3xl font-bold text-[#005a6b] mb-4">{t('dataUsage.title')}</h2>
                  <p className="text-text-secondary mb-4">{t('dataUsage.intro')}</p>
                  <ul className="space-y-2">
                     {[1, 2, 3, 4, 5, 6].map((i) => (
                        <li key={i} className="flex items-start">
                           <span className="text-[#00758f] mr-3">•</span>
                           <span className="text-text-secondary">{t(`dataUsage.items.${i}`)}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Data Sharing */}
               <div className="mb-12">
                  <h2 className="font-inter text-3xl font-bold text-[#005a6b] mb-4">{t('dataSharing.title')}</h2>
                  <p className="text-text-secondary mb-4">{t('dataSharing.intro')}</p>
                  <ul className="space-y-2">
                     {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start">
                           <span className="text-[#00758f] mr-3">•</span>
                           <span className="text-text-secondary">{t(`dataSharing.items.${i}`)}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Storage and Security */}
               <div className="mb-12">
                  <h2 className="font-inter text-3xl font-bold text-[#005a6b] mb-4">{t('security.title')}</h2>
                  <p className="text-text-secondary leading-relaxed">{t('security.content')}</p>
               </div>

               {/* Your Rights (LGPD) */}
               <div className="mb-12 bg-[#e0f4f8] p-8 rounded-lg border-l-4 border-[#00758f]">
                  <h2 className="font-inter text-3xl font-bold text-[#005a6b] mb-4">{t('rights.title')}</h2>
                  <p className="text-text-secondary mb-4">{t('rights.intro')}</p>
                  <ul className="space-y-2">
                     {[1, 2, 3, 4, 5].map((i) => (
                        <li key={i} className="flex items-start">
                           <span className="text-[#00758f] mr-3">•</span>
                           <span className="text-text-secondary">{t(`rights.items.${i}`)}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Data Retention */}
               <div className="mb-12">
                  <h2 className="font-inter text-3xl font-bold text-[#005a6b] mb-4">{t('retention.title')}</h2>
                  <p className="text-text-secondary leading-relaxed">{t('retention.content')}</p>
               </div>

               {/* Third-Party Services */}
               <div className="mb-12">
                  <h2 className="font-inter text-3xl font-bold text-[#005a6b] mb-4">{t('thirdParty.title')}</h2>
                  <p className="text-text-secondary mb-4">{t('thirdParty.intro')}</p>
                  <ul className="space-y-2">
                     {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start">
                           <span className="text-[#00758f] mr-3">•</span>
                           <span className="text-text-secondary">{t(`thirdParty.items.${i}`)}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Minors */}
               <div className="mb-12">
                  <h2 className="font-inter text-3xl font-bold text-[#005a6b] mb-4">{t('minors.title')}</h2>
                  <p className="text-text-secondary leading-relaxed">{t('minors.content')}</p>
               </div>

               {/* Policy Changes */}
               <div className="mb-12">
                  <h2 className="font-inter text-3xl font-bold text-[#005a6b] mb-4">{t('changes.title')}</h2>
                  <p className="text-text-secondary leading-relaxed">{t('changes.content')}</p>
               </div>

               {/* Contact */}
               <div className="mb-12 bg-surface-secondary p-8 rounded-lg">
                  <h2 className="font-inter text-3xl font-bold text-[#005a6b] mb-4">{t('contact.title')}</h2>
                  <p className="text-text-secondary mb-4">{t('contact.intro')}</p>
                  <div className="space-y-2">
                     <p className="text-text-secondary">
                        <strong>{t('contact.email')}:</strong> privacidade@ibvi.com.br
                     </p>
                     <p className="text-text-secondary">
                        <strong>{t('contact.website')}:</strong> ibvi.com.br
                     </p>
                  </div>
               </div>

               {/* Footer */}
               <div className="text-center pt-8 border-t border-border-default">
                  <p className="text-text-muted text-sm">© 2025 MBRAS/IBVI. {t('footer')}</p>
               </div>
            </div>
         </section>
      </div>
   );
}
