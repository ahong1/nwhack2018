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

  handleChange = ({target: { value: str }}) => {
    if (!!Number(str)) {
      this.props.onSetTimerDuration(Number(str));
    }
  };

  render() {
    return (
      <div className='login-container'>
        <Link to='app'>Go to App</Link>
        <Link to='stream'>Go to Stream</Link>
          <Link to='audience'> Go to Audience</Link>
        <p>Enter timer here</p>

        <input target='text' onChange={this.handleChange} />

        <button onClick={() => {
          Myo.trigger('vibrate2short');
        }}>
          Click Me
        </button>
      </div>
    );
  }
}

export default LoginContainer;
