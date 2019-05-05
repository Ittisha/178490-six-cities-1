import * as React from 'react';
import {Main} from '../main/main';
import {APARTMENTS} from '../../consts/apartments';

export const App = () => (
  <Main apartments={APARTMENTS}/>
);
