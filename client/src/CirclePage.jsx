import React from 'react';
import './CirclePage.css';
import axios from 'axios';


class CirclePage extends React.Component {
	constructor(props){
		super();
		this.state = {
			currentCircle: ''
		};
	};

	componentDidMount = async () => {
		let response = await axios.get(`http://localhost:3030/circles/getCircleById/${this.props.match.params.id}`);
		console.log(response.data.message[0]);
		this.setState({
			currentCircle: response.data.message[0]
		});

	}



	render() {
		return(
			<div>
				<div className="userActivityBar">
					<a href="#posts" onClick={this.handlePosts}>Posts</a>
		        	<a href="#members" onClick={this.getAllUserCircles}>Members</a>
					<a href="#Info" onClick={this.handleInfo}>Info</a>			
				</div>
			</div>
			);
	}



}

export default CirclePage;