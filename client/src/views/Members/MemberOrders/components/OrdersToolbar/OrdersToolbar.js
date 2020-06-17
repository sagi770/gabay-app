import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import getIdFromPathname from '../../../../../helpers/getIdFromPathname';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const OrdersToolbar = props => {
  const { className, ...rest } = props;
  let history = useHistory();
  const id = getIdFromPathname(history.location.pathname);

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
      <RouterLink to={`/customers/exprotView/${id}`}>

        <Button
          color="primary"
          variant="contained"
        >
          Export View
        </Button>
        </RouterLink>
      </div>
      
    </div>
  );
};

OrdersToolbar.propTypes = {
  className: PropTypes.string
};

export default OrdersToolbar;
