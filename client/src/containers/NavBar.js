import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
          {user.role === 'chef'
            ? <li className="no-cursor">
                <Avatar src={user.image} size={30} style={style} />
                {user.user}
              </li>
            : null}
          {user.role === 'user'
            ? <li className="no-cursor">Welcome {user.user} !</li>
            : null}
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
            <a onClick={this.props.logout}>Logout</a>
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

export default connect(mapStateToProps, { getUserDetails, logout })(NavBar);
