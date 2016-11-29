import React, { Component } from 'react';
import headerLogo from './headerLogo.svg';
import {Link} from 'react-router';
import './App.css';

class HeaderTabs extends Component {
  constructor(){
    super();
    this.logout = this.logout.bind(this);
  }
  logout(){
    localStorage.clear();
  }
  render() {
    return (
        <div className="Header Dark-purple">
          <img src={headerLogo} className="Account-logo" alt="Headerlogo" />
          <h1 className="HeaderText header-tab">Quiz</h1>
          <ul className="navbar">
            <li><Link to="/quizHome"className="link-tab">Home</Link></li>
            <li><Link to="/score"className="link-tab">Score History</Link></li>
            <li><Link to="/" className="link-tab" onClick={this.logout}>Logout</Link></li>
          </ul>
        </div>
    );
  }
}

export default HeaderTabs;