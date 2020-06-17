import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

import getIdFromPathname from '../../../../helpers/getIdFromPathname';
import CustomizedSnackbar from '../../../../helpers/Snackbar'; //TODO: move it outside to be call from context
import { useUtils } from '../../../../context/utils';

const useStyles = makeStyles(() => ({
  img: { width: '200px' }
}));

const EditSettingsDetails = props => {
  const { utils, setUtils } = useUtils();
  const { className, ...rest } = props;
  const [setting, setSetting] = useState({});
  const history = useHistory();
  const id = getIdFromPathname(history.location.pathname);

  const [SnackbarData, setSnackbarData] = useState({
    type: 'success',
    message: 'success!'
  });
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}utils/getCurrency`, {
        headers: {
          token: localStorage.token
        }
      })
      .then(res => {
        setSetting(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  const handleChange = event => {
    event.persist();
    setSetting({
      ...setting,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .put(`${process.env.REACT_APP_API_ENDPOINT}utils/getCurrency`, setting, {
        headers: {
          token: localStorage.token
        }
      })
      .then(res => {
        setSnackbarData({
          message: 'setting been update!'
        });
        setUtils({ ...utils, SnackbarStatus: true });
      })
      .catch(err => {
        setSnackbarData({
          type: 'error',
          message: err.message
        });
        setUtils({ ...utils, SnackbarStatus: true });
        console.error(err);
      });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <CardHeader title={`Setting`} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={9} xs={12}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="USD to NIS value"
                  margin="dense"
                  name="nis_currency"
                  onChange={handleChange}
                  required
                  value={setting.nis_currency || ''}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </form>

      <CustomizedSnackbar
        type={SnackbarData.type}
        message={SnackbarData.message}
      />
    </Card>
  );
};

EditSettingsDetails.propTypes = {
  className: PropTypes.string
};

export default EditSettingsDetails;
