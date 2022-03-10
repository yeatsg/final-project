import React from "react";
import axios from "axios";

const SignUp = () => {
  return (
    <div>
      <h2>Create an Account</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <form method="POST" action="https://localhost:5005/create">
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="text" name="password" />
        </label>
        <label>
          Country of Origin
          <input type="text" name="country" />
        </label>
      </form>
    </div>
  );
};

export default SignUp;
