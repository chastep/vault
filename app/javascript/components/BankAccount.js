import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BankAccount = ({ bankAcct, onDelete }) => (
  <div>
    <h2>
      {bankAcct.nickname + ' - ' + bankAcct.created_at}
      <Link to={`/bank_accounts/${bankAcct.id}/edit`}>Edit</Link>
      <button className="delete" type="button" onClick={() => onDelete(bankAcct.id)}>
        Delete
      </button>
    </h2>
    <ul>
      <li>
        <strong>Account Number: </strong>
        {bankAcct.account_number}
      </li>
      <li>
        <strong>Routing Number: </strong>
        {bankAcct.routing_number}
      </li>
      <li>
        <strong>City: </strong>
        {bankAcct.city}
      </li>
    </ul>
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
