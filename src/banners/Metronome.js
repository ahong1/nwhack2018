import React, { Component } from 'react';
import Banner from '../components/Banner.js';
import circle from '../images/circle.svg';
import './Metronome.css';

class Metronome extends Component {

  constructor(props) {
    super(props);

    this.state = {
        location: "left",
        // speed: 2000,
        intervalFn: (() => {})
      }
  }

  changeBallPosition = () => {
      if (this.state.location === "left")
          this.setState({location: "right"});
      else
          this.setState({location: "left"});
    };

  // componentDidMount() {
  //     this.setState({intervalFn: setInterval(this.changeBallPosition, this.state.speed)});
  // }

  // componentWillUnmount() {
  //   clearInterval(this.state.intervalFn);
  // }

  render() {
    return (
      <Banner idle styles={{...this.props.styles, display: 'flex', alignItems: 'center'}}>
        <img className={"ball"} src={circle} />
      </Banner>
    );
  }
}

export default Metronome;
