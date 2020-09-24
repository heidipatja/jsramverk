import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { token } from "./Token.js";

class UpdateReport extends Component {

    constructor() {
        super();
        this.state = { week: '', content: '' };
    }

    callAPI() {
        let week = this.props.match.params.week;

        const apiUrl = process.env.NODE_ENV === "development"
            ? "http://localhost:8333"
            : "https://me-api.heidipatja.me";

        fetch(apiUrl + "/reports/week/" + week)
            .then(res => res.json())
            .then(res => this.setState({ week: res.data.week, content: res.data.content }));
    }

    componentDidMount() {
        this.callAPI();
        document.title = "Uppdatera rapport";
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.week !== prevProps.match.params.week) {
            this.callAPI();
        }
    }

    onChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const apiUrl = process.env.NODE_ENV === "development"
            ? "http://localhost:8333"
            : "https://me-api.heidipatja.me";

        fetch(apiUrl + "/reports", {
            method: 'PUT',
            headers: {
                'x-access-token': token.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                week: this.state.week,
                content: this.state.content
            })
        })
        .then(res => {
            if (res.status === 204) {
                this.props.history.push("/reports/week/" + this.state.week)
            } else {
                this.setState({ status: "Kunde inte uppdatera."})
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render() {
        if (token.token) {
            return (
                <div>
                    <h2>Uppdatera text</h2>
                    <h3>Vecka {this.state.week}</h3>
                    <div className="status">{this.state.status}</div>
                    <form onSubmit={this.onSubmit}>

                        <label htmlFor="content">Text</label>
                        <textarea type="text" name="content" value={this.state.content} onChange={this.onChange} />

                        <button type="submit">Spara</button>
                    </form>
                    <Link to={`/reports/week/${this.props.match.params.week}`}>Tillbaka</Link>
                </div>
            );
        } else {
            return (
                <div>
                    <p><Link to="/login">Logga in</Link> för att uppdatera texter.</p>
                </div>
            )
        }
    }
}

export default UpdateReport;
