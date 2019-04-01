import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./Nav";
import Home from "./Home";
import Users from "./Users";
import CreateUser from "./CreateUser";
import { updateState, clearErrors } from "../store";

const mapStateToProps = state => {
  return { users: state.users, errors: state.errors };
};

const mapDispatchToProps = dispatch => {
  return {
    updateState: () => dispatch(updateState),
    clearErrors: () => dispatch(clearErrors)
  };
};

class Main extends Component {
  componentDidMount() {
    this.props.updateState();
  }
  componentDidUpdate(prevProps){
    if(this.props.location.pathname !== prevProps.location.pathname)
    this.props.clearErrors();
  }
  render() {
    const { history } = this.props;
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
            render={() => <CreateUser history={history} />}
          />
          <Route
            path="/users/:id"
            render={({ match }) => (
              <CreateUser history={history} match={match} />
            )}
          />
          <Route
            path="/users"
            render={({ location }) => <Users location={location} />}
          />
          <Route path="/" render={() => <Home />} />
        </Switch>
        {this.props.errors.length > 0 ? (
          <ul className="alert alert-danger">
            {this.props.errors.map((error, i) => {
              return error.errors ? 
              error.errors.map((_error, j) => {
                return <li key={i + j + _error.message}>{_error.message}</li>;
              })
              : <li key={i + error.message}>{error}</li>
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
