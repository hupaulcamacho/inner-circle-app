import React from 'react';
import './CirclePage.css';


class CirclePage extends React.Commponent {
	constructor(props){
		this.super();
		this.state = {
			currentCircle: ''
		};
	};



	render() {
		return(
			<div>
				<div className="userActivityBar">
					<a href="#posts" onClick={this.handlePosts}>Posts</a>
		        	<a href="#members" onClick={this.getAllUserCircles}>Circles</a>
					<a href="#Info" onClick={this.handleInfo}>Info</a>			
				</div>
				{toggleCircles}
				{toggleInfo}
				{togglePosts}
			</div>
			);
	}



}

export default CirclePage;