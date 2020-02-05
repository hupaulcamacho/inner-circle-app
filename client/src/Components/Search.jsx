import React from 'react';

import SearchItems from './searchItems'

import axios from 'axios'

class Search extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                search: props.search,
                results:[],
                circleResults: [],
                userChecked: false,
                circleChecked: true,
                settingsToggle: this.props.settings,
                deleteToggle: this.props.delete
            }
    }

    componentDidMount = async () => {
        this.handleSearchParameters();
        console.log('wowowowoowowowo')
        if(this.state.settingsToggle){
            this.setState({
                userChecked: true,
                circleChecked: false
            })
        }
        if(this.state.deleteToggle){
            let userIDs = await axios.get(`${REACT_APP_SERVER_URL}/circles/${this.props.match.params.id}`);
            let allUsers = [];
            await userIDs.data.map( async (elem) => {
                let temp = await axios.get(`${REACT_APP_SERVER_URL}/users/id/${elem.user_id}`);

                allUsers.push(temp.data.data);
                this.setState({
                    results: allUsers
                });
            });
           
            // this.setState({
            //     results: allUsers
            // });

        }
    }
    //This is to keep track of what goes in the input box.
    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value
        })
        console.log(e.target.value)
    }

     // circleChoice = (circle) => {
     //    console.log('lol');
     //    this.props.handleCircleChoice(circle);
     // }

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
                    results: [],
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
                    results: [],
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
            URL = `${REACT_APP_SERVER_URL}/circles/getCircleByName/${search}`
            
        } else if (userChecked === true) {
            URL = `${REACT_APP_SERVER_URL}/users/username/${search}`
        } 
        try {
            let searchResults = []
            let circleResults = []
            const response = await axios.get(URL)
            let URL2 = `${REACT_APP_SERVER_URL}/circles/getCircleAndMembersByCircleName/${search}`
            const response2 = await axios.get(URL2)
            console.log(response.data.data)
            response.data.data.forEach(data => {
                searchResults.push(data)
            })

            response2.data.data.forEach(data => {
                circleResults.push(data)
            })
            console.log(searchResults)
            this.setState({
                search: '',
                results: searchResults,
                circleResults: circleResults
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
        const { search, results, circleResults, circleChecked, userChecked } = this.state
        const settingsToggled = (this.state.settingsToggle) ? <input type="radio" name="selection" value="circle" onChange={this.handleOptionChange} disabled/> : <input type="radio" name="selection" value="circle" onChange={this.handleOptionChange} />
        const deleteToggled = (this.state.deleteToggle) ?  <input type='text' onChange={this.handleSearchChange} value={this.state.search} disabled/> :  <input type='text' onChange={this.handleSearchChange} value={this.state.search}/>
        return (
            <div className='search'>
                <div>
                <form onSubmit={this.handleSubmit}>
                    <span className='form-items'>
                    {"Search: "}
                    {deleteToggled}
                    <input type="radio" name="selection" value="user" onChange={this.handleOptionChange}/> user
                    {settingsToggled} circle
                    <input className='search-button' type='submit' value='submit'></input><br/>
                    </span>
                </form>
                </div>
                
                <div className='search-results'>
                <SearchItems 
                results={results}
                circleResults={circleResults}
                userChecked={userChecked}
                circleChecked={circleChecked}
                handleCircleChoice= {this.circleChoice}
                />
                </div>

                

            </div>
        )
    }

} 

export default Search;
    