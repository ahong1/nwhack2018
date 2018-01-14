import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Myo from 'myo';

Myo.connect('com.example.ticktocktock');

Myo.on('vibrate2short', function(){
  console.log('Hello Myo!');
  Myo.myos[0].vibrate('short');
  Myo.myos[0].vibrate('short');
});

class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title1: 'title-1-base',
      title2: 'title-2-base',
      title3: 'title-3-base',
      title4: 'title-4-base',
      title5: 'title-5-base',
      title6: 'title-6-base',
      title7: 'title-7-base'
    }
  }

  componentDidMount() {
    const self = this;

    for (let i = 0; i < 7; i++) {
      setTimeout(function() {
        self.setState({[`title${i + 1}`]: `title-${i + 1}-base title-${i + 1}`});
      }, i * 100);
    }
  }

  handleChange = ({target: { value: str }}) => {
    if (!!Number(str)) {
      this.props.onSetTimerDuration(Number(str));
    }
  };

  render() {
    return (
      <div className='login-container'>

        <div className="title-container">
          <span className="title-span">
            <h1 className={this.state.title1}>⌈</h1>
            <h1 className={this.state.title2}>t</h1>
            <h1 className={this.state.title3}>t</h1>
            <h1 className={this.state.title4}>t</h1>
            <h1 className={this.state.title5}>.</h1>
            <h1 className={this.state.title6}>t</h1>
            <h1 className={this.state.title7}>⌋</h1>
          </span>
        </div>

        <div className="login-panel">

          <div className="login-panel-left">
            <div style={{display: 'flex', flexFlow: 'row'}}>
              <h3>Presentation:</h3>
              <input className="number-picker" type="number" onChange={this.handleChange} />
              <h3>minutes</h3>
            </div>
            <Link to='app' className="presentation-start-button">START</Link>
          </div>

          <div className="login-panel-right">
            <div style={{display: 'flex', flexFlow: 'row'}}>
              <h3>Room Code:</h3>
              <input className='room-code' type="text"/>
            </div>
            <Link to='audience' className="room-code-button">SUBMIT</Link>
          </div>
        </div>

      </div>
    );
  }
}

export default LoginContainer;
