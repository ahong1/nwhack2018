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
import Like from "../banners/Like";
import Love from "../banners/Love";
import Question from "../banners/Question"
import AlertsOff from '../images/alerts-off.svg';
import AlertsOn from '../images/alerts-on.svg';

const BlankBanner = ({styles}) => (
  <Banner idle styles={{backgroundColor: 'black', ...styles}} />
);

const TransparentBanner = ({styles}) => (
  <Banner idle styles={{backgroundColor: 'transparent', ...styles}} />
);

let pollingIntervalFn = null;

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

      demoCount: 0,

      alertsOn: true
    }
  }

  componentDidMount() {
    const self = this;

    const header = new Headers({'Content-Type': 'application/json'});

    const fetchArgs = {
      method: 'GET',
      headers: header,
      mode: 'cors',
      cache: 'default'
    };

    setInterval(function() {
      fetch("https://ahong1.lib.id/checkStats@dev/", fetchArgs)
        .then(res => { return res.json();})
        .then(res => {self.processResults(res);})
        .catch(err => console.warn(err));
    }, 3000);

    // TODO:
    // - every xxx seconds, poll the server for any updates,
    // - if an alert is retrieved, call loadBanner() to load the appropriate screen
    // fetch("https://piggyboy.lib.id/trendy-tech-service@dkev/", fetchArgs)
    //   .then(res => res.json())
    //   .then(res => console.log('result is', res))
    //   .catch(err => console.warn(err));

    // begin the process of switching idle states
    const idleFn = setInterval(this.switchIdleStates, this.state.IDLE_SWITCH_DURATION);
    this.setState({ idleStateIntervalFn: idleFn });
  }

  resetAll = () => {
    const header = new Headers({'Content-Type': 'application/json'});

    const fetchArgs = {
      method: 'GET',
      // body: JSON.stringify({ name: 'johnny' }),
      headers: header,
      mode: 'cors',
      cache: 'default'
    };

    fetch("https://ahong1.lib.id/resetAll@dev/", fetchArgs)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.warn(err));
  };

  processResults = res => {
    console.table(res);
    // console.log(Object.keys(res));
    console.log(res.isLouder);
    // console.log(res.isfaster);
    if (res.isfaster) {
      this.loadBanner(KEYS.SPEED_UP);
        this.resetAll();
    } else if (res.isSlower) {
      this.loadBanner(KEYS.SLOW_DOWN);
        this.resetAll();
    } else if (res.isLouder) {
      this.loadBanner(KEYS.LOUDER);
        this.resetAll();
    } else if (res.isQuieter) {
      this.loadBanner(KEYS.QUIETER);
        this.resetAll();
    } else if (res.isSmile) {
      this.loadBanner(KEYS.SMILE);
        this.resetAll();
    }
  };

  componentWillUnmount() {
    if (this.state.idleStateIntervalFn) {
      clearInterval(this.state.idleStateIntervalFn);
    }
    if (pollingIntervalFn) {
      clearInterval(pollingIntervalFn)
    }
  }

  switchIdleStates = () => {
    if (this.state.isAlertPresent || !this.state.alertsOn) {
      return;
    }

    const newIdleState = (this.state.idleState === KEYS.TIMER) ? KEYS.BLANK : KEYS.TIMER;
    this.setState({ idleState: newIdleState });
  };

  handleAlertEnd = (isPresent) => {
    this.setState({ isAlertPresent: isPresent })
  };

  loadBanner = key => {

    // if alerts are disabled, don't change banners
    if (!this.state.alertsOn) {
      return;
    }

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
        LIKE:                 <Like onAlertEnd={this.handleAlertEnd} />,
        LOVE:                 <Love onAlertEnd={this.handleAlertEnd} />,
      QUESTION:               <Question onAlertEnd={this.handleAlertEnd} />,
      GESTURE:                <Timer />, // *
      STAY_STILL:             <Timer />, // *
    }[key];

    this.setState({ currentAlertBanner: bannerToLoad});

  };

  handleClick = () => {
    const keys = ['SPEED_UP', 'SLOW_DOWN', 'LOUDER', 'QUIETER', 'EYES_LEFT', 'EYES_RIGHT',
                  'MOVE_MORE', 'MOVE_LESS', 'LIKE', 'LOVE', 'QUESTION'];
    const nextKey = keys[this.state.demoCount % keys.length];
    this.setState({demoCount: this.state.demoCount + 1 });

    this.loadBanner(nextKey)
  };

  handleAlertsClick = toggle => {
    this.setState({ alertsOn: toggle });
  };

  render() {
    return (
      <div>
        <BackButton />
        <DemoButton onClick={this.handleClick}/>
        <h1 className='room-code-text'>code: r93ik</h1>
        {this.state.alertsOn
          ? <div onClick={() => this.handleAlertsClick(false)} className="alerts-icon-container"><img src={AlertsOn} className="alerts-icon" alt="alerts on" /></div>
          : <div onClick={() => this.handleAlertsClick(true)} className="alerts-icon-container"><img src={AlertsOff} className="alerts-icon" alt="alerts off" /></div>

        }
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
