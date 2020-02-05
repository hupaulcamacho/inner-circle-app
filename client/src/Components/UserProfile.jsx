import React from 'react';
import axios from 'axios';
import ActivityBar from './ActivityBar';
import REACT_APP_SERVER_URL from '../Website';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            avatarFile: null
        }
    }

    // getAvatar = async() => {
    //    console.log('here')
    //     try {
    //         //  let avatar = this.props.match.params
    //         //  console.log('params?????', avatar)
    //          let url = `${REACT_APP_SERVER_URL}/users`
    //          let userAvatar = await axios.get(url)
    //         //  this.setState({
    //         //      avatar: userAvatar
    //         //  })
    //          console.log('avatar', userAvatar)
             
    //     } catch (error){
    //             console.log('error', error)
    //     }
      
    // }

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

           
             let url = `${REACT_APP_SERVER_URL}/users/`
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
        const { user } =  this.state
        console.log(user)
        
        return(
            <div className='profile'>
                <div className='user-info'>
                    <img className='avatar' src={`${user.avatar}`} width='200' /> <br/>
                    <span>{user.username}</span>
                </div>
                <div>
                    <ActivityBar 
                    user={user}
                    />
                </div>
            </div>
            

        )
    }
}


export default UserProfile;