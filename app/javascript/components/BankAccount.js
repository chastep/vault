import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, Button, List } from "semantic-ui-react";

const BankAccount = ({ bankAcct, onDelete }) => (
  <div>
    <Header as='h2'>
      {bankAcct.nickname + ' - ' + bankAcct.created_at}
    </Header>
    <Link to={`/bank_accounts/${bankAcct.id}/edit`}>Edit</Link>
    <Button
      className="delete"
      type="button"
      onClick={() => onDelete(bankAcct.id)}>
      Delete
    </Button>
    <List>
      <List.Item>
        {bankAcct.account_number}
      </List.Item>
      <List.Item>
        {bankAcct.routing_number}
      </List.Item>
      <List.Item>
        {bankAcct.city}
      </List.Item>
    </List>
  </div>
);

BankAccount.propTypes = {
  bankAcct: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

BankAccount.defaultProps = {
  bankAcct: undefined,
};

export default BankAccount;
