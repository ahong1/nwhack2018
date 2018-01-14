import React, { Component } from 'react';

import LoginContainer from './LoginContainer';
import MainAppContainer from './MainAppContainer';
import { HashRouter, Route } from 'react-router-dom'
import './App.css';
import AWS from "aws-sdk";
import VideoStreamContainer from "./VideoStreamContainer";
import AudienceContainer from "./AudienceContainer";
import Myo from 'myo';

Myo.connect('com.example.ticktocktock');

Myo.on('vibrate2short', function(){
    console.log('Hello Myo!');
    Myo.myos[0].vibrate('short');
    Myo.myos[0].vibrate('short');
});


AWS.config.update({
    accessKeyId: 'AKIAIIZPL74DK4BXD45Q',
    secretAccessKey: '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',
    region: "us-west-2"
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      kinesis: new AWS.Kinesis(),
      timerDuration: 10 // in minutes
    }
  }

  handleSetTimerDuration = value => {
    console.log('value is ', value);
    if ((typeof value === 'number') && isFinite(value)) {
      this.setState({ timerDuration: Number(value) });
    }
  };

  // App will contain the pages for login/app/settings
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route
            exact path="/"
            render={(routeProps) => (<LoginContainer {...routeProps} onSetTimerDuration={this.handleSetTimerDuration} />)}
          />
          <Route
            exact path="/app"
            render={(routeProps ) => (<MainAppContainer {...routeProps} timerDuration={this.state.timerDuration} />)}
          />
          <Route
            exact path="/stream"
            render={(routeProps) => (<VideoStreamContainer {...routeProps} kinesis={this.state.kinesis} Rekognition={new AWS.Rekognition()} S3={new AWS.S3()} DB={new AWS.DynamoDB()}/>)}
          />
          {/*<button onClick={() => {*/}
              {/*console.log('Hey I Worked');*/}
              {/*Myo.trigger('vibrate2short');*/}
          {/*}}>*/}
            {/*Click Me*/}
          {/*</button>*/}
          <Route
              exact path="/audience"
              render={(routeProps) => (<AudienceContainer {...routeProps}/>)}/>
        </div>
      </HashRouter>
    )
  }
}

export default App;
