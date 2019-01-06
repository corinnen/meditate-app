import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setJournal} from '../../redux/reducer'
import axios from 'axios'

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
                <span>Right now, I feel</span><input name="title" type="text" value={this.state.title} onChange={this.handleChange}></input>
                <textarea name="content" type="text" cols="30" rows="10" value={this.state.content} onChange={this.handleChange}></textarea>
                <button onClick={this.handleClick}>Save</button>

            </div>
        )
    }
}
export default connect(null, {setJournal})(JournalForm)