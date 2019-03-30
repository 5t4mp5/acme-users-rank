import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteUser } from "../store";

const mapDispatchToProps = dispatch => {
  return { handleDelete: (id) => dispatch(deleteUser(id)) };
};

const User = ({ user, handleDelete }) => {
  return (
    <li className="list-group-item">
      {user.name}
      <br />
      {user.bio}
      <br />
      <span className="badge badge-success" style={{ marginBottom: "10px" }}>
        Ranked {user.rank}
      </span>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(user.id)}
        >
          Delete
        </button>
        <Link to={`/users/${user.id}`}>Edit</Link>
      </div>
    </li>
  );
};

export default connect(null, mapDispatchToProps)(User);
