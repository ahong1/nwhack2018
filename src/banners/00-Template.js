import React, { Component } from 'react';
import Banner from '../components/Banner.js';

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

class Template extends Component {
  render() {
    return (
      <Banner entryAnimation={animation.PAN_LEFT} exitAnimation={animation.PAN_LEFT} duration={5000}>
        <h1>Hello World</h1>
      </Banner>
    );
  }
}

export default Template;
