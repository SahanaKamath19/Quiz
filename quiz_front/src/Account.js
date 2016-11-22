import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';

class Account extends Component {
constructor(){
    super();
    this.state={
        passwordType:'password'
    }
    this.showPassword = this.showPassword.bind(this);
}
// This function will display/hide the password typed by user 
showPassword(){
    if(this.state.passwordType=="password"){
        this.setState({
            passwordType:'text'
        });
    }else{
        this.setState({
            passwordType:'password'
        });
    }
}
//Function to validate if all the fields are are entered by user only then "Create Account" button will get enabled
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
                    <input type={this.state.passwordType} className="form-control fields" id="Password" placeholder="********"/>
                    <label className="form-check-label checkStyle">
                    <input className="form-check-input" type="checkbox" onChange={this.showPassword}/> Show password
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
