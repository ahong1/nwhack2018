import React, { Component } from 'react';
import Timer from '../banners/Timer';

import LoginContainer from './LoginContainer';
import MainAppContainer from './MainAppContainer';
import { HashRouter, Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  // App will contain the pages for login/app/settings
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path="/" component={LoginContainer}/>
          <Route exact path="/app" component={MainAppContainer}/>
          {/*<Timer />*/}
          {/* Every 20-30 seconds, switch between <Metronome /> and <Timer /> components */}
        </div>
      </HashRouter>
    );
  }
}

export default App;
