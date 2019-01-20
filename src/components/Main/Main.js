import React, {Component} from 'react'
import Timer from '../Timer/Timer'
import { connect } from 'react-redux'
import axios from 'axios'
import {addTime, userLoggedIn, setJournal} from '../../redux/reducer';
import TimeLog from '../timeLog/TimeLog'
import Header from '../Header/Header'
import './Main.css'
import Quote from '../Quote';
import {Link} from 'react-router-dom'





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
                axios.get('/api/journal').then(results=> {
                      this.props.setJournal(results.data)
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
        length_of_time=Number(length_of_time)
        axios.put(`/api/time/${id}`, {length_of_time}).then(results => {
            this.props.addTime(results.data)
        })
    }
    


    render(){

        let displayTime= this.props.timeLog.map((time, index) => {
            return (     
                    <TimeLog 
                    key={time.id}
                    deleteTime={this.deleteTime}
                    editTime={this.editTime}
                    time={time}
                    />
            )
        })
    
    return (
        <div className="background">
            <div className="no-blur">
                <div className="navContainer">
                    <h1 className="greeting">{this.state.hours < 12 ? <span>Good Morning,</span> : this.state.hours > 17 ? <span>Good Evening, </span> : <span>Good Afternoon, </span> }
                           {' '}{this.state.name}</h1>
                    <Link className="dropbtn" id="pushJournal" to={'/journal'} >Journal</Link>
                
                    <div className="dropdown">
                        <div className="dropbtn">My Meditations</div>
                        <div className= "wrapper">{displayTime}</div>
                        
                    </div>
                    <div className="dropdown">
                        <div className="dropbtn">Play Music</div>
                        <iframe className="wrapper" id="youTube"title="playlist" src="https://www.youtube.com/embed/y8NDRElMWwk" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe> 
                    </div>
                </div>
            </div>
            <div className="bodyContainer">
                <div className="no-blur"><Header /></div>
                <Timer />
                <div className="no-blur"><Quote /></div>
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



export default connect (MapStateToProps, {addTime, userLoggedIn, setJournal})(Main)

        