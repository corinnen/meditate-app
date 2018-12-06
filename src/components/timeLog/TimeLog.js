import React, {Component} from 'react'
import moment from 'moment'
// import momentDurationFormatSetup from 'moment-duration-format'

class TimeLog extends Component {
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
            edit: !this.state.edit,
            timeLength: this.state.timeLength
        })
    }
    handleTimeChange(e){
        this.setState({timeLength: e.target.value
        })
    }

    render () {
        let {time} = this.props

        let date = new Date(time.timestamp)
        let timestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(date)
        let timestamp2 = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit'}).format(date)
        
        return( 

             <div>
                 {this.state.edit ?
                (
                    <div>
                        <input value={this.state.timeLength}
                            type="text" 
                            placeholder="0:00:00" onChange={this.handleTimeChange}></input>
                            <button onClick={()=> {
                                this.props.editTime(time.id, this.state.timeLength);this.toggleEdit()}}>
                                add</button> &nbsp; 
                            <button onClick={ ()=> {this.props.deleteTime(time.id);this.toggleEdit()}}>delete</button>
                            <button onClick={this.toggleEdit}>x</button>
                    </div>
                    ) :
                    (
                        <div>
                        {timestamp} &nbsp; 
                        {timestamp2}&nbsp; | &nbsp;   
                        {moment.duration(time.length_of_time, "seconds").format("h[h]mm[m]ss[s] ")}  &nbsp; 
                       <i onClick={this.toggleEdit} className="far fa-edit"></i>
                    </div>

                        )
                        }
            
            </div>
        )
    }
}


export default TimeLog