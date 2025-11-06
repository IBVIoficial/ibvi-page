'use client';

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose} from '@/components/ui/dialog';
import {MapPin, ChevronLeft, ChevronRight, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ExtendedProperty} from '@/types/gpt/extended-property';
import PropriedadeContact from '@/components/pages/property/property-contact';
import goApi from '@/services/go-api.service';
import {toast} from 'sonner';
import {PhotoIdsResponse} from '@/types/photo';
import {Property} from '@/types/property';
import {getImageUrl} from '@/lib/get-image-url';

interface PropertyModalProps {
   ref: string;
   isOpen: boolean;
   onClose: () => void;
}

export function PropertyModal({ref, isOpen, onClose}: PropertyModalProps) {
   const [activeImageIndex, setActiveImageIndex] = useState(0);

   const [property, setProperty] = useState<Property>();
   const [photos, setPhotos] = useState<PhotoIdsResponse>();

   async function getProperty(ref: string) {
      try {
         setProperty((await goApi.get(`/api/properties-ref/${ref}`)).data?.property);
      } catch (err) {
         toast.error('Erro ao buscar imóvel', {
            description: String(err),
         });
      }
   }
   async function getPhotos(ref: string) {
      try {
         setPhotos((await goApi.get(`/api/photos-all/${ref}`)).data);
      } catch (err) {
         toast.error('Erro ao buscar imóvel', {
            description: String(err),
         });
      }
   }

   useEffect(() => {
      getProperty(ref);
      getPhotos(ref);
   }, [ref]);

   if (!property) return null;
   if (!photos) return null;

   const images = photos.photo_ids.map((p) => getImageUrl(ref, p));

   const nextImage = () => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
   };

   const prevImage = () => {
      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
   };

   return (
      <Dialog
         open={isOpen}
         onOpenChange={() => {
            onClose();
         }}
      >
         <DialogContent className="max-w-4xl h-[calc(100dvh-var(--navbar-height))] md:h-10/12 mt-10 md:mt-8 flex flex-col p-0 gap-0 bg-[rgb(48,48,48)] border border-[rgb(81,81,81)] z-[99999]">
            <DialogHeader className="px-6 py-4 pr-12 border-b border-[rgb(81,81,81)] flex-shrink-0 z-[999]">
               <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl text-white">{property.new_title || property.title}</DialogTitle>
               </div>
               <DialogDescription className="text-emerald-600 dark:text-emerald-400 flex items-center mt-1 z-[1000]">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.commercial_neighborhood || property.neighborhood}
               </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto">
               <PropertyImageGallery images={images} activeIndex={activeImageIndex} onNext={nextImage} onPrev={prevImage} onSelect={setActiveImageIndex} />

               <motion.div className="p-6 space-y-6" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3, duration: 0.5}}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <PropertyDetails property={property} />

                     {property.unit_details && <PropertyFeatures features={property.unit_details.split(',')} />}
                  </div>

                  <PropertyDescription description={property.description || property.promotion || ''} />
               </motion.div>
            </div>

            <motion.div
               className="p-4 border-t border-[rgb(81,81,81)] flex-shrink-0"
               initial={{opacity: 0, y: 20}}
               animate={{opacity: 1, y: 0}}
               transition={{delay: 0.5, duration: 0.3}}
            >
               <PropriedadeContact
                  property={property}
                  buttonClassName="rounded-full w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 flex-1"
               />
            </motion.div>

            <DialogClose className="text-white absolute top-3 right-3 z-[9999]">
               <X />
            </DialogClose>
         </DialogContent>
      </Dialog>
   );
}

function PropertyImageGallery({
   images,
   activeIndex,
   onNext,
   onPrev,
   onSelect,
}: {
   images: string[];
   activeIndex: number;
   onNext: () => void;
   onPrev: () => void;
   onSelect: (index: number) => void;
}) {
   if (!Array.isArray(images) || images.length === 0) {
      console.error('PropertyImageGallery received invalid images prop:', images);

      return (
         <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
            <p>Nenhuma imagem disponível.</p>
         </div>
      );
   }

   return (
      <>
         <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <AnimatePresence mode="wait">
               <motion.div
                  key={activeIndex}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.5}}
                  className="absolute inset-0"
               >
                  <img src={images[activeIndex] || '/placeholder.svg'} alt="Property image" className="w-full h-full object-cover" />
               </motion.div>
            </AnimatePresence>

            <motion.button
               onClick={onPrev}
               className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-radius transition-colors"
               whileHover={{scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
               whileTap={{scale: 0.9}}
            >
               <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <motion.button
               onClick={onNext}
               className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-radius transition-colors"
               whileHover={{scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
               whileTap={{scale: 0.9}}
            >
               <ChevronRight className="h-6 w-6" />
            </motion.button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5">
               {images.map((_, i) => (
                  <motion.button
                     key={i}
                     onClick={() => onSelect(i)}
                     className={`h-2 w-2 rounded-radius transition-colors ${i === activeIndex ? 'bg-card' : 'bg-card/50 hover:bg-card/80'}`}
                     whileHover={{scale: 1.5}}
                     whileTap={{scale: 0.8}}
                     animate={i === activeIndex ? {scale: [1, 1.2, 1]} : {}}
                     transition={
                        i === activeIndex
                           ? {
                                duration: 0.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 1,
                             }
                           : {}
                     }
                  />
               ))}
            </div>
         </div>

         <div className="grid grid-cols-4 gap-2 p-2">
            {images.map((img, i) => (
               <motion.button
                  key={i}
                  onClick={() => onSelect(i)}
                  className={`relative h-20 rounded-radius overflow-hidden ${i === activeIndex ? 'ring-2 ring-emerald-500' : ''}`}
                  whileHover={{scale: 1.05, y: -2}}
                  whileTap={{scale: 0.95}}
                  animate={
                     i === activeIndex
                        ? {
                             boxShadow: ['0px 0px 0px rgba(16, 185, 129, 0)', '0px 0px 8px rgba(16, 185, 129, 0.5)', '0px 0px 0px rgba(16, 185, 129, 0)'],
                          }
                        : {}
                  }
                  transition={i === activeIndex ? {duration: 2, repeat: Number.POSITIVE_INFINITY} : {}}
               >
                  <img src={img || '/placeholder.svg'} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
               </motion.button>
            ))}
         </div>
      </>
   );
}

function PropertyDetails({property}: {property: ExtendedProperty}) {
   const detailItems = [
      {
         label: 'Preço',
         rawValue: property.value,
         value: (property.value ?? 0).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
         }),
         highlight: true,
      },
      {
         label: 'Área Total',
         rawValue: property.total_area,
         value: `${property.total_area} m²`,
         highlight: false,
      },
      {
         label: 'Área Útil',
         rawValue: property.usable_area,
         value: `${property.usable_area} m²`,
         highlight: false,
      },
      {
         label: 'Suítes',
         rawValue: property.suites,
         value: `${property.suites} suítes`,
         highlight: false,
      },
      {
         label: 'Referência',
         rawValue: property.ref,
         value: property.ref,
         highlight: false,
      },
   ];

   return (
      <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.5}}>
         <h3 className="text-lg font-semibold text-white mb-4">Detalhes</h3>

         <div className="space-y-3">
            {detailItems.map(
               (item, index) =>
                  item.rawValue && (
                     <motion.div
                        key={index}
                        className="flex justify-between py-2 border-b border-[rgb(81,81,81)]"
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: index * 0.1, duration: 0.3}}
                        whileHover={{backgroundColor: 'rgba(16, 185, 129, 0.05)'}}
                     >
                        <span className="text-white">{item.label}</span>
                        <span className={item.highlight ? 'font-semibold text-emerald-600 dark:text-emerald-400' : 'text-white font-semibold'}>
                           {item.value}
                        </span>
                     </motion.div>
                  ),
            )}
         </div>
      </motion.div>
   );
}

function PropertyFeatures({features}: {features: string[]}) {
   return (
      <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.5}}>
         <h3 className="text-lg font-semibold text-white mb-4">Características</h3>

         <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
               <motion.div
                  key={index}
                  className="flex items-center space-x-2"
                  initial={{opacity: 0, x: 10}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: 0.2 + index * 0.1, duration: 0.3}}
                  whileHover={{x: 5, color: 'rgb(16, 185, 129)'}}
               >
                  <motion.div
                     className="h-2 w-2 rounded-radius bg-emerald-500"
                     animate={{scale: [1, 1.2, 1]}}
                     transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2 + index * 0.5,
                     }}
                  />
                  <span className="text-white">{feature}</span>
               </motion.div>
            ))}
         </div>
      </motion.div>
   );
}

function PropertyDescription({description}: {description: string}) {
   return (
      <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.4, duration: 0.5}}>
         <h3 className="text-lg font-semibold text-white mb-4">Descrição</h3>
         <p className="text-white whitespace-pre-line">{description}</p>
      </motion.div>
   );
}
