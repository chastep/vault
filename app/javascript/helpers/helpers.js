import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from "semantic-ui-react";

export const validateBankAccount = (bankAcct) => {
  const errors = {};

  if (bankAcct.account_number === '') {
    errors.account_number = 'You must enter a valid account number!';
  }

  if (bankAcct.routing_number === '') {
    errors.routing_number = 'You must enter a valid routing number!';
  }

  if (bankAcct.address === '') {
    errors.address = 'You must enter a valid address!';
  }

  if (bankAcct.city === '') {
    errors.city = 'You must enter a valid city!';
  }
  
  return errors;
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

export const BANK_ACCOUNT_HEADERS = [
  'ID',
  'Nickname',
  'Account Number',
  'Routing Number',
  'Address',
  'Created At' 
];

export const renderBankAccountRow = (bankAcct) => {
  return (
    <Table.Row key={bankAcct.id}>
      <Table.Cell>
        <Link to={`/bank_accounts/${bankAcct.id}`}>
          {bankAcct.id}
        </Link>
      </Table.Cell>
      <Table.Cell singleLine>
        <Link to={`/bank_accounts/${bankAcct.id}`}>
          {bankAcct.nickname}
        </Link>
      </Table.Cell>
      <Table.Cell>{bankAcct.account_number}</Table.Cell>
      <Table.Cell>{bankAcct.routing_number}</Table.Cell>
      <Table.Cell>{bankAcct.address}</Table.Cell>
      <Table.Cell>{bankAcct.created_at}</Table.Cell>
    </Table.Row>
  )
};
