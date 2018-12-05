import React, {Component} from 'react'
import Timer from '../Timer/Timer'
import { connect } from 'react-redux'
import axios from 'axios'
import {addTime} from '../../redux/reducer';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format'



class Main extends Component{
    constructor(){
        super()
        this.state= {
            name: "",
            edit: false,
            timeLength: ""
        }
        this.handleTimeChange=this.handleTimeChange.bind(this)
    }
 
    componentDidMount(){
        axios.get('/api/time').then(results => {
            this.props.addTime(results.data)
        })
        axios.get('/auth/user').then(results => {
            this.setState({name:results.data.name})
        })
    }

    deleteTime = (id) => {
        axios.delete(`/api/time/${id}`).then(results => {
            this.props.addTime(results.data)
        })
    }

    editTime = (id) => {
        axios.put(`/api/time/${id}`).then(results => {
            this.props.addTime(results.data)
        })
    }
    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }
    handleTimeChange(e){
        this.setState({timeLength: e.target.value})
    }
    

    render(){

        let displayTime= this.props.timeLog.map((time, index) => {
            
            let date = new Date(time.timestamp)
            let timestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(date)
            let timestamp2 = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit'}).format(date)
        
                return (
                    <div>
                        <div key={index}>
                            {timestamp} &nbsp; 
                            {timestamp2}&nbsp; ⌛️ &nbsp;   
                            {time.length_of_time} &nbsp; 
                      
                              <input value={time.length_of_time} type="text" onChange={this.handleTimeChange}></input>
                                <button onClick={()=> {
                                    this.editTime(time.id);this.toggleEdit()}} >+</button> &nbsp; 
                                <button onClick={this.toggleEdit}>Remove</button>
                        </div>
                        <div>
                            
                            <button onClick={ ()=> {this.deleteTime(time.id)}} >delete</button>
                        </div>

                    </div>   
        )   
        })

    
    return (
        <div>
            <h1>Welcome, {this.state.name}</h1>
            <Timer />
            <div>{displayTime}</div>
        </div>
             )
}
}

function MapStateToProps(state) {
    let {timeLog} = state
    return {
        timeLog
    }
}



export default connect (MapStateToProps, {addTime})(Main)

        