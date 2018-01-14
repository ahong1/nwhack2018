import React, { Component } from 'react';
import Banner from '../components/Banner';
import BackButton from '../components/BackButton';
import DemoButton from '../components/DemoButton';
import Timer from '../banners/Timer';
import './App.css';
import Metronome from '../banners/Metronome';
import SpeedUp from '../banners/SpeedUp';
import SlowDown from "../banners/SlowDown";
import MoveMore from "../banners/MoveMore";
import MoveLess from "../banners/MoveLess";
import EyesLeft from "../banners/EyesLeft";
import EyesRight from "../banners/EyesRight";
import Louder from "../banners/Louder";
import Quieter from "../banners/Quieter";
import Smile from "../banners/Smile";

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
      IDLE_SWITCH_DURATION: 10000, // how often to switch idle state screens

      currentAlertBanner: <TransparentBanner />,
      isAlertPresent: false,
      idleState: KEYS.TIMER,

      idleStateIntervalFn: (() => {}),

      demoCount: 0
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

  handleAlertEnd = (isPresent) => {
    this.setState({ isAlertPresent: isPresent })
  };

  loadBanner = key => {
    // the key represents the message from the server that we expect to receive
    const bannerToLoad = {
      BLANK:                  <BlankBanner />,
      METRONOME:              <Metronome />,
      SPEED_UP:               <SpeedUp onAlertEnd={this.handleAlertEnd} />,
      SLOW_DOWN:              <SlowDown onAlertEnd={this.handleAlertEnd} />,
      LOUDER:                 <Louder onAlertEnd={this.handleAlertEnd} />,
      QUIETER:                <Quieter onAlertEnd={this.handleAlertEnd} />,
      SMILE:                  <Smile onAlertEnd={this.handleAlertEnd}/>, // *
      EYES_LEFT:              <EyesLeft onAlertEnd={this.handleAlertEnd} />,
      EYES_RIGHT:             <EyesRight onAlertEnd={this.handleAlertEnd} />,
      EYES_LEFT_AND_RIGHT:    <Timer />, // *
      MOVE_MORE:              <MoveMore onAlertEnd={this.handleAlertEnd} />,
      MOVE_LESS:              <MoveLess onAlertEnd={this.handleAlertEnd} />,
      GESTURE:                <Timer />, // *
      STAY_STILL:             <Timer />, // *
    }[key];

    this.setState({ currentAlertBanner: bannerToLoad});

  };

  handleClick = () => {
    const keys = ['SPEED_UP', 'SLOW_DOWN', 'LOUDER', 'QUIETER', 'EYES_LEFT', 'EYES_RIGHT',
                  'MOVE_MORE', 'MOVE_LESS'];
    const nextKey = keys[this.state.demoCount % keys.length];
    this.setState({demoCount: this.state.demoCount + 1 });

    this.loadBanner(nextKey)
  };

  render() {
    return (
      <div>
        <BackButton />
        <DemoButton onClick={this.handleClick}/>
        <Timer
          timerDuration={this.props.timerDuration}
          styles={(this.state.idleState === KEYS.TIMER) ? {opacity: 1} : {opacity: 0}}
        />
        <Metronome
          styles={(this.state.idleState === KEYS.TIMER) ? {opacity: 0} : {opacity: 1}}
        />
        {this.state.currentAlertBanner}
        {/* Every 20-30 seconds, switch between <Metronome /> and <Timer /> components */}
      </div>
    );
  }
}

export default App;
