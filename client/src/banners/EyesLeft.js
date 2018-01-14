import React, { Component } from 'react';
import Banner from '../components/Banner.js';
import './Eyes.css';
import leftArrow from '../images/left-arrow.svg';

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

class EyesLeft extends Component {
  constructor(props) {
    super(props);

    this.state = {
        opacity:1,
        speed:1000
      }
  }

    changeDisplay = () => {
        if (this.state.opacity > 0)
            this.setState({opacity: 0});
        else
            this.setState({opacity: 1});
    };

    componentDidMount() {
        setInterval(this.changeDisplay, this.state.speed);
    }

  render() {
    return (
      <Banner duration={5000} entryAnimation={animation.PAN_LEFT} exitAnimation={animation.PAN_LEFT}
              styles={{zIndex: 999, backgroundColor: 'black'}} onAlertEnd={this.props.onAlertEnd}>
          <img className="left-arrow" src={leftArrow} style={{opacity:this.state.opacity}} /> <h1 className="eyes-left-header">EYES</h1>
      </Banner>
    );
  }
}

export default EyesLeft;
