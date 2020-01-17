import React from 'react';
import './SignUp.css';
import axios from 'axios';

class SignUp extends React.Component{
	constructor() {
		super();
		this.state = {
			info:{
				email: '',
				username: '',
				password: null,
				imgFile: null
			}
		
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

	handleSignUpSubmit = async (e) => {
		e.preventDefault()
		const { email, username, password, imgFile } = this.state
		let URL = `http://localhost:3030/users`

		let info = {
			username: username,
			email: email,
			password: password,
			avatar: imgFile
		}
		
		try {
			let response = await axios.post(URL, info)
			// console.log('info', response)
			this.setState({
				info: response.data
			})
			console.log('info', response.data)
		} catch (err) {
			console.log(err)
		}
	}


	render() {
		const { email, username, password } = this.state
		return(
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
				<button className='form-item' type='submit'>Submit</button>
				<button className='form-item' type='button' onClick={this.backToNav}>Back</button>
			</form>);
	}
}

export default SignUp;