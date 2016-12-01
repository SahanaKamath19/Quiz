import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import './App.css';
import Header from './Header.js';
import axios from 'axios';

class Account extends Component {
constructor(){
    super();
    this.state={
        passwordType:'password',
        name:'',
        email:'',
        password:'',
        invalidData:true
    }
    this.showPassword = this.showPassword.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
// This function will display/hide the password typed by user 
showPassword(){
    if(this.state.passwordType === "password"){
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
componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.name!=='' && nextState.email!=='' && nextState.password!=='');
  }
onNameChange(e){
    this.setState({ name: e.target.value });
}
onEmailChange(e){
    this.setState({ email: e.target.value });
}
onPasswordChange(e){
    this.setState({ password: e.target.value });
}
//Function on click of "Create Account" should create record of the user on DB and redirect user to login page
 handleSubmit(e){
    e.preventDefault();
    axios.post("/encrypt",this.state)
    .then(function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    })
     browserHistory.push('/');
   }
  render() {
    return (
      <div className="Account-Login">
        <Header/>
        <div className="Account-body container">
            <h2 className="Account-Login-header Purple-text">Create Free Account</h2>
            <div className="container">
            <form>
                <div className="form-group form-elements">
                    <div className="col-xs-12 col-sm-6 form-label Label Purple-text">
                    <label for="userName">Pick your username:</label>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                    <input type="text" className="form-control fields" id="userName" placeholder="E.g. John Doe" value={this.state.name} onChange={this.onNameChange}/>
                    </div>
                </div>
                <div className="form-group form-elements Purple-text">
                    <div className="col-xs-12 col-sm-6 form-label Label">
                    <label for="Email">Pick your email:</label>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                    <input type="email" className="form-control fields" id="Email" placeholder="E.g. John_Doe@email.com" value={this.state.email} onChange={this.onEmailChange}/>
                    </div>
                </div>
                <div className="form-group form-elements Purple-text">
                    <div className="col-xs-12 col-sm-6 form-label Label">
                    <label for="Password">Pick a password:</label>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                    <input type={this.state.passwordType} className="form-control fields" id="Password" placeholder="********" value={this.state.password} onChange={this.onPasswordChange}/>
                    <label className="form-check-label checkStyle">
                    <input className="form-check-input" type="checkbox" onChange={this.showPassword}/> Show password
                    </label>
                    </div>
                </div>
                <input type="submit" value="Create Account" className="form-btn btn Dark-purple Button-style" disabled={this.state.invalidData} onClick={this.handleSubmit}/>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Account;
