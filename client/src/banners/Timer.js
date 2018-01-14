import React, { Component } from 'react';
import Banner from '../components/Banner.js';
import './Timer.css';




class Timer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timer: 0,
            time:{},
            seconds: 0
        }
    }

    secondsToTime = (secs) => {

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        minutes = this.minimumTwoDigits(minutes);
        seconds = this.minimumTwoDigits(seconds);

        let obj = {
            "m": minutes,
            "s": seconds
        };
        return obj;

    };

    minimumTwoDigits = (n) => {
        return (n < 10 ? '0' : '') + n;
    };


  componentDidMount() {
      // console.log('seconds is ' , this.state.seconds, this.props.timerDuration);
      const numSecs = this.props.timerDuration * 60;
      console.log(numSecs);
      this.setState({ seconds: numSecs });


      this.startTimer();
      let timeLeftVar = this.secondsToTime(numSecs);
      this.setState({ time: timeLeftVar });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

    startTimer = () => {
        if (this.state.timer === 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    };

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;

        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            if (this.state.min > 0) {
                this.setState({
                    seconds: 59,
                });

            } else
                clearInterval(this.timer);
        }
    };

    render() {

        return (
            <Banner idle className="timer-container" entryAnimation='FADE_IN' styles={this.props.styles}>
                <h1 className="timer-header">
                    <span id="timer">{this.state.time.m} : {this.state.time.s}</span>
                </h1>
            </Banner>
        );
    }
}

export default Timer;
