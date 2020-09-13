import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReportDetails from "./ReportDetails";
import UpdateReport from "./UpdateReport";
import CreateReport from "./CreateReport";

class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [], status: '' };
    }

    callAPI() {
        fetch("http://localhost:1337/reports/")
            .then(res => res.json())
            .then(res => this.setState({ data: res.data }));
    }

    componentDidMount() {
        this.callAPI();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.week !== prevProps.match.params.week) {
            this.callAPI();
        }
    }

    CreateLinks() {
        const links = [];
        this.state.data.map((report, index) =>
            links.push(<Link key={index} className="reportLinks" to={`/reports/week/${report.week}`}>Vecka {report.week}</Link>)
        );
        return links;
    }

    render() {
        return (
            <main>
                <Router>
                    <h1>Redovisning</h1>
                    <div className="reportLinks">
                        {this.CreateLinks()}
                    </div>
                    <Switch>
                        <Route path="/reports/week/:week" component={ReportDetails}/>
                        <Route path="/reports/create" component={CreateReport}/>
                        <Route path="/reports/update/:week" component={UpdateReport}/>
                    </Switch>
                </Router>
            </main>
        );
    }
}

export default Reports;
