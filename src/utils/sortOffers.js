import {SortingOptions} from '../consts';

export const sortOffers = (option) => (offer1, offer2) => {
  switch (option) {
    case SortingOptions.LOW_TO_HIGH:
      return offer1.price - offer2.price;
    case SortingOptions.HIGH_TO_LOW:
      return offer2.price - offer1.price;
    case SortingOptions.TOP_RATED:
      return offer2.rating - offer1.rating;
    case SortingOptions.POPULAR:
    default:
      return true;
  }
};
