import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../components/App';

// import 'semantic-ui-css/semantic.min.css';
import './application.css';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.querySelector('#root'),
  );
});
