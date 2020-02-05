import React from 'react';
import axios from 'axios'

class Login extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			username: 'narutolover',
			password: 'rasengan'
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

		
		return (
			<div className='form-container'>
				<form className='login-form' onSubmit={this.handleFormSubmit}>
					<h1> Login </h1>
					<div>
						{"Username: "}
						<input type='text' value={username} placeHolder='enter username' onChange=	{this.handleUsernameChange} />
					</div>
					<br/>

					<div>
						{"Password: "}
						<input type='password' value={password} placeHolder='enter password' onChange=	{this.handlePasswordChange}/>
					</div>
					
					<input className='login-button' type='submit' value='Log In'/>
				</form>
			</div>
			
			
		)
	}
}

export default Login;