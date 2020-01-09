import React from 'react';
import './CircleSelect.css';


	const CircleSelect = (props) => {
		let buttons = props.circles.map((elem) => {
			return <button className ='myButton'>{elem}</button>
		});

		return (
			<div>
				<h1>Select a Circle</h1>
				{buttons}
			</div>
		);
	}



export default CircleSelect;