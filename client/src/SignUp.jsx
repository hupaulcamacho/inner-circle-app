import React from 'react';
import axios from 'axios';

class SignUp extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			
				email: '',
				username: '',
				password: '',
				imgFile: null
			
		
		};
	}

	backToNav = () => {
		this.props.backToNav();
	}

	handleEmailChange = e => {
		this.setState({
			email: e.target.value
		})
	}

	handleUsernameChange = e => {
		this.setState({
			username: e.target.value
		})
	}

	handlePasswordChange = e => {
		this.setState({
			password: e.target.value
		})
	}
	
	handleFileInput = e => {
		console.log('file changed', e.target.files)
		this.setState({
		  imgFile: e.target.files[0].name
		})
	  }

	handleSignUpSubmit =  (e) => {
		e.preventDefault()
		const {
			username,
			password,
			email,
			avatar
		} = this.state
		this.props.registerUser(username, password, email, avatar)
	}
		

	render() {
		const { email, username, password } = this.state
		console.log('check', email)
		return(
			<div className='signup-container'>
				<form className ='signUp-form' onSubmit={this.handleSignUpSubmit}>
				<h1>Sign up Today!</h1>
				<div className='form-item'>
					<label for='name'>Email</label>
					<input placeholder='enter email' type='text' onChange={this.handleEmailChange} value={email}></input>
				</div>
				<div className='form-item'>
					<label for='name'>Username</label>
					<input placeholder='enter username' type='text' onChange={this.handleUsernameChange} value={username}></input>
				</div>
				<div className='form-item'>
					<label for='name'>password</label>
					<input placeholder='enter password' type='password' onChange={this.handlePasswordChange} value={password}></input>
				</div>
				<div className='form-item'>
					<label for='avatar'>Avatar</label>
					<input placeholder='Placeholder for now' type='file' onChange={this.handleFileInput}></input>
				</div>
				<input className='signup-button' type='submit' value='Sign Up' />
			</form>
			</div>
			);
	}
}

export default SignUp;