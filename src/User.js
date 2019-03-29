import React from "react";

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
        <a href={`/users/${user.id}`}>Edit</a>
      </div>
    </li>
  );
};

export default User;
