import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

class Me extends Component {

    constructor(props) {
        super(props);
        this.state = { res: '' };
    }

    callAPI() {
        fetch("http://localhost:1337")
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
