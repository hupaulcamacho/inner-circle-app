import React from 'react';
import ReactDOM, { render } from 'react-dom';
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
            let response = await axios.post(URL)
            this.setState({
                user: response.data.user,
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
            loggedIn={loggedIn}
            />
        )
    }

}


  export default App2
