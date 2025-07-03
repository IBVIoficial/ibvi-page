"use client";
import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import * as fbq from "@/lib/meta-pixel/meta-pixel";

const countryCodes = [
  {
    value: "+55",
    label: "BR",
    placeholder: "(99) 99999-9999",
    pattern: "\\+55 \\([0-9]{2}\\) [0-9]{5}-[0-9]{4}",
    country: "br", // Mudança: minúscula conforme ISO 3166-1 alfa-2
  },
  {
    value: "+1",
    label: "US",
    placeholder: "+1 (999) 999-9999",
    pattern: "\\+1 \\([0-9]{3}\\) [0-9]{3}-[0-9]{4}",
    country: "us", // Mudança: minúscula
  },
  {
    value: "+351",
    label: "PT",
    placeholder: "+351 999 999 999",
    pattern: "\\+351 [0-9]{3} [0-9]{3} [0-9]{3}",
    country: "pt", // Mudança: minúscula
  },
];

export default function FormLP() {
  const [formspreeState, formspreeHandleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID_LP || "");
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
      setPageTitle(document.title);
    }
  }, []);

  const handleCountryCodeChange = (selectedOption: typeof selectedCountryCode) => {
    if (selectedOption) {
      setSelectedCountryCode(selectedOption);
      setPhoneNumber("");
    }
  };

  const formatPhoneNumber = (value: string, countryCode: string) => {
    const numbers = value.replace(/\D/g, "");
    switch (countryCode) {
      case "+1":
        if (numbers.length <= 10) return numbers.replace(/(\d{3})(\d{3})(\d{4})/, "+1 ($1) $2-$3");
        break;
      case "+351":
        if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d{3})/, "+351 $1 $2 $3");
        break;
      case "+55":
        if (numbers.length <= 11) return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "+55 ($1) $2-$3");
        break;
    }
    const patternLength = selectedCountryCode.pattern.replace(/[^0-9]/g, "").length;
    if (numbers.length > patternLength) return numbers.substring(0, patternLength);
    return value;
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value, selectedCountryCode.value);
    setPhoneNumber(formatted);
  };

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    const formspreeFormData = new FormData(event.target as HTMLFormElement);
    formspreeFormData.set("phone-number", phoneNumber);
    formspreeFormData.set("country", selectedCountryCode.label);

    const leadEventId = `lead_lp_${email}_${Date.now()}`;
    
    // Formatação correta do telefone com código do país
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
    const formattedPhoneForMeta = selectedCountryCode.value.replace("+", "") + cleanedPhoneNumber;
    
    let gtmSubmissionSuccess = true;
    
    const fbqCustomData = {
      content_name: `Form LP: ${pageTitle}`,
      content_category: "Lead Generation",
      status: "new_lead",
      value: 0,
      currency: "BRL",
      form_name: "Form LP",
      page_url: pageUrl,
      page_title: pageTitle,
    };

    // Dados do usuário para o Meta Pixel (client-side)
    // Nota: O Meta Pixel faz o hash automaticamente no lado do cliente
    const fbqUserData = {
      em: email.toLowerCase().trim(), // Email normalizado
      ph: formattedPhoneForMeta, // Telefone com código do país
      fn: name.split(" ")[0].toLowerCase().trim(), // Primeiro nome normalizado
      ln: name.split(" ").slice(1).join(" ").toLowerCase().trim(), // Sobrenome normalizado
      country: selectedCountryCode.country, // Código do país em minúsculas
      // REMOVIDO: leadId não é um parâmetro válido para o Meta Pixel
    };

    const gtmLeadData = {
      event: "lead",
      form_type: "lead_generation_lp",
      form_location: pageTitle,
      user_type: "prospect",
      internal_lead_id: leadEventId, // Para rastreamento interno
    };

    const gtmSubmitData = {
      event: "form_submit",
      form_name: "Form LP",
      form_type: "lead_generation_lp",
      form_location: pageTitle,
      form_status: "success",
    };

    try {
      // Enviar para Formspree
      await formspreeHandleSubmit(formspreeFormData);
      if (formspreeState.errors) {
        console.error("Formspree submission failed:", formspreeState.errors);
        gtmSubmissionSuccess = false;
      }

      // Enviar evento para Meta Pixel (client-side)
      try {
        fbq.lead(fbqCustomData, fbqUserData);
        console.log("fbq.lead called for Form LP");
      } catch (pixelError) {
        console.error("Error calling fbq.lead:", pixelError);
      }

      // Enviar para GTM
      try {
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push(gtmLeadData);
          console.log("GTM dataLayer push for lead:", gtmLeadData);
          gtmSubmitData.form_status = gtmSubmissionSuccess ? "success" : "failure";
          window.dataLayer.push(gtmSubmitData);
          console.log("GTM dataLayer push for form_submit:", gtmSubmitData);
        } else {
          console.warn("GTM dataLayer not found. Skipping GTM tracking.");
        }
      } catch (gtmError) {
        console.error("Error pushing to GTM dataLayer:", gtmError);
      }

      // Enviar evento para API de Conversões (server-side)
      try {
        const response = await fetch('/api/event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            event_source_url: pageUrl,
            user_data: {
              em: email.toLowerCase().trim(),
              ph: formattedPhoneForMeta,
              fn: name.split(" ")[0].toLowerCase().trim(),
              ln: name.split(" ").slice(1).join(" ").toLowerCase().trim(),
              country: selectedCountryCode.country,
              client_ip_address: '', // Será preenchido no servidor
              client_user_agent: navigator.userAgent,
              fbp: getFbpCookie(), // Função para obter o cookie _fbp
              fbc: getFbcFromUrl(), // Função para obter fbc da URL
            },
            custom_data: fbqCustomData,
            event_id: leadEventId, // ID único para deduplicação
          }),
        });

        if (!response.ok) {
          console.error('Failed to send server event');
        }
      } catch (serverError) {
        console.error('Error sending server event:', serverError);
      }

      if (gtmSubmissionSuccess) {
        setIsSuccess(true);
      } else {
        setError("Ocorreu um erro ao enviar o formulário principal.");
      }
    } catch (e: any) {
      console.error("Form submission process error:", e);
      setError(e.message || "Ocorreu um erro ao enviar o formulário.");
      try {
        if (typeof window !== "undefined" && window.dataLayer) {
          gtmSubmitData.form_status = "failure";
          window.dataLayer.push(gtmSubmitData);
        } else {
          console.warn("GTM dataLayer not found. Skipping failed GTM submit tracking.");
        }
      } catch (gtmError) {
        console.error("Error tracking failed GTM submit:", gtmError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Funções auxiliares (adicione no componente ou importe de meta-utils.ts)
  const getFbpCookie = (): string | null => {
    if (typeof window === 'undefined') return null;
    const match = document.cookie.match(/_fbp=([^;]+)/);
    return match ? match[1] : null;
  };

  const getFbcFromUrl = (): string | null => {
    if (typeof window === 'undefined') return null;
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (!fbclid) return null;
    const timestamp = Math.floor(Date.now() / 1000);
    return `fb.1.${timestamp}.${fbclid}`;
  };

  if (isSuccess) {
    return <p className="text-3xl font-bold mb-16">Agradecemos o interesse!</p>;
  }

  return (
    <form onSubmit={handleSubmitForm} id="form" className="space-y-4">
      {/* Resto do formulário permanece igual */}
      <input type="hidden" name="_subject" value={`Novo Lead LP: ${pageUrl}`} />

      <div className="px-2">
        <div className="container mx-auto">
          <p className="my-4 text-lg text-bold leading-6 text-white">Entre em contato e receba as informações no seu WhatsApp.</p>
          <div>
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-md font-medium leading-6 text-white my-3">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome Completo"
                required
                className="block w-full rounded-none border-0 py-1.5 pl-4 text-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ValidationError prefix="Name" field="name" errors={formspreeState.errors} />
            </div>
            <div className="sm:col-span-4 mt-1">
              <label htmlFor="email" className="block text-md font-medium leading-6 text-white my-3">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@provedor.com.br"
                required
                className="block w-full rounded-none border-0 py-1.5 pl-4 text-foreground my-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ValidationError prefix="Email" field="email" errors={formspreeState.errors} />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phone-number" className="block text-md font-medium leading-6 text-white my-3">
                Telefone
              </label>
              <div className="relative rounded-none shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country-select"
                    name="country-select"
                    autoComplete="country"
                    value={selectedCountryCode.value}
                    onChange={(e) => handleCountryCodeChange(countryCodes.find((code) => code.value === e.target.value) || countryCodes[0])}
                    tabIndex={-1}
                    className="h-full rounded-none border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    {countryCodes.map((code) => (
                      <option key={code.value} value={code.value}>
                        {code.label}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="tel"
                  pattern={selectedCountryCode.pattern}
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder={selectedCountryCode.placeholder}
                  required
                  className="block w-full rounded-none border-0 py-1.5 pl-24 text-foreground my-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <ValidationError prefix="Phone" field="phone-number" errors={formspreeState.errors} />
            </div>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
            <div className="sm:col-span-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full rounded-none bg-emerald-800 p-3 text-md font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-green-700 ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
                aria-label={isLoading ? "Enviando..." : "Receber apresentação"}
              >
                {isLoading ? "Enviando..." : "Receber Apresentação"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}