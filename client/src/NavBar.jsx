import React from 'react';
import './NavBar.css';
import ReactDOM, { render } from 'react-dom';
import { Switch, Route, Link } from "react-router-dom";
import Mainpage from './Components/Mainpage'
import Login from './Login'
import SignUp from './SignUp'

const NavBar = (props) => {
	const { loggedIn } = props
	if (loggedIn === true) {
		return (
			<div>
				<nav>
					<Link to="/circles">Circles</Link>
					{" "}
					<Link to="/profile">Profile</Link>
					{" "}
					<Link to="/logout">Log Out</Link>
				</nav>
				<Switch>
					{/* <Route path="/circles" component={Circles} />
					<Route path="/profile" component={Profile} />
					<Route path="/logout" component={LogOut} /> */}
		 		</Switch>
			</div>
		)
	} else {
		return (
			<div>
       			<nav>
         			<Link to="/">Mainpage</Link>
         			{"  "}
         			<Link to="/login">Log In</Link>
         			{"  "}
					 <Link to="/signup">Sign Up</Link>
       			</nav>       		
				<Switch>
         			<Route exact path="/" component={MainProfile} />
         			<Route path="/login" component={Login} />
         			<Route path="/signup" component={SignUp} />
      			</Switch>
     		</div>
		)
	}
}


export default NavBar;