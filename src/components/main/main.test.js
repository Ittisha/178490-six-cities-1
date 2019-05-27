import * as React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Main} from './main';
import {OFFERS} from '../../mocks/offers';
import {INIT_CITY} from '../../mocks/init-city';

configure({adapter: new Adapter()});

it(`Main component is rendered properly`, () => {
  const tree = shallow(<Main apartments={OFFERS} city={INIT_CITY}/>);

  expect(tree).toMatchSnapshot();
});
