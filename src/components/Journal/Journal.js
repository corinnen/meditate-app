import React, { Component } from 'react';

import {connect} from 'react-redux';
import {setJournal, userLoggedIn} from '../../redux/reducer';
import axios from 'axios'
import Header from '../Header/Header'
import JournalForm from './JournalForm'
import {Link} from 'react-router-dom'

class Journal extends Component {
  
  componentDidMount(){
    axios.get('/auth/user').then(results => {
        if(!results.data.name){
            this.props.history.push("/")
        }else{
            axios.get('/api/journal').then(results=> {
                this.props.setJournal(results.data)
              })
            this.props.userLoggedIn(results.data)
        }   
    })
}

handleDelete(id){
  axios.delete(`/api/journal/${id}`).then(results => {
    this.props.setJournal(results.data)
  })
}
  
  render() {
    let {journal} = this.props
   
    
    let journalEntries = journal.map((entries, i) => {
      let displayDate = new Date(entries.date)
      let timestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(displayDate)

      return  <div key={i}>
                <h2>{timestamp}</h2>
                <h3>Right now, I feel {entries.title}</h3>
                <p>{entries.content}</p>
                <button onClick={()=> this.handleDelete(entries.id)}>delete</button>
              </div>
    })
 
    return (
      <div>
        <Header/>
        <Link to={'/main'}>Go Back
        </Link>
        <JournalForm/>
        <div>
           {journalEntries}
      </div>
      </div>
    );
  }
}
function MapStateToProps(state){
  let {journal} = state
  return {journal}
}

export default connect(MapStateToProps, {setJournal, userLoggedIn})(Journal);
