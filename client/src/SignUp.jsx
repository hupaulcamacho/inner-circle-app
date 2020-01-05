import React from 'react';
import './SignUp.css';

class SignUp extends React.Component{
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
			<form className ='signUp-form' onSubmit={this.handleFormSubmit}>
			<h1>Sign up Today!</h1>
				<div className='form-item'>
					<label for='name'>Enter your email Address</label>
					<input placeHolder='John Doe' type='email'></input>
				</div>
				<div className='form-item'>
					<label for='avatar'>Download your profile picture here</label>
					<input placeHolder='Placeholder for now' type='file'></input>
				</div>
				<button className='form-item' type='submit'>Submit</button>
				<button className='form-item' type='button' onClick={this.backToNav}>Back</button>
			</form>);
	}
}

export default SignUp;