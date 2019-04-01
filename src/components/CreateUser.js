import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import store, { addUser, updateUser } from "../store";

const mapStateToProps = state => {
  return { users: state.users, errors: state.errors };
};

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUser(user)),
  updateUser: user => dispatch(updateUser(user))
});

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      bio: "",
      rank: ""
    };
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState(
          this.props.users.find(user => user.id === parseInt(this.props.match.params.id))
      );
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.users.length !== prevProps.users.length){
      this.props.history.push("/users");
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

    saveUser(this.state);
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
            Submit
          </button>
          <button
            type="button"
            onClick={() => history.push("/users")}
            className="btn btn-warning"
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
