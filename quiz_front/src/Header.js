import React, { Component } from 'react';
import headerLogo from './headerLogo.svg';
import './App.css';

class Header extends Component {
  render() {
    return (
        <div className="row Header Dark-purple">
          <div className="col-xs-12 col-sm-1">
            <img src={headerLogo} className="Account-logo" alt="Headerlogo" />
          </div>
          <div className="col-xs-12 col-sm-10">
          <h1 className="HeaderText text-center">Quiz</h1>
          </div>
          <div className="col-sm-1">
          </div>
        </div>
    );
  }
}

export default Header;
