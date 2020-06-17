import React from 'react';
import { Switch } from 'react-router-dom';

import { RouteWithLayout } from './components';
import {  Minimal as MinimalLayout } from './layouts';

import {
  SignIn as SignInView,
} from './views';

const MinimalRoutes = () => {
  return (
    <Switch>
     
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
    </Switch>
  );
};

export default MinimalRoutes;
