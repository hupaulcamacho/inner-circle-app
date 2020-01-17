import React from 'react';
import axios from 'axios';
import ActivityBar from './ActivityBar'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        console.log('userprofile', props.user)
        this.state = {
            currentUser: props.user,
            avatarFile: null
        }
    }

   
    handleAvatarFile = (event) => {
        this.setState({
            avatarFile: event.target.files[0].name
        })
        console.log('avatar!!!', event.target.files[0].name)
          console.dir(event.target)
    }


    handleAvatarFile = (event) => {
        this.setState({
            avatarFile: event.target.files[0].name
        })
        console.log('avatar!!!', event.target.files[0].name)
          console.dir(event.target)
    }

    handleUsername = (e) => {
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
        const { currentUser } =  this.state
        let user = currentUser
        console.log('user', user)
        return(
            <div className='profile'>

                <img src={`${user.avatar}`} width='200' />
                <p>{user.username}</p>

                <div>
                    <ActivityBar 
                    user={currentUser}
                    />
                </div>

            </div>
            
            
        )
    }
}


export default UserProfile;