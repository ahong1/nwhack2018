import React, { Component } from 'react';
import Banner from '../components/Banner.js';
import './Text.css';

const animation = {
  PAN_LEFT: 'PAN_LEFT',
  PAN_RIGHT: 'PAN_RIGHT',
  PAN_UP: 'PAN_UP',
  PAN_DOWN: 'PAN_DOWN',
  FADE_IN: 'FADE_IN', // default
  FADE_OUT: 'FADE_OUT'
};

// Banner Props
// - entryAnimation, default "FADE_IN"
// - exitAnimation, default "FADE_OUT"
// - duration that the screen should stay on for (in ms), default 5000

// How to use:
// 1. Pick entry/exit/duration for animations
// 2. Fill in the rest with whatever you want

class Smile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Banner duration={5000} entryAnimation={animation.PAN_UP} exitAnimation={animation.PAN_UP}
              styles={{zIndex: 999, backgroundColor: 'black'}} onAlertEnd={this.props.onAlertEnd}>
          <h1 className="louder-header">:D</h1>
      </Banner>
    );
  }
}

export default Smile;
