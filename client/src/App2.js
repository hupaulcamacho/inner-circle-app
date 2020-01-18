import React from 'react';
import './App2.css';

import NavBar from './NavBar'
import axios from 'axios';

class App2 extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            signUp:true,
            loggedIn: false, 
            circleChosen: false,
            circle: {}
        }
    }

    circleWasClicked = (circle) => {
        this.setState({circleChosen: true,
                        circle: circle});
    };

    loginUser = async (username, password) => {
        const URL = `http://localhost:3030/users/login/${username}/${password}`
        try {
            let response = await axios.post(URL);
            console.log(response);
            this.setState({
                user: response.data.loggedInUser,
                loggedIn: true,
                signUp: true

            })
        } catch (err)  {
            console.log(err)
        }

    }

    registerUser = async() => {
        	console.log('here')
        	let URL = `http://localhost:3030/users/signup`
        	console.log('url', URL)

        	let user = {
        	    username: this.state.username,
        	    email: this.state.email,
        	    password: this.state.password,
        	    // avatar: this.state.imgFile
        	}

        	try {
        	    let response = await axios.post(URL, user)
        	    console.log('info', response)
        	    this.setState({
        	        user: user
        	    })
        	    console.log('info', response.data)
        	} catch (err) {
        	    console.log(err)
        	}
    }

    render() {
        const { loggedIn, signUp } = this.state
        return (
            <NavBar 
            loginUser={this.loginUser}
            loggedIn={loggedIn}
            signUp={signUp}
            registerUser={this.registerUser}
            user = {this.state.user}
            handleCircleChoice = {this.circleWasClicked}
            />
        )
    }

}



  export default App2
