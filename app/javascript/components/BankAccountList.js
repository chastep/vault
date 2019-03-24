import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, Button, List } from "semantic-ui-react";

class BankAccountList extends Component {
  renderBankAccounts() {
    const { bankAccounts } = this.props;
    bankAccounts.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );

    return bankAccounts.map(bankAcct => (
      <li key={bankAcct.id}>
        <Link to={`/bank_accounts/${bankAcct.id}`}>
          {bankAcct.nickname + ' - ' + bankAcct.created_at}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <section>
        <h2>
          Bank Accounts
          <Link to="/bank_accounts/new">New Bank Account</Link>
        </h2>
        <ul>{this.renderBankAccounts()}</ul>
      </section>
    );
  }
}

BankAccountList.propTypes = {
  bankAccounts: PropTypes.arrayOf(PropTypes.object),
};

BankAccountList.defaultProps = {
  bankAccounts: [],
};

export default BankAccountList;
