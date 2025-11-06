import * as z from 'zod';
import * as fbq from '@/lib/meta-pixel/meta-pixel';
// import {getFbcFbp} from '@/lib/meta-pixel/meta-pixel';

import {useState, useEffect} from 'react';
import {toast} from 'sonner';
// import {EventData} from '@/interface/meta';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {sendServerEventMeta} from '@/lib/meta-pixel/meta-conversions-api';
import useUserLocation from '@/hooks/useUserLocation';

declare const gtag: (...args: any[]) => void;

const formSchema = z.object({
   ref: z.string().optional(),
   pageUrl: z.string().optional(),
   title: z.string().optional(),
   name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
   email: z.string().email('E-mail inválido'),
   whatsapp: z.string().min(10, 'Telefone inválido (inclua DDD)'),
   city: z.string().optional(),
   neighborhood: z.string().min(2, 'Bairro deve ter pelo menos 2 caracteres'),
   message: z.string().optional(),
   commercial_neighborhood: z.string().optional(),
});

export type FormAdvertiseSchema = z.infer<typeof formSchema>;

interface useFormLogicOptions {
   customFormId?: string;
   defaultValues?: Partial<FormAdvertiseSchema>;
}

export function useFormLogic(options?: useFormLogicOptions) {
   const location = useUserLocation();
   const form = useForm<FormAdvertiseSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: options?.defaultValues || {
         ref: '',
         pageUrl: '',
         title: '',
         name: '',
         email: '',
         whatsapp: '',
         city: '',
         neighborhood: '',
         message: '',
         commercial_neighborhood: '',
      },
   });

   const [sent, setSent] = useState(false);
   const [pageUrl, setPageUrl] = useState('');
   const [pageTitle, setPageTitle] = useState('');
   const formId = options?.customFormId || process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID_LISTING || 'defaultFormId';

   useEffect(() => {
      if (typeof window !== 'undefined') {
         setPageUrl(window.location.href);
         setPageTitle(document.title);
      }
   }, []);

   if (!options?.customFormId && !process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID_LISTING) {
      console.error('Formspree Form ID is not set in environment variables or provided as customFormId');
   }

   async function onSubmit(values: FormAdvertiseSchema): Promise<boolean> {
      let formspreeSuccess = true;
      let gtmSubmissionSuccess = true;

      const eventId = `evt_advertise_${Date.now()}`;
      const cleanedPhoneNumber = values.whatsapp.replace(/\D/g, '');
      const eventTime = Math.floor(Date.now() / 1000);
      // const {fbc, fbp} = getFbcFbp();
      const {fbc, fbp} = {fbc: null, fbp: null};

      const fbqCustomData = {
         content_name: `Advertise Form: ${pageTitle}`,
         content_category: 'Listing Submission',
         status: 'new_listing_lead',
         value: 0,
         currency: 'BRL',
         form_name: 'Advertise Form',
         page_url: pageUrl,
         page_title: pageTitle,
         listing_address_neighborhood: values.neighborhood,
         listing_message: values.message,
      };

      const fbqUserData = {
         em: values.email,
         ph: cleanedPhoneNumber,
         fn: values.name.split(' ')[0],
         ln: values.name.split(' ').slice(1).join(' '),
         lead_id: eventId,
      };

      const gtmLeadData = {
         event: 'lead',
         form_type: 'advertise_listing',
         form_location: pageTitle,
         user_type: 'seller_prospect',
         listing_neighborhood: values.neighborhood,
         user_provided_data: {
            email: values.email,
            phone_number: cleanedPhoneNumber,
            address: {
               first_name: values.name.split(' ')[0],
               last_name: values.name.split(' ').slice(1).join(' '),
            },
         },
      };

      const gtmSubmitData = {
         event: 'form_submit',
         form_name: 'Advertise Form',
         form_type: 'advertise_listing',
         form_location: pageTitle,
         form_status: 'success',
      };

      try {
         const formspreePayload = {
            ref: values.ref || '',
            pageUrl: values.pageUrl || pageUrl,
            title: values.title || pageTitle,
            name: values.name,
            email: values.email,
            whatsapp: values.whatsapp,
            neighborhood: values.neighborhood,
            commercial_neighborhood: values.commercial_neighborhood || '',
            message: values.message,
            _subject: `Novo Anúncio/Contato: ${pageTitle}`,
            ...(location.latitude && {user_latitude: location.latitude}),
            ...(location.longitude && {user_longitude: location.longitude}),
         };
         const formspreeResponse = await fetch(`https://formspree.io/f/${formId}`, {
            method: 'POST',
            body: JSON.stringify(formspreePayload),
            headers: {'Content-Type': 'application/json'},
         });

         if (!formspreeResponse.ok) {
            formspreeSuccess = false;
            gtmSubmissionSuccess = false;
            console.error('Formspree submission failed:', formspreeResponse.statusText);
            toast.error('Ocorreu um erro ao enviar para o sistema inicial. Tentando registrar interesse...');
         }
      } catch (error) {
         formspreeSuccess = false;
         gtmSubmissionSuccess = false;
         console.error('Error submitting form to Formspree:', error);
         toast.error('Ocorreu um erro ao enviar para o sistema inicial. Tentando registrar interesse...');
      }

      try {
         // fbq.initWithUserData(fbqUserData);
         fbq.lead(fbqCustomData, {eventID: eventId});
      } catch (pixelError) {
         console.error('Error calling fbq.lead for Advertise Form:', pixelError);
      }

      try {
         if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push(gtmLeadData);
            gtmSubmitData.form_status = gtmSubmissionSuccess ? 'success' : 'failure';
            window.dataLayer.push(gtmSubmitData);

            gtag('event', 'conversion', {
               send_to: 'AW-942110045/DVCDCK_quegaEN3qncED',
            });
         } else {
            console.warn('GTM dataLayer not found. Skipping GTM tracking.');
         }
      } catch (gtmError) {
         console.error('Error pushing to GTM dataLayer:', gtmError);
      }

      const serverEventData: any = {
         event_name: 'Lead',
         event_time: eventTime,
         action_source: 'website',
         event_id: eventId,
         event_source_url: pageUrl,
         user_data: {
            em: values.email,
            ph: cleanedPhoneNumber,
            fn: values.name.split(' ')[0],
            ln: values.name.split(' ').slice(1).join(' '),
            lead_id: eventId,
            client_user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
            fbc: fbc,
            fbp: fbp,
         },
         custom_data: {
            ...fbqCustomData,
            lead_source: 'Advertise Form Submission',
         },
      };

      try {
         if (process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && process.env.NEXT_PUBLIC_META_CONVERSION_API_ACCESS_TOKEN) {
            const serverResponse = await sendServerEventMeta(serverEventData);
            if (serverResponse.error) {
               console.error('Failed to send Meta CAPI event for Advertise Form:', serverResponse.error, serverResponse.details);
            }
         } else {
            console.warn('Meta Pixel ID or Access Token is not configured. Skipping Server-Side API event.');
         }
      } catch (capiError) {
         console.error('Error calling sendServerEventMeta for Advertise Form:', capiError);
      }
      if (formspreeSuccess) {
         setSent(true);
      }
      return formspreeSuccess;
   }

   return {
      form,
      sent,
      onSubmit,
      formId,
   };
}
