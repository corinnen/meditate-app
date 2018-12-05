import React, {Component} from 'react'
import Timer from '../Timer/Timer'
import { connect } from 'react-redux'
import axios from 'axios'
import {addTime, userLoggedIn} from '../../redux/reducer';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format'
import TimeLog from '../timeLog/TimeLog'



class Main extends Component{
    constructor(){
        super()
        this.state= {
            name: "",
            edit: false,
            timeLength: ""
        }
      
    }
 
    componentDidMount(){
        axios.get('/api/time').then(results => {
            this.props.addTime(results.data)
        })
        axios.get('/auth/user').then(results => {
            if(!results.data.name){
                this.props.history.push("/")
            }else{
            this.setState({name:results.data.name})}
            this.props.userLoggedIn(results.data)
        })
    }

    deleteTime = (id) => {
        axios.delete(`/api/time/${id}`).then(results => {
            this.props.addTime(results.data)
        })
    }

    editTime = (id, length_of_time) => {
        console.log(id, length_of_time)
        length_of_time=Number(length_of_time)
        axios.put(`/api/time/${id}`, {length_of_time}).then(results => {
            this.props.addTime(results.data)
        })
    }


    render(){

        let displayTime= this.props.timeLog.map((time, index) => {
            return (
                <TimeLog 
                key={index}
                deleteTime={this.deleteTime}
                editTime={this.editTime}
                time={time}

                />
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



export default connect (MapStateToProps, {addTime, userLoggedIn})(Main)

        