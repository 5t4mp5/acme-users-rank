import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addUser, updateUser, updateState } from "../store";

const mapStateToProps = state => {
  return { users: state.users, errors: state.errors };
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user)),
    updateUser: user => dispatch(updateUser(user)),
    updateState: () => dispatch(updateState())
  };
};

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      bio: "",
      rank: ""
    };
  }
  load = () => {
    if (this.props.match.params.id) {
      this.setState(
        this.props.users.find(user => user.id === this.props.match.params.id)
      );
    } else {
      this.setState({ name: "", bio: "", rank: "" });
    }
  };
  componentDidMount() {
    if (this.props.match.params.id && !this.props.users.length) {
      this.props.updateState().then(() => this.load());
    } else this.load();
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.updateState().then(() => this.load());
    }
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const saveUser = this.props.match.params.id
      ? this.props.updateUser
      : this.props.addUser;

    saveUser(this.state)
      .then(() => this.props.history.push("/users"))
      .catch(e => console.log(e));
  };
  render() {
    const fields = ["name", "bio", "rank"];
    const { history } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        {fields.map(field => (
          <div key={field}>
            <input
              name={field}
              type="text"
              value={this.state[field]}
              onChange={this.handleChange}
              placeholder={field}
              className="form-control"
            />
          </div>
        ))}
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!this.state.name || !this.state.bio || !this.state.rank}
          >
            {this.props.location.pathname === "/users/create"
              ? "Create"
              : "Update"}
          </button>
          <button
            type="button"
            onClick={() => history.push("/users")}
            className="btn btn-default"
            style={{ backgroundColor: "gray" }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateUser)
);
