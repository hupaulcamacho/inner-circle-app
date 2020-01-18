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
		console.log('email222', e.target.value)
		this.setState({
			email: e.target.value
		})
	}

	handleUsernameChange = e => {
		console.log('username1111', e.target.value)
		this.setState({
			username: e.target.value
		})
	}

	handlePasswordChange = e => {
		console.log('psw', e.target.value)
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
		const { username, password, email, avatar } = this.state
		this.props.loginUser(username, password)
		this.props.registerUser(username, password, email, avatar)
		console.log('hmm', this.props.registerUser(username, password, email, avatar))
		console.log('haha', this.props.loginUser(username, password))
	}





	// handleSignUpSubmit =  (e) => {
	// 	e.preventDefault()
	// 	// const { email, username, imgFile } = this.state
		// let URL = `http://localhost:3030/users`

		// let info = {
		// 	username: username,
		// 	email: email,
		// 	avatar: imgFile
		// }
		// console.log('ha info', info)
		
		// try {
		// 	let response = await axios.post(URL, info)

		// 	// console.log('info', response)
		// 	this.props.loginUser()
		// 	this.setState({
		// 		info: info
		// 	})
		// 	console.log('info', response.data)

		// } catch (err) {
		// 	console.log(err)
		// }
	// }


	render() {
		const { email, username, password } = this.state
		return(
			<div className='signup-container'>
				<form className ='signUp-form' onSubmit={this.handleSignUpSubmit}>
					<h1>Sign up Today!</h1>
					<div className='form-item'>
						{"Email: "}
						<input placeholder='enter email' type='text' onChange={this.handleEmailChange} value={email}></input>
					</div>
					<div className='form-item'>
						{"Username: "}
						<input placeholder='enter username' type='text' onChange={this.handleUsernameChange} value={username}></input>
					</div>
					<div className='form-item'>
						{"Password: "}
						<input placeholder='enter password' type='text' onChange={this.handlePasswordChange} value={password}></input>
					</div>
					{/* <div className='form-item'>
						{"Avatar: "}
						<input placeholder='Placeholder for now' type='file' onChange={this.handleFileInput}></input>
					</div> */}
					<input className='signup-button' type='submit' value='Sign Up'/>
				</form>
			</div>
		);
	}
}

export default SignUp;


