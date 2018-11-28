import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Main from './components/Main/Main'
import {Switch, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Timer from './components/Timer/Timer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/main" component={Main} />
          <Route path="/timer" component={Timer} />
        </Switch>
      </div>
    );
  }
}

export default App;
