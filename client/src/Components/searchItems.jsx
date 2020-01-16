import React from 'react';

const SearchItems = (props) => {

    const bubbleCircleChoice = (circle) => {
        console.log('wtf');
        props.handleCircleChoice(circle);
    }
    const { results, userChecked, circleChecked } = props
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
                <div className='circle' onClick={bubbleCircleChoice(circle)}>
                <h3>{circle.circle_name}</h3>
                <p>{circle.circle_description}</p>
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

export default SearchItems;