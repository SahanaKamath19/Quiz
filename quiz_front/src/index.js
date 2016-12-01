import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Account from './Account';
import Login from './Login';
import QuizHome from './QuizHome';
import ScoreHistory from './ScoreHistory';
import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/account" component={Account} />
        <Route path="/Home" component={QuizHome} />
        <Route path="/score" component={ScoreHistory} />
    </Router>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
