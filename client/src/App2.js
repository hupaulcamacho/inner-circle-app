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
            signUp: true
        }
    }

    loginUser = async (username, password) => {
        const URL = `http://localhost:3030/users/login/${username}/${password}`
        try {
            let response = await axios.post(URL)
            console.log(response)

            this.setState({
                user: response.data.loggedInUser,
                loggedIn: true,
                // signUp: true
            })
        } catch (err)  {
            console.log(err)
        }

    }

    signUp = async (username, password, email, imgfile) => {
        const URL = `http://localhost:3030/users/login/${username}/${password}`
    }
    render() {
        const { loggedIn,signUp, user } = this.state
        return (
            <NavBar 
            loginUser={this.loginUser}
            loggedIn={loggedIn}
            signUp={signUp}
            user={user}
            />
        )
    }

}



  export default App2
