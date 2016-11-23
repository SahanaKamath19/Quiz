import React, { Component } from 'react';
import './App.css';
import HeaderTabs from './HeaderTabs.js';
import {browserHistory} from 'react-router';
import axios from 'axios';


class QuizHome extends Component{
  constructor(){
    super();
    this.state = {
        data:null,
        loading:true, 
        auth:false
    }
    this.startQuiz = this.startQuiz.bind(this);
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

//Function to execute once the user clicks on "Start Quiz" button 
//Time out is set to 20 minutes, once the time reaches 0 the user will be directed to Result page 1200000
startQuiz(e){
e.preventDefault();
setTimeout(() => { 
  browserHistory.push('/');
},5000
    );
}
  render(){
    if (this.state.loading) {
      return <div>loading ...</div>;
    }
    else {
      return (
        <div>
        <HeaderTabs/>
        <h2 className="Purple-text Account-Login-header text-center">Hello {this.state.data}!</h2>
          <div className="Home-page-body container" id="home-page-body">
            <h3 className="Instructions-header Dark-purple-text text-center">Instructions:</h3>
            <p className="Dark-purple-text Instructions-text text-center">This Quiz tests your knowledge on HTML, CSS, Javascript and React</p>
            <ul className="Dark-purple-text Instructions-text">
              <li className="Instructions-list">There are 30 questions. A correct answers adds one point.</li>
              <li className="Instructions-list">Quiz should be completed within 20 minutes</li>
            </ul>
            <input type="submit" value="Start Quiz" className="form-btn btn Dark-purple Button-style center-block" onClick={this.startQuiz}/>
          </div>
        </div>
        );
    }
  }
}
export default QuizHome;