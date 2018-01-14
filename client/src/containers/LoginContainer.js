import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class LoginContainer extends Component {
  render() {
    return (
      <div className='login-container'>
        <Link to='app'>Go to App</Link>
        <p>Enter timer here</p>
        <input />
      </div>
    );
  }
}

export default LoginContainer;
