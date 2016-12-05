import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';
import './App.css';
import HeaderAdminTabs from './HeaderAdminTabs.js';
import axios from 'axios';

class AllQuestions extends Component {
    render(){
        return(
            <div>
                <HeaderAdminTabs />
                <h2> Welcome to view all questions in DB </h2>
            </div>
        );
    }
}
export default AllQuestions;