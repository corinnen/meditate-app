import React, { Component } from 'react';

import {connect} from 'react-redux';
import {setJournal, userLoggedIn} from '../../redux/reducer';
import axios from 'axios'
import Header from '../Header/Header'
import JournalForm from './JournalForm'
import {Link} from 'react-router-dom'
import './Journal.css'
// import trees from '../../trees.jpg'

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
                <h2 className="date-content" >{timestamp}</h2>
                <h3 className="title-content" >{entries.title}</h3>
                <p className="journal-content" >{entries.content}</p>
                <button className="button-content" onClick={()=> this.handleDelete(entries.id)}>delete</button>
              </div>
    })
 
    return (
      <div className="journal"> 
        <Header/>
        <Link to={'/main'}><i className="fas fa-arrow-left"></i>
        </Link>
        <div className="journalEntryWrapper">
            <div className="journalForm">
              <JournalForm/>
            </div>
            <h3 className="positive-thought">Every positive 
              <span id="white-word">thought</span>
               propels you in the right direction.</h3>
        </div>
        <div className="journalWrapper">
          <div className="allEntries">
            <h3 id="myJournal">My Journal</h3>
            <div id="block-quote">
              {journalEntries}
            </div>
          </div>
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
