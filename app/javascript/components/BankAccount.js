import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, Button, List, Table, Message } from 'semantic-ui-react';

import { BANK_ACCOUNT_HEADERS, renderBankAccountRow } from '../helpers/helpers';

const BankAccount = ({ bankAcct, onDelete }) => (
    bankAcct ? (
      <div>
        <Header as='h2' floated='left'>
          Bank Account Details - {bankAcct.nickname}
        </Header>
        <Header as='h3' floated='right'>
          <Link to={`/bank_accounts/${bankAcct.id}/edit`}>
            Edit
          </Link>
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {BANK_ACCOUNT_HEADERS.map((header, index) => (
                <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {renderBankAccountRow(bankAcct)}
          </Table.Body>
        </Table>
        <Button className='delete' type='button' onClick={() => onDelete(bankAcct.id)}>
          Delete
        </Button>
      </div>
    )
    :
    (
      <div>
        <Message color='red'>
          <Message.Header>Error</Message.Header>
          <p>Bank Account cannot be found at this time, please try again later</p>
        </Message>
      </div>
    )
);

BankAccount.propTypes = {
  bankAcct: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

BankAccount.defaultProps = {
  bankAcct: undefined,
};

export default BankAccount;
