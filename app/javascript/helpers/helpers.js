import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Message } from "semantic-ui-react";

export const BANK_ACCOUNT_HEADERS = [
  'ID',
  'Nickname',
  'Account Number',
  'Routing Number',
  'Address',
  'Created At' 
];

export const LOCATION_ATTRS = [
  'address',
  'address2',
  'city',
  'postal'
];

export const validateBankAccount = (bankAcct) => {
  const errors = [];

  if (bankAcct.account_number === '') {
    errors.push('You must enter a valid account number!');
  }

  if (bankAcct.routing_number === '') {
    errors.push('You must enter a valid routing number!');
  }

  if (bankAcct.address === '') {
    errors.push('You must enter a valid address!');
  }

  if (bankAcct.city === '') {
    errors.push('You must enter a valid city!');
  }
  
  return errors;
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

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

export const bankAccountErrors = (errors) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <Message color='red'>
      <Message.Header>Form Errors</Message.Header>
      <Message.List items={errors} />
    </Message>
  );
};
