import React, { Component } from 'react';
import './App.css';
import HeaderTabs from './HeaderTabs.js';
import Clock from './Clock.svg';
import ScoreBoard from './ScoreBoard.svg';
import {browserHistory} from 'react-router';
import axios from 'axios';

class QuizHome extends Component{
  constructor(){
    super();
    this.state = {
        data:null,
        loading:true, 
        auth:false,
        timer:''
    }
    this.startQuiz = this.startQuiz.bind(this);
    this.countdown = this.countdown.bind(this);
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
                document.getElementById("quiz-body").style.display="none" // On load question section is hidden  
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
startQuiz(e){
e.preventDefault();
document.getElementById("home-page-body").style.display="none";
document.getElementById("quiz-body").style.display="block";
this.countdown("countdown",20,0);// calls the countdown function 
}

//Timer Function: this function will count down from 20 minutes to 0 and displays score section 
countdown(elementName, minutes, seconds){
        let element, endTime,hours,mins, msRemaining, time;
        function twoDigits( n ){
            return (n <= 9 ? "0" + n : n);
        }
        function updateTimer(){
            msRemaining = endTime - (+new Date()); 
            if (msRemaining < 500 ) {
              // Display score section 
                browserHistory.push('/'); // for now logout the user after 20 minutes 
            }else {
                time = new Date(msRemaining );
                mins = time.getUTCMinutes(); //getUTCSeconds() method returns the seconds (from 0 to 59) 
                element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
                setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
            }
        }
         element = document.getElementById( elementName );
         endTime = (+new Date()) + 1000 * (60*minutes + seconds) + 500; //+new Date is similar to "number(new Date())". By using "+" date will always be number 
         updateTimer();
    }
  render(){
    if (this.state.loading) {
      return <div>loading ...</div>;
    }
    else {
      return (
        <div>
        <HeaderTabs/>
        {/* Instructions Section*/}
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

          {/* Questions Section*/}
          <div className="Home-page-body container" id="quiz-body">
            <h3 className="Instructions-header Dark-purple-text text-center">Questions</h3>
            <div className="row">
            <div className="col-sm-2 Score">
              <img src={ScoreBoard} className="ScoreBoard-logo logo-height" alt="ScoreBoard"/>
              <span className="Dark-purple-text Label fields">Score</span>
            </div>
            <div className="col-sm-8 Questions">
              <p>{this.state.question_description}</p>
              <div>
                
              </div>
            </div>
            <div className="Timer clo-sm-2">
              <img src={Clock} className="logo-height" alt="timer"/>
              <span id="countdown" className="Dark-purple-text Label fields"></span>
            </div>
          </div>
          </div>
        </div>
        );
    }
  }
}
export default QuizHome;