import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import Home from "./Home";
import Users from "./Users";
import TopRanked from "./TopRanked";

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
