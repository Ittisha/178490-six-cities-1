import * as React from 'react';
import {Main} from '../main/main';
import {OFFERS} from '../../mocks/offers';

export const App = () => (
  <Main apartments={OFFERS}/>
);
