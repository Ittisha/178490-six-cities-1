export const getRatingPercent = (rating) => {
  return `${((Math.round(rating) / 5) * 100)}%`;
};
