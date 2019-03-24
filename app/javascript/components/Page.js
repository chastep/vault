import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Switch } from 'react-router-dom';

import Header from './Header';
import BankAccount from './BankAccount';
import BankAccountForm from './BankAccountForm';
import BankAccountList from './BankAccountList';
import PropsRoute from './PropsRoute';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankAccounts: null,
    };

    this.addBankAccount = this.addBankAccount.bind(this);
  }

  componentDidMount() {
    axios.get('/api/bank_accounts.json')
      .then(response => this.setState({ bankAccounts: response.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  addBankAccount(newBankAcct) {
    axios
      .post('/api/bank_accounts.json', newBankAcct)
      .then((response) => {
        alert('Bank Account Added!');
        const savedBankAcct = response.data;
        this.setState(prevState => ({
          bankAccounts: [...prevState.bankAccounts, savedBankAcct],
        }));
        const { history } = this.props;
        history.push(`/bank_accounts/${savedBankAcct.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { bankAccounts } = this.state;
    if (bankAccounts === null) return null;

    const { match } = this.props;
    const bankAcctId = match.params.id;
    const bankAcct = bankAccounts.find(e => e.id === Number(bankAcctId));

    return (
      <div>
        <Header />
        <BankAccountList
          bankAccounts={bankAccounts}
          activeId={Number(bankAcctId)} />
        <Switch>
          <PropsRoute
            path="/bank_accounts/new"
            component={BankAccountForm}
            onSubmit={this.addBankAccount} />
          <PropsRoute
            path="/bank_accounts/:id"
            component={BankAccount}
            bankAcct={bankAcct} />
        </Switch>
      </div>
    );
  }
}

Page.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Page;
