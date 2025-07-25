export function formatCurrency(value: number | string | undefined | null): string {
   if (value === null || value === undefined || value === '') {
      return '';
   }
   const numValue = typeof value === 'string' ? parseFloat(value) : value;
   if (isNaN(numValue)) {
      return '';
   }
   return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(numValue);
}
