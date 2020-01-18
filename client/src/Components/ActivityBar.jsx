import React from 'react';
import UserInfo from './UserInfo';
import CircleSelect from './CircleSelect';
import DisplayPosts from './DisplayPosts';
import axios from 'axios';
import { Redirect } from "react-router-dom";

//We are assuming that the username will be passed down through props
class ActivityBar extends React.Component{
	constructor(props){
		super(props);
		console.log(props.user)
		this.state = {
      		postsDisplay: false,
      		circleDisplay: false,
      		infoDisplay: false,
      		allUserCircles: '',

			allUserPosts: '', 
			hide: false,
			goToCirclePage: undefined

		};
	};

	componentDidMount = () =>{
		this.handlePosts()
	}

	goToCircle = (circleId) => {
		this.setState({
			goToCirclePage: circleId
		});
	}

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
				  infoDisplay: true, 
					hide: false
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

	toggleInput = (e) => {
	  	console.log('HEY')
	  	this.setState({
			infoDisplay: true,
	  		hide: true
	  	})
	}


	render(){

		let toggleCircles = (this.state.circleDisplay) ? <CircleSelect circles={this.state.allUserCircles} goToCircle = {this.goToCircle} />: null;
		let toggleInfo = (this.state.infoDisplay) ? 
		<UserInfo 
		username= {this.props.user.username} 
		email={this.props.user.username} 
		password={this.props.user.password} 
		hide={this.state.hide} 
		toggleInput={this.toggleInput}
		avatar={this.props.user.avatar}

		/>: null;

		let togglePosts = (this.state.postsDisplay) ? <DisplayPosts username= {this.props.user.username} posts={this.state.allUserPosts} singleUser = {true} /> : null;
		let goToCirclePage = (this.state.goToCirclePage) ? <Redirect to={`/circlePage/${this.state.goToCirclePage}`} />: null;

		return(
		<div>
			<div className="userActivityBar">
				<a href="#posts" onClick={this.handlePosts}>Posts</a>
	        	<a href="#circles" onClick={this.getAllUserCircles}>Circles</a>
				<a href="#Info" onClick={this.handleInfo}>Info</a>			
			</div>

			{goToCirclePage}
			{toggleCircles}
			{toggleInfo}
			{togglePosts}
		</div>
		);
	}
}

export default ActivityBar;