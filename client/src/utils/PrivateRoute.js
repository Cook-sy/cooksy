import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { decodeToken } from './IsAuthenticated';
export default class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const auth = decodeToken();
    return (
      <Route
        {...rest}
        render={props =>
          auth && auth.role === 'chef'
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
}
