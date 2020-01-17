import React from 'react';
import './SignUp.css';
import axios from 'axios';

class SignUp extends React.Component{
	constructor() {
		super();
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

	handlePassword = e => {
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
			console.log('response', response)
			
				this.setState({
					email: response.data.user.email,
					username: response.data.user.username,
					password: response.data.user.password,
					imgFile: response.data.user.imgFile
				})
			
		} catch (err) {
			console.log(err)
		}
	}


	render() {
		let { signUp } = this.props
		console.log('signup', signUp)
		const { email, username, password } = this.state
		return(
			<form className ='signUp-form' onSubmit={this.handleSignUpSubmit}>
			<h1>Sign up Today!</h1>
				<div className='form-item'>
					<label for='name'>Email</label>
					<input placeHolder='enter email' type='text' onChange={this.handleEmailChange} value={email}/>
				</div>
				<div className='form-item'>
					<label for='name'>Username</label>
					<input placeHolder='enter username' type='text' onChange={this.handleUsernameChange} value={username}/>
				</div>
				<div>
					<label for='name'>Password</label>
					<input placeholder='enter password' type='password' onChange={this.handlePassword} value={password}/>
				</div>
				<div className='form-item'>
					<label for='avatar'>Avatar</label>
					<input placeHolder='Placeholder for now' type='file' onChange={this.handleFileInput}/>
				</div>
				<button className='form-item' type='submit'>Submit</button>
				<button className='form-item' type='button' onClick={this.backToNav}>Back</button>
			</form>);
	}
}

export default SignUp;