import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import store, { addUser, updateUser } from "../store";

const mapDispatchToProps = dispatch => ({
  addUser: (user) => dispatch(addUser(user)),
  updateUser: (user) => dispatch(updateUser(user))
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
        store
          .getState()
          .users.find(user => user.id === parseInt(this.props.match.params.id))
      );
    }
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value }, () => {
      console.log(this.state);
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    console.log("SUBMIT STATE", this.state);
    const saveUser = this.props.match.params.id
      ? this.props.updateUser
      : this.props.addUser;
    
    saveUser(this.state);
    this.props.history.push("/users");
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button type="button" onClick={() => history.push("/users")}>
          Cancel
        </button>
      </form>
    );
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(CreateUser));
