import React from "react";
import { connect } from "react-redux"; 

const mapStateToProps = state => ({
    users: state.users
  });

const Home = ({ users }) => {
    return (
        <div>We have {users.length} Users!</div>
    );
};

export default connect(mapStateToProps)(Home);
