
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../redux/reducer';
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import './Register.css'
import flower from './blueflower.jpg'

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
     let user = response.data
     this.props.userLoggedIn(user)
   }).catch(err => {
     this.setState({
       error: 'cannot register user'
      })
   })
  }

  render() {
    return ( this.props.isAuthenticated ?
      <Redirect to="/main" /> :
      <div className= "register">
        <div className= "regContainer" >
        <div className="flowerBox">
            <img className="flower" alt="" src={flower}/>
            <div className="centered">Register</div>
        </div>  
          <div className="info">
             <div className="inputBox">
                <input className="input"
                  onChange={(e) => {this.handleNameInput(e.target.value)}} 
                    type="text" 
                    placeholder="enter first name"></input>
                <br />
                <input className="input"
                  onChange={(e) => {this.handleEmailInput(e.target.value)}} 
                    type="text"  
                    placeholder="enter email"></input>
                <br />
                <input className="input"
                  onChange={((e) => this.handlePasswordInput(e.target.value))} 
                  type="password" 
                  placeholder="enter password"></input>
              </div>
              <br />
              <button className="submit" onClick={this.handleClick}>Submit</button>
              <br />
              <div className="here">Or log in <span className="link"><Link to="/">here</Link></span></div>
              <div className="error">{this.state.error}</div>
          </div>
        </div>
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