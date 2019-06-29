const MAX_RATING = 5;
const PERCENTAGE_RATE = 100;

export const getRatingPercent = (rating) => {
  return `${((Math.round(rating) / MAX_RATING) * PERCENTAGE_RATE)}%`;
};
