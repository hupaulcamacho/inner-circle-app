import React from 'react';
import { Redirect } from "react-router-dom";

class SearchItems extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            renderRedirect: false,
            circleId: ''
        }
    }

    renderRedirect = (e) => {
        console.log(e.target.className)
        this.setState({
            renderRedirect: true,
            circleId: parseInt(e.target.className.slice(0))
        })
    }

    redirectUser = e => {
        console.log(e.target.className)
    }

    loadCircleUsers = (circlename) => {
        const { circleResults } = this.props
        let userItems = [];
        for (let item of circleResults) {
            if (item.circle_name === circlename) {
                userItems.push(
                    <img className='mini-avatars' width='45' src={`${item.avatar}`}/>
                )
            } 
        }
        return userItems
    }

    render() {
    const { results, userChecked, circleChecked, circleResults } = this.props
    let listItems = [];
    if (userChecked === true) {
        for (let user of results){
            listItems.push(
                <div className='user' onClick={this.redirectUser}>
                    <img className='avatar' src={`${user.avatar}`} height='150'></img>
                    <h3>{user.username}</h3>
                
                </div>
            )
        }
    } else if (circleChecked === true) {
        for (let circle of results){
            console.log(circle);
            listItems.push(
                <div className={`${circle.id} circle`} onClick={this.renderRedirect}>
                
                    <h3>{circle.circle_name}</h3>
                    <p>{circle.circle_description}</p>
                    {'Members: '} <br/>
                    {this.loadCircleUsers(circle.circle_name)}
                    {(this.state.renderRedirect) ? <Redirect to={`/circlePage/${this.state.circleId}`} /> : null}

                </div>
            )
        }
    }
    return(
        <div className='search-items'> 
            {listItems}
        </div>
        )
    }
}

export default SearchItems;