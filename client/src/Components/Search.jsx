import React from 'react';
import SearchItems from './SearchItems'
import axios from 'axios'

class Search extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                search: props.search,
                results:[],
                userChecked: false,
                circleChecked: true
            }
    }

    componentDidMount = () => {
        this.handleSearchParameters()
    }
    //This is to keep track of what goes in the input box.
    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value
        })
        console.log(e.target.value)
    }

    handleOptionChange = (e) => {
        const { userChecked, circleChecked, results } = this.state
        if (e.target.value === "user") {
            console.log('user checked')
            if (userChecked === true) {
                this.setState({
                    results: [],
                    userChecked: false
                })
            } else {
                this.setState({
                    userChecked: true,
                    circleChecked: false
                })
            }
        } else if (e.target.value === "circle") {
            console.log('circle checked')
            if (circleChecked === true) {
                this.setState({
                    results: [],
                    circleChecked: false
                })
            } else {
                this.setState({
                    circleChecked: true,
                    userChecked: false
                })
            }
        }
    }

    handleSearchParameters = async () => {
        const { search, userChecked, circleChecked, results } = this.state
        
        let URL;
        if (circleChecked === true) {
            URL = `http://localhost:3030/circles/getCircleByName/${search}`
        } else if (userChecked === true) {
            URL = `http://localhost:3030/users/username/${search}`
        }
        
        try {
            let searchResults = []
            const response = await axios.get(URL)
            console.log(response.data.data)
            response.data.data.forEach(data => {
                searchResults.push(data)
            })
            console.log(searchResults)
            this.setState({
                search: '',
                results: searchResults
            })
        } catch (err) {
            console.log(err)
            console.log(search, 'not found')
        }

    }

    //This is function is for the form. 
    handleSubmit = async(e) => {
        e.preventDefault()
        this.handleSearchParameters()
        
    }

    render() {
        const { search, results, circleChecked, userChecked } = this.state

        return (
            <div className='search'>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Search
                        <input type='text' 
                        onChange={this.handleSearchChange} 
                        value={this.state.search}>

                        </input>
                    </label>

                    <input type="radio" name="selection" value="user" onChange={this.handleOptionChange}/> user
                    <input type="radio" name="selection" value="circle" onChange={this.handleOptionChange} /> circle
                    <input type='submit' value='submit'></input>
                </form>
                <SearchItems 
                results={results}
                userChecked={userChecked}
                circleChecked={circleChecked}
                />

            </div>
        )
    }

} 

export default Search;
    