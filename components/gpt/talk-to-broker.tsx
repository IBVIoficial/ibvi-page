import React, {useCallback, useEffect, useState} from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {NeonGradientCard} from '@/components/magicui/neon-gradient-card';
import {CompactPropertyCard} from '@/components/property/compact-property-card';
import {Button} from '@/components/ui/button';
import {MessageCircle} from 'lucide-react';
import {ExtendedProperty} from '@/types/gpt/extended-property';
import {fetchPhotoIds, fetchProperty} from '@/lib/property';
import {toast} from 'sonner';

interface TalkToBrokerProps {
   brokerName?: string;
   whatsappNumber: string;
   ref: string;
   initialMessage?: string;
}

export default function TalkToBrokerCard({
   // brokerName,
   whatsappNumber,
   ref,
   initialMessage,
}: TalkToBrokerProps) {
   const [property, setProperty] = useState<ExtendedProperty | null>(null);
   const [isLoading, setIsLoading] = useState(false);

   const getData = useCallback(async () => {
      setIsLoading(true);

      try {
         const property = await fetchProperty(ref);
         const photoIds = await fetchPhotoIds(ref);

         setProperty({
            ...property,
            imageUrls: photoIds.map((photoId) => `https://img.mbras.com.br/property_photos/${ref}/${photoId}.jpeg?tr=f-auto,q-auto,pr=true,w=auto`),
         });
      } catch {
         toast.error('Guide', {
            description: 'Falha ao carregar imóvel',
         });
      }

      setIsLoading(false);
   }, [ref]);

   useEffect(() => {
      getData();
   }, [ref, getData]);

   const message = initialMessage || `Olá, tenho interesse no imóvel${ref ? ` ${ref}` : ''}.`;

   const whatsappLink = `https://wa.me/${whatsappNumber?.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

   return (
      <NeonGradientCard borderSize={1} borderRadius={0} supression={35} as={<Card />} className="max-w-md mx-auto">
         <CardHeader className="px-0 md:px-6">
            <CardTitle>Fale com o corretor</CardTitle>
         </CardHeader>
         <CardContent className="px-0 md:px-6">
            Interessado neste imóvel? Clique no botão abaixo para conversar diretamente com o responsável pelo WhatsApp.
            {isLoading && <p>Carregando imóvel...</p>}
            {!isLoading && property && (
               <div className="mt-4">
                  <CompactPropertyCard property={property} onClick={() => {}} />
               </div>
            )}
         </CardContent>
         <CardFooter>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full">
               <Button className="w-full h-14 flex items-center gap-2 font-semibold" variant="outline">
                  <MessageCircle size={18} />
                  Falar com o corretor
               </Button>
            </a>
         </CardFooter>
      </NeonGradientCard>
   );
}
