import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { token } from "./Token.js";

class Login extends Component {

    constructor() {
        super();
        this.state = { email: '', password: '', status: '' };
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:1337/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(response => {
            if (response.data) {
                token.token = response.data.token;
                this.props.history.push('reports/week/1');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <main>
                <h1>Logga in</h1>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="email">E-post</label>
                    <input name="email" value={this.state.email} type="email" onChange={this.onChange} required />

                    <label htmlFor="password">Lösenord</label>
                    <input name="password" value={this.state.password} type="password" onChange={this.onChange} required />

                    <button type="submit">Logga in</button>
                </form>
                <Link to="/register">Skapa nytt konto</Link>
            </main>
        );
    }
}

export default Login;
