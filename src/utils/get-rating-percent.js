export const getRatingPercent = (rating) => {
  return `${(rating / 5 * 100).toFixed()}%`;
};
