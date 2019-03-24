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
    this.updateBankAccount = this.updateBankAccount.bind(this);
    this.deleteBankAccount = this.deleteBankAccount.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/bank_accounts.json')
      .then(response => this.setState({ bankAccounts: response.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  addBankAccount(newBankAcct) {
    axios
      .post('/api/bank_accounts.json', newBankAcct)
      .then((response) => {
        alert('Bank Account added!');
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

  updateBankAccount(updatedBankAcct) {
    axios
      .put(`/api/bank_accounts/${updatedBankAcct.id}.json`, updatedBankAcct)
      .then((response) => {
        const { bankAccounts } = this.state;
        const updatedBankAcct = response.data;
        const newBankAccounts = bankAccounts.filter(bank_acct => bank_acct.id !== updatedBankAcct.id);
        newBankAccounts.push(updatedBankAcct)
        const { history } = this.props;
        history.push(`/bank_accounts/${updatedBankAcct.id}`);
        this.setState(
          { bankAccounts: newBankAccounts }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteBankAccount(bankAcctId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/bank_accounts/${bankAcctId}.json`)
        .then((response) => {
          if (response.status === 204) {
            alert('Bank Account deleted!');
            const { history } = this.props;
            history.push('/bank_accounts');
            const { bankAccounts } = this.state;
            this.setState(
              { bankAccounts: bankAccounts.filter(bank_acct => bank_acct.id !== bankAcctId) }
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
            exact
            path="/bank_accounts/:id/edit"
            component={BankAccountForm}
            bankAcct={bankAcct}
            onSubmit={this.updateBankAccount}
          />
          <PropsRoute
            path="/bank_accounts/:id"
            component={BankAccount}
            bankAcct={bankAcct}
            onDelete={this.deleteBankAccount} />
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
