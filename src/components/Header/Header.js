import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Header.css'


class Header extends Component {
    constructor() {
        super()

        this.state = {
            isAuthenticated: false
        }
    }
    render(){
    return this.state.isAuthenticated ?
        <div className="navbar">
             <span className="title">My App</span>
             <div className="menu">
                <Link className="nav" to="/main">Main</Link>
                <Link className="nav" to="/main">Logout</Link>
            </div>    
        </div>
            : <div className="navbar">
                <span className="title">My App</span>
                <div className="menu">
                    <Link className="nav" to="/">Login</Link>
                </div>    


        </div>
    }
    
}

export default Header