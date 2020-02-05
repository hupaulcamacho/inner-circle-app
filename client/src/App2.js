import React from 'react';
import './App2.css';
import REACT_APP_SERVER_URL from '.env';
import NavBar from './NavBar'
import axios from 'axios';
import Intro from './Intro';

class App2 extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            loggedIn: false, 
            signUp: false,
            circleChosen: false,
            circle: {},
            displayIntro: true
        
        }
    }

    endIntro  = () => {
        this.setState({
            displayIntro: false
        });
    }

    circleWasClicked = (circle) => {
        this.setState({circleChosen: true,
                        circle: circle});
    };

    loginUser = async (username, password) => {
        const URL = `https://cryptic-beyond-79410.herokuapp.com/users/login/${username}/${password}`
        try {
            let response = await axios.post(URL);
            console.log(response.data);
            this.setState({
                user: response.data.loggedInUser,
                loggedIn: true,
                // signUp: true

            })
        } catch (err)  {
            console.log(err)
        }
    }

    logoutUser = async (id) => {
        const URL = `${REACT_APP_SERVER_URL}/${id}`;
        try{
            let response = await axios.patch(URL, {logout: 'Get this user out of here', id: id});
            this.setState({
                user: '',
                loggedIn: false
            })
        }
        catch(err) {
            console.log(err);
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
        let toggleIntro = (this.state.displayIntro) ? <Intro endIntro={this.endIntro} /> : 
                 <NavBar 
            loginUser={this.loginUser}
            registerUser={this.registerUser}
            loggedIn={loggedIn}
            signUp={signUp}
            registerUser={this.registerUser}
            user = {this.state.user}
            handleCircleChoice = {this.circleWasClicked}
            logoutUser= {this.logoutUser}
            />
        return (
           
            <div className='App'>
                 {toggleIntro}
            </div>
            
        )
    }

}



  export default App2
