import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Nav from "./Nav";
import Home from "./Home";
import Users from "./Users";
import TopRanked from "./TopRanked";
import CreateUser from "./CreateUser";
import { addUser, deleteUser, updateUser, updateState } from "../store";

const mapStateToProps = state => {
  return { users: state.users };
};

const mapDispatchToProps = dispatch => {
  return {
    updateState: () => dispatch(updateState),
  };
};

class Main extends Component {
  componentDidMount() {
    this.props.updateState();
  }

  topRanked = () => {
    const { users } = this.props;
    if (!users.length) return null;
    const bestRank = users.sort((a, b) => a.rank - b.rank)[0].rank;
    return users.filter(user => user.rank === bestRank);
  };
  render() {
    const { users } = this.props;
    const { history } = this.props;
    return (
      <div className="container">
        <h1>Acme Users Rank</h1>
        <Route
          render={({ location }) => (
            <Nav location={location} topRanked={this.topRanked()} />
          )}
        />
        <Switch>
          <Route
            path="/users/top"
            render={() => (
              <TopRanked
                topUsers={this.topRanked()}
                history={history}
              />
            )}
          />
          <Route path="/users/create" render={() => <CreateUser history={history} />} />
          <Route path="/users/:id" render={({ match }) => <CreateUser history={history} match={match} />} />
          <Route
            path="/users"
            render={() => (
              <Users users={users} />
            )}
          />
          <Route path="/" render={() => <Home />} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
