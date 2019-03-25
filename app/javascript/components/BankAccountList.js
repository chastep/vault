import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, Table } from "semantic-ui-react";

import { BANK_ACCOUNT_HEADERS, renderBankAccountRow } from '../helpers/helpers';

class BankAccountList extends Component {
  renderBankAccounts() {
    const { bankAccounts } = this.props;
    bankAccounts.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );

    return (
      bankAccounts.map(bankAcct => (
        renderBankAccountRow(bankAcct)
      ))
    );
  }

  render() {
    return (
      <section>
        <Header as='h2' floated='left'>
          Bank Accounts
        </Header>
        <Header as='h3' floated='right'>
          <Link to={`/bank_accounts/new`}>
            New
          </Link>
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {BANK_ACCOUNT_HEADERS.map((header, index) => (
                <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderBankAccounts()}
          </Table.Body>
        </Table>
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
