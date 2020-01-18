import React from 'react';
import './CirclePage.css';
import axios from 'axios';
import DisplayPosts from './Components/DisplayPosts';
import MemberTab from './Components/MemberTab';
import SettingsPage from './SettingsPage';




class CirclePage extends React.Component {
	constructor(props){
		super();
		this.state = {
			postsDisplay: false,
      		memberDisplay: false,
      		infoDisplay: false,
			currentCircle: '',
			allUsersInCircle: ''
		};
	};

	componentDidMount = async () => {

		let response = await axios.get(`http://localhost:3030/circles/getCircleById/${this.props.match.params.id}`);
		console.log(response.data.message[0]);
		this.setState({
			currentCircle: response.data.message[0]
		});
		
		this.handlePosts()

	}

	handleSettings = () => {
		this.setState({
			postsDisplay: false,
	      	memberDisplay: false,
	      	infoDisplay: true,
		});
	}

	handlePosts = async () => {
		let response = await axios.get(`http://localhost:3030/posts/circle/${this.state.currentCircle.id}`);
		console.log(response.data.payload);
		this.setState(
			{
				postsDisplay: true,
	      		memberDisplay: false,
	      		infoDisplay: false,
	      		allCirclePosts: response.data.payload
	      	});
	}

	handleMembers = async () => {
		let response = await axios.get(`http://localhost:3030/circles/${this.state.currentCircle.id}`);
		console.log(response.data);
		let allUsersInCircle = [];
		let user;
		for(let i = 0; i < response.data.length; i++) {
			user = await axios.get(`http://localhost:3030/users/id/${response.data[i].user_id}`);
			console.log(user);
			allUsersInCircle.push(user.data.data);
		};
		console.log(allUsersInCircle);
		this.setState({
			postsDisplay: false,
	  		memberDisplay: true,
	  		infoDisplay: false,
	  		allUsersInCircle: allUsersInCircle
		});
	}



	render() {
		const { currentCircle } = this.state
		let togglePosts = (this.state.postsDisplay) ? <DisplayPosts posts={this.state.allCirclePosts} singleUser = {false} /> : null;
		let toggleMembers = (this.state.memberDisplay) ? <MemberTab members={this.state.allUsersInCircle} /> : null;
		let toggleSettings = (this.state.infoDisplay) ? <SettingsPage {...this.props} /> : null;
		return(
			<div>
				<div className='circle-profile'>
					<h1>{currentCircle.circle_name}</h1>
					{/* <button>Join</button> */}
				</div>
				<div className="userActivityBar">
					<a href="#posts" onClick={this.handlePosts}>Posts</a>
		        	<a href="#members" onClick={this.handleMembers}>Members</a>
					<a href="#Info" onClick={this.handleSettings}>Settings</a>			
				</div>
				{togglePosts}
				{toggleMembers}
				{toggleSettings}
			</div>
			);
	}



}

export default CirclePage;