'use client';
// import ShareButton from '@/components/elements/Buttons/ButtonShare';
import {Button} from '@/components/ui/button';
import {X} from 'lucide-react';
import {useState, useEffect} from 'react';
import {Property} from '@/types/property';
import {useFormLogic} from '@/hooks/forms/useForm';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {toast} from 'sonner';
import {cn} from '@/lib/utils';

export default function PropriedadeContact({property, className, buttonClassName}: {property: Property; className?: string; buttonClassName?: string}) {
   const [open, setOpen] = useState(false);
   const [currentUrl, setCurrentUrl] = useState('');

   const {form, onSubmit} = useFormLogic({
      customFormId: 'mrgwjjjb',
      defaultValues: {
         ref: property.ref,
         pageUrl: currentUrl,
         title: property.title || 'Solicitação de Apresentação do Imóvel',
         name: '',
         email: '',
         whatsapp: '',
         city: property.city,
         neighborhood: property.neighborhood,
         commercial_neighborhood: property.commercial_neighborhood || '',
      },
   });

   useEffect(() => {
      if (typeof window !== 'undefined') {
         setCurrentUrl(window.location.href);
      }
   }, []);

   const handleFormSubmit = async (values: any) => {
      const success = await onSubmit(values);
      if (success) {
         toast.success('Sua solicitação foi enviada com sucesso!');
         setOpen(false);
      } else {
         toast.error('Ocorreu um erro ao enviar sua solicitação. Tente novamente.');
      }
   };

   return (
      <section className={cn('flex w-full justify-end items-center gap-2', className)}>
         {!open && (
            <Button onClick={() => setOpen(true)} className={cn('px-7 rounded-md  py-5', buttonClassName)}>
               Entre em contato
            </Button>
         )}

         {/* <ShareButton property={property} currentUrl={currentUrl} /> */}

         {open && (
            <div className="fixed top-[50%] right-0 sm:right-[2rem] translate-y-[-50%] w-full max-w-md bg-white p-8 shadow-2xl z-80 border border-bw/20">
               <div className=" mb-6">
                  <h2 className="text-2xl mb-4 leading-8 font-extralight tracking-wide text-black">Receba uma apresentação do imóvel no seu WhatsApp.</h2>
                  <button
                     onClick={() => setOpen(false)}
                     className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 cursor-pointer"
                     aria-label="Fechar modal"
                  >
                     <X className="h-5 w-5 text-gray-600" />
                  </button>
               </div>

               <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 items-center">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                           <FormItem className="w-full">
                              <FormControl>
                                 <Input className="py-6 tracking-wides text-black" placeholder="Nome Completo" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                           <FormItem className="w-full">
                              <FormControl>
                                 <Input className="py-6 tracking-widest text-black" placeholder="seuemail@gmail.com" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({field}) => (
                           <FormItem className="w-full">
                              <FormControl>
                                 <Input className="py-6 tracking-widest text-black" placeholder="WhatsApp (inclua DDD)" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <Button type="submit" className="cursor-pointer w-full bg-blue-600 text-white py-4 hover:bg-blue-700 transition-colors font-semibold">
                        {form.formState.isSubmitting ? 'Enviando...' : 'Receber Apresentação'}
                     </Button>
                  </form>
               </Form>
            </div>
         )}
      </section>
   );
}
