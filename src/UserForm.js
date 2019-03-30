import React from "react";

const UserForm = ({ handleSubmit, handleChange, state, history }) => {
  const fields = ["name", "bio", "rank"];
  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field}>
          <input
            name={field}
            type="text"
            value={state[field]}
            onChange={handleChange}
            placeholder={field}
            className="form-control"
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <button type="button" onClick={() => history.push("/users")}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
