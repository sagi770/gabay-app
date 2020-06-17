import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { TextField, Card } from '@material-ui/core';

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
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const OrdersToolbar = props => {
  const { className, setSelectedDate, ...rest } = props;
  const classes = useStyles();

  const handleDateChange = date => {
    setSelectedDate(date.target.value);
  };

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const newDate = yyyy + '-' + mm + '-' + dd;

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <Card>
          <TextField
            id="date"
            label="Choose Month To Show"
            type="date"
            defaultValue={newDate}
            onChange={handleDateChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Card>
      </div>
    </div>
  );
};

OrdersToolbar.propTypes = {
  className: PropTypes.string
};

export default OrdersToolbar;
