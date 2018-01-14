import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './App.css';
import AWS from "aws-sdk";
import VideoStreamContainer from "./VideoStreamContainer";

AWS.config.update({
    accessKeyId: "AKIAIYZ35V6DRF6WX4BA",
    secretAccessKey: "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",
    region: "us-west-2"
})

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            Kinesis: new AWS.Kinesis()
        }

    }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <VideoStreamContainer kinesis={this.state.Kinesis}/>

      </div>
    );
  }
}

export default App;
