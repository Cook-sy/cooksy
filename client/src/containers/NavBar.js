import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';

import { getUserDetails, logout } from '../actions';
import './NavBar.css';
class NavBar extends Component {
  componentWillMount() {
    this.props.getUserDetails();
  }

  render() {
    const { auth: { user } } = this.props;
    const style = { margin: 5 };

    return (
      <div>
        <ul className="nav">
          {user.role === 'chef' &&
            <li className="chef-welcome">
              <Avatar src={user.image} size={30} style={style} />
              {user.user}
            </li>}
          {user.role === 'user' &&
            <li className="user-welcome">Welcome {user.user} !</li>}
          <li>
            <NavLink activeClassName="selected" exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" exact to="/meals">
              Meals
            </NavLink>
          </li>
          {user.role === 'chef' &&
            <li>
              <NavLink activeClassName="selected" exact to="/post-new-meal">
                New Meal
              </NavLink>
            </li>}
          {user.role === 'chef' &&
            <li>
              <NavLink activeClassName="selected" exact to="/request-form">
                New Request
              </NavLink>
            </li>}
          {user.role === 'user' &&
            <li>
              <NavLink activeClassName="selected" exact to="/user-profile">
                My Profile
              </NavLink>
            </li>}
          <li className={`nav-auth ${!user.user ? null : 'hidden'}`}>
            <NavLink activeClassName="selected" exact to="/signup">
              Signup
            </NavLink>
          </li>
          <li className={`nav-auth ${!user.user ? null : 'hidden'}`}>
            <NavLink activeClassName="selected" exact to="/login">
              Login
            </NavLink>
          </li>
          <li className={`nav-auth ${user.user ? null : 'hidden'}`}>
            <a onClick={this.props.logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth: auth
  };
}

export default withRouter(
  connect(mapStateToProps, { getUserDetails, logout })(NavBar)
);
