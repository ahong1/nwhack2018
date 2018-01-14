import React, { Component } from 'react';
import Banner from '../components/Banner';
import BackButton from '../components/BackButton';
import Timer from '../banners/Timer';
import './App.css';

const BlankBanner = () => (
  <Banner styles={{backgroundColor: 'black'}} />
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
      currentBanner: <BlankBanner />, // blank banner
      isAlertPresent: false,
      idleState: KEYS.TIMER,
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
  }

  switchIdleStates = () => {


    // const newIdleState = (idleState === KEYS.TIMER) ? KEYS.METRONOME : KEYS.TIMER;
    // this.setState({ idleState: })
  };

  loadBanner = key => {
    // the key represents the message from the server that we expect to receive
    const bannerToLoad = {
      BLANK:                  <BlankBanner />,
      TIMER:                  <Timer />,
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

    this.setState({ currentBanner: bannerToLoad});
  };

  render() {
    return (
      <div className="App">
        <BackButton />
        {this.state.currentBanner}
        {/* Every 20-30 seconds, switch between <Metronome /> and <Timer /> components */}
      </div>
    );
  }
}

export default App;
