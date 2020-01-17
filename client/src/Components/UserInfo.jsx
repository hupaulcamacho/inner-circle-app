import React from 'react';
// import axios from 'axios';

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
                username: this.props.username,
                email: this.props.email,
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

        const { change, user, email, password, username} = this.props
        
        // const username = this.props.username
        // const email = this.props.email
        // const password = this.props.password
        console.log('user', this.props.username)
        if (this.props.username !== username && change === true) {
          
            this.setState({
                username: username
            })

        
        } else if (this.props.email !== email && change === true) {

            this.setState({
                email: email
               
            })

        } else if (this.props.password !== password && change === true) {

            this.setState({
                password: password
            })
        }
        //  console.log('email!!!!', email)
        //    console.log('user', this.props.username)
        
    }


    render() {
        const { user, username, email, password } = this.state
        // console.log(user)

         return (
            <div>
                

                <form className='info-form' onSubmit={this.handleSubmit}>
                    New Username
                    <input placeholder={this.props.username} value={username} type='text' onChange={this.handleUsername}/>
                    New Email
                    <input placeholder={this.props.email} value={email} type='email' onChange={this.handleEmail}/>
                    New Password
                    <input placeholder={this.props.password}  value={password} type='password' onChange={this.handlePassword}/>
                    <input type='file' onChange={this.handleAvatarFile}/>
                    <input type='submit' value='Upload' />

                    <button onClick={this.handleChangeButton}>Submit</button> 
                </form>
            </div>
        )
    }
       
    
}

export default UserInfo;
