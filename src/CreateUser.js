import React, { Component } from "react";
import UserForm from "./UserForm";

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      bio: "",
      rank: ""
    };
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.addUser(this.state).catch(e => console.log(e.message));
  };
  render() {
    return (
        <UserForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} state={this.state}/>
    );
  }
}

export default CreateUser;
