import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css'

const NavBar = () => (
	<div>
		<ul className="nav">
	    <li className="active"><Link to="/">Home</Link></li>
	    <li><Link to="/meals">Meals</Link></li>
			<li><Link to="/post-new-meal">New Meal</Link></li>
			<li className="nav-auth"><Link to="/sign-up-form">Signup</Link></li>
			<li className="nav-auth"><Link to="/log-in-form">Login</Link></li>
		</ul>
	</div>
);

export default NavBar;