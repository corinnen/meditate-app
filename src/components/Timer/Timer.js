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
                start: 0,
                isOn: false,
                setTime: 600000
            }
        
        this.startTimer=this.startTimer.bind(this)
        this.stopTimer=this.stopTimer.bind(this)
        this.resetTimer=this.resetTimer.bind(this)
        this.handleSetTime=this.handleSetTime.bind(this)
        this.handleEndTime=this.handleEndTime.bind(this)
        this.handleFinish=this.handleFinish.bind(this)
    }


    startTimer(){
        this.setState({
            time: this.state.time,
            start: Date.now(), 
            isOn: true,
        })
        this.timer = setInterval( () => this.setState({
            time: Date.now() - this.state.start
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
                time: 0
            })
        })
    }

    render(){
        let start = (this.state.time === 0) ?
            <button onClick={this.startTimer}>start</button> :
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


        if(this.state.time >= this.state.setTime && this.state.isOn)this.handleEndTime()

        console.log(this.state.setTime)
      
        return (
            <div>

                <h3>timer: {this.state.time} </h3>
                {start}
                {resume}
                {stop}
                {reset}
                <br />
                <button onClick={this.handleFinish} >Finish</button> 
                    {/* and log time, also add play/stop buttons */}
                <br />
                <br />
                <select onChange={this.handleSetTime} >
                    <option>set time</option>
                    <option value={5000}>5 seconds</option>
                    <option value={300000}>5 minutes</option>
                    <option value={600000} >10 minutes</option>
                    <option value={900000} >15 minutes</option>
                    <option value={1200000} >20 minutes</option>
                    <option value={1800000} >30 minutes</option>
                    <option value={2400000} >40 minutes</option>
                    <option value={3000000} >50 minutes</option>
                    <option value={3600000} >60 minutes</option>

                </select>
                    
            </div>
    );
    }
}


export default connect (null, {addTime})(Timer)