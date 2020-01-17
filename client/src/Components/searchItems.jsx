import React from 'react';
import { Redirect } from "react-router-dom";

class SearchItems extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            renderRedirect: false
        }
    }

    renderRedirect = () => {
        this.setState({
            renderRedirect: true
        })
    }

    // const bubbleCircleChoice = (circle) => {
    //     console.log('wtf');
    //     props.handleCircleChoice(circle);
    // }

    render() {
    const { results, userChecked, circleChecked } = this.props
    let listItems = [];
    if (userChecked === true) {
        for (let user of results){
            listItems.push(
                <div className='user'>
                <h3>{user.username}</h3>
                <img src={`${user.avatar}`} height='150'></img>
                </div>
            )
        }
    } else if(circleChecked === true) {
        for (let circle of results){
            console.log(circle);
            listItems.push(
                <div className='circle' onClick={this.renderRedirect}
                 // onClick={bubbleCircleChoice(circle)}
                 >
                
                <h3>{circle.circle_name}</h3>
                <p>{circle.circle_description}</p>
                 {(this.state.renderRedirect) ? <Redirect to={`/circlePage/${circle.id}`} /> : null}

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