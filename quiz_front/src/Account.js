import React, { Component } from 'react';
import headerLogo from './headerLogo.svg';
import './App.css';
import Header from './Header.js';

class Account extends Component {
  render() {
    return (
      <div className="Account-Login">
        <Header/>
        <div className="Account-body container">
            <h2 className="Account-Login-header Purple-text">Create Free Account</h2>
            <div className="container">
            <form>
                <div className="form-group form-elements">
                    <div className="col-xs-6 col-form-label Label Purple-text">
                    <label for="userName">Pick your username:</label>
                    </div>
                    <div className="col-xs-6">
                    <input type="text" className="form-control fields" id="userName" placeholder="E.g. John Doe"/>
                    </div>
                </div>
                <div className="form-group form-elements Purple-text">
                    <div className="col-xs-6 col-form-label Label">
                    <label for="Email">Pick your email:</label>
                    </div>
                    <div className="col-xs-6">
                    <input type="email" className="form-control fields" id="Email" placeholder="E.g. John_Doe@email.com"/>
                    </div>
                </div>
                <div className="form-group form-elements Purple-text">
                    <div className="col-xs-6 col-form-label Label">
                    <label for="Password">Pick a password:</label>
                    </div>
                    <div className="col-xs-6">
                    <input type="password" className="form-control fields" id="Password" placeholder="********"/>
                    <label className="form-check-label checkStyle">
                    <input className="form-check-input" type="checkbox"/> Show password
                    </label>
                    </div>
                </div>
                <input type="submit" value="Create Account" className="form-btn btn Dark-purple Button-style"/>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Account;


//<img src={logo} className="App-logo" alt="logo" />
