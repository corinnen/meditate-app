import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { userLoggedIn } from '../../redux/reducer';
import {Redirect} from 'react-router-dom'
import './Login.css'



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
    if(this.state.email && this.state.password) {
    axios.post('/auth/login', this.state).then(response => {
      let user = response.data
      this.props.userLoggedIn(user)
    }).catch(err => {
      this.setState({
        error: 'error logging in'
      })
    })
  } else {
    this.setState({
      error: 'please type email and password'
    })
  }
   }


  render() {
    return (this.props.isAuthenticated ?
    
      <Redirect to="/main" /> :
        <div>
          <div className="section parallax bg1">
            <a className="scroll" href="#scroll">Login</a>
            <div id="title">Balance</div>
            <p id="quote">Quiet the mind, and the soul will speak. </p><span id="author">- Ma Jaya Sati Bhagavati</span>
          </div>
          <div className="section static" id="scroll">
            <div className="loginContainer">
              <h1>Login to continue</h1>
              <br/>
              <input className="loginInput" onChange={(e) => this.handleEmailInput(e.target.value)} type="text" placeholder="email"></input>
              <br/>               
              <input className="loginInput" onChange={(e) => this.handlePasswordInput(e.target.value)} type="password" placeholder="password"></input> 
              <br/>
              <button className="loginButton" onClick={this.handleClick}>Login</button>
              <br/>
                <span className="new">New user? </span>
               <Link className="regButton" to="/register">Create an account</Link>
                <div className="error" >{this.state.error}</div>
            </div>
          </div>
          <div className="section parallax bg2"></div>
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
