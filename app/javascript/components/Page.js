import React from 'react';
import axios from 'axios';

import Header from './Header';
import BankAccount from './BankAccount';
import BankAccountList from './BankAccountList';
import PropsRoute from './PropsRoute';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bankAccounts: null,
    };
  }

  componentDidMount() {
    axios.get('/api/bank_accounts.json')
      .then(response => this.setState({ bankAccounts: response.data }))
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
          bankAccounts={bankAccounts} />
        <PropsRoute
          path="/bank_accounts/:id"
          component={BankAccount}
          bankAcct={bankAcct} />
      </div>
    );
  }
}

export default Page;
