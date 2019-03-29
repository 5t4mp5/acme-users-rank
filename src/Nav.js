import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ location, users }) => {
  const tabs = ["Home", "Users", "Create A User", "Top Ranked"];
  const linkMap = {
    Home: "/home",
    Users: "/users",
    "Create A User": "/create",
    "Top Ranked": "/top"
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
            {tab} {tab === "Users" ? `(${users.length})` : ""}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
