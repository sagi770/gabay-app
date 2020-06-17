import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { CustomersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const CustomerList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CustomersTable />
    </div>
  );
};

export default CustomerList;
