import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class LoginContainer extends Component {

  handleChange = ({target: { value: str }}) => {
    console.log('str is ',str);
    if (!!Number(str)) {
      this.props.onSetTimerDuration(Number(str));
    }
  };

  render() {
    return (
      <div className='login-container'>
        <Link to='app'>Go to App</Link>
        <Link to='stream'>Go to Stream</Link>
        <p>Enter timer here</p>
        <input target='text' onChange={this.handleChange} />
      </div>
    );
  }
}

export default LoginContainer;
