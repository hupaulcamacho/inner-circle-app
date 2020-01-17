import React from 'react';
import axios from 'axios';

class SignUp extends React.Component{
	constructor() {
		super();
		this.state = {
			email: '',
			username: '',
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
	handleFileInput = e => {
		console.log('file changed', e.target.files)
		this.setState({
		  imgFile: e.target.files[0].name
		})
	  }

	handleSignUpSubmit = async (e) => {
		e.preventDefault()
		const { email, username, imgFile } = this.state
		let URL = `http://localhost:3030/users`

		let info = {
			username: username,
			email: email,
			avatar: imgFile
		}
		
		try {
			let response = await axios.post(URL, info)
		} catch (err) {
			console.log(err)
		}
	}


	render() {
		const { email, username } = this.state
		return(
			<div className='signup-container'>
				<form className ='signUp-form' onSubmit={this.handleSignUpSubmit}>
				<h1>Sign up Today!</h1>
				<div className='form-item'>
					{"Email: "}
					<input placeHolder='enter email' type='text' onChange={this.handleEmailChange} value={email}></input>
				</div>
				<div className='form-item'>
					{"Username: "}
					<input placeHolder='enter username' type='text' onChange={this.handleUsernameChange} value={username}></input>
				</div>
				<div className='form-item'>
					{"Avatar: "}
					<input placeHolder='Placeholder for now' type='file' onChange={this.handleFileInput}></input>
				</div>
				<input className='signup-button' type='submit' value='Sign Up' />
			</form>
			</div>
			);
	}
}

export default SignUp;