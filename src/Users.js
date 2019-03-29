import React from "react";

const Users = ({ users, handleDelete }) => {
  return (
    <ul className="list-group">
      {users.map(user => (
        <li key={user.id} className="list-group-item">
          {user.name}
          <br />
          {user.bio}
          <br />
          <span
            className="badge badge-success"
            style={{ marginBottom: "10px" }}
          >
            Ranked {user.rank}
          </span>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(user.id)}>
              Delete
            </button>
            <a href={`/users/${user.id}`}>Edit</a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Users;
