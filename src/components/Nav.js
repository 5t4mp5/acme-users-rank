import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { topRanked } from  "../store";

const mapStateToProps = state => ({
  users: state.users
});

const Nav = ({ location, users }) => {
  const tabs = ["Home", "Users", "Create A User"];
  if (users.length) tabs.push("Top Ranked");
  const linkMap = {
    Home: "/",
    Users: "/users",
    "Create A User": "/users/create",
    "Top Ranked": "/users/top"
  };
  return (
    <ul className="nav nav-tabs" style={{ marginBottom: "10px" }}>
      {tabs.map(tab => (
        <li key={tab} className="nav-item">
          <Link
            to={linkMap[tab]}
            className={`nav-link ${
              location.pathname === linkMap[tab] ? "active" : ""
            }`}
          >
            {tab} {tab === "Users" ? `(${users.length})` : ""}{" "}
            {tab === "Top Ranked"
              ? `(${topRanked(users).map(user => user.name).join(", ")})`
              : ""}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default connect(mapStateToProps)(Nav);
