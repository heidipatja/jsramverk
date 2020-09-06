import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import ReadMe from './reports/README.md';

class Reports extends Component {

    constructor() {
        super();
        this.state = { markdown: '' };
    }

    componentWillMount() {
        fetch(ReadMe).then(res => res.text()).then(text => this.setState({ markdown: text }));
    }

    render() {

        return (
            <main>
                <h1>Redovisning</h1>
                <h2>Github</h2>
                <p>Kursrepot finns på <a href="https://github.com/heidipatja/jsramverk">GitHub</a>.</p>
                <ReactMarkdown source={this.state.markdown} />
            </main>
        );
    }
}

export default Reports;
