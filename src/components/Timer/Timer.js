import React, {Component} from 'react'
// import ms from 'pretty-ms'
import axios from 'axios'
import { connect } from 'react-redux'
import { addTime } from '../../redux/reducer';
// import moment from 'moment'
// import momentDurationFormatSetup from 'moment-duration-format'


class Timer extends Component{
    constructor(props){
        super(props)
            this.state ={
                time: 0,
                timeDisplay: 0,
                seconds: 0,
                minutes: 0,
                hours: 0,
                format: "s",
                start: 0,
                isOn: false,
                setTime: 600
            }
        
        this.startTimer=this.startTimer.bind(this)
        this.stopTimer=this.stopTimer.bind(this)
        this.resetTimer=this.resetTimer.bind(this)
        this.handleSetTime=this.handleSetTime.bind(this)
        this.handleEndTime=this.handleEndTime.bind(this)
        this.handleFinish=this.handleFinish.bind(this)
    }
    formatTime(time){
        if(time > 59) this.setState({
            format: "m",
            timeDisplay: Math.floor(time/60)
        })
        if(time > 3599)
        if(time > 59) this.setState({
            format: "h"
        })
    }
    // startTimer(){
    //     this.setState({
    //         time: this.state.time,
    //         start: Date.now(), 
    //         isOn: true,
    //     })
    //     console.log(Date.now(), this.state.start, this.state.time)
    //     this.timer = setInterval( () => this.setState({
    //         time: Date.now() - this.state.start
    //     }), 1000)
    //     console.log("start")
    // }
    startTimer(){
        let startButton = document.getElementById("startButton");
        if(startButton) document.getElementById("startButton").style.display="none";
        this.setState({
            isOn: true
        })
        this.timer = setInterval( () => this.setState({
            time: this.state.time + 1
        }), 1000)
        console.log("start")
    }


    stopTimer(){
        this.setState({ isOn: false})
        clearInterval(this.timer)
        console.log("stop")
    }

    resetTimer (){
        this.setState({time: 0 })
        console.log("reset")
    }

    handleSetTime(e){
        this.setState({
            setTime: e.target.value
        })
    }
    handleEndTime(){
       this.stopTimer()
       alert ('Time Complete')
        console.log('words')
    }
    handleFinish(){
        console.log(this.state.time)
        axios.post('/api/time', {time: this.state.time}).then(results => {
            console.log(results.data)
            this.props.addTime(results.data)
            this.setState({
                time: 0,
                isOn: false
            })
        })
    }

    render(){
        let start = (this.state.time === 0) ?
            <button id="startButton" onClick={this.startTimer}>start</button> :
            null

        let stop = (this.state.isOn) ?
            <button onClick={this.stopTimer} >stop</button> :
            null
        
        let reset = (this.state.time !== 0 && !this.state.isOn) ?
            <button onClick={this.resetTimer}>reset</button> :
            null
        
        let resume = (this.state.time !== 0 && !this.state.isOn && this.state.time < this.state.setTime) ?
            <button onClick={this.startTimer} >resume</button> :
            null
        
        let finish  = (this.state.time !== 0 && !this.state.isOn) ?
            <button onClick={this.handleFinish} >Finish</button> :
            null
        

        if(this.state.time >= this.state.setTime && this.state.isOn)this.handleEndTime()
      
        return (
            <div>

                <h3>timer: {this.state.time}{this.state.format} </h3>
                {start}
                {resume}
                {stop}
                {reset}
                <br />
                {finish}
               
                <br />
                <br />
                <select onChange={this.handleSetTime} >
                    <option>set time</option>
                    <option value={5}>5 seconds</option>
                    <option value={300}>5 minutes</option>
                    <option value={600} >10 minutes</option>
                    <option value={900} >15 minutes</option>
                    <option value={1200} >20 minutes</option>
                    <option value={1800} >30 minutes</option>
                    <option value={2400} >40 minutes</option>
                    <option value={3000} >50 minutes</option>
                    <option value={3600} >60 minutes</option>

                </select>
                    
            </div>
    );
    }
}


export default connect (null, {addTime})(Timer)