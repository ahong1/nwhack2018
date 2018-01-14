import React, { Component } from 'react';
import Banner from '../components/Banner.js';
import circle from '../images/circle.svg';
import './Metronome.css';

class Metronome extends Component {

  constructor(props) {
    super(props);

    this.state = {
        location: "left",
        speed: 2
      }
  }

  changeBallPosition = () => {
      if (this.state.location === "left")
          this.setState({location: "right"});
      else
          this.setState({location: "left"});
    };

  componentDidMount() {
      setInterval(this.changeBallPosition, 2000);
  }

  render() {
    return (
      <Banner duration={100000}>
        <img className={"image-" + this.state.location} src={circle} />
      </Banner>
    );
  }
}

export default Metronome;
