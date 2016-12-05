import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Account from './Account';
import Login from './Login';
import QuizHome from './QuizHome';
import ScoreHistory from './ScoreHistory';
import AdminLogin from './AdminLogin';
import AdminHome from './AdminHome';
import AllQuestions from './AllQuestions';
import AddQuestions from './AddQuestions';
import ModifyQuestions from './AddQuestions';
import DeleteQuestions from './DeleteQuestions';
import Report from './Report'
import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/account" component={Account} />
        <Route path="/Home" component={QuizHome} />
        <Route path="/score" component={ScoreHistory} />
        <Route path="/admin" component={AdminLogin} />
        <Route path="/adminHome" component={AdminHome} />
        <Route path="/allQuestions" component={AllQuestions} />
        <Route path="/addQuestions" component={AddQuestions} />
        <Route path="/deleteQuestions" component={DeleteQuestions} />
        <Route path="/report" component={Report} />
    </Router>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
