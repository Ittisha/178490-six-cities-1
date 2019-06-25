import React from 'react';
import Enzyme, {shallow} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import configureMockStore from "redux-mock-store";

import {withSortedItems} from './with-sorted-items';


Enzyme.configure({adapter: new Adapter()});
const mockStore = configureMockStore();

const store = mockStore({CITIES: {city: `fg`}, OFFERS: {offers: []}});

const MockComponent = () => <div />;
const MockComponentWrapped = withSortedItems(MockComponent);

it(`Should save option`, () => {
  const component = shallow(<MockComponentWrapped store={store}/>);

  expect(component).not.toBe(null);
});
