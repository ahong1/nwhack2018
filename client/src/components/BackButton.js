import React, { Component } from 'react';
import './BackButton.css';
import BackArrow from '../images/back-arrow.svg';
import { Link } from 'react-router-dom';

class BackButton extends Component {
  render() {
    return (
      <Link to='/' className='back-button-container'>
        <img src={BackArrow} className="back-arrow-icon" alt="back" />
      </Link>
    );
  }
}

export default BackButton;
