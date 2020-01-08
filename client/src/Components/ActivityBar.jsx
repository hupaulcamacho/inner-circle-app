import React from 'react';
import './ActivityBar.css';


class ActivityBar extends React.Component{
	constructor(){
		super();
		this.state = {

		};
	};


	render(){
		return(
		<div class="userActivityBar">
			  <a class="active" href="#home">Home</a>
			  <a href="#posts">Posts</a>
			  <a href="#circles">Circles</a>
			  <a href="#Info">Info</a>
		</div>
		);
	}
}

export default ActivityBar;