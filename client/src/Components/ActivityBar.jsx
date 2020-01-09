import React from 'react';
import './ActivityBar.css';
import UserInfo from './UserInfo';
import CircleSelect from './CircleSelect';
import axios from 'axios';

//We are assuming that the username will be passed down through props
class ActivityBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
      		postsDisplay: false,
      		circleDisplay: false,
      		infoDisplay: false
		};
	};

	handleInfo = (e) => {

		console.log('info', e.target.href)
		this.setState(
			{
				postsDisplay: false,
	      		circleDisplay: false,
	      		infoDisplay: true
	      	});
	};

	
	getAllUserCircles = async () => {
		let userId = await axios.get(`http://localhost:3030/users/username/${this.props.username}`);
		console.log(userId.data.data.id);
		let allUserCircles = await axios.get(`http://localhost:3030/circles/getUserCircles/${userId.data.data.id}`);
		console.log(allUserCircles.data.payload);
		this.setState(
			{
				postsDisplay: false,
	      		circleDisplay: true,
	      		infoDisplay: false
	      	});

		
		//get all circle names that belong to a user
	};


	render(){
		let toggleCircles = (this.state.circleDisplay) ? <CircleSelect />: null;
		let toggleInfo = (this.state.infoDisplay) ? <UserInfo username= {this.props.username}/>: null;
		return(
		<div className="userActivityBar">
			<a href="#posts">Posts</a>
        	<a href="#circles" onClick={this.getAllUserCircles}>Circles</a>
        		{toggleCircles}
			<a href="#Info" onClick={this.handleInfo}>Info
			  	{toggleInfo}
			</a>
		</div>
		);
	}
}

export default ActivityBar;