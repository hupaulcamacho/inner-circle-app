import React from 'react';

const SearchItems = (props) => {
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
            listItems.push(
                <div className='circle'>
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