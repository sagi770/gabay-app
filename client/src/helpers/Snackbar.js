import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useUtils } from '../context/utils';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbar({ type, message }) {
  const { utils, setUtils } = useUtils();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setUtils({ ...utils, SnackbarStatus: false });
  };

  return (
    <Snackbar
      open={utils.SnackbarStatus}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}
