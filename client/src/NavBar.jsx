import React from 'react';
import './NavBar.css';
import ReactDOM, { render } from 'react-dom';
import { Switch, Route, Link } from "react-router-dom";
import UserProfile from './Components/UserProfile'
import MainPage from './Components/Mainpage'
import Login from './Login'
import SignUp from './SignUp'
import Search from './Components/Search'
import ActivityBar from './Components/ActivityBar';
import CirclePage from './CirclePage';

const NavBar = (props) => {
	const { loggedIn, loginUser, user } = props
	console.log(user)
	const renderLogin = () => {
		return(
			<Login 
			loginUser={loginUser}
			/>
		)
	}

	const renderSignUp = (props) => {
		return(
			<SignUp
				loginUser={loginUser}
			/>
		)
	}

	// const circleChoice = (circle) => {
	// 	props.handleCircleChoice(circle);
	// 	console.log('vnavbar');
	// }
	const renderUserPage = () => {
		return (
			<ActivityBar user = {user} />);
	}

	const renderSearchBar = () => {
		return (
			<Search 
			// handleCircleChoice = {circleChoice} 
			/> 
			);
	}

	//const renderUserPage = () => {}
	if (loggedIn === true ) {
		return (
			<div>
				<nav>
				<span className="nav-title"> Inner Circle</span>
					<Link to="/userprofile">Profile</Link>
					{" "}
					<Link to="/search">Search</Link>
					{" "}
					{/* <Link to="/logout">Log Out</Link> */}
				</nav>
				<Switch>
					<Route path="/userprofile" render={renderUserPage} />
					<Route path="/search" render={renderSearchBar} />
					{/* <Route path="/logout" component={LogOut} /> */}
		 		</Switch>
			</div>
		)
	} else {
		return (
			<div className="landing-page">
       			<nav>
				   	<span className="nav-title"> Inner Circle</span>
					
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
         			<Route path='/circlePage/:id' component={CirclePage} />
      			</Switch>

				
     		</div>
		)
	}
}


export default NavBar;