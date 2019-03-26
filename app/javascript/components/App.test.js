import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'

import App from './App';

it('renders', () => {
  const deleteFunc = jest.fn();
  const bankAcct = {};

  const component = renderer.create(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  ).toJSON();
  expect.assertions(1);
  expect(component).toMatchSnapshot();
});
