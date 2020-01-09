import React, { Component } from 'react'
import axios from 'axios'

class CreateCircle extends Component {
    constructor() {
        super()
        this.state = {
            circleName: '',
            description: '',
            memberNames: ''
        }
    }
    handleCircleNameChange = e =>{
        this.setState({
            circleName: e.target.value
        })
        console.log(e.target.value)
    }

    handleDescriptionChange = e =>{
        this.setState({
            description: e.target.value
        })
        console.log(e.target.value)
    }

    handleMembersChange = e =>{
        this.setState({
            members: e.target.value
        })
        console.log(e.target.value)
    }

    createNewCircle = async (e) => {
        e.preventDefault()
        const { circleName, numOfMembers, description } = this.state
        let URL = 'http://localhost:3030/circles/register'
        let info = {
            circle_name: circleName,
            circle_description: description,
            leader_id: 1,
        }

        try {
            let response = await axios.post(URL, info)
        } catch (err) {
            console.log(err)
        }

    }

    render() {
        const { circleName, description, members } = this.state
        return (
            <div className="circle-create">
                <h3>Create A Circle</h3>
                <form onSubmit={this.createNewCircle}>
                    <label>Name</label>
                    <input 
                    type='text' 
                    onChange={this.handleCircleNameChange} 
                    value={circleName} 
                    placeholder='enter circle name' 
                    maxLength='24' /><br/>
                    
                    <label>Description</label>
                    <textarea 
                    id = "myTextArea"
                    rows = "3"
                    cols = "60" 
                    onChange={this.handleDescriptionChange}
                    value={description}></textarea><br/>
                    <input type='text' value={members} onChange={this.handleMembersChange} placeholder='enter member usernames separated by a comma'/>
                    <input type="submit" value='submit' length='100' />
                </form>
            </div>

        )
    }
}

export default CreateCircle;