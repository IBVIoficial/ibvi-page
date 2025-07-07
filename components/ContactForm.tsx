'use client';

import React, {useState} from 'react';
import * as fbq from '@/lib/meta-pixel/meta-pixel';
import {getFbpCookie, getFbcFromUrl, generateEventId, formatPhoneForMeta} from '@/lib/meta-pixel/meta-utils';

interface ContactFormData {
   name: string;
   email: string;
   phone: string;
   message: string;
}

export default function ContactForm() {
   const [formData, setFormData] = useState<ContactFormData>({
      name: '',
      email: '',
      phone: '',
      message: '',
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus('idle');

      try {
         const eventId = generateEventId('contact');

         // Track contact event client-side
         fbq.contact({
            content_name: 'Contact Form Submission',
            content_category: 'Contact',
            value: 0,
            currency: 'BRL',
            form_name: 'Main Contact Form',
            page_url: window.location.href,
            page_title: document.title,
         });

         // Send to server-side API
         const response = await fetch('/api/event', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               event_name: 'Contact',
               event_time: Math.floor(Date.now() / 1000),
               action_source: 'website',
               event_source_url: window.location.href,
               user_data: {
                  em: formData.email.toLowerCase().trim(),
                  ph: formatPhoneForMeta(formData.phone, '+55'),
                  fn: formData.name.split(' ')[0].toLowerCase().trim(),
                  ln: formData.name.split(' ').slice(1).join(' ').toLowerCase().trim(),
                  country: 'br',
                  client_user_agent: navigator.userAgent,
                  fbp: getFbpCookie(),
                  fbc: getFbcFromUrl(),
               },
               custom_data: {
                  content_name: 'Contact Form Submission',
                  content_category: 'Contact',
                  form_name: 'Main Contact Form',
                  message_preview: formData.message.substring(0, 50),
               },
               event_id: eventId,
            }),
         });

         if (response.ok) {
            setSubmitStatus('success');
            setFormData({name: '', email: '', phone: '', message: ''});
         } else {
            setSubmitStatus('error');
         }
      } catch (error) {
         console.error('Error submitting form:', error);
         setSubmitStatus('error');
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 p-6">
         <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
               Nome Completo
            </label>
            <input
               type="text"
               id="name"
               name="name"
               value={formData.name}
               onChange={handleChange}
               required
               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
         </div>

         <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
               Email
            </label>
            <input
               type="email"
               id="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               required
               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
         </div>

         <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
               Telefone
            </label>
            <input
               type="tel"
               id="phone"
               name="phone"
               value={formData.phone}
               onChange={handleChange}
               placeholder="(11) 99999-9999"
               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
         </div>

         <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
               Mensagem
            </label>
            <textarea
               id="message"
               name="message"
               value={formData.message}
               onChange={handleChange}
               rows={4}
               required
               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
         </div>

         <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
               isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-white'
            }`}
         >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
         </button>

         {submitStatus === 'success' && <p className="text-green-600 text-center mt-4">Mensagem enviada com sucesso!</p>}

         {submitStatus === 'error' && <p className="text-red-600 text-center mt-4">Erro ao enviar mensagem. Por favor, tente novamente.</p>}
      </form>
   );
}
