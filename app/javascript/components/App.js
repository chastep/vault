import React from 'react';
import { Route } from 'react-router-dom';
import { Alert } from '../helpers/notifications';

import Page from './Page';

const App = () => (
  <div>
    <Route path='/bank_accounts/:id?' component={Page} />
    <Alert stack={ { limit: 3 } } />
  </div>
);

export default App;
