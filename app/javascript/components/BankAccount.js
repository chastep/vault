import React from 'react';
import PropTypes from 'prop-types';

const BankAccount = ({ bankAcct }) => (
  <div>
    <h2>
      {bankAcct.nickname + ' - ' + bankAcct.created_at}
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
    </ul>
  </div>
);

BankAccount.propTypes = {
  bankAcct: PropTypes.shape(),
};

BankAccount.defaultProps = {
  bankAcct: undefined,
};

export default BankAccount;
