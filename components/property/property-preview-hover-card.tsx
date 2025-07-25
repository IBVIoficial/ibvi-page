'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';
import type {PropertyPreview, PropertyPreviewData} from '@/types/property';

interface PropertyPreviewHoverCardProps {
   reference: string;
   children: React.ReactNode;
}

const PropertyPreviewHoverCard: React.FC<PropertyPreviewHoverCardProps> = ({reference, children}) => {
   const [propertyPreviewCache, setPropertyPreviewCache] = useState<PropertyPreviewData>({});
   const [loadingPropertyRef, setLoadingPropertyRef] = useState<string | null>(null);

   const fetchPropertyPreview = async (ref: string): Promise<void> => {
      if (propertyPreviewCache.hasOwnProperty(ref)) {
         return;
      }

      setLoadingPropertyRef(ref);
      try {
         const response = await fetch(`/api/properties/${ref}`);
         let dataToCache: PropertyPreview | {error: boolean} | null = null;

         if (response.ok) {
            dataToCache = await response.json();
         } else if (response.status === 404) {
            dataToCache = null;
         } else {
            throw new Error(`Failed to fetch property preview for ${ref}: ${response.statusText}`);
         }
         setPropertyPreviewCache((prevCache) => ({
            ...prevCache,
            [ref]: dataToCache,
         }));
      } catch {
         setPropertyPreviewCache((prevCache) => ({
            ...prevCache,
            [ref]: {error: true},
         }));
      } finally {
         setLoadingPropertyRef(null);
      }
   };

   const handleHoverChange = (open: boolean) => {
      if (open && reference && !propertyPreviewCache.hasOwnProperty(reference)) {
         fetchPropertyPreview(reference);
      }
   };

   const currentPreview = propertyPreviewCache[reference];
   const isLoadingThisProperty = loadingPropertyRef === reference;

   return (
      <HoverCard openDelay={200} closeDelay={100} onOpenChange={handleHoverChange}>
         <HoverCardTrigger asChild>{children}</HoverCardTrigger>
         {(currentPreview !== undefined || isLoadingThisProperty) && (
            <HoverCardContent className="w-96 backdrop-blur-md bg-popover/60 z-[999]" side="top" align="center">
               <div className="flex flex-col space-y-3">
                  {isLoadingThisProperty ? (
                     <div className="flex items-center justify-center h-24">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Carregando pré-visualização...</p>
                     </div>
                  ) : currentPreview && !('error' in currentPreview) ? (
                     <>
                        {currentPreview.imageUrl && (
                           <div className="relative aspect-video w-full overflow-hidden rounded-radius">
                              <Image
                                 src={currentPreview.imageUrl}
                                 alt={`Preview for ${currentPreview.title}`}
                                 fill
                                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                 className="object-cover"
                                 onError={() => {
                                    setPropertyPreviewCache((prev) => ({
                                       ...prev,
                                       [reference]: {
                                          ...(prev[reference] as PropertyPreview),
                                          imageUrl: '/placeholder-house.jpg',
                                       },
                                    }));
                                 }}
                              />
                           </div>
                        )}
                        <span className="flex flex-row gap-1.5 items-center">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-600 dark:text-blue-400 flex-shrink-0"
                           >
                              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                              <polyline points="9 22 9 12 15 12 15 22"></polyline>
                           </svg>
                           <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{currentPreview.title || reference}</h4>
                        </span>
                     </>
                  ) : (
                     <div className="flex items-center justify-center h-12">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Pré-visualização não disponível.</p>
                     </div>
                  )}
               </div>
            </HoverCardContent>
         )}
      </HoverCard>
   );
};

export {PropertyPreviewHoverCard};
