import React, { Component } from 'react';
import './App.css';
import HeaderTabs from './HeaderTabs.js';
import axios from 'axios';


class QuizHome extends Component{
  constructor(){
    super();
    this.state = {
        data:null,
        loading:true, 
        auth:false
    }
  }
  componentWillMount(){
    if(localStorage.authToken !== undefined && localStorage.authToken !== null){
        //Add token to request header
        console.log("auth token");
        axios
        .get('http://localhost:8080/quizHome',{headers:{'authorization':localStorage.authToken}})
        .then( (res) => {
            console.log(res);
            if(res.status === 200){
                this.setState({
                loading:false,
                auth:true,
                data:res.data
                });
                console.log(this.data);
            }
        }).catch((err)=>{
            //send user back to login page if token is invalid
            location.href = 'http://localhost:3000/';
        })
    }
    else{
        location.href = 'http://localhost:3000';
    }
  }

  render(){
    if (this.state.loading) {
      return <div>loading ...</div>;
    }
    else {
      return (
        <div>
        <HeaderTabs/>
          <div className="Home-page-body container">
            <h2 className="Purple-text Account-Login-header text-center">Hello {this.state.data}!</h2>
          </div>
        </div>
        );
    }
  }
}
export default QuizHome;