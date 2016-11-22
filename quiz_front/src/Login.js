import React, { Component } from 'react';
import {Link} from 'react-router';
import './App.css';
import Header from './Header.js';


class Login extends Component {
  render() {
    return (
      <div className="Account-Login">
        <Header/>
        <div className="Login-body container">
          <h2 className="Account-Login-header Purple-text">Login To Your Account</h2>
          <div className="container">
          <div className="Purple-text">Do not have an account? <Link to="/account" className="Dark-purple-text link-style">Create Account</Link> </div>
            <form>
              <div className="form-group form-elements Purple-text">
                    <div className="col-xs-6 col-form-label Label">
                    <label for="Email">Email Address:</label>
                    </div>
                    <div className="col-xs-6">
                    <input type="email" className="form-control fields" id="Email" placeholder="E.g. John_Doe@email.com"/>
                    </div>
                </div>
                 <div className="form-group form-elements Purple-text">
                    <div className="col-xs-6 col-form-label Label">
                    <label for="Password">Password:</label>
                    </div>
                    <div className="col-xs-6">
                    <input type='password' className="form-control fields" id="Password" placeholder="********"/>
                    <label className="form-check-label checkStyle">
                    <input className="form-check-input" type="checkbox"/> Remember Me
                    </label>
                    </div>
                </div>
                <input type="submit" value="Login" className="form-btn btn Dark-purple Button-style"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;