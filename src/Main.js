import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import Home from "./Home";
import Users from "./Users";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  load() {
    axios
      .get("/api/users")
      .then(response => response.data)
      .then(users => this.setState({ users }));
  }
  componentDidMount() {
    this.load();
  }
  deleteUser = id => {
    axios.delete(`/api/users/${id}`)
        .then(() => this.load());
  };
  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h1>Acme Users Rank</h1>
        <Route
          render={({ location }) => <Nav location={location} users={users} />}
        />
        <Route path="/" render={() => <Home users={users} />} />
        <Route
          path="/users"
          render={() => <Users users={users} handleDelete={this.deleteUser} />}
        />
      </div>
    );
  }
}

export default Main;
