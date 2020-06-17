import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useAuth } from '../../context/auth';
import Loading from '../../theme/Loading';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  const { authTokens } = useAuth();
  const [AuthStatus, setAuthStatus] = useState(false);
  const [LoadingStatus, setLoading] = useState(true);

  useEffect(() => {
    // function changed(status){
    //   setAuthStatus(status);
    // }

    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}auth`, {
        headers: {
          token: authTokens
        }
      })
      .then(res => {
        if (res.status === 200) {
          setAuthStatus(true);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        localStorage.removeItem('token');
      });
  },[authTokens]);

  return LoadingStatus ? (
    <Loading />
  ) : AuthStatus ? (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  ) : (
    <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
