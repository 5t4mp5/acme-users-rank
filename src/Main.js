import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import Home from "./Home";
import Users from "./Users";
import TopRanked from "./TopRanked";
import CreateUser from "./CreateUser";

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
    axios.delete(`/api/users/${id}`).then(() => this.load());
  };
  topRanked = () => {
    const { users } = this.state;
    if (!users.length) return null;
    const bestRank = users.sort((a, b) => a.rank - b.rank)[0].rank;
    return users.filter(user => user.rank === bestRank);
  };
  addUser = (user) => {
    return axios.post("/api/users", user)
      .then(() => this.load())
      .catch(e => console.log(e.message));
  }
  render() {
    const { users } = this.state;
    const { history } = this.props;
    return (
      <div className="container">
        <h1>Acme Users Rank</h1>
        <Route
          render={({ location }) => (
            <Nav location={location} users={users} topRanked={this.topRanked} />
          )}
        />
        <Switch>
          <Route
            path="/users/top"
            render={() => (
              <TopRanked
                topUsers={this.topRanked()}
                handleDelete={this.deleteUser}
                history={history}
              />
            )}
          />
          <Route path="/users/create" render={() => <CreateUser addUser={this.addUser} />} />
          <Route
            path="/users"
            render={() => (
              <Users users={users} handleDelete={this.deleteUser} />
            )}
          />
          <Route path="/" render={() => <Home users={users} />} />
        </Switch>
      </div>
    );
  }
}

export default Main;
