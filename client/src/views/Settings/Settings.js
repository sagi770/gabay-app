import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { EditSettingsDetails } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <EditSettingsDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
