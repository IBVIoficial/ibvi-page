'use client';

import {MapPin, Clock, Home, FileText, DollarSign} from 'lucide-react';
import {motion} from 'framer-motion';
import {PropertyModal} from './property-modal';
import {useState} from 'react';
import {formatCurrency} from '@/utils/format-currency';
import {formatNumber} from '@/utils/format-number';
import {TableRow, TableCell} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Badge} from '@/components/ui/badge';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';

interface PropertyCardProps {
   property: any;
   onClick?: () => void;
}

export function CompactPropertyCard({property, onClick}: PropertyCardProps) {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const closeTransactions = () => {
      setIsTransactionsOpen(false);
   };

   const handleTransactionsClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsTransactionsOpen(true);
   };

   if (!property) {
      return null;
   }

   const sortedTransactions = property.transactions ? [...property.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];
   const hasTransactions = sortedTransactions.length > 0;

   const getTransactionIcon = (nature: string) => {
      if (nature.includes('Compra e venda')) return Home;
      if (nature.includes('Cessão de direitos')) return FileText;
      return DollarSign;
   };

   const getTransactionColor = (nature: string) => {
      if (nature.includes('Compra e venda')) return 'bg-green-500';
      if (nature.includes('Cessão de direitos')) return 'bg-blue-500';
      return 'bg-purple-500';
   };

   const getFullAddress = () => {
      return [
         property.property_street_name,
         property.property_number,
         property.property_complement,
         property.property_city,
         property.property_state,
         property.property_country,
         property.property_postal_code,
      ]
         .filter(Boolean)
         .join(', ');
   };

   const getAreaDetails = () => {
      const areas = [];
      if (property.built_area && property.built_area !== 0) {
         areas.push(`Área Construída: ${formatNumber(property.built_area)}m²`);
      }
      if (property.land_area && property.land_area !== 0) {
         areas.push(`Área do Terreno: ${formatNumber(property.land_area)}m²`);
      }
      if (property.occupied_area && property.occupied_area !== 0) {
         areas.push(`Área Ocupada: ${formatNumber(property.occupied_area)}m²`);
      }
      return areas.join('\n');
   };

   return (
      <TooltipProvider>
         <TableRow
            className="hover:bg-muted/50 transition-all duration-300 group cursor-pointer"
            onClick={() => {
               setIsModalOpen(true);
               if (onClick) {
                  onClick();
               }
            }}
         >
            <TableCell className="p-3 w-[12rem] relative flex flex-row items-center gap-3">
               {hasTransactions && (
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
                           size="sm"
                           className="cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300 text-white bg-[rgb(41,41,41)] border-white/20 hover:bg-white/10 text-xs group/button"
                           onClick={handleTransactionsClick}
                        >
                           <Clock className="h-3 w-3" />
                           <span className="ml-1 w-0 overflow-hidden group-hover/button:w-auto group-hover/button:ml-1 transition-all duration-300 whitespace-nowrap">
                              Transações
                           </span>
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>Ver histórico de transações ({sortedTransactions.length})</p>
                     </TooltipContent>
                  </Tooltip>
               )}
               <motion.div className="text-left overflow-hidden" initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2, duration: 0.3}}>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <p className="font-semibold text-sm text-white truncate">{property.contributor_number}</p>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>Número do Contribuinte: {property.contributor_number}</p>
                     </TooltipContent>
                  </Tooltip>
               </motion.div>
            </TableCell>

            <TableCell className="p-3 max-w-xs min-w-0">
               <div className="overflow-hidden">
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <h3 className="font-medium text-sm text-white line-clamp-1 truncate">{property.title}</h3>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>{property.title}</p>
                     </TooltipContent>
                  </Tooltip>
                  <div className="flex items-start mt-1 text-white min-w-0">
                     <MapPin className="h-3 w-3 mr-1 flex-shrink-0 mt-0.5" />
                     <div className="min-w-0 flex-1">
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <p className="text-xs truncate">{getFullAddress()}</p>
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>{getFullAddress()}</p>
                           </TooltipContent>
                        </Tooltip>
                        {property.property_reference && (
                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <p className="text-xs text-white truncate">{property.property_reference}</p>
                              </TooltipTrigger>
                              <TooltipContent>
                                 <p>Referência: {property.property_reference}</p>
                              </TooltipContent>
                           </Tooltip>
                        )}
                     </div>
                  </div>
               </div>
            </TableCell>

            <TableCell className="p-3 max-w-48 min-w-0">
               <div className="text-xs text-white text-left overflow-hidden">
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <div className="truncate">
                           {property.built_area && property.built_area !== 0 ? `Construída: ${formatNumber(property.built_area)}m²` : ''}
                           {property.built_area &&
                           property.built_area !== 0 &&
                           ((property.land_area && property.land_area !== 0) || (property.occupied_area && property.occupied_area !== 0))
                              ? ' • '
                              : ''}
                           {property.land_area && property.land_area !== 0 ? `Terreno: ${formatNumber(property.land_area)}m²` : ''}
                           {property.land_area && property.land_area !== 0 && property.occupied_area && property.occupied_area !== 0 ? ' • ' : ''}
                           {property.occupied_area && property.occupied_area !== 0 ? `Ocupada: ${formatNumber(property.occupied_area)}m²` : ''}
                        </div>
                     </TooltipTrigger>
                     <TooltipContent>
                        <div className="whitespace-pre-line">{getAreaDetails()}</div>
                     </TooltipContent>
                  </Tooltip>
               </div>
            </TableCell>

            {/* <TableCell className="p-3 relative w-32 max-w-32">

            </TableCell> */}
         </TableRow>

         <PropertyModal ref={property?.ref || ''} isOpen={isModalOpen} onClose={closeModal} />

         <Dialog open={isTransactionsOpen} onOpenChange={closeTransactions}>
            <DialogContent className="max-w-6xl max-h-[80vh] flex flex-col bg-[rgb(33,33,33)] border-[rgb(41,41,41)]">
               <DialogHeader className="flex-shrink-0">
                  <DialogTitle className="text-primary-light flex items-center gap-2 font-inter">
                     <Clock className="h-5 w-5" />
                     Histórico de Transações
                  </DialogTitle>
                  <p className="text-sm text-white/90">
                     {property.contributor_number} • {sortedTransactions.length}{' '}
                     {sortedTransactions.length === 1 ? 'transação encontrada' : 'transações encontradas'}
                  </p>
               </DialogHeader>
               <div className="flex-1 overflow-y-auto pr-2">
                  {sortedTransactions && sortedTransactions.length > 0 ? (
                     <div className="relative pb-6 pl-4">
                        <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white via-white/50 to-transparent"></div>

                        <div className="space-y-8">
                           {sortedTransactions.map((transaction: any, index: number) => {
                              const IconComponent = getTransactionIcon(transaction.transaction_nature);
                              const isLatest = index === 0;

                              return (
                                 <motion.div
                                    key={transaction.id}
                                    initial={{opacity: 0, x: -20}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{delay: index * 0.1, duration: 0.3}}
                                    className="relative flex items-start gap-6"
                                 >
                                    <div
                                       className={`mt-1 flex-shrink-0 w-16 h-16 rounded-full ${getTransactionColor(transaction.transaction_nature)} border-4 border-background flex items-center justify-center relative z-10 shadow-lg ${isLatest ? 'ring-4 ring-primary/20' : ''}`}
                                    >
                                       <IconComponent className="h-6 w-6 text-white" />
                                    </div>

                                    <div className="flex-1 min-w-0 pb-8">
                                       <div className="bg-[rgb(84,84,84)] border-[rgb(41,41,41)] backdrop-blur-sm rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                                          <div className="flex flex-row gap-3 items-center justify-between text-sm text-white/90 mb-3">
                                             <span className="truncate">
                                                {new Date(transaction.date).toLocaleDateString('pt-BR', {
                                                   year: 'numeric',
                                                   month: 'long',
                                                   day: 'numeric',
                                                })}
                                             </span>
                                             {isLatest && (
                                                <Badge variant="secondary" className="bg-primary-light text-xs text-white flex-shrink-0">
                                                   Mais recente
                                                </Badge>
                                             )}
                                          </div>

                                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                                             <h4 className="text-lg font-semibold text-white truncate">{transaction.transaction_nature}</h4>
                                          </div>

                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                                             <div className="space-y-2 min-w-0">
                                                <div className="text-white">
                                                   <span className="text-white/90">Endereço: </span>
                                                   <span className="font-medium break-words">
                                                      {[transaction.street_name, transaction.number, transaction.complement].filter(Boolean).join(', ')}
                                                   </span>
                                                </div>
                                                {transaction.reference && (
                                                   <div className="text-white">
                                                      <span className="text-white/90">Referência: </span>
                                                      <span className="font-medium break-words">{transaction.reference}</span>
                                                   </div>
                                                )}
                                                <div className="text-white">
                                                   <span className="text-white/90">CEP: </span>
                                                   <span className="font-medium">{transaction.zip_code}</span>
                                                </div>
                                             </div>
                                             <div className="space-y-2 text-white min-w-0">
                                                <div>
                                                   <span className="text-white/90">Cartório: </span>
                                                   <span className="font-medium break-words">{transaction.registration_office}</span>
                                                </div>
                                                <div>
                                                   <span className="text-white/90">Matrícula: </span>
                                                   <span className="font-medium break-words">{transaction.property_registration}</span>
                                                </div>
                                             </div>
                                          </div>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t text-white">
                                             <div className="space-y-1 min-w-0">
                                                <p className="text-xs text-white/90">Valor de Referência</p>
                                                <p className="text-lg font-semibold truncate">{formatCurrency(transaction.reference_tax_value)}</p>
                                             </div>
                                             <div className="space-y-1 min-w-0">
                                                <p className="text-xs text-white/90">Proporção Transmitida</p>
                                                <p className="text-lg font-semibold">{transaction.transmitted_proportion}%</p>
                                             </div>
                                             {transaction.financed_value > 0 && (
                                                <div className="space-y-1 min-w-0">
                                                   <p className="text-xs text-white/90">Valor Financiado</p>
                                                   <p className="text-lg font-semibold truncate">{formatCurrency(transaction.financed_value)}</p>
                                                </div>
                                             )}
                                          </div>

                                          <div className="space-y-1 text-white">
                                             <p className="text-xs text-white/90">Valor da Transação</p>
                                             <p className="text-xl font-bold text-white underline break-words">{formatCurrency(transaction.value)}</p>
                                          </div>
                                       </div>
                                    </div>
                                 </motion.div>
                              );
                           })}
                        </div>
                     </div>
                  ) : (
                     <div className="text-center py-12 text-white/90">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                           <Clock className="h-10 w-10 opacity-50" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Nenhuma transação encontrada</h3>
                        <p className="text-sm">Não há histórico de transações disponível para este imóvel.</p>
                     </div>
                  )}
               </div>
            </DialogContent>
         </Dialog>
      </TooltipProvider>
   );
}
