import React from 'react';
import './NavBar.css';
import ReactDOM, { render } from 'react-dom';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import UserProfile from './Components/UserProfile'
import MainPage from './Components/Mainpage'
import Login from './Login'
import SignUp from './SignUp'
import Search from './Components/Search'
import ActivityBar from './Components/ActivityBar';
import CirclePage from './CirclePage';

const NavBar = (props) => {

	const { loggedIn, loginUser, signUp, registerUser, user, logoutUser } = props

	console.log(user)
	let shouldWeLogOut = false;
	const renderLogin = () => {
		return(
			<Login 
			loginUser={loginUser}
			/>
		)
	}

	const renderSignUp = () => {
		return(
			<SignUp
				registerUser={registerUser}
				loginUser={loginUser}
			/>
		)
	}

	const logOut = () => {
		logoutUser(user.id);
		console.log('this ran hue');
		shouldWeLogOut = true;
	};

	// const circleChoice = (circle) => {
	// 	props.handleCircleChoice(circle);
	// 	console.log('vnavbar');
	// }
	const renderUserPage = () => {
		return (
			<UserProfile user={user} />);
	}

	const renderSearchBar = () => {
		return (
			<Search 
			settings ={false}
			delete = {false}
			// handleCircleChoice = {circleChoice} 
			/> 
			);
	}

	const realLogOut = (!shouldWeLogOut) ? <Redirect to='/' /> : null;

	//const renderUserPage = () => {}
	if (loggedIn === true ) {
		return (
			<div>
				<nav>
					<Redirect to='/userprofile'/>
				<span className="nav-title"> Inner Circle</span>
					<Link to="/userprofile">Profile</Link>
					{" "}
					<Link to="/search">Search</Link>
					{" "}
					<a onClick={logOut}>Logout</a>
					
				</nav>
				<Switch>
					<Route path="/userprofile" render={renderUserPage} />
					<Route path="/search" render={renderSearchBar} />
					{/* <Route path="/logout" component={LogOut} /> */}
					<Route path='/circlePage/:id' component={CirclePage} />
		 		</Switch>
			</div>
		)
	} else {
		return (
			<div className="landing-page">
       			<nav className= 'navbar'>
				   	<span className="nav-title"> Inner Circle</span>
					{realLogOut}
					<Link to="/">Mainpage</Link>
         			{"  "}
         			<Link to="/login">Log In</Link>
         			{"  "}
					<Link to="/signup">Sign Up</Link>		
       			</nav>       		
				<Switch>
         			<Route exact path="/" component={MainPage} />
         			<Route path="/login" render={renderLogin} />
         			<Route path="/signup" render={renderSignUp} />
         			<Route path='/circlePage/:id' component={CirclePage} />
      			</Switch>

				
     		</div>
		)
	}
}


export default NavBar;