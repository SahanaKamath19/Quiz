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
        <div className="row Header Dark-purple">
          <div className="col-xs-12 col-sm-1">
            <img src={headerLogo} className="Account-logo center-block" alt="Headerlogo" />
          </div>
          <div className="col-xs-12 col-sm-10">
          <h1 className="HeaderText text-center">Quiz</h1>
          </div>
          <div className="col-xs-12 col-sm-1 dropdown dropdown-style">
              <button className="btn btn-default dropdown-toggle center-block menu-button" type="button" data-toggle="dropdown">Menu 
               <span className="caret"></span></button>
                <ul className="dropdown-menu menu-style">
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/score">Score History</Link></li>
                <li><Link to="/" onClick={this.logout}>Logout</Link></li>
              </ul>
          </div>
        </div>
    );
  }
}

export default HeaderTabs;
