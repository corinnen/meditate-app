import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import './Header.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {userLoggedOut} from '../../redux/reducer'

class Header extends Component {
    logout = () => {
        axios.get('/auth/logout').then(response => {
            this.props.userLoggedOut()
            this.props.history.push('/')
        })
    }

    render(){
    return (this.props.isAuthenticated ?
        <div className="navbar">
             <span className="title">My App</span>
             <div className="menu">
                {/* <Link className="nav" to="/main">Main</Link> */}
                <div onClick={this.logout} >Logout</div>
            </div>    
        </div>
            : <div className="navbar">
                <span className="title">My App</span>
                <div className="menu">
                    <Link className="nav" to="/">Login</Link>
                </div>    


        </div>
    )
    }
    
}
function mapStateToProps(state) {
    let{isAuthenticated} = state
    return {
        isAuthenticated
    }
}

export default withRouter(connect (mapStateToProps, {userLoggedOut})(Header))