export const validateBankAccount = (bankAcct) => {
  const errors = {};

  if (bankAcct.account_number === '') {
    errors.account_number = 'You must enter a valid account number!';
  }

  if (bankAcct.routing_number === '') {
    errors.routing_number = 'You must enter a valid routing number!';
  }

  if (bankAcct.address === '') {
    errors.address = 'You must enter a valid address!';
  }

  if (bankAcct.city === '') {
    errors.city = 'You must enter a valid city!';
  }

  console.log(bankAcct);
  return errors;
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
