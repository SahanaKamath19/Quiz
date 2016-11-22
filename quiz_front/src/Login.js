import React, { Component } from 'react';
import headerLogo from './headerLogo.svg';
import './App.css';
import Header from './Header.js';

class Login extends Component {
  render() {
    return (
      <div className="Account">
        <Header/>
        <div className="Account-body container">
            <h2 className="Account-header Purple-text">Create Account</h2>
            <div className="container">
            <form>
                <div className="form-group form-elements Purple-text">
                    <div className="col-xs-6 col-form-label Label">
                    <label for="Email">Email</label>
                    </div>
                    <div className="col-xs-6">
                    <input type="email" className="form-control fields" id="Email" placeholder="E.g. John_Doe@email.com"/>
                    </div>
                </div>
                <div className="form-group form-elements Purple-text">
                    <div className="col-xs-6 col-form-label Label">
                    <label for="Password">Password</label>
                    </div>
                    <div className="col-xs-6">
                    <input type="password" className="form-control fields" id="Password" placeholder="********"/>
                    </div>
                </div>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Account;