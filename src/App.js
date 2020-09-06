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
            <nav class="top-nav">
                <div class="site-name">
                    jsramverk
                </div>
            </nav>
            <nav class="bottom-nav">
                <ul>
                    <li>
                        <Link to="/">
                            <FontAwesomeIcon icon={faHome} />
                            Hem</Link>
                    </li>
                    <li>
                        <Link to="/reports/week/1">
                            <FontAwesomeIcon icon={faBookOpen} />
                            Redovisning</Link>
                    </li>
                </ul>
            </nav>
          {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
          <Switch>
              <Route exact path="/" component={Me}/>
              <Route path="/reports/week/1" component={Reports}/>
          </Switch>
        </div>
    </Router>
);

export default App;
