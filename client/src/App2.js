import React from 'react';
import './App2.css';

import NavBar from './NavBar'
import axios from 'axios';

class App2 extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            loggedIn: false
        }
    }

    loginUser = async (username, password) => {
        const URL = `http://localhost:3030/users/login/${username}/${password}`
        try {
            let response = await axios.post(URL);
            console.log(response);
            this.setState({
                user: response.data.loggedInUser,
                loggedIn: true
            })
        } catch (err)  {
            console.log(err)
        }

    }

    render() {
        const { loggedIn } = this.state
        return (
            <NavBar 
            loginUser={this.loginUser}
            loggedIn={loggedIn}
            user = {this.state.user}
            />
        )
    }

}



  export default App2
