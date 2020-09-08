import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Me from './components/Me.js';
import Reports from './components/Reports.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBookOpen } from '@fortawesome/free-solid-svg-icons';

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
                <ul>
                    <li>
                        <Link to="/">
                            <FontAwesomeIcon icon={faHome} />
                            Hem</Link>
                    </li>
                    <li>
                        <Link to="/reports">
                            <FontAwesomeIcon icon={faBookOpen} />
                            Redovisning</Link>
                    </li>
                </ul>
            </nav>
          {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
          <Switch>
              <Route exact path="/" component={Me}/>
              <Route path="/reports" component={Reports}/>
          </Switch>
        </div>
    </Router>
);

export default App;
