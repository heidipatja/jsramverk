import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
// import ReadMe from './reports/README.md';
import { BrowserRouter as Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";

function Reports() {

    let { path, url } = useRouteMatch();

    return (
        <main>
            <div>
                <h1>Redovisningar</h1>
                <ul>
                    <li>
                        <Link to={`${url}/week/1`}>Vecka 1: Frontend</Link>
                    </li>
                    <li>
                        <Link to={`${url}/week/2`}>Vecka 2: Backend</Link>
                    </li>
                </ul>

                <Switch>
                    <Route exact path={path}>

                    </Route>
                    <Route path={`${path}/week/:kmom`} component={Report}>
                    </Route>
                </Switch>
            </div>
        </main>
    );
}

class Report extends Component {

    constructor() {
        super();
        this.state = { presentation: '' };
    }

    callAPI() {
        fetch("http://localhost:1337/reports/week/1")
            .then(res => res.json())
            .then(res => this.setState({ week: res.data.week, content: res.data.content }));
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {

        return (
            <div>
                <h3>Vecka {this.state.week}</h3>
                <p>{this.state.content}</p>
            </div>
        );
    }
}

export default Reports;
