import React from 'react';
import renderer from 'react-test-renderer';

import Header from './Header';

it('renders', () => {
  const component = renderer.create(
    <Header />
  ).toJSON();
  expect.assertions(1);
  expect(component).toMatchSnapshot();
});
