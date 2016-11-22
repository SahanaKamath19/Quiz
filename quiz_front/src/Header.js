import React, { Component } from 'react';
import headerLogo from './headerLogo.svg';
import './App.css';

class Header extends Component {
  render() {
    return (
        <div className="Header Dark-purple">
          <img src={headerLogo} className="Account-logo" alt="Headerlogo" />
          <h1 className="HeaderText text-center">Quiz</h1>
        </div>
    );
  }
}

export default Header;
