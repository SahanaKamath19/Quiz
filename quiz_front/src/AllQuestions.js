import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';
import './App.css';
import HeaderAdminTabs from './HeaderAdminTabs.js';
import axios from 'axios';

class AllQuestions extends Component {
    constructor(){
    super();
    this.state = {
        complexityOneArray:[],
        complexityTwoArray:[],
        complexityThreeArray:[],
        complexityArray:[],
        id:0
    }
    this.complexityOne = this.complexityOne.bind(this);
    this.complexityTwo = this.complexityTwo.bind(this);
    this.complexityThree= this.complexityThree.bind(this);
    this.delete = this.delete.bind(this);
  }
    componentWillMount(){
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
  }
complexityOne(e){
e.preventDefault();
this.setState({complexityArray:this.state.complexityOneArray})
}
complexityTwo(e){
e.preventDefault();
this.setState({complexityArray:this.state.complexityTwoArray})
}
complexityThree(e){
e.preventDefault();
this.setState({complexityArray:this.state.complexityThreeArray})    
}

delete(e){
    let id= parseInt(e.target.value)
    this.setState({
        id:id
    })
axios.delete('/deleteQuestion',{id:this.state.id})
    }   

    render(){
        return(
            <div>
                <HeaderAdminTabs />
                <h2 className="Purple-text Account-Login-header text-center"> View/Delete questions from DB </h2>
                <div className="container">
                
                <div className="form-group form-elements">
                <div className="row">
                <form>
                <div className="col-xs-12 col-sm-4">
                    <input type="submit" value="Complexity One Questions" className="form-btn btn Dark-purple Button-style" onClick={this.complexityOne}/>
                </div>
                <div className="col-xs-12 col-sm-4">
                   <input type="submit" value="Complexity Two Questions" className="form-btn btn Dark-purple Button-style center-block" onClick={this.complexityTwo}/>
                </div>
                <div className="col-xs-12 col-sm-4">
                    <input type="submit" value="Complexity Three Questions" className="form-btn btn Dark-purple Button-style pull-right" onClick={this.complexityThree}/>
                </div>
                </form>  
                </div> 
                <div className="row score-style">
                    <div className="col-sm-1 text-center score-header Dark-purple-text">Q.ID</div>
                    <div className="col-sm-7 text-center score-header Dark-purple-text">Question Description</div>
                    <div className="col-sm-3 text-center score-header Dark-purple-text">Answer</div>
                    <div className="col-sm-1"></div>
                 </div>
                 { 
                      this.state.complexityArray
                      .map((item,index)=>{
                          return(
                              <div className=" row score-style questions-style">
                                <div className="col-sm-1  Dark-purple-text">{item.id}</div>
                                <div className="col-sm-7  Dark-purple-text">{item.question_description}</div>
                                <div className="col-sm-3  Dark-purple-text">{item.correct_answer}</div>
                                <div className="col-sm-1">
                                <button type="button" className="btn btn-danger" value={item.id} onClick={this.delete}>Delete</button>
                                </div>
                              </div>
                          )
                      })
                 }
                </div>
                </div>
            </div>
        );
    }
}
export default AllQuestions;