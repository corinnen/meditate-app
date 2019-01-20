import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setJournal} from '../../redux/reducer'
import axios from 'axios'
import './Journal.css'

class JournalForm extends Component {
    constructor(){
        super()
        this.state = {
            title: '',
            content: ''
        }
    }

handleChange = e => {
    let {name, value} = e.target
    this.setState({
        [name]: value
    })
}
handleClick = () => {
    axios.post('/api/journal', this.state).then(response => {
        this.props.setJournal(response.data)
        this.setState({
            title: '',
            content: ''
        })
    })
}


    render(){
        return(
            <div>
                <div><input id="intentions" placeholder="What are my intentions for today? "name="title" type="text" value={this.state.title} onChange={this.handleChange}></input></div> 
                <textarea placeholder="Start writing here"name="content" type="text" value={this.state.content} onChange={this.handleChange}></textarea>
                <button onClick={this.handleClick}>Save</button>

            </div>
        )
    }
}
export default connect(null, {setJournal})(JournalForm)