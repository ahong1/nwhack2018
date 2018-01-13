import React, { Component } from 'react';
import Timer from '../banners/Timer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer />
        {/* Every 20-30 seconds, switch between <Metronome /> and <Timer /> components */}
      </div>
    );
  }
}

export default App;
