import { useState } from "react";

export const NewUser = (props) => {
  const [name, setName] = useState(props.name || "");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5005/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: name,
      }),
    });
  };
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Save</button>
        <button>Cancel</button>
      </form>
    </>
  );
};
