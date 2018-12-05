import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
// import momentDurationFormatSetup from 'moment-duration-format'

class TimeCard extends Component {
    constructor(){
        super()
        this.state={
            edit: false,
            timeLength: ""
        }
        this.handleTimeChange=this.handleTimeChange.bind(this)

    }

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }
    handleTimeChange(e){
        this.setState({timeLength: e.target.value})
    }

    render () {
        let {time} = this.props

        let date = new Date(time.timestamp)
        console.log(date)
        let timestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(date)
        let timestamp2 = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit'}).format(date)
        // let length_of_time = moment.duration(time.length_of_time, "seconds").format("h:mm");
        
        return( 

             <div>
                 {this.state.edit ?
                (
                 <div>
                    {timestamp} &nbsp;  
                    {timestamp2}  &nbsp; ⌛️ &nbsp;   
                    {length_of_time}&nbsp;  
                    <input value={length_of_time} type="text" onChange={this.handleTimeChange}></input>
                    <button onClick={()=> {this.editTime(time.id)}} >+</button> &nbsp; 
                    <button onClick={ ()=> {this.deleteTime(time.id)}} >delete</button>
                 </div>
                        
                ):
                (
                <div>
                    
                </div>
                        )
                        }
            
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {timeLog} = state
    return {
        timeLog
    }
}
export default connect (mapStateToProps)(TimeCard)