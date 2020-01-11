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
            url: ''

            
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

    handleSubmit = (e) => {
        e.preventDefault()
    }

    handleChangeButton = () => {
         
        const {change} = this.state
    
        const username = this.state.username
        console.log('username????', username)
        const email = this.state.email
        const avatar = this.state.avatar
        // console.log('user', this.props.username)
        if (this.props.username !== username && change === true) {
          
            this.setState({
                username: username
                
            })
         

        } else if (this.props.email !== email && change === true) {
            this.setState({
                email: email
               
            })
        }  
         console.log('email!!!!', email)
           console.log('user', this.props.username)
    }



    render() {
         return (
            <div>
                {/* <div>
                    <img src={this.state.url} alt='avatar' key={this.state.url}></img>
                    
                 </div> */}
                <form onSubmit={this.handleSubmit}>
                    <input placeholder='username' value={this.state.username} type='text' onChange={this.handleUsername}/>
                   
                    <input placeholder='email' value={this.state.email} type='email' onChange={this.handleEmail}/>
                    <button onClick={this.handleChangeButton}>Submit</button> 
                </form>
            </div>
        )
    }
       
    
}

export default UserInfo;
