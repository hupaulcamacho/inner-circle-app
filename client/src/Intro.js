import React from 'react';
import './Intro.css';
import Interval from 'react-interval-rerender';

let introductions = ['Hi there!', "Our names are Chuck, Johanne, and Hupaul", 'We worked together to make a website that creates selective groups for users ', 'Welcome to Inner Circle!!'
];
let tracker = -1;
class Intro extends React.Component {
	constructor() {
		super();
		this.state = {
		}

	}

	continueIntro = () => {
		tracker = tracker + 1;
		if(tracker === introductions.length){
			this.props.endIntro();
		}
		return(<h1 className='intro-h1'>{introductions[tracker]}</h1>);	
	}


	render() {
		return(
			<div className='black-background typewriter'>
			  <Interval delay={5000}>
   				{this.continueIntro}
  			  </Interval>
  			  <button onClick={this.props.endIntro}>Skip Intro</button>
			</div>
			)
	}
}

export default Intro;