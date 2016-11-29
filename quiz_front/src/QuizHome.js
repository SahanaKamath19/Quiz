import React, { Component } from 'react';
import './App.css';
import HeaderTabs from './HeaderTabs.js';
import Clock from './Clock.svg';
import ScoreBoard from './ScoreBoard.svg';
import ThumbUp from './ThumbUp.svg';
import ThumbDown from './ThumbDown.svg';
import axios from 'axios';

class QuizHome extends Component{
  constructor(){
    super();
    //data,loading and auth - stores authorization 
    //correctScore will update each time the user submits correct answer
    //wrongScore will increase each time user submits wrong answer 
    //questionNumber will update each time the user hits submits
    //randomArray will create random array between 1 to 30 
    //questionRequest integer that will inhirit value from random array 
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
        options:[],
        selectedValue:"",
        correctAnswer:""
    }
    this.startQuiz = this.startQuiz.bind(this);
    this.countdown = this.countdown.bind(this);
    this.submitAnswer= this.submitAnswer.bind(this);
    this.handleChangeRadio=this.handleChangeRadio.bind(this);
    this.retake=this.retake.bind(this); 
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
                data:res.data.name,
                id:res.data.id
                });
                document.getElementById("quiz-body").style.display="none" // On load question section is hidden
                document.getElementById("score-body").style.display="none" //On load score section is hidden

                //create random number array 
              for (var i = 1, randomArray = []; i <= 30; i++) {
                randomArray[i] = i;
              }
              // randomize the array
              randomArray.sort(function () {
                  return Math.random() - 0.5;
              });
              let questionRequest = randomArray[this.state.questionNumber-1];
              this.setState({
                randomArray:randomArray,
                questionRequest:questionRequest
              })
              console.log(randomArray);
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
  document.getElementById("score-body").style.display="none";
  document.getElementById("quiz-body").style.display="block";
  this.countdown("countdown",20,0);// calls the countdown function 
  
  //Function to access first question from DB
  axios.post("http://localhost:8080/questions",{questionRequest:this.state.questionRequest})
  .then((res)=>{  // use arrow function if not the keyword this would reference to the function and return undefined value
   let question = res.data.question_description;
   let correctAnswer = res.data.correct_answer;
   let options = JSON.parse(res.data.options);
    this.setState({
      questionDescription:question,
      correctAnswer:correctAnswer,
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
        let updateTimer=()=>{
            msRemaining = endTime - (+new Date()); 
            if (msRemaining < 500 ) {
              // Display score section 
                document.getElementById("score-body").style.display="block";
                document.getElementById("quiz-body").style.display="none";
                 axios.post('http://localhost:8080/score',{state:this.state}).then((res)=>{
                  console.log("saved the record");
                })

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
submitAnswer(e){
  e.preventDefault();
  let randomArray =this.state.randomArray;
  let questionRequest = randomArray[this.state.questionNumber];

  //This function should direct user to score page once it's created
   if(this.state.questionNumber>=30){
     document.getElementById("score-body").style.display="block";
     document.getElementById("quiz-body").style.display="none";
     //score record should be added to score database
     axios.post('http://localhost:8080/score',{state:this.state}).then((res)=>{
       console.log("saved the record");
     })
    }

  //Function to access first question from DB
  axios.post("http://localhost:8080/questions",{questionRequest:questionRequest})
  .then((res)=>{  // use arrow function if not the keyword this would reference to the function and return undefined value
   let question = res.data.question_description;
   let options = JSON.parse(res.data.options);
   let correctAnswer = res.data.correct_answer;
    this.setState({
      questionDescription:question,
      options:options,
      questionNumber:this.state.questionNumber+1,
      questionRequest:questionRequest,
      correctAnswer:correctAnswer
    })
  }).catch(function(err){
        console.log(err);
  })
  //match the user input with actual answer
  if(this.state.selectedValue===this.state.correctAnswer){
      this.setState({
        correctScore:this.state.correctScore+1
      })
  }else{
    this.setState({
        wrongScore:this.state.wrongScore+1
      })
  }
}

//Function reas the input from user
handleChangeRadio(e){
  this.setState({
    selectedValue:e.target.value
  })
}

retake(){
  location.reload();
  //update score database table recent value to false
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
          <div className="Home-page-body container" id="home-page-body">
          <h2 className="Purple-text Account-Login-header text-center">Hello {this.state.data}!</h2>
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
          <h2 className="Purple-text Account-Login-header text-center">Hello {this.state.data}!</h2>
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
              <p className="Dark-purple-text Label fields">{this.state.questionDescription}</p>
              <Options options={this.state.options} handleChangeRadio={this.handleChangeRadio} selectedValue={this.state. selectedValue}/>
            </div>
            <div className="Timer col-sm-2">
              <img src={Clock} className="logo-height" alt="timer"/>
              <span id="countdown" className="Dark-purple-text Label fields"></span>
            </div>
          </div>
           <input type="submit" value="Submit" className="form-btn btn Dark-purple Button-style center-block submit-answer" onClick={this.submitAnswer}/>
          </div>

           {/* Score Section*/}
           <div className="Home-page-body container" id="score-body">
            <h2 className="Purple-text Account-Login-header text-center">{this.state.data} You scored {this.state.correctScore}/30 </h2>
            <p className="Dark-purple-text Label fields text-center">Total number of question answered: {this.state.questionNumber}</p>
            <p className="Dark-purple-text Label fields text-center">Total number of wrong answers: {this.state.wrongScore}</p>
            <input type="submit" value="Retake Quiz" className="form-btn btn Dark-purple Button-style center-block" onClick={this.retake}/>
           </div>
           
        </div>
        
        );
    }
  }
}


class Options extends React.Component{
  render(){
    let choice = this.props.options;
    //Wrap the code within div as map returns more than one value 
    return (
      <ul className="Dark-purple-text Label fields option-style"> 
      {
        choice.map((item)=>{
            return(
              <li className="Option-list">
              <input type="radio" name="options" onClick={this.props.handleChangeRadio} value={item} checked={this.props.selectedValue === item} />
              <label className="option-list-style">{item}</label>
            </li>
          ); 
        })
      }
       </ul>
    )
  }
}
export default QuizHome;