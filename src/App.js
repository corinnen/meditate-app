import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Main from './components/Main/Main'
import {Switch, Route} from 'react-router-dom'
import Journal from './components/Journal/Journal'
import './reset.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/main" component={Main} />
          <Route path="/journal" component={Journal} />
        </Switch>
      </div>
    );
  }
}

export default App;
