import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

class Main extends Component{
    constructor(){
        super();
        this.state = {
            users: [],
        };
    }
    componentDidMount(){
        axios.get("/api/users")
            .then(response => response.data)
            .then(users => this.setState({ users }));
    }
    render(){
        const { users } = this.state;
        return (
            <div className="container">
                <h1>Acme Users Rank</h1>
                <Route render={({ location }) => <Nav location={location} users={users} />} />
                <ul className="list-group">
                {
                    users.map(user => (
                        <li key={user.id} className="list-group-item">
                            {user.name}
                            <br />
                            {user.bio}
                            <br />
                            <span className="badge badge-success" style={{ marginBottom: "10px" }}>
                            Ranked {user.rank}
                            </span>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button type="button" className="btn btn-danger">Delete</button>
                            <a href={`/users/${user.id}`}>Edit</a>
                            </div>
                        </li>
                    ))
                }
                </ul> 
            </div>
        );
    }
}

export default Main;