import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Form } from 'semantic-ui-react';

import { isEmptyObject, validateBankAccount, bankAccountErrors } from '../helpers/helpers';

class BankAccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankAcct: props.bankAcct,
      errors: props.errors,
      isSubmitting: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  formatBankAccountPayload(bacct) {
    return (
      {
        id: bacct.id,
        bank_account: {
          id: bacct.id,
          account_number: bacct.account_number,
          routing_number: bacct.routing_number,
          nickname: bacct.nickname,
          location_attributes: {
            id: bacct.location_id,
            address: bacct.address,
            address2: bacct.address2,
            city: bacct.city,
            postal: bacct.postal,
          }
        }
      }
    )
  }

  handleSubmit(e) {
    e.preventDefault()

    this.setState({isSubmitting: true})

    const { bankAcct } = this.state;
    const errors = validateBankAccount(bankAcct);

    if (!isEmptyObject(errors)) {
      this.setState({
        isSubmitting: false,
        errors: errors
      });
    } else {
      const payload = this.formatBankAccountPayload(bankAcct);
      this.props.onSubmit(payload);
    }
  }

  handleInputChange(e) {
    const { target } = e;
    const { name, value } = target;
    const bankAcctInfo = Object.assign({}, this.state.bankAcct);
    bankAcctInfo[name] = value

    this.setState({bankAcct: bankAcctInfo});
  }

  render() {
    const submitBtnDisabled = this.state.isSubmitting;
    const { bankAcct } = this.state;
    const cancelURL = bankAcct.id ? `/bank_accounts/${bankAcct.id}` : '/bank_accounts';

    return (
      <div>
        <Header as='h3'>
          Bank Account Info
        </Header>
        {bankAccountErrors(this.state.errors)}
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Account Number</label>
            <input
              type='text'
              id='account_number'
              name='account_number'
              placeholder=''
              value={bankAcct.account_number}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Routing Number</label>
            <input
              type='text'
              id='routing_number'
              name='routing_number'
              value={bankAcct.routing_number}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Nickname</label>
            <input
              type='text'
              id='nickname'
              name='nickname'
              value={bankAcct.nickname}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              type='text'
              id='address'
              name='address'
              value={bankAcct.address}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Address 2</label>
            <input
              type='text'
              id='address2'
              name='address2'
              value={bankAcct.address2}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              type='text'
              id='city'
              name='city'
              value={bankAcct.city}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>ZIP Code</label>
            <input
              type='text'
              id='postal'
              name='postal'
              value={bankAcct.postal}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Button type='submit' disabled={submitBtnDisabled}>Submit</Button>
          <Button type='button' onClick={(e, data) => this.props.history.push(cancelURL)}>Cancel</Button>
        </Form>
      </div>
    );
  }
};

BankAccountForm.propTypes = {
  bankAcct: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.array,
};

BankAccountForm.defaultProps = {
  bankAcct: {
    id: '',
    account_number: '',
    routing_number: '',
    nickname: '',
    location_id: '',
    address: '',
    address2: '',
    city: '',
    postal: '',
  },
  errors: [],
  isSubmitting: false,
};

export default BankAccountForm;
