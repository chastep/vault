import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Switch } from 'react-router-dom';
import { Container, Segment } from 'semantic-ui-react';

import Header from './Header';
import BankAccount from './BankAccount';
import BankAccountForm from './BankAccountForm';
import BankAccountList from './BankAccountList';
import PropsRoute from './PropsRoute';
import { success } from '../helpers/notifications';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankAccounts: null,
      errors: [],
    };

    this.addBankAccount = this.addBankAccount.bind(this);
    this.updateBankAccount = this.updateBankAccount.bind(this);
    this.deleteBankAccount = this.deleteBankAccount.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/bank_accounts.json')
      .then(response => this.setState(
        { bankAccounts: response.data }
      ))
      .catch((error) => {
        console.log(error);
      });
  }

  addBankAccount(newBankAcct) {
    axios
      .post('/api/bank_accounts.json', newBankAcct)
      .then((response) => {
        success('Bank Account added!');
        const savedBankAcct = response.data;
        this.setState(prevState => ({
          bankAccounts: [...prevState.bankAccounts, savedBankAcct],
          errors: []
        }));

        const { history } = this.props;
        history.push(`/bank_accounts/${savedBankAcct.id}`);
      })
      .catch((error) => {
        const messages = error.response.data.message
        this.setState(prevState => ({
          bankAccounts: prevState.bankAccounts,
          errors: messages
        }));

        const { history } = this.props;
        history.push(`/bank_accounts`);
        history.push(`/bank_accounts/new`);
      });
  }

  updateBankAccount(updatedBankAcct) {
    axios
      .put(`/api/bank_accounts/${updatedBankAcct.id}.json`, updatedBankAcct)
      .then((response) => {
        success('Bank Account updated!');
        const { bankAccounts } = this.state;
        const updatedBankAcct = response.data;
        const newBankAccounts = bankAccounts.filter(bank_acct => bank_acct.id !== updatedBankAcct.id);
        newBankAccounts.push(updatedBankAcct)
        this.setState({
          bankAccounts: newBankAccounts,
          errors: []
        });

        const { history } = this.props;
        history.push(`/bank_accounts/${updatedBankAcct.id}`);
      })
      .catch((error) => {
        const messages = error.response.data.message
        this.setState(prevState => ({
          bankAccounts: prevState.bankAccounts,
          errors: messages
        }));

        const { history } = this.props;
        history.push(`/bank_accounts`);
        history.push(`/bank_accounts/${updatedBankAcct.id}/edit`);
      });
  }

  deleteBankAccount(bankAcctId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/bank_accounts/${bankAcctId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('Bank Account deleted!');
            const { bankAccounts } = this.state;
            this.setState({
              bankAccounts: bankAccounts.filter(bank_acct => bank_acct.id !== bankAcctId)
            });

            const { history } = this.props;
            history.push('/bank_accounts');
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
        <Container>
          <Segment.Group raised>
            <Segment>
              <Header />
            </Segment>
            <Segment>
              <BankAccountList
                bankAccounts={bankAccounts}
                activeId={Number(bankAcctId)} />
            </Segment>
            <Segment>
              <Switch>
                <PropsRoute
                  path='/bank_accounts/new'
                  component={BankAccountForm}
                  errors={this.state.errors}
                  onSubmit={this.addBankAccount} />
                <PropsRoute
                  exact
                  path='/bank_accounts/:id/edit'
                  component={BankAccountForm}
                  bankAcct={bankAcct}
                  errors={this.state.errors}
                  onSubmit={this.updateBankAccount}
                />
                <PropsRoute
                  path='/bank_accounts/:id'
                  component={BankAccount}
                  bankAcct={bankAcct}
                  onDelete={this.deleteBankAccount} />
              </Switch>
            </Segment>
          </Segment.Group>
        </Container>
      </div>
    );
  }
}

Page.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Page;
