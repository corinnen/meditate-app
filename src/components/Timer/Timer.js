import React, {Component} from 'react'
// import ms from 'pretty-ms'
import axios from 'axios'
import { connect } from 'react-redux'
import { addTime } from '../../redux/reducer';
import moment from 'moment'
import 'moment-duration-format'
import ding from '../../Singing-bowl-sound.mp3'
import '../Main/Main.css'

class Timer extends Component{
    constructor(props){
        super(props)
            this.state ={
                time: 0,
                timeDisplay: 0,
                start: 0,
                isOn: false,
                setTime: 600,
                ding: ""
            }
        
        this.startTimer=this.startTimer.bind(this)
        this.stopTimer=this.stopTimer.bind(this)
        this.resetTimer=this.resetTimer.bind(this)
        this.handleSetTime=this.handleSetTime.bind(this)
        this.handleFinish=this.handleFinish.bind(this)
        this.handleEndTime=this.handleEndTime.bind(this)
    }
    startTimer(){
        this.setState({
            isOn: true
        })
        this.timer = setInterval( () => this.setState({
            time: this.state.time + 1
        }), 1000)
        let noBlur = document.getElementsByClassName('no-blur')
        for(let i = 0; i < noBlur.length; i++) {
            noBlur[i].className = 'no-blur blur'
        }
    }


    stopTimer(){
        this.setState({ isOn: false})
        clearInterval(this.timer)
        let noBlur = document.getElementsByClassName('no-blur')
        for(let i = 0; i < noBlur.length; i++) {
            noBlur[i].className = 'no-blur'
        }
    }

    resetTimer (){
        this.setState({time: 0 })
    }

    handleSetTime(e){
        this.setState({
            setTime: e.target.value
        })
    }
    handleEndTime(){
        this.stopTimer()
        this.setState({ding})
    }

  
    handleFinish(){
        axios.post('/api/time', {time: this.state.time}).then(results => {
            this.props.addTime(results.data)
            this.setState({
                time: 0,
                isOn: false
            })
        })
    }

    render(){
        let start = (this.state.time === 0 && !this.state.isOn) ?
        <i className="far fa-play-circle" onClick={this.startTimer}></i> :
            null

        let stop = (this.state.isOn) ? <i className="far fa-stop-circle" onClick={this.stopTimer}
            ></i>: null
        
        let reset = (this.state.time !== 0 && !this.state.isOn) ?
            <i className="fas fa-ban" onClick={this.resetTimer}
             ></i> : null
        
        let resume = (this.state.time !== 0 && !this.state.isOn && this.state.time < this.state.setTime) ?
            <i className="far fa-play-circle" onClick={this.startTimer}></i> :
            null
        
        let finish  = (this.state.time !== 0 && !this.state.isOn) ?
            <button className="finish" onClick={this.handleFinish}>finish</button>: null
        
        let select = (this.state.time === 0 && !this.state.isOn) ? 
            <select className="finish" onChange={this.handleSetTime} >
                <option>Set time</option>
                <option value={8}>8 seconds</option>
                <option value={300}>5 minutes</option>
                <option value={600} >10 minutes</option>
                <option value={900} >15 minutes</option>
                <option value={1200} >20 minutes</option>
                <option value={1800} >30 minutes</option>
                <option value={2400} >40 minutes</option>
                <option value={3000} >50 minutes</option>
                <option value={3600} >60 minutes</option>
             </select> : null
        
        if(this.state.time >= this.state.setTime && this.state.isOn)
        {
            this.handleEndTime()
        }
      
        return (
            <div>
                <div className="timer">
                    <h3 id="time">{moment.duration(this.state.time, "seconds").format("h:mm:ss")}</h3>
                    <div className="parent">
                        <span>{start}</span>
                        <span id="resumeBtn">{resume}</span>
                        <span>{stop}</span>
                        <span id="resetBtn">{reset}</span>
                    </div>
                </div>
                <div className="setTimeContainer">
                    <span>{finish}</span>
                    <audio src={this.state.ding} autoPlay />
                    <div>{select}</div>   
                </div>    
            </div>
    );
    }
}


export default connect (null, {addTime})(Timer)