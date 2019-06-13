import {combineReducers} from 'redux';
import {reducer as offers} from './offers/offers-data';
import {reducer as cities} from './cities/cities';

export const NameSpace = {
  CITIES: `CITIES`,
  OFFERS: `OFFERS`
};

export const reducer = combineReducers({
  [NameSpace.CITIES]: cities,
  [NameSpace.OFFERS]: offers,
});
