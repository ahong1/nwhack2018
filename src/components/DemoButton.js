import React, { Component } from 'react';
import './BackButton.css';
import Heart from '../images/heart.svg';
import { Link } from 'react-router-dom';

class DemoButton extends Component {
  render() {
    return (
      <div onClick={this.props.onClick} className='heart-button-container'>
        <img src={Heart} className="heart-icon" alt="back" />
      </div>
    );
  }
}

export default DemoButton;
