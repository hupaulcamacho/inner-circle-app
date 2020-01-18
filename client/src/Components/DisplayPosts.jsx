	//State should have 
//1.An array of posts that are the posts themselves
//2. A boolean that determines whether to display the avatar for the user 
import React from 'react';



class DisplayPosts  extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			displayAvatar: !(this.props.singleUser),
		}
	};

	render() {
		let convertedPosts;
		if(this.props.singleUser){
			convertedPosts = this.props.posts.map((elem) => {
				return	(
				<div className='single-post'>
					<div className='titler'>
						<i>Posted in {elem.post_circle}</i>
					</div>
					<br/>
					
					<img className ='profile-pic' width='65px' src={elem.owner_avi} 
					/><br/>
					<i className='post-user'>{this.props.username}</i><br/>
					<div className='post'>
						<p className='post-body'>{elem.post_body}</p>
						<img className='post-image' width='500px' src={elem.image_url} /> <br/>
					</div>

					
				</div>
				);
			});
		}
		else {
			convertedPosts = this.props.posts.map((elem) => {
				return (
					<div className='single-post'>
						<img className ='profile-pic' width='65px' src={elem.owner_avi} /><br/>
						<i className='post-user'>{elem.username}</i><br/>
						<div className='post'>
							<p className='post-body'>{elem.post_body} </p>
							<img width='500px'src={elem.image_url} />	
						</div>
						
						
					</div>);
			});
		}
		return(
			<div className='posts-container'>
				{convertedPosts}
			</div>
			)
	};
}

export default DisplayPosts