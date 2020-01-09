import React from 'react';
import './ActivityBar.css';
import UserInfo from './UserInfo';
import axios from 'axios';

//We are assuming that the username will be passed down through props
class ActivityBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
      
		};
	};

	handleInfo = (e) => {
		// console.log('info', e.target.href)
	}
	
	getAllUserCircles = async () => {
		let userId = await axios.get(`http://localhost:3030/users/username/${this.props.username}`);
		console.log(userId.data.data.id);
		let allUserCircles = await axios.get(`http://localhost:3030/circles/getUserCircles/${userId.data.data.id}`);
		console.log(allUserCircles.data.payload);
		
		//get all circle names that belong to a user
	}


	render(){
		return(
		<div className="userActivityBar">
			  <a href="#posts">Posts</a>
        <a href="#circles" onClick={this.getAllUserCircles}>Circles</a>

			  <a href="#Info" onClick={this.handleInfo}>Info
			  	<UserInfo/>
			  </a>
		</div>
		);
	}
}

export default ActivityBar;