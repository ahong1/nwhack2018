import React, { Component } from 'react';
import './Banner.css';

// props:
// - entryAnimation, default "FADE_IN"
// - exitAnimation, default "FADE_OUT"
// - duration (in ms), default 5000

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseAnimation: '',
      entryAnimation: '',
      exitAnimation: ''
    };
  }

  componentDidMount() {
    // set the initial position/styling of the banner,
    this.setState({ baseAnimation: this.props.entryAnimation || "FADE_IN" });

    // then after 0.5 seconds, set the animation
    setTimeout(() => this.setState({ entryAnimation: this.props.entryAnimation || "FADE_IN" }), 500);

    // then after this.props.duration (in ms), set the exit animation
    setTimeout(() => this.setState({ exitAnimation: this.props.exitAnimation || "FADE_IN" }), this.props.duration || 5000);
  }

  getBaseClassName = key => {
    // base positioning of the banner
    return {
      PAN_LEFT: 'banner-pan-left-base',
      PAN_RIGHT: 'banner-pan-right-base',
      PAN_UP: 'banner-pan-up-base',
      PAN_DOWN: 'banner-pan-down-base',
      FADE_IN: 'banner-fade-in-base',
      FADE_OUT: 'banner-fade-out-base'
    }[key];
  };

  getEntryTransition = key => {
    // return class names for transitions
    return {
      PAN_LEFT: 'banner-pan-left',
      PAN_RIGHT: 'banner-pan-right',
      PAN_UP: 'banner-pan-up',
      PAN_DOWN: 'banner-pan-down',
      FADE_IN: 'banner-fade-in',
      FADE_OUT: 'banner-fade-out'
    }[key];
  };

  getExitTransition = key => {
    return {
      PAN_LEFT: 'banner-pan-left-exit',
      PAN_RIGHT: 'banner-pan-right-exit',
      PAN_UP: 'banner-pan-up-exit',
      PAN_DOWN: 'banner-pan-down-exit',
      FADE_IN: 'banner-fade-out-exit', // doesn't make sense to fade-in when exiting
      FADE_OUT: 'banner-fade-out-exit'
    }[key];
  };

  render() {
    const bannerStyles = 'banner-container '
      + this.getBaseClassName(this.state.baseAnimation) + ' '
      + this.getEntryTransition(this.state.entryAnimation) + ' '
      + this.getExitTransition(this.state.exitAnimation);

    return (
      <div className={bannerStyles}>
        {this.props.children}
      </div>
    );
  }
}

export default App;
