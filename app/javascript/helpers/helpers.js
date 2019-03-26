import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Message } from "semantic-ui-react";
import moment from 'moment-timezone';

export const BANK_ACCOUNT_HEADERS = [
  'Nickname',
  'Account Number',
  'Routing Number',
  'Address',
  'Created At' 
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

  if (bankAcct.region === '') {
    errors.push('You must enter a valid region!');
  }
  
  return errors;
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

const formatAddress = (bankAcct) => {
  return `${bankAcct.address}, ${bankAcct.address2} ${bankAcct.city}, ${bankAcct.region} ${bankAcct.postal}`
}

export const renderBankAccountRow = (bankAcct) => {
  return (
    <Table.Row key={bankAcct.id}>
      <Table.Cell singleLine>
        <Link to={`/bank_accounts/${bankAcct.id}`}>
          {bankAcct.nickname}
        </Link>
      </Table.Cell>
      <Table.Cell>{bankAcct.account_number}</Table.Cell>
      <Table.Cell>{bankAcct.routing_number}</Table.Cell>
      <Table.Cell>{formatAddress(bankAcct)}</Table.Cell>
      <Table.Cell singleLine>{moment(bankAcct.created_at).format('MM/DD/YYYY hh:mm A')}</Table.Cell>
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








