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
      		infoDisplay: false,
      		allUserCircles: '',
      		allUserPosts: ''
		};
	};

	handlePosts = async () => {
		let userId = await axios.get(`http://localhost:3030/users/username/${this.props.username}`);
		let userPosts = await axios.get(`http://localhost:3030/posts/users/${userId.data.data.id}`);
		console.log(userPosts.data.payload);
			this.setState(
			{
				postsDisplay: true,
	      		circleDisplay: false,
	      		infoDisplay: false,
	      		allUserPosts: userPosts.data.payload
	      	});
	}

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
	      		infoDisplay: false,
	      		allUserCircles: allUserCircles.data.payload
	      	});

		
		//get all circle names that belong to a user
	};


	render(){
		let toggleCircles = (this.state.circleDisplay) ? <CircleSelect circles={this.state.allUserCircles} />: null;
		let toggleInfo = (this.state.infoDisplay) ? <UserInfo username= {this.props.username}/>: null;
		return(
		<div>
			<div className="userActivityBar">
				<a href="#posts" onClick={this.handlePosts}>Posts</a>
	        	<a href="#circles" onClick={this.getAllUserCircles}>Circles</a>
				<a href="#Info" onClick={this.handleInfo}>Info</a>			
			</div>
			{toggleCircles}
			{toggleInfo}
		</div>
		);
	}
}

export default ActivityBar;