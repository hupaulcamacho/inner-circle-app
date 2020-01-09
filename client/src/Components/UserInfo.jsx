import React from 'react';

class UserInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            info: [
                {username: '',
                avatar: '',
                email: ''}
            ],
            change: false
        }
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
        console.log('username', e.target.value)
    }

    // handleAvatar = (e) => {
    //     // const u
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

    handleChangeButton = (username, email, avatar) => {
        const {info} = this.state
        console.log('info', info)
        if (info[0].username === username) {
            this.setState({
                username: info[0].username,
                change: true
            })
            // console.log('username', info[0].username)
         
        } else if (info.email === email) {
            this.setState({
                email: info.email,
                change: true
            })
        } else if (info.avatar === avatar) {
            this.setState({
                avatar: info.avatar,
                change: true
            })
        }  

    }

    render() {
           
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder={this.username} value={this.username} type='text' onChange={this.handleUsername}></input>
                    <img src={this.avatar} alt='avatar'></img>
                    <input placeholder={this.email} value={this.email} type='email' onChange={this.handleEmail}></input>
                    <button onClick={this.handleChangeButton}>Submit</button> 
                </form>
            </div>
        )
    }
}

export default UserInfo;
