import React from "react";
import { get, post } from "../http/service";
import { useNavigate } from "react-router-dom";
// import loginUser from "./functions/loginUser";

const LogIn = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    post("/api/auth/login", {
      username,
      password,
    })
      .then((results) => {
        console.log("You are logged in !!!", results);
        localStorage.setItem("token", results.data);
        navigate("/home");
      })
      .catch((err) => {
        console.ereror(err.message);
      });
  };

  return (
    <div className="render-body">
      <h2>Log In</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <form onSubmit={loginUser} className="autho-form">
        <label>
          Username
          <input
            value={username}
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label>
          Password
          <input
            value={password}
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LogIn;
