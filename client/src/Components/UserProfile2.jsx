import React from 'react';
import axios from 'axios';
import ActivityBar from './ActivityBar';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.match.params.id,
         
            avatarFile: null,

        }
    }

    // getAvatar = async() => {
    //    console.log('here')
    //     try {
    //         //  let avatar = this.props.match.params
    //         //  console.log('params?????', avatar)
    //          let url = `http://localhost:3030/users`
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

    // componentDidMount = async() => {
    //     console.log(this.props.match.params);
    //     let request = axios.get(`http://localhost:3030/users/id/${this.props.match.params.id}`);
    //     this.set
    // }

          // if(this.props.match.params.id){
          //   console.log('loldoldldodl');
          // }
    

    render() {
        const { user } =  this.state
        console.log(user);
        let request = axios.get(`http://localhost:3030/users/id/${this.props.match.params.id}`);
        console.log(request);

        
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