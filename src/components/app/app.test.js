import * as React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from './app';
import {OFFERS} from '../../mocks/offers';
import {INIT_CITY} from '../../mocks/init-city';

configure({adapter: new Adapter()});

it(`App is rendered properly`, () => {
  const tree = shallow(
      <App
        offers={OFFERS}
        city={INIT_CITY}
        onAppMounting={() => {}}
      />);

  expect(tree).toMatchSnapshot();
});
