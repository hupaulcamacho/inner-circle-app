import React from 'react';
import './NavBar.css';
import SignUp from './SignUp';



class NavBar extends React.Component {

	constructor(props) {
		super();
		this.state = {
			displaySignUp: true
		};
	}

	handleSignUpClick = () => {
		this.props.pickEntry('signUp');
	}

	handleLoginClick = () => {
		this.props.pickEntry('login');
	}





	render(){
		return (
			<nav className='navbar'>	
				<div className='flex-2'></div>
				<div className='flex-1'><strong><a onClick={this.handleSignUpClick}>Signup</a></strong></div>
				<div className='flex-1'><strong><a onClick={this.handleLoginClick}>Login</a></strong></div>
			</nav>


		)
	}
}


export default NavBar;