import React, { Component } from 'react';
import Banner from '../components/Banner';
import BackButton from '../components/BackButton';
import Timer from '../banners/Timer';
import './App.css';

const BlankBanner = ({styles}) => (
  <Banner idle styles={{backgroundColor: 'black', ...styles}} />
);

const TransparentBanner = ({styles}) => (
  <Banner idle styles={{backgroundColor: 'transparent', ...styles}} />
);

// list of potential valid keys
const KEYS = {
  BLANK:                'BLANK',
  TIMER:                'TIMER',
  METRONOME:            'METRONOME',
  SPEED_UP:             'SPEED_UP',
  SLOW_DOWN:            'SLOW_DOWN',
  LOUDER:               'LOUDER',
  QUIETER:              'QUIETER',
  SMILE:                'SMILE',
  EYES_LEFT:            'EYES_LEFT',
  EYES_RIGHT:           'EYES_RIGHT',
  EYES_LEFT_AND_RIGHT:  'EYES_LEFT_AND_RIGHT',
  MOVE_MORE:            'MOVE_MORE',
  MOVE_LESS:            'MOVE_LESS',
  GESTURE:              'GESTURE',
  STAY_STILL:           'STAY_STILL',
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      IDLE_SWITCH_DURATION: 5000, // how often to switch idle state screens

      currentAlertBanner: <TransparentBanner />,
      isAlertPresent: false,
      idleState: KEYS.TIMER,

      idleStateIntervalFn: (() => {})
    }
  }

  componentDidMount() {
    const header = new Headers({'Content-Type': 'application/json'});

    const fetchArgs = {
      method: 'POST',
      body: JSON.stringify({ name: 'johnny' }),
      headers: header,
      mode: 'cors',
      cache: 'default'
    };

    // TODO:
    // - every xxx seconds, poll the server for any updates,
    // - if an alert is retrieved, call loadBanner() to load the appropriate screen
    fetch("https://piggyboy.lib.id/trendy-tech-service@dkev/", fetchArgs)
      .then(res => res.json())
      .then(res => console.log('result is', res))
      .catch(err => console.warn(err));

    // begin the process of switching idle states
    const idleFn = setInterval(this.switchIdleStates, this.state.IDLE_SWITCH_DURATION);
    this.setState({ idleStateIntervalFn: idleFn });
  }

  componentWillUnmount() {
    if (!this.state.idleStateIntervalFn) {
      clearInterval(this.state.idleStateIntervalFn);
    }
  }

  switchIdleStates = () => {
    if (this.state.isAlertPresent) {
      return;
    }

    const newIdleState = (this.state.idleState === KEYS.TIMER) ? KEYS.BLANK : KEYS.TIMER;
    this.setState({ idleState: newIdleState });
  };


  loadBanner = key => {
    // the key represents the message from the server that we expect to receive
    const bannerToLoad = {
      BLANK:                  <BlankBanner />,
      METRONOME:              <Timer />,
      SPEED_UP:               <Timer />,
      SLOW_DOWN:              <Timer />,
      LOUDER:                 <Timer />,
      QUIETER:                <Timer />,
      SMILE:                  <Timer />,
      EYES_LEFT:              <Timer />,
      EYES_RIGHT:             <Timer />,
      EYES_LEFT_AND_RIGHT:    <Timer />,
      MOVE_MORE:              <Timer />,
      MOVE_LESS:              <Timer />,
      GESTURE:                <Timer />,
      STAY_STILL:             <Timer />,
    }[key];

    this.setState({ currentAlertBanner: bannerToLoad});
  };

  render() {
    return (
      <div className="App">
        <BackButton />
        <Timer
          timerDuration={this.props.timerDuration}
          styles={(this.state.idleState === KEYS.TIMER) ? {opacity: 1} : {opacity: 0}}
        />
        <BlankBanner
          styles={(this.state.idleState === KEYS.TIMER) ? {opacity: 0} : {opacity: 1}}
        />
        {this.state.currentAlertBanner}
        {/* Every 20-30 seconds, switch between <Metronome /> and <Timer /> components */}
      </div>
    );
  }
}

export default App;
