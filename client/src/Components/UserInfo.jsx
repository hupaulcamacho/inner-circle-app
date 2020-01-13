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
        thhis.setState({
            password: e.target.value
        })
        console.log('password', e.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    


    handleChangeButton = (e) => {
         
        const {change} = this.state
    
        const username = this.state.username
        console.log('username????', username)
        const email = this.state.email
        const password = this.state.password
        // console.log('user', this.props.username)
        if (this.props.username !== username && change === true) {
          
            this.setState({
                username: username
                
            })
         

        } else if (this.props.email !== email && change === true) {
            this.setState({
                email: email
               
            })
        } else if (this.props.pasword !== password && change === true) {
            this.setState({
                password: password
            })
        }
         console.log('email!!!!', email)
           console.log('user', this.props.username)
        
    }


    render() {
         return (
            <div>
                
                <form onSubmit={this.handleSubmit}>
                    <input placeholder={this.state.username} value={this.state.username} type='text' onChange={this.handleUsername}/>
                    <input placeholder={this.state.username} value={this.state.email} type='email' onChange={this.handleEmail}/>
                    <input placeholder={this.state.pasword}  value={this.state.password} type='password' onChange={this.handlePassword}/>
                    <button onClick={this.handleChangeButton}>Submit</button> 
                </form>
            </div>
        )
    }
       
    
}

export default UserInfo;
