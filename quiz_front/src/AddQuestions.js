import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';
import './App.css';
import HeaderAdminTabs from './HeaderAdminTabs.js';
import axios from 'axios';

class AddQuestions extends Component {
    constructor(){
    super();
    this.state={
        question_description:'',
        correct_answer:'',
        question_complexity:'',
        options:'',
        success:'no-success'
    }
    this.onQuestionDescriptionChange = this.onQuestionDescriptionChange.bind(this);
    this.onCorrectAnswerChange = this.onCorrectAnswerChange.bind(this);
    this.onQuestionComplexityChange = this.onQuestionComplexityChange.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

//Function to validate if all the fields are are entered by admin only then "submit" button will get enabled
componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.question_description!=='' && nextState.question_complexity!=='' && nextState.correct_answer!==''&& nextState.options!=='');
  }
onQuestionDescriptionChange(e){
    this.setState({ question_description: e.target.value });
}
onCorrectAnswerChange(e){
    this.setState({ correct_answer: e.target.value });
}
onQuestionComplexityChange(e){
    this.setState({ question_complexity: e.target.value });
}
onOptionChange(e){
    this.setState({ options: e.target.value });
}
//Function on click of "submit question" should create record of the user on DB 
 handleSubmit(e){
    e.preventDefault();
    this.setState({success:''})
    axios.post("/question",this.state)
    .then(function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    })
    this.setState({
        question_description:'',
        correct_answer:'',
        question_complexity:'',
        options:''
    })
   }
    render(){
        return(
            <div>
                <HeaderAdminTabs />
                <div className="container">
                    <h2 className="Purple-text Account-Login-header text-center">Add Questions to DB</h2>
                     <p className={"alert alert-success text-center "+ this.state.success}>Question Added to Questions table</p>
            <form>
                <div className="form-group form-elements">
                    <div className="col-xs-12 col-sm-6 form-label Label Purple-text">
                    <label for="question_description">Question Description:</label>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                    <input type="text" className="form-control fields" id="question_description" placeholder="E.g. Which of the operator is used to test if a particular property exists or not?" value={this.state.question_description} onChange={this.onQuestionDescriptionChange}/>
                    </div>
                </div>
                <div className="form-group form-elements">
                    <div className="col-xs-12 col-sm-6 form-label Label Purple-text">
                    <label for="correct_answer">Correct Answer:</label>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                    <input type="text" className="form-control fields" id="correct_answer" placeholder="E.g. in" value={this.state.correct_answer} onChange={this.onCorrectAnswerChange}/>
                    </div>
                </div>
                <div className="form-group form-elements">
                    <div className="col-xs-12 col-sm-6 form-label Label Purple-text">
                    <label for="question_complexity">Question Complexity:</label>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                    <input type="text" className="form-control fields" id="question_complexity" placeholder="E.g. 1 (low),2 or 3 (High) " value={this.state.question_complexity} onChange={this.onQuestionComplexityChange}/>
                    </div>
                </div>
                <div className="form-group form-elements">
                    <div className="col-xs-12 col-sm-6 form-label Label Purple-text">
                    <label for="options">Options:</label>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                    <input type="text" className="form-control fields" id="options" placeholder="E.g. [&quot;in&quot;,&quot;exist&quot;,&quot;within&quot;,&quot;exists&quot;]" value={this.state.options} onChange={this.onOptionChange}/>
                    </div>
                </div>
                <input type="submit" value="Submit" className="form-btn btn Dark-purple Button-style center-block" disabled={this.state.invalidData} onClick={this.handleSubmit}/>
            </form>
            </div>
            </div>
        );
    }
}
export default AddQuestions;