import React from 'react';
import logo from './logo.svg';
import NavBar from './NavBar';
import SignUp from './SignUp';
import Login from './Login';

import './App.css';

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			displayEntryPage: false,
			entryPage: ''
		}
	};

	pickEntry = (entry) => {
		this.setState({entryPage: entry,
						displayEntryPage: true});
	}

	backToNav = () => {
		this.setState({
				displayEntryPage: false,
				entryPage: ''
		});
	}


	render(){
		let entryPage;
		if(this.state.entryPage === 'signUp'){
			entryPage = <SignUp backToNav ={this.backToNav}/>
		}
		else if(this.state.entryPage === 'login'){
			entryPage = <Login backToNav ={this.backToNav} />
		}
		let toggleEntry = (this.state.displayEntryPage) ? entryPage : <NavBar pickEntry= {this.pickEntry} /> 
		return (
    		<div className="App">
      			{toggleEntry}
    		</div>
  		);
	}
}

export default App;
