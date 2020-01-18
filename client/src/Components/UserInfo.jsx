import React from 'react';
// import axios from 'axios';

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            info: 
                {username: '',
                email: ''},
            change: false,
            password: null,
            

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
        this.setState({ 
            hide: true
        })
    }

    handleChangeButton = (e) => {

        const { hide, username, email, password } = this.state
        
        // const email = this.state.email
        // const password = this.state.password
        console.log('user', this.props.username)
          if (hide === true) {

            this.setState({
                password: password,
                email: email,
                username: username,
                change: true, 
               
            })
        }
         console.log('email!!!!', email)
           console.log('user', this.props.username)
        
    }

  


    render() {
        // const { username , email, password } = this.state
        const show = this.props.hide
        console.log('!!!', this.props.toggleInput)

         return (
            <div className='edit-profile'>
                <a onClick={this.props.toggleInput}>
                    <img className='avatar' src={this.props.avatar} width='200px' /><br/>
                    username: {this.props.username}
                    <br></br>
                    email: {this.props.email} 
                    <br></br>
                    {/* password: {this.props.password} */}
                </a>
                

                { show ? <form className='info-form' onSubmit={this.handleSubmit}>
                        New Username
                    <input placeholder='enter new username' type='text' onChange={this.handleUsername}/>
                    New Email
                    <input placeholder='enter new email' type='email' onChange={this.handleEmail}/>
                    New Password
                    <input placeholder='Enter new password'  type='password' onChange={this.handlePassword}/>
                    <input type='file' onChange={this.handleAvatarFile}/>
                    <input type='submit' value='Upload'/>

                    <button onClick={this.handleChangeButton}>Submit</button> 
                </form> : "" }
            </div>
        )
    }
       
    
}

export default UserInfo;
