import * as React from 'react';
import {Main} from '../main/main';
import {apartments} from '../../consts/apartments';

export const App = () => (
  <Main apartments={apartments}/>
);
