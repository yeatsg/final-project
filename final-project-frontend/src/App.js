import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
// import "../public";
// Component import //
import HomePage from "./components/HomePage";
import About from "./components/About";
import Create from "./components/Create";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
// import SpotifyConnect from "./components/SpotifyConnect";
// Function subcomponent import //
import logoutUser from "./components/functions/logoutUser";
import React from "react";

function App() {
  let localToken = "";
  // let spotifyToken = window.localStorage.getItem("spotifyToken");

  const [spotifyToken, setSpotifyToken] = React.useState("");

  if (!window.localStorage.getItem) {
    setSpotifyToken("");
  }

  // FUNCTIONS //

  // Token assignment upon RedirectURI //

  React.useEffect(() => {
    const hash = window.location.hash;
    let hashToken = window.localStorage.getItem("spotifyToken");
    console.log("this is the hash you SOB", hash);
    console.log("this is the token you SOB", hashToken);

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
        <ul className="Nav-bar">
          <div>
            <li className="logo-in-nav-bar">
              <Link to="/">
                <img
                  src="spotify-logo.png"
                  alt="no image"
                  className="site-logo"
                />
              </Link>
              <p> UNWRAPPED</p>
            </li>
          </div>
          <div className="right-nav-bar">
            <li className="nav-item">
              <Link
                to="/about"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/create"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                CREATE
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/user/create"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                SIGN UP
              </Link>
            </li>
            {!localToken ? (
              <li className="nav-item">
                <Link
                  to="/user/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  LOG IN
                </Link>
              </li>
            ) : (
              <button onClick={logoutUser}>Log Out</button>
            )}
          </div>
        </ul>
        <div className="spotify-status">
          {spotifyToken ? (
            <p>
              <img
                src="green-checkmark.png"
                alt="no-image"
                className="checkmark"
              />
              Spotify Connected
            </p>
          ) : (
            <p>Spotify Not Connected</p>
          )}
        </div>
      </header>
      <div className="background-image">
        <div className="routes">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/create" element={<Create />} />
            <Route path="/user/create" element={<SignUp />} />
            <Route path="/user/login" element={<LogIn />} />
            {/* <Route path="/user/spotify-info" element={<SpotifyConnect />} /> */}
          </Routes>
        </div>
      </div>
      <footer className="App-footer">
        <p>by Yeats thanks to Spotify</p>
      </footer>
    </div>
  );
}

export default App;
