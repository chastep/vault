import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return (
      <div>
        <h2>New Bank Account</h2>
        {this.renderErrors()}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              <strong>Account Number:</strong>
              <input
                type="text"
                id="account_number"
                name="account_number"
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>Routing Number:</strong>
              <input
                type="text"
                id="routing_number"
                name="routing_number"
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>Nickname:</strong>
              <input
                type="text"
                id="nickname"
                name="nickname"
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>Address:</strong>
              <input
                type="text"
                id="address"
                name="address"
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>Address 2:</strong>
              <input
                type="text"
                id="address2"
                name="address2"
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>City:</strong>
              <input
                type="text"
                id="city"
                name="city"
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>ZIP Code:</strong>
              <input
                type="text"
                id="postal"
                name="postal"
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
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
