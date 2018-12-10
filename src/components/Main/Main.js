import React, {Component} from 'react'
import Timer from '../Timer/Timer'
import { connect } from 'react-redux'
import axios from 'axios'
import {addTime, userLoggedIn} from '../../redux/reducer';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format'
import TimeLog from '../timeLog/TimeLog'
import Header from '../Header/Header'
import './Main.css'
import Quote from '../Quote';





class Main extends Component{
    constructor(){
        super()
        this.state= {
            name: "",
            edit: false,
            timeLength: "",
            hours: new Date().getHours()
        }
      
    }
 
    componentDidMount(){
        axios.get('/auth/user').then(results => {
            if(!results.data.name){
                this.props.history.push("/")
            }else{
                axios.get('/api/time').then(results => {
                    this.props.addTime(results.data)
                })
                this.setState({name:results.data.name})
                this.props.userLoggedIn(results.data)
            }   
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
        <div className="background">
            <Header />
            <div className="Main">
                <div className="no-blur">  
                    <h1 className="greeting">{this.state.hours < 12 ? <span>Good Morning,</span> : this.state.hours > 17 ? <span>Good Evening, </span> : <span>Good Afternoon, </span> }
                    &nbsp; {this.state.name}</h1>
                </div>    
                <Timer />
                <div className="no-blur"> 
                    <div className="bothBoxes">
                        <div>
                            <div className="box1">My Meditations</div>
                            <div className="Wrapper">
                                {displayTime}
                            </div>
                        </div>
                        <div>
                            <div className="box2">Soothing Sounds</div>
                            <iframe className="youtube" title="playlist" src="https://www.youtube.com/embed/y8NDRElMWwk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
                        </div>
                    </div>
                        <div>
                            <div>
                                <Quote />
                            </div>
                        </div>
                </div>  
            </div>
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

        