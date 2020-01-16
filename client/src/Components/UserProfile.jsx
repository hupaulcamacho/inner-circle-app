import React from 'react';
import axios from 'axios';

class UserProfile extends React.Component {
    constructor() {
        super()
        this.state = {
           user: {
               username: '',
                avatar: '',
           },
           loggedIn: true
            
         
        }
    }

   
    // handleAvatarFile = (event) => {
    //     this.setState({
    //         avatarFile: event.target.files[0].name
    //     })
    //     console.log('avatar!!!', event.target.files[0].name)
    //       console.dir(event.target)
    // }

    handleUsername = (e) => {
        // this.setState({
        //     user: 
        // })
        console.log('username@@@@@', e.target.value)
    }

    handleSubmit = async(e) => {
        e.preventDefault()

        const data = new FormData()
        //  let avatarFile = e.target.files.name
        //  console.log('file!!!', avatarFile)
        data.append('avatar', this.state.avatarFile)
         try {

           
             let url = `http://localhost:3030/users/`
             let userAvatar = await axios.get(url, data)
              console.log('avatar', userAvatar)
             this.setState({
                 avatarFile: userAvatar,
                //  username: 
             })
            
             
        } catch (error){
                console.log('error', error)
        }
    }

    compoundDidMount() {
          this.handleSubmit()
    }





    render() {
        return(
            <div className='profile'>
                <form onSubmit={this.handleSubmit}> 
                    <img src'={}></'img>
                    <p></p>
                </form>
            </div>
        )
    }
}


export default UserProfile;