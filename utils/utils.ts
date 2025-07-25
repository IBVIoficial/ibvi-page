export const truncate = (str, maxLength) => (str?.length > maxLength ? str.slice(0, maxLength).trimEnd() + '...' : str);
