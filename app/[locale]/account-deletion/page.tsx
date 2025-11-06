'use client';

import {useTranslations} from 'next-intl';
import {useEffect} from 'react';
import {AlertTriangle, Trash2, Mail, Smartphone, Clock, ShieldAlert} from 'lucide-react';

export default function AccountDeletion() {
   const t = useTranslations('accountDeletion');

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return (
      <div className="bg-surface-primary min-h-screen">
         {/* Hero Section */}
         <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
            <div className="max-w-4xl mx-auto px-6">
               <div className="flex items-center gap-4 mb-4">
                  <Trash2 className="w-12 h-12" />
                  <h1 className="text-4xl md:text-5xl font-bold">{t('title')}</h1>
               </div>
               <div className="bg-red-900/50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex items-start gap-3">
                     <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                     <p className="text-lg">{t('warning')}</p>
                  </div>
               </div>
            </div>
         </section>

         {/* Content Section */}
         <section className="max-w-4xl mx-auto px-6 py-16">
            {/* What Will Be Deleted */}
            <div className="mb-12">
               <h2 className="text-3xl font-bold text-text-primary mb-6">{t('whatDeleted.title')}</h2>
               <p className="text-text-secondary mb-6">{t('whatDeleted.intro')}</p>
               <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                     <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                        <Trash2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                        <span className="text-text-secondary">{t(`whatDeleted.items.${i}`)}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* How to Delete */}
            <div className="mb-12">
               <h2 className="text-3xl font-bold text-text-primary mb-6">{t('howToDelete.title')}</h2>

               {/* Method 1: App */}
               <div className="mb-8 p-6 bg-ibvi-teal-50 rounded-lg border border-ibvi-teal-200">
                  <div className="flex items-center gap-3 mb-4">
                     <Smartphone className="w-6 h-6 text-ibvi-teal-700" />
                     <h3 className="text-2xl font-bold text-ibvi-teal-700">{t('howToDelete.method1.title')}</h3>
                  </div>
                  <ol className="space-y-3">
                     {[1, 2, 3, 4, 5].map((i) => (
                        <li key={i} className="flex items-start gap-3">
                           <span className="flex-shrink-0 w-6 h-6 bg-ibvi-teal-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {i}
                           </span>
                           <span className="text-text-secondary pt-0.5">{t(`howToDelete.method1.steps.${i}`)}</span>
                        </li>
                     ))}
                  </ol>
               </div>

               {/* Method 2: Email */}
               <div className="p-6 bg-surface-secondary rounded-lg border border-border-default">
                  <div className="flex items-center gap-3 mb-4">
                     <Mail className="w-6 h-6 text-ibvi-teal-700" />
                     <h3 className="text-2xl font-bold text-ibvi-teal-700">{t('howToDelete.method2.title')}</h3>
                  </div>
                  <ol className="space-y-3">
                     <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-ibvi-teal-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                           1
                        </span>
                        <div className="pt-0.5">
                           <span className="text-text-secondary">{t('howToDelete.method2.step1.text')}: </span>
                           <a href="mailto:contato@ibvi.com.br" className="text-ibvi-teal-700 font-semibold hover:underline">
                              contato@ibvi.com.br
                           </a>
                        </div>
                     </li>
                     <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-ibvi-teal-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                           2
                        </span>
                        <div className="pt-0.5">
                           <span className="text-text-secondary">{t('howToDelete.method2.step2.text')}: </span>
                           <span className="font-semibold text-text-primary">"{t('howToDelete.method2.step2.subject')}"</span>
                        </div>
                     </li>
                     <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-ibvi-teal-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                           3
                        </span>
                        <div className="pt-0.5">
                           <p className="text-text-secondary mb-2">{t('howToDelete.method2.step3.text')}:</p>
                           <ul className="ml-4 space-y-1">
                              <li className="text-text-secondary">• {t('howToDelete.method2.step3.items.1')}</li>
                              <li className="text-text-secondary">• {t('howToDelete.method2.step3.items.2')}</li>
                              <li className="text-text-secondary">• {t('howToDelete.method2.step3.items.3')}</li>
                           </ul>
                        </div>
                     </li>
                     <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-ibvi-teal-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                           4
                        </span>
                        <span className="text-text-secondary pt-0.5">{t('howToDelete.method2.step4')}</span>
                     </li>
                  </ol>
               </div>
            </div>

            {/* Timeline */}
            <div className="mb-12 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
               <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-yellow-700" />
                  <h2 className="text-3xl font-bold text-yellow-700">{t('timeline.title')}</h2>
               </div>
               <p className="text-text-secondary mb-4">{t('timeline.intro')}</p>
               <ul className="space-y-2">
                  {[1, 2, 3].map((i) => (
                     <li key={i} className="flex items-start">
                        <span className="text-yellow-600 mr-3">•</span>
                        <span className="text-text-secondary">{t(`timeline.items.${i}`)}</span>
                     </li>
                  ))}
               </ul>
            </div>

            {/* Data Retained */}
            <div className="mb-12">
               <div className="flex items-center gap-3 mb-4">
                  <ShieldAlert className="w-6 h-6 text-ibvi-teal-700" />
                  <h2 className="text-3xl font-bold text-ibvi-teal-700">{t('dataRetained.title')}</h2>
               </div>
               <p className="text-text-secondary mb-4">{t('dataRetained.intro')}</p>
               <ul className="space-y-3">
                  {[1, 2, 3].map((i) => (
                     <li key={i} className="flex items-start">
                        <span className="text-ibvi-teal-500 mr-3">•</span>
                        <span className="text-text-secondary">{t(`dataRetained.items.${i}`)}</span>
                     </li>
                  ))}
               </ul>
            </div>

            {/* Help Section */}
            <div className="p-8 bg-gradient-to-br from-ibvi-teal-50 to-ibvi-teal-100 rounded-lg border border-ibvi-teal-200">
               <h2 className="text-3xl font-bold text-ibvi-teal-700 mb-4">{t('help.title')}</h2>
               <p className="text-text-secondary mb-4">{t('help.intro')}</p>
               <div className="space-y-2">
                  <p className="text-text-secondary">
                     <strong>{t('help.email')}:</strong>{' '}
                     <a href="mailto:contato@ibvi.com.br" className="text-ibvi-teal-700 hover:underline">
                        contato@ibvi.com.br
                     </a>
                  </p>
                  <p className="text-text-secondary">
                     <strong>{t('help.website')}:</strong>{' '}
                     <a href="https://ibvi.com.br" className="text-ibvi-teal-700 hover:underline">
                        ibvi.com.br
                     </a>
                  </p>
               </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-8 mt-8 border-t border-border-default">
               <p className="text-text-muted text-sm">
                  <a href="/privacy-policy" className="text-ibvi-teal-700 hover:underline">
                     {t('footer.privacyPolicy')}
                  </a>{' '}
                  | © 2025 MBRAS/IBVI. {t('footer.rights')}
               </p>
            </div>
         </section>
      </div>
   );
}
