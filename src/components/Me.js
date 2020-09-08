import React, { Component } from 'react';

class Me extends Component {

    constructor() {
        super();
        this.state = { presentation: '' };
    }

    callAPI() {
        fetch("http://localhost:1337/")
            .then(res => res.json())
            .then(res => this.setState({ apiResponse: res.data.msg }));
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {

        return (
            <main dangerouslySetInnerHTML={{__html: this.state.apiResponse}} ></main>
        );
    }
}

export default Me;
