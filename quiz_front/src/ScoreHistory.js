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
        .get('http://localhost:8080/quizHome',{headers:{'authorization':localStorage.authToken}})
        .then((res) => {
             if(res.status === 200){
                this.setState({
                loading:false,
                auth:true,
                data:res.data,
                id:res.data.id
                });

                // console.log("score");
                // console.log(res);
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

componentDidUpdate(){
    axios
        .post('http://localhost:8080/scores',{id:this.state.id})
        .then((res)=>{
            console.log(res.data);
            this.setState({
                scores:res.data
            })
        })
}
    render(){
        return(
            <div>
                <HeaderTabs />
                 <div className="Score-page-body container" id="score-page-body">
                 {
                      this.state.scores.map((item,index=1)=>{
                          return(
                              <div className="row">
                              <div className="col-sm-2 text-center">{index}</div>
                              <div className="col-sm-4 text-center">{item.score}</div>
                              <div className="col-sm-6 text-center">{item.created_at}</div>
                              </div>
                          )
                      })
                 }
                 </div>
            </div>
        )
    }
}
export default ScoreHistory;




