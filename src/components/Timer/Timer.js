import React, {Component} from 'react'
// import ms from 'pretty-ms'
import axios from 'axios'
import { connect } from 'react-redux'
import { addTime } from '../../redux/reducer';
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import ding from '../../Singing-bowl-sound.mp3'

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
    }
    // formatTime(time){
    //     if(time > 59) this.setState({
    //         format: "m",
    //         timeDisplay: Math.floor(time/60)
    //     })
    //     if(time > 3599)
    //     if(time > 59) this.setState({
    //         format: "h"
    //     })
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
        this.setState({ isOn: false, ding})
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
        
        if(this.state.time >= this.state.setTime && this.state.isOn)
        {
            this.stopTimer()
        }
      
        return (
            <div>
                {/* <i class="far fa-clock"></i> */}
                <h3>timer: {moment.duration(this.state.time, "seconds").format("h:mm:ss")}</h3>
                {start}
                {resume}
                {stop}
                {reset}
                <br />
                {finish}
                <audio src={this.state.ding} autoPlay />
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