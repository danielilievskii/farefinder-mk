export const formatDate = (isoString: string): string => {

  return new Date(isoString).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatPrice = (price: number): string => {

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MKD',
    minimumFractionDigits: 0,
  }).format(price);
};