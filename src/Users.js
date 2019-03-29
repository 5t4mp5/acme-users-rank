import React from "react";
import User from "./User";

const Users = ({ users, handleDelete }) => {
  return (
    <ul className="list-group">
      {users.map(user => (
        <User key={user.id} user={user} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default Users;
