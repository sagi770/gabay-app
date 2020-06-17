import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout, RouteWithLayoutMinimal } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {

  MemberList as MemberListView,
  MemberOrders as MemberOrdersView,
  MemberExprot as MemberExprotView,


  Settings as SettingsView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/members" />
  
      <RouteWithLayout
        component={MemberListView}
        exact
        layout={MainLayout}
        path="/members"
      />
      <RouteWithLayout
        component={MemberOrdersView}
        exact
        layout={MainLayout}
        path="/members/:id"
      />
      <RouteWithLayout
        component={MemberExprotView}
        exact
        layout={MainLayout}
        path="/members/exprotView/:id"
      />

      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />

      <RouteWithLayoutMinimal
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
