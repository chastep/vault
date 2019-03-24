import React from 'react';
import { Route } from 'react-router-dom';

import Page from './Page';

const App = () => (
  <div>
    <Route path="/bank_accounts/:id?" component={Page} />
  </div>
);

export default App;
