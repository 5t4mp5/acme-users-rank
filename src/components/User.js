import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteUser, updateUser } from "../store";

const mapDispatchToProps = dispatch => {
  return {
    handleDelete: id => dispatch(deleteUser(id)),
    updateUser: user => dispatch(updateUser(user))
  };
};

const User = ({ user, handleDelete, updateUser }) => {
  return (
    <li className="list-group-item">
      <h3>{user.name}</h3>
      {user.bio}
      <br />
      <span
        className="badge badge-success"
        style={{ marginBottom: "10px", marginTop: "10px" }}
      >
        Ranked {user.rank}
      </span>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() =>
              updateUser({
                id: user.id,
                name: user.name,
                bio: user.bio,
                rank: user.rank - 1
              })
            }
            disabled={user.rank === 1}
          >
            up
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() =>
              updateUser({
                id: user.id,
                name: user.name,
                bio: user.bio,
                rank: user.rank + 1
              })
            }
          >
            down
          </button>
          <br />
          <Link to={`/users/${user.id}`} className="btn btn-info">
            Edit
          </Link>
        </div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(User);
