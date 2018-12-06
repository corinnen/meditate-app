import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { userLoggedIn } from '../../redux/reducer';
import {Redirect} from 'react-router-dom'
// import Header from './components/Header/Header'



class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '', 
      error: ''
    }
    this.handleClick=this.handleClick.bind(this)
  }

  handleEmailInput(email){
    this.setState({email})
  }
  handlePasswordInput(password){
    this.setState({password})
  }

  handleClick(){
    axios.post('/auth/login', this.state).then(response => {
      console.log('login', response.data)
      let user = response.data
      this.props.userLoggedIn(user)
    }).catch(err => {
     //  console.log(err.response)
      this.setState({
        error: 'error logging in'
      })
    })
   }


  render() {
    console.log('asdfsf', this.props.isAuthenticated)
    return (this.props.isAuthenticated ?
    
      <Redirect to="/main" /> :
      <div className="login">
        <h1>Login</h1>
        <input onChange={(e) => this.handleEmailInput(e.target.value)} type="text" placeholder="email"></input>
          <br />
        <input onChange={(e) => this.handlePasswordInput(e.target.value)} type="password" placeholder="password"></input>
          <br />
        <button onClick={this.handleClick}>Login</button>
          <br />
          <span>New user? </span>
          <button> <Link className="regButton" to="/register">Create Account</Link></button>
         <br />
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

export default connect(mapStateToProps, {userLoggedIn})(Login);
