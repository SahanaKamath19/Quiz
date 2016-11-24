import React, { Component } from 'react';
import './App.css';
import HeaderTabs from './HeaderTabs.js';
import Clock from './Clock.svg';
import ScoreBoard from './ScoreBoard.svg';
import ThumbUp from './ThumbUp.svg';
import ThumbDown from './ThumbDown.svg';
import {browserHistory} from 'react-router';
import axios from 'axios';

class QuizHome extends Component{
  constructor(){
    super();
    this.state = {
        data:null,
        loading:true, 
        auth:false,
        correctScore:0,
        wrongScore:0,
        questionNumber:1,
        randomArray:[],
        questionRequest:0,
        questionDescription:"",
        options:[]
    }
    this.startQuiz = this.startQuiz.bind(this);
    this.countdown = this.countdown.bind(this);
    this.submitAnswer= this.submitAnswer.bind(this);
  }
  componentWillMount(){
    if(localStorage.authToken !== undefined && localStorage.authToken !== null){
        //Add token to request header
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
                document.getElementById("quiz-body").style.display="none" // On load question section is hidden

                //create random number array 
              for (var i = 0, randomArray = []; i < 30; i++) {
                randomArray[i] = i;
              }
              // randomize the array
              randomArray.sort(function () {
                  return Math.random() - 0.5;
              });
              this.setState({
                randomArray:randomArray,
                questionRequest:randomArray[0]
              })
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
  console.log(this.state.questionRequest);
  
  //Function to access first question from DB
  axios.post("http://localhost:8080/questions",{questionRequested:this.state.questionRequest})
  .then((res)=>{  // use arrow function if not the keyword this would reference to the function and return undefined value
   let question = res.data.question_description;
   let options = JSON.parse(res.data.options);
    this.setState({
      questionDescription:question,
      options:options
    })
  }).catch(function(err){
        console.log(err);
    })
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
// Submit Answer Function 
//increment the question number 
//should not go above 30 questions 
//send request to question db
//change the state of questions based on returned value 
// generate answer in the form of radio button based on number of items returned in option array 
// claculate the score 
// change the state of correct or worng answer 
//and send request to DB using axios by incrementing randomArray index value so that
submitAnswer(e){
  e.preventDefault();
  this.setState({
    questionNumber:this.state.questionNumber+1
  })
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
            <div className="row">
            <div className="col-sm-3 Score">
              <div>
                <img src={ScoreBoard} className="ScoreBoard-logo logo-height" alt="ScoreBoard"/>
                <span className="Dark-purple-text Label fields">Score</span>
              </div>
              <div>
                <h4 className="Dark-purple-text">Question Number:{this.state.questionNumber}</h4>
              </div>
              <div>
                <img src={ThumbUp} className="ScoreBoard-correct-answer logo-height" alt="correctAnswer"/>
                <span className="Dark-purple-text Label fields">{this.state.correctScore}</span>
              </div>
              <div>
                <img src={ThumbDown} className="ScoreBoard-wrong-answer logo-height" alt="wrongAnswer"/>
                <span className="Dark-purple-text Label fields">{this.state.wrongScore}</span>
              </div>
            </div>
            <div className="col-sm-7 Questions">
              <p>{this.state.questionDescription}</p>
              <Options options={this.state.options}/>
              <div>
              </div>
            </div>
            <div className="Timer col-sm-2">
              <img src={Clock} className="logo-height" alt="timer"/>
              <span id="countdown" className="Dark-purple-text Label fields"></span>
            </div>
          </div>
           <input type="submit" value="Submit" className="form-btn btn Dark-purple Button-style center-block" onClick={this.submitAnswer}/>
          </div>
        </div>
        );
    }
  }
}


class Options extends React.Component{
  render(){
    let choice = this.props.options;
    console.log(choice);
    console.log(choice.length);
    return (
      <div>
      {
        choice.map((item)=>{
            return(
              <li className="Option-list">
              <input type="radio"/>
              <label>{item}</label>
            </li>
          ); 
        })
      }
       </div>
    )
  }
}
export default QuizHome;