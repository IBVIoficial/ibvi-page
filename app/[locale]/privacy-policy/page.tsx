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
         <section className="relative bg-gradient-to-br from-ibvi-teal-700 to-ibvi-teal-900 text-white py-20">
            <div className="max-w-4xl mx-auto px-6">
               <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
               <p className="text-lg text-ibvi-teal-100">
                  {t('lastUpdated')}: {t('updateDate')}
               </p>
            </div>
         </section>

         {/* Content Section */}
         <section className="max-w-4xl mx-auto px-6 py-16">
            <div className="prose prose-lg max-w-none">
               {/* Introduction */}
               <div className="mb-12">
                  <h2 className="text-3xl font-bold text-ibvi-teal-700 mb-4">{t('intro.title')}</h2>
                  <p className="text-text-secondary leading-relaxed">{t('intro.content')}</p>
               </div>

               {/* Data Collection */}
               <div className="mb-12">
                  <h2 className="text-3xl font-bold text-ibvi-teal-700 mb-4">{t('dataCollected.title')}</h2>
                  <p className="text-text-secondary mb-4">{t('dataCollected.intro')}</p>
                  <ul className="space-y-3">
                     <li className="flex items-start">
                        <span className="text-ibvi-teal-500 mr-3 mt-1">•</span>
                        <div>
                           <strong className="text-text-primary">{t('dataCollected.registration.title')}:</strong>{' '}
                           <span className="text-text-secondary">{t('dataCollected.registration.content')}</span>
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="text-ibvi-teal-500 mr-3 mt-1">•</span>
                        <div>
                           <strong className="text-text-primary">{t('dataCollected.location.title')}:</strong>{' '}
                           <span className="text-text-secondary">{t('dataCollected.location.content')}</span>
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="text-ibvi-teal-500 mr-3 mt-1">•</span>
                        <div>
                           <strong className="text-text-primary">{t('dataCollected.usage.title')}:</strong>{' '}
                           <span className="text-text-secondary">{t('dataCollected.usage.content')}</span>
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="text-ibvi-teal-500 mr-3 mt-1">•</span>
                        <div>
                           <strong className="text-text-primary">{t('dataCollected.technical.title')}:</strong>{' '}
                           <span className="text-text-secondary">{t('dataCollected.technical.content')}</span>
                        </div>
                     </li>
                  </ul>
               </div>

               {/* How We Use Data */}
               <div className="mb-12">
                  <h2 className="text-3xl font-bold text-ibvi-teal-700 mb-4">{t('dataUsage.title')}</h2>
                  <p className="text-text-secondary mb-4">{t('dataUsage.intro')}</p>
                  <ul className="space-y-2">
                     {[1, 2, 3, 4, 5, 6].map((i) => (
                        <li key={i} className="flex items-start">
                           <span className="text-ibvi-teal-500 mr-3">•</span>
                           <span className="text-text-secondary">{t(`dataUsage.items.${i}`)}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Data Sharing */}
               <div className="mb-12">
                  <h2 className="text-3xl font-bold text-ibvi-teal-700 mb-4">{t('dataSharing.title')}</h2>
                  <p className="text-text-secondary mb-4">{t('dataSharing.intro')}</p>
                  <ul className="space-y-2">
                     {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start">
                           <span className="text-ibvi-teal-500 mr-3">•</span>
                           <span className="text-text-secondary">{t(`dataSharing.items.${i}`)}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Storage and Security */}
               <div className="mb-12">
                  <h2 className="text-3xl font-bold text-ibvi-teal-700 mb-4">{t('security.title')}</h2>
                  <p className="text-text-secondary leading-relaxed">{t('security.content')}</p>
               </div>

               {/* Your Rights (LGPD) */}
               <div className="mb-12 bg-ibvi-teal-50 p-8 rounded-lg border-l-4 border-ibvi-teal-500">
                  <h2 className="text-3xl font-bold text-ibvi-teal-700 mb-4">{t('rights.title')}</h2>
                  <p className="text-text-secondary mb-4">{t('rights.intro')}</p>
                  <ul className="space-y-2">
                     {[1, 2, 3, 4, 5].map((i) => (
                        <li key={i} className="flex items-start">
                           <span className="text-ibvi-teal-500 mr-3">•</span>
                           <span className="text-text-secondary">{t(`rights.items.${i}`)}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Data Retention */}
               <div className="mb-12">
                  <h2 className="text-3xl font-bold text-ibvi-teal-700 mb-4">{t('retention.title')}</h2>
                  <p className="text-text-secondary leading-relaxed">{t('retention.content')}</p>
               </div>

               {/* Third-Party Services */}
               <div className="mb-12">
                  <h2 className="text-3xl font-bold text-ibvi-teal-700 mb-4">{t('thirdParty.title')}</h2>
                  <p className="text-text-secondary mb-4">{t('thirdParty.intro')}</p>
                  <ul className="space-y-2">
                     {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start">
                           <span className="text-ibvi-teal-500 mr-3">•</span>
                           <span className="text-text-secondary">{t(`thirdParty.items.${i}`)}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Minors */}
               <div className="mb-12">
                  <h2 className="text-3xl font-bold text-ibvi-teal-700 mb-4">{t('minors.title')}</h2>
                  <p className="text-text-secondary leading-relaxed">{t('minors.content')}</p>
               </div>

               {/* Policy Changes */}
               <div className="mb-12">
                  <h2 className="text-3xl font-bold text-ibvi-teal-700 mb-4">{t('changes.title')}</h2>
                  <p className="text-text-secondary leading-relaxed">{t('changes.content')}</p>
               </div>

               {/* Contact */}
               <div className="mb-12 bg-surface-secondary p-8 rounded-lg">
                  <h2 className="text-3xl font-bold text-ibvi-teal-700 mb-4">{t('contact.title')}</h2>
                  <p className="text-text-secondary mb-4">{t('contact.intro')}</p>
                  <div className="space-y-2">
                     <p className="text-text-secondary">
                        <strong>{t('contact.email')}:</strong> contato@ibvi.com.br
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
