import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
// import ReadMe from './reports/README.md';
import { BrowserRouter as Switch, Route, Link, useRouteMatch } from "react-router-dom";

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
                    <Route path={`${path}/week/:week`} component={Report}>
                    </Route>
                </Switch>
            </div>
        </main>
    );
}


class Report extends Component {

    constructor() {
        super();
        this.state = { res: '' };
    }

    callAPI() {
        const week = this.props.match.params.week;

        fetch("http://localhost:1337/reports/week/" + week)
            .then(res => res.json())
            .then(res => this.setState({ week: res.data.week, content: res.data.content }));
    }

    componentDidMount() {
        this.callAPI();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.week !== this.props.match.params.week) {
            console.log("hej hej");
            this.callAPI();
        }
    }

    render() {
        return (
            <div>
                <h2>Vecka {this.state.week}</h2>
                <p>{this.state.content}</p>
            </div>
        );
    }
}

export default Reports;
