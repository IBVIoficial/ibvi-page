export const getStartItem = (currentPage: number, itemsPerPage: number): number => {
   return (currentPage - 1) * itemsPerPage + 1;
};

export const getEndItem = (currentPage: number, itemsPerPage: number, totalItems: number): number => {
   return Math.min(currentPage * itemsPerPage, totalItems);
};
