import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';
import './App.css';
import HeaderAdminTabs from './HeaderAdminTabs.js';
import axios from 'axios';

class AdminHome extends Component {
    constructor(){
    super();
    this.state = {
        data:null,
        loading:true, 
        auth:false
        }
    }
     componentWillMount(){
    if(localStorage.authToken !== undefined && localStorage.authToken !== null){
        //Add token to request header
        axios
        .get('/adminDetails',{headers:{'authorization':localStorage.authToken}})
        .then( (res) => {
            console.log(res);
            if(res.status === 200){
                this.setState({
                loading:false,
                auth:true,
                data:res.data.name
                });
            }
        }).catch((err)=>{
            //send user back to login page if token is invalid
            location.href = '/admin';
        })
    }
    else{
        location.href = '/admin';
    }
    }
    render(){
        if (this.state.loading) {
      return <div>loading ...</div>;
    }
    else {
        return(
            <div>
                <HeaderAdminTabs/>
                <div className="container">
                <h2 className="Purple-text Account-Login-header text-center">Welcome {this.state.data}</h2>
                    <ul>
                        <li className="Instructions-list">
                            <Link to="/addQuestions" className="Dark-purple-text Instructions-text report-list">
                                Add questions to DB
                            </Link>
                        </li>
                        <li className="Instructions-list">
                            <Link to="/deleteQuestions" className="Dark-purple-text Instructions-text report-list">
                                Delete questions from DB
                            </Link>
                        </li>
                        <li className="Instructions-list">
                            <Link to="/allQuestions" className="Dark-purple-text Instructions-text report-list">
                                View all the questions
                            </Link>
                        </li>
                        <li className="Instructions-list">
                            <Link to="/report" className="Dark-purple-text Instructions-text report-list">
                                Top 10 scores
                            </Link>
                        </li>
                    </ul>  
                </div>
            </div>
        );
    }
    }
}
export default AdminHome;