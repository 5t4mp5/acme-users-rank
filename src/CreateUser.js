import React, { Component } from "react";
import UserForm from "./UserForm";
import axios from "axios";

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      bio: "",
      rank: ""
    };
  }
  componentDidMount(){
    if(this.props.match){
      axios.get(`/api/users/${this.props.match.params.id}`)
        .then(response => response.data)
        .then(user => this.setState(user))
        .catch(e => console.log(e.message));
    }
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.saveUser(this.state).catch(e => console.log(e.message));
  };
  render() {
    return (
        <UserForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} state={this.state} history={this.props.history} />
    );
  }
}

export default CreateUser;
