import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'

import BankAccount from './BankAccount';

it('renders', () => {
  const deleteFunc = jest.fn();
  const bankAcct = {
    id: 1,
    account_number: '1231231230',
    routing_number: '011000015',
    nickname: 'Test Account',
    location_id: 1,
    address: '123 Fake St',
    address2: 'Apt 4',
    city: 'Chicago',
    region: 'IL',
    postal: '60606',
    created_at: '2019-03-26T18:10:38.029Z',
    updated_at: '2019-03-26T18:10:38.029Z'
  };

  const component = renderer.create(
    <MemoryRouter>
      <BankAccount onDelete={deleteFunc} bankAcct={bankAcct} />
    </MemoryRouter>
  ).toJSON();
  expect.assertions(1);
  expect(component).toMatchSnapshot();
});
