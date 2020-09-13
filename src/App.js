import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Me from './components/Me.js';
import Reports from './components/Reports.js';
import CreateReport from './components/CreateReport.js';
import UpdateReport from './components/CreateReport.js';
import ReportDetails from './components/ReportDetails.js';
import Login from './components/Login.js';
import Register from './components/Register.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBookOpen, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './App.css';

const App = () => (
    <Router>
        <div className="App">
            <nav className="top-nav">
                <div className="site-name">
                    jsramverk
                </div>
            </nav>
            <nav className="bottom-nav">
                <div className="navContainer">
                    <Link to="/">
                        <FontAwesomeIcon icon={faHome} />
                        <span className="iconText">Hem</span>
                    </Link>
                    <Link to="/reports/week/1">
                        <FontAwesomeIcon icon={faBookOpen} />
                        <span className="iconText">Redovisning</span>
                    </Link>
                    <Link to="/login">
                        <FontAwesomeIcon icon={faSignInAlt} />
                        <span className="iconText">Logga in</span>
                    </Link>
                </div>
            </nav>
          {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path="/" component={Me}/>
                <Route path="/reports" component={Reports}/>
                <Route path="/reports/week/:week" component={ReportDetails}/>
                <Route path="/reports/update/:week" component={UpdateReport}/>
                <Route path="/reports/create" component={CreateReport}/>

                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </div>
    </Router>
);

export default App;
