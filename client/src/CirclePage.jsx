import React from 'react';
import './CirclePage.css';


class CirclePage extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}

	handleCirclePosts = () => {

	}



	render() {
		return(
			<div>
				<div className="userActivityBar">
					<a href="#posts" onClick={this.handlePosts}>Posts</a>
		        	<a href="#members" onClick={this.getAllUserCircles}>Circles</a>
					<a href="#Info" onClick={this.handleInfo}>Info</a>			
				</div>
			</div>
			);
	}



}

export default CirclePage;