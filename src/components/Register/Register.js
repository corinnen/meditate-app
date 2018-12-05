
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../redux/reducer';
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'


class Register extends Component {
  constructor(){
    super()
    this.state ={ 
      name: '',
      email: '', 
      password: '', 
      error: ''
    }
    this.handleClick=this.handleClick.bind(this)
  }

  handleNameInput(name){
    this.setState({name})
  }

  handleEmailInput(email){
    this.setState({email})
  }

  handlePasswordInput(password){
    this.setState({password})
  }

  handleClick(){
   axios.post('/auth/register', this.state).then(response => {
    //  console.log(response)
     let user = response.data
     this.props.userLoggedIn(user)
   }).catch(err => {
     this.setState({
       error: 'email already taken'
      })
   })
  }

  render() {
    return ( this.props.isAuthenticated ?
      <Redirect to="/main" /> :
      <div >
        <h1>Register:</h1>
        <span>Name: &nbsp; &nbsp; &nbsp; </span>
        <input 
          onChange={(e) => {this.handleNameInput(e.target.value)}} 
            type="text" 
            placeholder="name"></input>
        <br />
        <span>Email: &nbsp; &nbsp; &nbsp; </span>
        <input
           onChange={(e) => {this.handleEmailInput(e.target.value)}} 
            type="text"  
            placeholder="email"></input>
        <br />
        <span>Password: &nbsp; </span>
        <input
           onChange={((e) => this.handlePasswordInput(e.target.value))} 
           type="password" 
           placeholder="password"></input>
        <br />
        <button onClick={this.handleClick}>Submit</button>
        <br />
        <div>Or log in <Link to="/">here</Link></div> 

        {this.state.error}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps, {userLoggedIn})(Register);