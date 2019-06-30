import * as React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {ReviewForm} from './review-form';

Enzyme.configure({adapter: new Adapter()});

const FORM_MOCK_DATA = {
  rating: `5`,
  comment: `Good!`
};

const FORM_MOCK_DATA_WITH_ID = {
  rating: `5`,
  comment: `Good!`,
  id: 1,
};

it(`Review form sends correct data`, () => {
  const event = {preventDefault: () => {}};
  const onFormSending = jest.fn();
  const onSubmit = jest.fn();

  const renderedComponent = shallow(
      <ReviewForm
        onChange={() => {}}
        onSubmit={onSubmit}
        onFormSending={onFormSending}
        offerId={1}
        formData={FORM_MOCK_DATA}
        isSent={false}
        hasSubmitError={false}
        handleChangeSubmitStatus={() => {}}
        onBlur={() => {}}
      />);

  const instance = renderedComponent.instance();

  instance._formRef = {
    current: {
      reset: jest.fn()
    },
  };

  const form = renderedComponent.find(`form`).first();

  form.simulate(`submit`, event);
  expect(onFormSending).toHaveBeenCalledWith(FORM_MOCK_DATA_WITH_ID);
  expect(onSubmit).toHaveBeenCalledTimes(1);
});
