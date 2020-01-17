import React from 'react';
// import axios from 'axios';

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            username: '',
            email: '',
            password: '',
            change: false,
            password: null
        }
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
        console.log('username', e.target.value)
    }

   

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
         console.log('email', e.target.value)
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
        console.log('password', e.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    handleChangeButton = (e) => {
        const { change, user, username } = this.state
        
        const email = this.state.email
        const password = this.state.password
        console.log('user', this.props.username)
        if (user[0].username !== username && change === true) {
          
            this.setState({
                username: username
            })
        
        } else if (user.email !== email && change === true) {
            this.setState({
                email: email
               
            })
        } else if (user.password !== password && change === true) {
            this.setState({
                password: password
            })
        }
         console.log('email!!!!', email)
           console.log('user', this.props.username)
        
    }


    render() {
        const { user, username, email, password } = this.state
        console.log(user)
         return (
            <div >
                
                <form className='info-form' onSubmit={this.handleSubmit}>
                    New Username
                    <input placeholder={user[0].username} value={username} type='text' onChange={this.handleUsername}/>
                    New Email
                    <input placeholder={user[0 ].email} value={email} type='email' onChange={this.handleEmail}/>
                    New Password
                    <input placeholder='Enter new password'  value={password} type='password' onChange={this.handlePassword}/>
                    <input type='file' onChange={this.handleAvatarFile}/>
                    <input type='submit' value='Upload' />
                    <button onClick={this.handleChangeButton}>Submit</button> 
                </form>
            </div>
        )
    }
       
    
}

export default UserInfo;
