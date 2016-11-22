import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
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
        <Header/>
          <h1>Hello {this.state.data}!</h1>
        </div>
        );
    }
  }
}
export default QuizHome;