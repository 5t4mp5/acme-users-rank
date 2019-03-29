import React, { Component } from "react";

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
    const fields = ["name", "bio", "rank"];
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
      </form>
    );
  }
}

export default CreateUser;
