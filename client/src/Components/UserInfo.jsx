import React from 'react';

class UserInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            info: 
                {username: '',
                avatar: '',
                email: ''},
            change: true
            

        }
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
        console.log('username', e.target.value)
    }

    // handleAvatar = (e) => {

    //     console.log('image', e.target)
    // }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
         console.log('email', e.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }


    handleChangeButton = (e) => {
         
        const {info, change} = this.state
        console.log('change', change)
        console.log('info', info)
        const username = this.state.username
        console.log('username????', username)
        const email = this.state.email
        const avatar = this.state.avatar
        console.log('user', info.username)
        if (info.username === username && change === true) {
            console.log('username!!!!', username)
            this.setState({
                username: username,
                // change: true
            })
            

        } else if (info.email === email && change === true) {
            this.setState({
                email: info.email,
                // change: true
            })
        } else if (info.avatar === avatar && change === true) {
            this.setState({
                avatar: info.avatar,
                // change: true

            })
        }  

    }

    render() 
         return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder={this.username} value={this.state.username} type='text' onChange={this.handleUsername}></input>
                    <img src={this.avatar} alt='avatar'></img>
                    <input placeholder={this.email} value={this.state.email} type='email' onChange={this.handleEmail}></input>

                    <button onClick={this.handleChangeButton}>Submit</button> 
                </form>
            </div>
        )
    }
       
    
}

export default UserInfo;
