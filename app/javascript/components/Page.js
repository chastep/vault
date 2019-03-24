import React from 'react';
import axios from 'axios';
import Header from './Header';
import BankAccountList from './BankAccountList';

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
      }
    );
  }

  render() {
    const { bankAccounts } = this.state;
    if (bankAccounts === null) return null;

    return (
      <div>
        <Header />
        <BankAccountList bankAccounts={bankAccounts} />
      </div>
    );
  }
}

export default Page;
