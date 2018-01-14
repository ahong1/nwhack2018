import React, { Component } from 'react';
import Banner from '../components/Banner.js';
import './Eyes.css';
import rightArrow from '../images/right-arrow.svg';

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

class EyesRight extends Component {
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
      <Banner duration={5000}>
           <h1 className="eyes-right-header">EYES</h1> <img className="right-arrow" src={rightArrow} style={{opacity:this.state.opacity}} />
      </Banner>
    );
  }
}

export default EyesRight;
