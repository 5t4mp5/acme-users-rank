import { createStore, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import axios from "axios";

const initialState = { users: [] };

const REFRESH_STATE = "REFRESH_STATE";

const refreshState = users => ({
  type: REFRESH_STATE,
  users
});

export const updateState = () => {
  return dispatch => {
    return axios
      .get("/api/users")
      .then(response => response.data)
      .then(users => {
        dispatch(refreshState(users));
        return users;
      });
  };
};

export const addUser = user => {
  return dispatch => {
    return axios.post("/api/users", user).then(response => {
      dispatch(updateState());
      return response.data;
    });
  };
};

export const deleteUser = id => {
  return dispatch => {
    return axios.delete(`/api/users/${id}`).then(response => {
      dispatch(updateState());
      return response.data;
    });
  };
};

export const updateUser = user => {
  return dispatch => {
    return axios.put(`/api/users/${user.id}`, user).then(response => {
      dispatch(updateState());
      return response.data;
    });
  };
};

export const topRanked = users => {
  if (!users.length) return [];
  const bestRank = users.sort((a, b) => a.rank - b.rank)[0].rank;
  return users.filter(user => user.rank === bestRank);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REFRESH_STATE:
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunkMiddleWare));
