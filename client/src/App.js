import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { AuthContext } from './context/auth';
import { UtilsContext } from './context/utils';

const browserHistory = createBrowserHistory();

validate.validators = {
  ...validate.validators,
  ...validators
};
function App(props) {
  const [authTokens, setAuthTokens] = useState(localStorage.token);
  const [utils, setUtils] = useState({ SnackbarStatus: false, other: 22 });

  const setUtilsHelper = data => {
    setUtils(data);
  };

  const setTokens = data => {
    localStorage.setItem('token', data);
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <UtilsContext.Provider value={{ utils, setUtils: setUtilsHelper }}>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </ThemeProvider>
      </UtilsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
