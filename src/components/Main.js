import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./Nav";
import Home from "./Home";
import Users from "./Users";
import CreateUser from "./CreateUser";
import { updateState } from "../store";

const mapStateToProps = state => {
  return { users: state.users, errors: state.errors };
};

const mapDispatchToProps = dispatch => {
  return {
    updateState: () => dispatch(updateState())
  };
};

class Main extends Component {
  componentDidMount() {
    this.props.updateState();
  }
  render() {
    return (
      <div className="container">
        <h1>Acme Users Rank</h1>
        <Route render={({ location }) => <Nav location={location} />} />
        <Switch>
          <Route
            path="/users/top"
            render={({ location }) => <Users location={location} />}
          />
          <Route
            path="/users/create"
            render={({ history }) => <CreateUser history={history} />}
          />
          <Route
            path="/users/:id"
            render={({ match, history }) => (
              <CreateUser history={history} match={match} />
            )}
          />
          <Route
            path="/users"
            render={({ location }) => <Users location={location} />}
          />
          <Route path="/" render={() => <Home />} />
        </Switch>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
