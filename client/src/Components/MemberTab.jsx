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
			return (<li>
						<img alt='avatar' src={elem.avatar} />
						<p>{elem.username}</p>
					</li> );
		});
		return(
			<div>
			<ul>
				{listOfMembers}
			</ul>
			</div>
			) ;
	}
}

export default MemberTab;