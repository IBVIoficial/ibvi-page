import * as z from 'zod';
import {useState, useEffect} from 'react';
import {toast} from 'sonner';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import useUserLocation from '@/hooks/useUserLocation';
import {trackLead} from '@/lib/meta-pixel/lead-tracker';

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
   formName: string;
   formType: 'property_inquiry' | 'advertise_listing' | 'contact';
   propertyData?: {
      ref?: string;
      title?: string;
      type?: string;
      value?: number;
      neighborhood?: string;
      city?: string;
   };
}

export function useFormEnhanced(options: useFormLogicOptions) {
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

   // Extract UTM parameters from URL
   function getUTMParams() {
      if (typeof window === 'undefined') return {};

      const params = new URLSearchParams(window.location.search);
      return {
         utmSource: params.get('utm_source') || undefined,
         utmMedium: params.get('utm_medium') || undefined,
         utmCampaign: params.get('utm_campaign') || undefined,
      };
   }

   async function onSubmit(values: FormAdvertiseSchema): Promise<boolean> {
      let formspreeSuccess = true;
      const utmParams = getUTMParams();

      try {
         // Submit to Formspree
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
            _subject: `Novo ${options.formType === 'property_inquiry' ? 'Contato' : 'Anúncio'}: ${pageTitle}`,
            ...(location.latitude && {user_latitude: location.latitude}),
            ...(location.longitude && {user_longitude: location.longitude}),
            ...utmParams,
         };

         const formspreeResponse = await fetch(`https://formspree.io/f/${formId}`, {
            method: 'POST',
            body: JSON.stringify(formspreePayload),
            headers: {'Content-Type': 'application/json'},
         });

         if (!formspreeResponse.ok) {
            formspreeSuccess = false;
            console.error('Formspree submission failed:', formspreeResponse.statusText);
            toast.error('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
         }
      } catch (error) {
         formspreeSuccess = false;
         console.error('Error submitting form to Formspree:', error);
         toast.error('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
      }

      // Track with enhanced lead tracker
      try {
         const trackingResult = await trackLead({
            name: values.name,
            email: values.email,
            phone: values.whatsapp,
            formName: options.formName,
            formType: options.formType,
            leadSource: pageTitle,

            // Property data
            propertyRef: options.propertyData?.ref || values.ref,
            propertyTitle: options.propertyData?.title || values.title,
            propertyType: options.propertyData?.type,
            propertyValue: options.propertyData?.value,
            propertyNeighborhood: options.propertyData?.neighborhood || values.neighborhood,
            propertyCity: options.propertyData?.city || values.city,

            // Additional data
            message: values.message,
            details: values.commercial_neighborhood,
            ...utmParams,

            // User location
            userLatitude: location.latitude || undefined,
            userLongitude: location.longitude || undefined,

            // Page context
            pageUrl: pageUrl,
            pageTitle: pageTitle,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
         });

         if (!trackingResult.success) {
            console.error('Lead tracking failed:', trackingResult.error);
         } else {
            console.log('Lead tracked successfully:', trackingResult.eventId);
         }
      } catch (trackingError) {
         console.error('Error tracking lead:', trackingError);
      }

      // GTM tracking
      try {
         if (typeof window !== 'undefined' && window.dataLayer) {
            // Push lead event
            window.dataLayer.push({
               event: 'lead',
               form_type: options.formType,
               form_location: pageTitle,
               user_type: options.formType === 'advertise_listing' ? 'seller_prospect' : 'buyer_prospect',
               listing_neighborhood: values.neighborhood,
               user_provided_data: {
                  email: values.email,
                  phone_number: values.whatsapp.replace(/\D/g, ''),
                  address: {
                     first_name: values.name.split(' ')[0],
                     last_name: values.name.split(' ').slice(1).join(' '),
                  },
               },
            });

            // Push form submit event
            window.dataLayer.push({
               event: 'form_submit',
               form_name: options.formName,
               form_type: options.formType,
               form_location: pageTitle,
               form_status: formspreeSuccess ? 'success' : 'failure',
            });

            // Google Ads conversion tracking
            if (options.formType === 'property_inquiry' || options.formType === 'advertise_listing') {
               gtag('event', 'conversion', {
                  send_to: 'AW-942110045/DVCDCK_quegaEN3qncED',
               });
            }
         }
      } catch (gtmError) {
         console.error('Error with GTM tracking:', gtmError);
      }

      if (formspreeSuccess) {
         setSent(true);
         toast.success('Formulário enviado com sucesso! Entraremos em contato em breve.');
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
