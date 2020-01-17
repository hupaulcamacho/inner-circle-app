import React, { Component } from 'react'
import Search from './Search'

import Logo from '../assets/logo.png'
class Mainpage extends Component {
    constructor () {
        super()
        this.state = {
            search: '',
            searchBarClicked: false,
            errorMessage: ''
        }
    }

    handleSearchChange = e => {
        this.setState({
            search: e.target.value,
            errorMessage: ''
        })
    }
    
    handleSubmit = (e) => {
        const { search } = this.state
        e.preventDefault()
        if (search === '') {
            this.setState({
                errorMessage: 'Search cannot be blank'
            })
        } else {
            this.setState({
                searchBarClicked: true
            })
        }
        
    }

    render() {
        const { search, searchBarClicked, errorMessage } = this.state
        if (searchBarClicked) {
            return(<Search search={search} />)
        } else {
            return(
                
                <div className='main'>
                    
                        <img className='mainLogo' src={Logo} />
                    
                    
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' className='mainsearch' value={search} onChange={this.handleSearchChange} placeholder='Search for a Circle' /><br/>
                        <input className='mainsubmit' type='submit' value='Search!' />
                    </form>
                    <p className='error'>{errorMessage}</p>
                </div>
            )
        }
    }
}

export default Mainpage
