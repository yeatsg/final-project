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

function App() {
  let localToken = "";
  let spotifyToken = window.localStorage.getItem("spotifyToken");

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
            </li>
          </div>
          <div className="right-nav-bar">
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/create">Create</Link>
            </li>
            <li className="nav-item">
              <Link to="/user/create">Create an Account</Link>
            </li>
            {!localToken ? (
              <li className="nav-item">
                <Link to="/user/login">Log In</Link>
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
