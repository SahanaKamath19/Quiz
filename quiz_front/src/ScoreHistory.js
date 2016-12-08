import React, { Component } from 'react';
import './App.css';
import HeaderTabs from './HeaderTabs.js';
import axios from 'axios';

class ScoreHistory extends Component {

 constructor(){
    super();
    this.state = {
        data:null,
        loading:true, 
        auth:false,
        id:0,
        scores:[]
    }
  }

  componentWillMount(){
       if(localStorage.authToken !== undefined && localStorage.authToken !== null){
        axios
        .get('/quizHome',{headers:{'authorization':localStorage.authToken}})
        .then((res) => {
             if(res.status === 200){
                this.setState({
                loading:false,
                auth:true,
                data:res.data,
                id:res.data.id
                });
             }
        }).catch((err)=>{
            //send user back to login page if token is invalid
            location.href = '/';
        })
       }
        else{
        location.href = '/';
    }
  }
componentDidUpdate(){
    axios
        .post('/scores',{id:this.state.id})
        .then((res)=>{
            this.setState({
                scores:res.data
            })
        })
}
    render(){
        return(
            <div>
                <HeaderTabs />
                <h2 className="Purple-text Account-Login-header text-center">Your Score History</h2>
                 <div className="Score-page-body container" id="score-page-body">
                 <div className="row score-style">
                    <div className="col-sm-2 text-center score-header Dark-purple-text">SN</div>
                    <div className="col-sm-8 text-center score-header Dark-purple-text">SCORE</div>
                    <div className="col-sm-2 text-center score-header Dark-purple-text">DATE</div>
                 </div>
                 { 
                      this.state.scores.sort(function(a,b) {
                            return parseFloat(a.id) - parseFloat(b.id);
                      })
                      .map((item,index)=>{
                          return(
                              <div className="row score-style">
                              <div className="col-sm-2 text-center score-body Dark-purple-text">{index+1}</div>
                              <div className="col-sm-8 text-center score-body Dark-purple-text">{item.score}</div>
                              <div className="col-sm-2 text-center score-body Dark-purple-text">{item.created_at.substring(0,10)}</div>
                              </div>
                          )
                      }).reverse()
                 }
                 </div>
            </div>
        )
    }
}
export default ScoreHistory;




