import React, { Component } from 'react';

import LoginContainer from './LoginContainer';
import MainAppContainer from './MainAppContainer';
import { HashRouter, Route } from 'react-router-dom'
import './App.css';
import AWS from "aws-sdk";
import VideoStreamContainer from "./VideoStreamContainer";

AWS.config.update({
    accessKeyId: "AKIAIYZ35V6DRF6WX4BA",
    secretAccessKey: "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",
    region: "us-west-2"
});

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      kinesis: new AWS.Kinesis()
    }
  }

  // App will contain the pages for login/app/settings
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path="/" component={LoginContainer}/>
          <Route exact path="/app" component={MainAppContainer}/>
          <Route
            exact path="/stream"
            render={(routeProps) => (<VideoStreamContainer {...routeProps} kinesis={this.state.kinesis} />)}/>
        </div>
      </HashRouter>
    )
  }
}

export default App;
