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



	handleSignUpSubmit = async (e) => {
		e.preventDefault()
		
		const { email, username, password } = this.state
		
		let URL = `http://localhost:3030/users`

		let info = {
			username: username,
			email: email,
			password: password
		}
		// console.log(info)
		// data.append('info', info)
		
		
		try {
			let response = await axios.post(URL, info)

			// this.props.loginUser()
			this.setState({
				info: response.data
			})
			console.log('info', response.data)

		} catch (err) {
			console.log(err)
		}

		this.props.loginUser(info.username, info.password)


	const { username, password, email, avatar } = this.state
		this.props.loginUser(username, password)
		this.props.registerUser(username, password, email, avatar)
		console.log('hmm', this.props.registerUser(username, password, email, avatar))
		console.log('haha', this.props.loginUser(username, password)) 

 	  //const { avatar } = this.state
		//this.props.loginUser(username, password)
		//this.props.registerUser(username, password, email, avatar)
		//console.log('hmm', this.props.registerUser(username, password, email, avatar))
	}
	
	render() {
		const { email, username, password } = this.state
		return(
			<div className='signup-container'>
				<h1>Sign up Today!</h1>
				<form action="/users" method="post" className ='signUp-form' onSubmit={this.handleSignUpSubmit} enctype="multipart/form-data" >
				
				<div className='form-item'>
					{"Email: "}
					<input placeHolder='enter email' type='text' onChange={this.handleEmailChange} value={email}></input>
				</div>
				<div className='form-item'>
					{"Username: "}
					<input placeHolder='enter username' type='text' onChange={this.handleUsernameChange} value={username}></input>
				</div>
				<div className='form-item'>
					{"Password: "}
					<input placeHolder='enter password' type='text' onChange={this.handlePasswordChange} value={password}></input>
				</div>
				
				{/* {"Avatar: "} 
				<input type='file' onChange={this.handleFileInput}></input> */}
				
				<input className='signup-button' type='submit' value='Sign Up' />
			</form>

			</div>
		);
	}
}

export default SignUp;


