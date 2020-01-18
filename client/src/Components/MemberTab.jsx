import React from 'react';
import './MemberTab.css';


class MemberTab extends React.Component {

	constructor() {
		super() ;
		this.state = {

		};
	};


	render() {
		let listOfMembers = this.props.members.map((elem) => {
			return (	
			<div className='user'>
				<img className='avatar' src={elem.avatar} height='150' />
				<h3>{elem.username}</h3>
			</div>			
			);
		});
		return(
			<div className='member-list'>
				{listOfMembers}
			</div>
			) ;
	}
}

export default MemberTab;