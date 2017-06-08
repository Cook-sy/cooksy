import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUserDetails } from '../actions';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getUserDetails();
  }

  render() {
    const { auth: { user } } = this.props;
    return (
      <div>
        <ul className="nav">
          <li className="active"><Link to="/">Home</Link></li>
          <li><Link to="/meals">Meals</Link></li>
          <li><Link to="/post-new-meal">New Meal</Link></li>
          <li className={`nav-auth ${!user.user ? null : 'hidden'}`}>
            <Link to="/signup">Signup</Link>
          </li>
          <li className={`nav-auth ${!user.user ? null : 'hidden'}`}>
            <Link to="/login">Login</Link>
          </li>
          <li className={`nav-auth ${user.user ? null : 'hidden'}`}>
            <Link to="/logout">Logout</Link>
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

export default connect(mapStateToProps, { getUserDetails })(NavBar);
