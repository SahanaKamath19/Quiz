import React, { Component } from 'react';
import {Link} from 'react-router';
import './App.css';
import Header from './Header.js';
import axios from 'axios';

class Login extends Component {
  constructor(){
    super();
    this.state={
        email:'',
        password:'',
        warning:'no-warning'
  }
  this.onEmailChange = this.onEmailChange.bind(this);
  this.onPasswordChange = this.onPasswordChange.bind(this);
  this.formSubmit = this.formSubmit.bind(this);
}
onEmailChange(e){
    this.setState({ email: e.target.value });
}
onPasswordChange(e){
    this.setState({ password: e.target.value });
}

formSubmit(e){
    e.preventDefault();
    axios
      .post('http://localhost:8080/',this.state)
      .then((res) => {
        console.log(res);
        if(res.status === 200){
            localStorage.authToken = res.data.token;
            location.href ="http://localhost:3000/quizHome";
          }
      })
      .catch(()=>{
          this.setState({
            warning:''
          })
      })
  }


  render() {
    return (
      <div className="Account-Login">
        <Header/>
        <div className="Login-body container">
          <h2 className="Account-Login-header Purple-text">Login To Your Account</h2>
          <p className={"alert alert-danger "+ this.state.warning}>Incorrect email address or password</p>
          <div className="container">
          <div className="Purple-text">Do not have an account? <Link to="/account" className="Dark-purple-text link-style">Create Account</Link> </div>
            <form>
              <div className="form-group form-elements Purple-text">
                    <div className="col-xs-6 col-form-label Label">
                    <label for="Email">Email Address:</label>
                    </div>
                    <div className="col-xs-6">
                    <input type="email" className="form-control fields" id="Email" placeholder="E.g. John_Doe@email.com" value={this.state.email} onChange={this.onEmailChange}/>
                    </div>
                </div>
                 <div className="form-group form-elements Purple-text">
                    <div className="col-xs-6 col-form-label Label">
                    <label for="Password">Password:</label>
                    </div>
                    <div className="col-xs-6">
                    <input type='password' className="form-control fields" id="Password" placeholder="********" value={this.state.password} onChange={this.onPasswordChange}/>
                    <label className="form-check-label checkStyle">
                    </label>
                    </div>
                </div>
                <input type="submit" value="Login" className="form-btn btn Dark-purple Button-style" onClick={this.formSubmit}/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;