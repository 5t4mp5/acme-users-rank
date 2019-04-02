import { createStore, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import axios from "axios";

const initialState = { users: [], errors: [] };

const REFRESH_STATE = "REFRESH_STATE";

const refreshState = (users, errors = []) => ({
  type: REFRESH_STATE,
  users,
  errors
});

export const clearErrors = dispatch => {
  dispatch(refreshState(null, []));
};

export const updateState = () => {
  return dispatch => {
    return axios
    .get("/api/users")
    .then(response => response.data)
    .then(users => refreshState(users))
    .then(action => dispatch(action))
    .catch(e => dispatch(refreshState(null, e.response ? e.response.data.errors : [])));
  } 
};

export const addUser = (user) => {
  return dispatch => {
    return new Promise((res, rej) => {
      axios
      .post("/api/users", user)
      .then(() => dispatch(updateState()))
      .then(() => dispatch(refreshState(null, [])))
      .then(() => res(user))
      .catch(e =>{
        rej(user);
        dispatch(refreshState(null, e.response ? e.response.data.errors : []));
      }); 
    });
    
  };
};

export const deleteUser = id => {
  return dispatch => {
    return axios
      .delete(`/api/users/${id}`)
      .then(() => dispatch(updateState()))
      .then(() => dispatch(refreshState(null, [])))
      .catch(e => dispatch(refreshState(null, e.response ? e.response.data.errors : [])));
  };
};

export const updateUser = (user) => {
  return dispatch => {
    return  new Promise ((res, rej) => {
      axios
      .put(`/api/users/${user.id}`, user)
      .then(() => dispatch(updateState()))
      .then(() => dispatch(refreshState(null, [])))
      .then(() => res(user))
      .catch(e => {
        rej(user);
        dispatch(refreshState(null, e.response ? e.response.data.errors : []));
      }); 
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
        users: action.users || state.users,
        errors: action.errors
      };
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunkMiddleWare));
