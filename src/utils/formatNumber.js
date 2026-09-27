export const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(Number(num))) return '0';
  const n = Number(num);
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
};
