import React, { Component } from 'react';
import headerLogo from './headerLogo.svg';
import {Link} from 'react-router';
import './App.css';

class HeaderTabs extends Component {
  render() {
    return (
        <div className="Header Dark-purple">
          <img src={headerLogo} className="Account-logo" alt="Headerlogo" />
          <h1 className="HeaderText header-tab">Quiz</h1>
          <ul className="navbar">
            <li><Link className="link-tab">Score History</Link></li>
            <li><Link to="/" className="link-tab">Logout</Link></li>
          </ul>
        </div>
    );
  }
}

export default HeaderTabs;