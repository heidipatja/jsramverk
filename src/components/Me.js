import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

class Me extends Component {

    constructor(props) {
        super(props);
        this.state = { res: '' };
    }

    callAPI() {
        const apiUrl = process.env.NODE_ENV === "development"
            ? "http://localhost:8333"
            : "https://me-api.heidipatja.me";

        fetch(apiUrl)
            .then(res => res.json())
            .then(res => this.setState({ content: res.data.content }));
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <main>
                <ReactMarkdown source={this.state.content} />
            </main>
        );
    }
}

export default Me;
