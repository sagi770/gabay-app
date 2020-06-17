import React from 'react';
import { makeStyles } from '@material-ui/styles';
// import jwt_decode from 'jwt-decode';

import { OrdersToolbar, OrdersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const OrderList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <OrdersToolbar />
      <div className={classes.content}>
        <OrdersTable />
      </div>
    </div>
  );
};

export default OrderList;
