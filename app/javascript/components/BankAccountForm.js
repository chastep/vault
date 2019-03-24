import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Form } from "semantic-ui-react";

import { isEmptyObject, validateBankAccount } from '../helpers/helpers';

const LOCATION_ATTRS = ['address', 'address2', 'city', 'postal'];

class BankAccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankAcct: props.bankAcct,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { bankAcct } = this.state;
    const errors = validateBankAccount(bankAcct);
    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      this.props.onSubmit(bankAcct);
    }
  };

  handleInputChange(e) {
    const { target } = e;
    const { name, value } = target;
    const bankAcctInfo = Object.assign({}, this.state.bankAcct);

    if (LOCATION_ATTRS.includes(name)) {
      bankAcctInfo.location_attributes[name] = value
    } else {
      bankAcctInfo[name] = value
    };

    this.setState({bankAcct: bankAcctInfo});
  };

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div>
        <h3>The following errors prohibited the Bank Account from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  };

  render() {
    const { bankAcct } = this.state;

    return (
      <div>
        <Header>
          New Bank Account
        </Header>
        {this.renderErrors()}
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Account Number</label>
            <input
              type="text"
              id="account_number"
              name="account_number"
              placeholder=''
              value={bankAcct.account_number}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Account Number</label>
            <input
              type="text"
              id="routing_number"
              name="routing_number"
              value={bankAcct.routing_number}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Nickname</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={bankAcct.nickname}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={bankAcct.address}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Address 2</label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={bankAcct.address2}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={bankAcct.city}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>ZIP Code</label>
            <input
              type="text"
              id="postal"
              name="postal"
              value={bankAcct.postal}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
};

BankAccountForm.propTypes = {
  bankAcct: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
};

BankAccountForm.defaultProps = {
  bankAcct: {
    account_number: '',
    routing_number: '',
    nickname: '',
    location_attributes: {
      address: '',
      address2: '',
      city: '',
      postal: '',
    }
  }
};

export default BankAccountForm;
