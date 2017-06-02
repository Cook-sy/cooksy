import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { decodeToken } from './IsAuthenticated';
export default function PrivateRoute(props) {
  const { component: Component, user, ...rest } = props;
  const auth = decodeToken();
  return (
    <Route
      {...rest}
      render={props =>
        auth && auth.role === user
          ? <Component {...props} />
          : <Redirect
              to={{
                pathname: '/sign-up-form',
                state: { from: props.location }
              }}
            />}
    />
  );
}
