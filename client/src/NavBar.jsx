import React from 'react';
import './NavBar.css';
import ReactDOM, { render } from 'react-dom';
import { Switch, Route, Link } from "react-router-dom";
import UserProfile from './Components/UserProfile'
import MainPage from './Components/Mainpage'
import Login from './Login'
import SignUp from './SignUp'
import Search from './Components/Search'
import ActivityBar from './Components/ActivityBar'

const NavBar = (props) => {
	const { loggedIn, loginUser, user } = props

	const renderLogin = () => {
		return(
			<Login 
			loginUser={loginUser}
			/>
		)
	}
	const renderUserPage = () => {
		return (
			<ActivityBar user = {user} />);
	}

	//const renderUserPage = () => {}
	if (loggedIn === true) {
		return (
			<div>
				<nav>
					<Link to="/userprofile">Profile</Link>
					{" "}
					<Link to="/search">Search</Link>
					{" "}
					{/* <Link to="/logout">Log Out</Link> */}
				</nav>
				<Switch>
					<Route path="/userprofile" render={renderUserPage} />
					<Route path="/search" component={Search} />
					{/* <Route path="/logout" component={LogOut} /> */}
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
         			<Route exact path="/" component={MainPage} />
         			<Route path="/login" render={renderLogin} />
         			<Route path="/signup" component={SignUp} />
      			</Switch>

				
     		</div>
		)
	}
}


export default NavBar;