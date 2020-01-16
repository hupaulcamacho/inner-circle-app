import React, { Component } from 'react'
import Search from './Search'

import Logo from '../assets/logo.png'
class Mainpage extends Component {
    constructor () {
        super()
        this.state = {
            search: '',
            searchBarClicked: false
        }
    }

    handleSearchChange = e => {
        this.setState({
            search: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        const { search } = this.state
        e.preventDefault()
        if (search === '') {

        }
        this.setState({
            searchBarClicked: true
        })
    }

    render() {
        const { search, searchBarClicked } = this.state
        if (searchBarClicked) {
            return(<Search search={search} />)
        } else {
            return(
                
                <div className='main'>
                    <img className='mainLogo' src={Logo} />
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' className='mainsearch' value={search} onChange={this.handleSearchChange} placeholder='Search for a Circle' />
                        <input className='mainsubmit' type='submit' value='submit' />
                    </form>
                </div>
            )
        }
    }
}

export default Mainpage
