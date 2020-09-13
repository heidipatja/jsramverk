import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { token } from "./Token.js";

class CreateReport extends Component {

    constructor() {
        super();
        this.state = { week: '', content: '', status: '' };
    }

    onChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:1337/reports", {
            method: 'POST',
            headers: {
                'x-access-token': token.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ week: this.state.week, content: this.state.content
            })
        })
        .then(res => {
            if (res.status === 201) {
                this.props.history.push("/reports/week/" + this.state.week)
            } else {
                this.setState({ status: "Kunde inte skapa ny text."})
            }
        })
        // then(Reports.updateState(this.state.status))
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render() {
        if (token.token) {
            return (
                <div>
                    <h2>Ny text</h2>
                    <div className="status">{this.state.status}</div>
                    <form onSubmit={this.onSubmit}>

                        <label htmlFor="week">Vecka</label>
                        <input type="number" name="week" value={this.state.week} onChange={this.onChange} required />

                        <label htmlFor="content">Text</label>
                        <textarea type="text" name="content" value={this.state.content} onChange={this.onChange} />

                        <button type="submit">Spara</button>
                    </form>
                    <Link to="/reports">Tillbaka till rapporter</Link>
                </div>
            );
        } else {
            return (
                <div>
                </div>
            )
        }
    }
}

export default CreateReport;
