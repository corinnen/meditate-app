import React, {Component} from 'react'
const ms = require ('pretty-ms')

class Timer extends Component{
    constructor(props){
        super(props)
            this.state ={
                time: 0,
                start: 0,
                isOn: false
            }
        
        this.startTimer=this.startTimer.bind(this)
        this.stopTimer=this.stopTimer.bind(this)
        this.resetTimer=this.resetTimer.bind(this)
    }


    startTimer(){
        this.setState({
            time: this.state.time,
            start: Date.now() - this.state.time, 
            isOn: true
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
        
        let resume = (this.state.time !== 0 && !this.state.isOn) ?
            <button onClick={this.startTimer} >resume</button> :
            null
   
            //set timer with drop down bar

        return (
            <div>
                <h3>timer: {ms(this.state.time)} </h3>
                {start}
                {resume}
                {stop}
                {reset}
                <br />
                <button>Finish</button> 
                    {/* and log time, also add play/stop buttons */}
                <br />
                <br />
                <select>
                    <option>5 minutes</option>
                    <option>10 minutes</option>
                    <option>15 minutes</option>
                    <option>20 minutes</option>
                    <option>30 minutes</option>
                    <option>40 minutes</option>
                    <option>50 minutes</option>
                    <option>60 minutes</option>

                </select>
                    
            </div>
    );
    }
}

export default Timer