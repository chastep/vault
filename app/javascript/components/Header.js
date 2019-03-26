import React from 'react';
import { Header as HeaderUI, Icon } from "semantic-ui-react";

const Header = () => (
  <HeaderUI as='h1' textAlign='center' icon>
    <Icon name='lock' />
    Vault
    <HeaderUI.Subheader>
      Manage your Bank Accounts with ease!
    </HeaderUI.Subheader>
  </HeaderUI>
);

export default Header;
