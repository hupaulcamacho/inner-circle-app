import React from 'react';
import './App2.css';

import NavBar from './NavBar'
import axios from 'axios';

class App2 extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            loggedIn: false, 
            signUp: false,
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
            console.log(response.data);
            this.setState({
                user: response.data.loggedInUser,
                loggedIn: true,
               
            })
        } catch (err)  {
            console.log(err)
        }

    }

    registerUser = async (username, password, email) => {
         let imgUrl = `http://localhost:3030/images/avatar`
        const URL = `http://localhost:3030/users/signup/${username}/${password}/${email}`
  
        try {
            let response = await axios.post(URL, imgUrl );
            console.log('', response);
            this.setState({
                user: response.data.loggedInUser,
                loggedIn: true,
                signUp: true

            })
        } catch (err) {
            console.log(err)
        }

    }

    render() {
        const { loggedIn } = this.state
        return (
            <NavBar 
            loginUser={this.loginUser}
            registerUser={this.registerUser}
            loggedIn={loggedIn}
            // signUp = {signUp}
            user = {this.state.user}
            handleCircleChoice = {this.circleWasClicked}
            />
        )
    }

}



  export default App2
