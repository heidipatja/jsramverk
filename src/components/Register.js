import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Register extends Component {

    constructor() {
        super();
        this.state = { email: '', password: '', status: '' };
    }

    onChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:1337/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(response => {
            if (response.data) {
                this.props.history.push('login');
            } else {
                this.setState({ status: "Kunde inte registrera, prova igen."});
            }
        });
    }

    render() {
        return (
            <main>
                <h1>Registrera dig</h1>
                <div className="status">{this.state.status}</div>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="email">E-post</label>
                    <input name="email" value={this.state.email} type="email" onChange={this.onChange} required />

                    <label htmlFor="password">Lösenord</label>
                    <input name="password" value={this.state.password} type="password" onChange={this.onChange} required />

                    <button type="submit">Registrera dig</button>
                </form>
                <Link to="/login">Jag har redan ett konto</Link>
            </main>
        );
    }
}

export default Register;
