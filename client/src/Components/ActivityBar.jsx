import React from 'react';
import './ActivityBar.css';
import UserInfo from './UserInfo';


class ActivityBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			
		};
	};

	handleInfo = (e) => {
		console.log('info', e.target.href)
	}
	

	render(){
		return(
		<div class="userActivityBar">
			  <a class="active" href="#home">Home</a>
			  <a href="#posts">Posts</a>
			  <a href="#circles">Circles</a>
			  <a href="#Info" onClick={this.handleInfo}>Info
			  	<UserInfo/>
			  </a>
		</div>
		);
	}
}

export default ActivityBar;