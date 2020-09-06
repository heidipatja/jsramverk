import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Me from './components/Me.js';
import Reports from './components/Reports.js';

import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Hem</Link>
          </li>
          <li>
            <Link to="/reports/week/1">Redovisning</Link>
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
    <footer>
        <p>&copy; Heidi Patja 2020</p>
    </footer>
  </Router>
);

export default App;
