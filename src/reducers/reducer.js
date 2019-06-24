import {combineReducers} from 'redux';
import {reducer as offers} from './offers/offers-data';
import {reducer as cities} from './cities/cities';
import {reducer as user} from './user/user';
import {reducer as review} from './review/review';

export const NameSpace = {
  CITIES: `CITIES`,
  OFFERS: `OFFERS`,
  USER: `USER`,
  REVIEWS: `REVIEWS`,
};

export const reducer = combineReducers({
  [NameSpace.CITIES]: cities,
  [NameSpace.OFFERS]: offers,
  [NameSpace.USER]: user,
  [NameSpace.REVIEWS]: review,
});
