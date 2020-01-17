import React from 'react';
import UserInfo from './UserInfo';
import CircleSelect from './CircleSelect';
import DisplayPosts from './DisplayPosts';
import axios from 'axios';

//We are assuming that the username will be passed down through props
class ActivityBar extends React.Component{
	constructor(props){
		super(props);
		// console.log('user$$$$$', props.user)
		this.state = {
      		postsDisplay: false,
      		circleDisplay: false,
      		infoDisplay: false,
      		allUserCircles: '',
			allUserPosts: '',
		};
	};

	handlePosts = async () => {
		let userPosts = await axios.get(`http://localhost:3030/posts/users/${this.props.user.id}`);
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
		let allUserCircles = await axios.get(`http://localhost:3030/circles/getUserCircles/${this.props.user.id}`);
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
		let toggleInfo = (this.state.infoDisplay) ? <UserInfo username= {this.props.user.username} email= {this.props.user.email} password={this.props.user.password} />: null;
		console.log('user####', this.props.user.email)
		let togglePosts = (this.state.postsDisplay) ? <DisplayPosts posts={this.state.allUserPosts} singleUser = {true} /> : null;
		return(
		<div>
			<div className="userActivityBar">
				<a href="#posts" onClick={this.handlePosts}>Posts</a>
	        	<a href="#circles" onClick={this.getAllUserCircles}>Circles</a>
				<a href="#Info" onClick={this.handleInfo}>Info</a>			
			</div>
			{toggleCircles}
			{toggleInfo}
			{togglePosts}
		</div>
		);
	}
}

export default ActivityBar;