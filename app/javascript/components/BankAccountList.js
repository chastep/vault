import React from 'react';
import PropTypes from 'prop-types';

class BankAccountList extends React.Component {
  renderBankAccounts() {
    const { bankAccounts } = this.props;
    bankAccounts.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );

    return bankAccounts.map(bankAcct => (
      <li key={bankAcct.id}>
        {bankAcct.nickname}
        {' - '}
        {bankAcct.created_at}
      </li>
    ));
  }

  render() {
    return (
      <section>
        <h2>Bank Accounts</h2>
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
