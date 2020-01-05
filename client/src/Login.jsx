import React from 'react';
import './Login.css';

class Login extends React.Component{
	constructor() {
		super();
		this.state = {

		};
	}

	backToNav = () => {
		this.props.backToNav();
	}
 

	render(){
		return(
			<form className ='login-form' onSubmit={this.handleFormSubmit}>
				<h1>Login now!</h1>
				<div className='form-item'>
					<label for='name'>Enter your email Address</label>
					<input placeHolder='John Doe' type='email'></input>
				</div>
				<button className='form-item' type='submit'>Submit</button>
				<button className='form-item' type='button'onClick={this.backToNav}>Back</button>
			</form>);
	}
}

export default Login;