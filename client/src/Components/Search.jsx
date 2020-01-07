import React from 'react';
import SearchItems from './SearchItems'
import axios from 'axios'

class Search extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                search: '',
                outputs:[],
                userChecked: false,
                circleChecked: false
            }
    }

    //This is to keep track of what goes in the input box.
    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value
        })
        console.log(e.target.value)
    }

    handleCheckboxChange = (e) => {
        const { userChecked, circleChecked } = this.state
        if (e.target.value === "user") {
            console.log('checked')
            if (userChecked === true) {
                this.setState({
                    userChecked: false
                })
            } else {
                this.setState({
                    userChecked: true
                })
            }
        } else if (e.target.value === "circle") {
            if (circleChecked === true) {
                this.setState({
                    circleChecked: false
                })
            } else {
                this.setState({
                    circleChecked: true
                })
            }
        }
    }

    //This is function is for the form. 
    searchQuery = async (e) => {
        e.preventDefault()
        const { search, userChecked, circleChecked } = this.state
        let URL;
        if (circleChecked === true) {
            URL = `http://localhost:3030/circles/getCircleByName/${search}`
        }
        try {
            const response = await axios.get(URL)
            console.log(response)
        } catch (err) {
            console.log(err)
            console.log('not found')
        }
    }

    render() {
        const { search } = this.state
        return (
            <div className='search'>
                <form onSubmit={this.searchQuery}>
                    <label>
                        Search
                        <input type='text' onChange={this.handleSearchChange} value={this.state.search}></input>
                    </label>
                    <input type="checkbox" name="selection1" value="user" onChange={this.handleCheckboxChange}/> user
                    <input type="checkbox" name="selection2" value="circle" onChange={this.handleCheckboxChange}/> circle
                    <input type='submit' value='submit'></input>
                </form>
                <SearchItems 
                // outputs={outputs}
                />
            </div>
        )
    }

} 

export default Search;
    