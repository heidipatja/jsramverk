import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { token } from './Token';

class ReportDetails extends Component {

    constructor(props) {
        super(props);
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
        document.title = "Rapport vecka " + this.props.match.params.week;
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.week !== prevProps.match.params.week) {
            this.callAPI();
        }
    }

    CreateLink() {
        if (token.token)  {
            return (
                <div className="adminLinks">
                    <Link className="createLink" to="/reports/create/">Ny text</Link>
                </div>
            )
        }
    }

    UpdateLink() {
        if (token.token)  {
            return (
                <Link className="updateLink" to={`/reports/update/${this.props.match.params.week}`}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </Link>
            )
        }
    }

    render() {
        return (
            <div>
                {this.CreateLink()}
                <div className="weekHeading">
                    <h2>Vecka {this.state.week}
                        <span className="editPen">
                            {this.UpdateLink()}
                        </span>
                    </h2>

                </div>
                <ReactMarkdown source={this.state.content} />
            </div>
        );
    }
}

export default ReportDetails;
