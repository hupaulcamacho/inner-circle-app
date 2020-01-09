import React from 'react';

class UserInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            infos: [
                {username: '',
                avatar: '',
                email: ''}
            ]
        }
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
        console.log('username', e.target.value)
    }

    handleAvatar = (e) => {
        // const u
        console.log('image', e.target)
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

    handleChangeButton = (e) => {

    }

    render() {
        const {infos} = this.state
            const change = infos.map(info => {
                return (
                    <nav>
                        <form onSubmit={this.handleSubmit}>
                            {/* <input placeholder={this.username} value={this.username} type='text' onChange={this.handleUsername}></input>
                            <img src={this.avatar} alt='avatar'></img>
                            <input placeholder={this.email} value={this.email} type='email' onChange={this.handleEmail}></input>
                            <button>Change</button>  */}
                        </form>
                    </nav>
                  
                )
            })

            return(
                <div className='user-info'>
                    {change}
                    
                </div>
            )
       
    }
}

export default UserInfo;
