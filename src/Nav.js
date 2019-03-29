import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ location, users, topRanked }) => {
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
              ? `(${topRanked().map(user => user.name).join(", ")})`
              : ""}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
