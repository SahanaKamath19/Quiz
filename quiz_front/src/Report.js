import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';
import './App.css';
import HeaderAdminTabs from './HeaderAdminTabs.js';
import axios from 'axios';

class Report extends Component {
    constructor(){
        super();
        this.state = {
            highestScore:[]
        }
    }
    componentWillMount(){
        //To get top 10 users with highest score
        console.log("Report page");
         axios.get('/highestScore')
              .then((res)=>{
                console.log(res.data);
                this.setState({
                  highestScore:res.data
                })
              })
    }
    render(){
        return(
            <div>
                <HeaderAdminTabs />
                <h2 className="container Dark-purple-text Instructions-header text-center">Top 10 Scores</h2>
                <div className="Score-page-body container" id="score-page-body">
                    <div className="row score-style">
                        <div className="col-sm-1 text-center score-header Dark-purple-text">Rank</div>
                        <div className="col-sm-2 text-center score-header Dark-purple-text">User ID</div>
                        <div className="col-sm-7 text-center score-header Dark-purple-text">User Name</div>
                        <div className="col-sm-2 text-center score-header Dark-purple-text">Score</div>
                    </div>
                 { 
                      this.state.highestScore.map((item,index)=>{
                          return(
                              <div className="row score-style">
                                <div className="col-sm-1 text-center score-body Dark-purple-text">{index+1}</div>
                                <div className="col-sm-2 text-center score-body Dark-purple-text">{item.user_id}</div>
                                <div className="col-sm-7 text-center score-body Dark-purple-text">User Name</div>
                                <div className="col-sm-2 text-center score-body Dark-purple-text">{item.score}</div>
                             </div>
                          )
                      })
                 }

                </div>
            </div>
        );
    }
}
export default Report;