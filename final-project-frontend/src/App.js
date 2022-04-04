import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import "../public";
// Component import //
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Create from "./components/Create";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import SpotifyConnect from "./components/SpotifyConnect";
// Function subcomponent import //
import logoutUser from "./components/functions/logoutUser";

function App() {
  // State Variables //
  const [localToken, setLocalToken] = React.useState("");
  const [spotifyToken, setSpotifyToken] = React.useState("");
  const [spotifyModal, setSpotifyModal] = useState(false);

  // FUNCTIONS //

  // Spotify Token assignment upon RedirectURI //

  React.useEffect(() => {
    const hash = window.location.hash;
    let hashToken = window.localStorage.getItem("spotifyToken");
    hashToken
      ? console.log("this is the hash you SOB", hashToken)
      : console.log("No hash");

    if (!hashToken && hash) {
      hashToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      console.log(
        "This is the token as obliterated by string methods",
        hashToken
      );

      window.location.hash = "";
      window.localStorage.setItem("spotifyToken", hashToken);
    }
    setSpotifyToken(hashToken);
    console.log("this is the final state var token", spotifyToken);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar
          localToken={localToken}
          spotifyToken={spotifyToken}
          logoutUser={logoutUser}
        />
      </header>
      <div className="background-image">
        <div className="routes">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  setTokens={{ spotify: setSpotifyToken, local: setLocalToken }}
                  tokens={{ spotify: spotifyToken, local: localToken }}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/create"
              element={
                <Create
                  setTokens={{ spotify: setSpotifyToken, local: setLocalToken }}
                  tokens={{ spotify: spotifyToken, local: localToken }}
                />
              }
            />
            <Route path="/user/create" element={<SignUp />} />
            <Route path="/user/login" element={<LogIn />} />
            {/* <Route path="/user/spotify-info" element={<SpotifyConnect />} /> */}
          </Routes>
        </div>
      </div>
      {spotifyModal && <SpotifyConnect activate={setSpotifyModal} />}
      <footer className="App-footer">
        <button
          onClick={() => {
            setSpotifyModal(true);
          }}
        >
          Clcik Me
        </button>
        <p>by Yeats thanks to Spotify</p>
      </footer>
    </div>
  );
}

export default App;
