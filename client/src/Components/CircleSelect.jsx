import React from 'react';
import './CircleSelect.css';


class CircleSelect extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			circleIdClicked: ''
		};
	};


	sendIdBackToAct = (e) => {
		this.props.goToCircle(e.target.value);
	}

	render() {
		let buttons = this.props.circles.map((elem) => {
			return <button className ='myButton' value={elem.id} onClick={this.sendIdBackToAct}>{elem.circle_name}</button>
		});

		return (
			<div className='circle-select'>
				<h1>Select a Circle</h1>
				{buttons}
			</div>
		);
	}

}

export default CircleSelect;