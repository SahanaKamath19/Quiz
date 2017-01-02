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
    //randomArray will create random array between 1 to 5 
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
        correctAnswer:"",
        questionComplexity:1,
        complexityOneArray:[],
        complexityTwoArray:[],
        complexityThreeArray:[],
        questionCount:1,
        complexityArray:[],
        showInstructions:true,
        showQuestion:false,
        showScore:false
    }
    this.startQuiz = this.startQuiz.bind(this);
    this.countdown = this.countdown.bind(this);
    this.submitAnswer= this.submitAnswer.bind(this);
    this.handleChangeRadio=this.handleChangeRadio.bind(this);
    this.retake=this.retake.bind(this); 
    this.randomNumberGenerator=this.randomNumberGenerator.bind(this);
  }
  componentWillMount(){
    if(localStorage.authToken !== undefined && localStorage.authToken !== null){
        //Add token to request header
        axios
        .get('/quizHome',{headers:{'authorization':localStorage.authToken}})
        .then( (res) => {
            console.log(res);
            if(res.status === 200){
                this.setState({
                loading:false,
                auth:true,
                data:res.data.name,
                id:res.data.id
                });
            }

             //get all the questions with complexity 1
              axios.get('/complexityOneQuestion')
              .then((res)=>{
                console.log(res.data);
                this.setState({
                  complexityOneArray:res.data,
                  complexityArray:res.data
                })
              })
              //get all the questions with complexity 2
              axios.get('/complexityTwoQuestion')
              .then((res)=>{
                console.log(res.data);
                this.setState({
                  complexityTwoArray:res.data
                })
              })

              //get all the questions with complexity 3
              axios.get('/complexityThreeQuestion')
              .then((res)=>{
                console.log(res.data);
                this.setState({
                  complexityThreeArray:res.data
                })
              })
        }).catch((err)=>{
            //send user back to login page if token is invalid
            location.href = '/';
        })
    }
    else{
        location.href = '/';
    }
  }

//Function to create random numbers
randomNumberGenerator(array){
    let length = (array).length;
    for (var i = 0, randomArray = []; i < length; i++) {
                  randomArray[i] = i;
                }
    // randomize the array
    randomArray.sort(function () {
    return Math.random() - 0.5;
    });
    this.setState({
     randomArray:randomArray
    })
  console.log(randomArray);
   return randomArray;
}


//Function to execute once the user clicks on "Start Quiz" button 
startQuiz(e){
  e.preventDefault();

  //call first set of random number 
  let random = this.randomNumberGenerator(this.state.complexityArray)[0];
   console.log(random);
   let question = this.state.complexityArray[random].question_description;
   let correctAnswer = this.state.complexityArray[random].correct_answer;
   let options = JSON.parse(this.state.complexityArray[random].options);
    this.setState({
      questionDescription:question,
      correctAnswer:correctAnswer,
      options:options,
      showInstructions:false,
      showQuestion:true
    })

  //update score database table recent value to false
  axios.post('/scoreSet',{state:this.state}).then((res)=>{
       console.log("saved the record");
     })
  this.countdown("countdown",2,0);// calls the countdown function 
  
}

//Timer Function: this function will count down from 2 minutes to 0 and displays score section 
countdown(elementName, minutes, seconds){
        let element, endTime,hours,mins, msRemaining, time;
        function twoDigits( n ){
            return (n <= 9 ? "0" + n : n);
        }
        let updateTimer=()=>{
            msRemaining = endTime - (+new Date()); 
            if (msRemaining < 500 ) {
              // Display score section 
              this.setState({
                showScore:true,
                showQuestion:false
              })
                 axios.post('/score',{state:this.state}).then((res)=>{
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
//Submit Answer Function 
submitAnswer(e){
  e.preventDefault();
  let randomArray = this.state.randomArray;
   let random = randomArray[this.state.questionCount];
   let complexityArray = this.state.complexityArray;
   let questionCount = this.state.questionCount;
   let questionNumber = this.state.questionNumber;
   let questionComplexity = this.state.questionComplexity;
   let correctScore = this.state.correctScore;
   let wrongScore = this.state.wrongScore;

  //Function to access questions with complexity 1 
  if(this.state.correctScore == 2){
       randomArray = this.randomNumberGenerator(this.state.complexityTwoArray);
        questionComplexity = 2;
        random=randomArray[0];
        questionCount = 0;
        complexityArray= this.state.complexityTwoArray;
  }else if(this.state.correctScore == 4){
      randomArray = this.randomNumberGenerator(this.state.complexityThreeArray);
        questionComplexity = 3;
        random=randomArray[0];
        questionCount = 0;
        complexityArray= this.state.complexityThreeArray;
  }
  
  //match the user input with actual answer
  if(this.state.selectedValue===this.state.correctAnswer){
    if(this.state.correctScore<2){
      correctScore = correctScore+1;
    }else if(this.state.correctScore>=2 && this.state.correctScore<=4){
      correctScore = correctScore+2;
    }else if(this.state.correctScore>=4){
      correctScore = correctScore+3;
    }   
  }else{
        wrongScore = wrongScore+1;
  }
  
  //The code is sync and if we declare this above then the question we would expect on change of complexity would still display the previous complexity question
   let questionDescription = complexityArray[random].question_description;
   let correctAnswer = complexityArray[random].correct_answer;
   let options = JSON.parse(complexityArray[random].options);

//set the sate at once as set state is async
  let newState = ({
    complexityArray:complexityArray,
    randomArray : randomArray,
    questionDescription: questionDescription,
    correctAnswer: correctAnswer,
    options : options,
    questionNumber : questionNumber+1,
    questionCount : questionCount+1,
    questionComplexity:questionComplexity,
    correctScore:correctScore,
    wrongScore:wrongScore,
    id:this.state.id
  })
  
//This function should direct user to score page once it's created
   if(this.state.questionNumber>=5){
     this.setState({
       showScore:true,
       showQuestion:false,
     })
     //score record should be added to score database
     axios.post('/score',{state:newState}).then((res)=>{
       console.log("saved the record");
     })
    }
  this.setState(newState);
}

//Function reas the input from user
handleChangeRadio(e){
  this.setState({
    selectedValue:e.target.value
  })
}

retake(){
  location.reload();
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
          <div className={this.state.showInstructions?'Home-page-body container':'hidden'} id="home-page-body">
          <h2 className="Purple-text Account-Login-header text-center">Hello {this.state.data}!</h2>
            <h3 className="Instructions-header Dark-purple-text text-center">Instructions:</h3>
            <p className="Dark-purple-text Instructions-text text-center">This Quiz tests your knowledge on HTML, CSS, Javascript and React</p>
            <ul className="Dark-purple-text Instructions-text">
              <li className="Instructions-list">There are 5 questions.</li>
              <li className="Instructions-list">You will earn one point when your total score is between 1 and 2</li>
              <li className="Instructions-list">You will earn one bonus point when your total score is between 2 and 6</li>
              <li className="Instructions-list">You will earn two bonus points when your total score is between 6 and 9</li>
              <li className="Instructions-list">You can earn upto 9 points</li>
              <li className="Instructions-list">Quiz should be completed within 2 minutes</li>
            </ul>
            <input type="submit" value="Start Quiz" className="form-btn btn Dark-purple Button-style center-block" onClick={this.startQuiz}/>
          </div>

          {/* Questions Section*/}
          <div className={this.state.showQuestion? 'Home-page-body container' : 'hidden'} id="quiz-body">
          <h2 className="Purple-text Account-Login-header text-center">Hello {this.state.data}!</h2>
            <div className="row">
            <div className="col-sm-3 Score">
              <div>
                <img src={ScoreBoard} className="ScoreBoard-logo logo-height" alt="ScoreBoard"/>
                <span className="Dark-purple-text Label fields">Score</span>
              </div>
              <div>
                <h4 className="Dark-purple-text">Question Number:{this.state.questionNumber} of 5</h4>
                <h4 className="Dark-purple-text">Question Complexity:{this.state.questionComplexity}</h4>
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
           <div className={this.state.showScore? 'Home-page-body container':'hidden'} id="score-body">
            <h2 className="Purple-text Account-Login-header text-center">{this.state.data} You scored {this.state.correctScore}/9 </h2>
            <p className="Dark-purple-text Label fields text-center">Total number of question answered: {this.state.questionNumber-1}</p>
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