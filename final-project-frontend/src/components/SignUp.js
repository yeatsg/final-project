import React from "react";
import axios from "axios";
import { post } from "../http/service";
import { useNavigate } from "react-router-dom";
// Components //
import loginUser from "./functions/loginUser";
// import createUser from "./functions/createUser";

const SignUp = () => {
  // State Variables //
  // Render REact Triggers //
  const [spotifyForm, setSpotifyForm] = React.useState(false);

  // Form submission
  const [spotifyData, setSpotifyData] = React.useState({});
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [spotifyId, setSpotifyId] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [spotifyAccountType, setSpotifyAccountType] = React.useState("");
  const [pictureUrl, setPictureUrl] = React.useState("");
  const navigate = useNavigate();

  const createUser = (e) => {
    e.preventDefault();
    post("/api/auth/signup", {
      username,
      password,
      spotifyId,
      country,
      spotifyAccountType,
      pictureUrl,
      // Ask Mike how to use the model default values even if client leaves them blank //
    })
      .then((results) => {
        console.log("You are logged in !!!", results);
        localStorage.setItem("localToken", results.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="render-body">
      <h2>Create an Account</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Our app can utilize information from your Spotify account to provide
        better results. Would you like to autofill your form with your Spotify
        Account information?
      </p>
      <form onSubmit={createUser} className="autho-form">
        <label>
          Username
          <input
            // type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label>
          Password
          <input
            // type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        {/* <label>
          Country You Reside
          <input
            type="text"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </label> */}
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignUp;
