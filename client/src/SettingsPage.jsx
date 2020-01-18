import React from 'react';
import Search from './Components/Search';
import axios from 'axios'; 
//windows.location.pathname


class SettingsPage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			displayAddUser: false,
			displayDefault: true,
			displayDeleteUser: false
		};
	}

	handleAddUser = () => {
		this.setState({
			displayAddUser: true,
			displayDefault: false, 
			displayDeleteUser: false
		})
	}

	handleDeleteUser = () => {
		this.setState({
			displayAddUser: false,
			displayDefault: false, 
			displayDeleteUser: true
		});
	}

	goBack = () => {
		this.setState({
			displayAddUser: false,
			displayDefault: true,
			displayDeleteUser: false
		})
	}

	 addSearchBox = () => {
		return (
			<div className ='addUser'>
				<h4>Choose a user to add</h4>
				<Search settings={true} delete ={false}/>
				<button onClick={this.goBack}>Back</button>
			</div>)
	}

	deleteSearchBox = () => {
		return (
			<div className ='addUser'>
				<h4>Choose a user to delete</h4>
				<Search settings={true} delete = {true} {...this.props} />
				<button onClick={this.goBack}>Back</button>
			</div>)
	}



	render() {
		let buttons = [{name: 'Add User', function: this.handleAddUser}, {name: 'Delete User', function: this.handleDeleteUser}];
		 buttons = buttons.map((elem) => {
			return (<button onClick={elem.function}>{elem.name}</button>);
		})
		buttons = (this.state.displayDefault) ? buttons : null;
		let toggleAddUser = (this.state.displayAddUser) ? this.addSearchBox(): null;
		let toggleDeleteUser = (this.state.displayDeleteUser) ? this.deleteSearchBox(): null;
		return(
			<div className= 'settings'>
				{buttons}
				{toggleAddUser}
				{toggleDeleteUser}
			</div>
			);

	}
}

export default SettingsPage;