import React, { Component } from 'react';
import Banner from '../components/Banner.js';
import './Icon.css';
import question_white from '../images/question_white.svg'

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

class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Banner duration={5000} entryAnimation={animation.FADE_IN}
              styles={{zIndex: 999, backgroundColor: 'black'}} onAlertEnd={this.props.onAlertEnd}>
          <h1 >
            <img className="icon-image" src={question_white} />
          </h1>
      </Banner>
    );
  }
}

export default Question;
