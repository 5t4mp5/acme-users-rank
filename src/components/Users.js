import React from "react";
import User from "./User";
import { connect } from "react-redux";
import { topRanked } from "../store";

const mapStateToProps = state => {
  return { users: state.users }
};

const Users = ({ users, location }) => {
if(location.pathname === "/top"){
  users = topRanked(users);
}
  return (
    <ul className="list-group">
      {users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </ul>
  );
};

export default connect(mapStateToProps)(Users);
