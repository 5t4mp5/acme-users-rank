import React from "react";
import Users from "./Users";

const TopRanked = ({ topUsers, handleDelete, history }) => {
    if(!topUsers) { 
        history.push("/");
        return null;
    }
    else return (
        <Users users={topUsers} handleDelete={handleDelete} />
    );
};

export default TopRanked;
