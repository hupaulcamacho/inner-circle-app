import React, { Component } from 'react'

class CreateCircle extends Component {
    constructor() {
        super()
        this.state = {
            circleName: '',
            numOfMembers: 2,
            description: ''
        }
    }
    handleCircleNameChange = e =>{
        this.setState({
            circleName: e.target.value
        })
        console.log(e.target.value)
    }

    handleMemberAmountChange = e =>{
        this.setState({
            numOfMembers: e.target.value
        })
        console.log(e.target.value)
    }

    handleDescriptionChange = e =>{
        this.setState({
            description: e.target.value
        })
        console.log(e.target.value)
    }

    render() {
        const { circleName, numOfMembers, description } = this.state
        return (
            <div className="circle-create">
                <h3>Create A Circle</h3>
                <form>
                    <label>Name</label>
                    <input 
                    type='text' 
                    onChange={this.handleCircleNameChange} 
                    value={circleName} 
                    placeholder='enter circle name' 
                    maxlength='24' /><br/>
                    <label>Number of Members</label>
                    <input 
                    type='number' 
                    onChange={this.handleMemberAmountChange} 
                    value={numOfMembers} 
                    min='2' 
                    max='25'/><br/>
                    <label>Description</label>
                    <textarea 
                    id = "myTextArea"
                    rows = "3"
                    cols = "60" 
                    onChange={this.handleDescriptionChange}
                    value={description}></textarea>
                </form>
            </div>

        )
    }
}

export default CreateCircle;