import React from 'react';
import axios from 'axios'

import './Login.css';

class Login extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	backToNav = () => {
		this.props.backToNav();
	}
	handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
        console.log(e.target.value)
	}
	handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
        console.log(e.target.value)
	}
	
	handleFormSubmit = async (e) => {
		e.preventDefault()
		const { username, password } = this.state
		this.props.loginUser(username, password)
	}

	render(){
		const { username, password } = this.state
		return(
			<form className ='login-form' onSubmit={this.handleFormSubmit}>
				<h1> Login </h1>
				
				<label>Username</label>
				<input type='text' value={username} placeHolder='enter username' onChange={this.handleUsernameChange} /><br/>
				<label>Password</label>
				<input type='password' value={password} placeHolder='enter password' onChange={this.handlePasswordChange}/>
				<input type='submit' value='submit' />
				
				<button className='form-item' type='button'onClick={this.backToNav}>Back</button>
			</form>);
	}
}

export default Login;