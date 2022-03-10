import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
// Component import //
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import UserSpotifyInfo from "./components/UserSpotifyInfo";
import SpotifyConnect from "./components/SpotifyConnect";
import HomePage from "./components/HomePage";
import Create from "./components/Create";
// Function subcomponent import //
import logoutUser from "./components/functions/logoutUser";
import About from "./components/About";

function App() {
  let localToken = "";
  let spotifyToken = window.localStorage.getItem("token");

  // let hashToken = window.localStorage.getItem("token");
  // console.log("this is hashToken", hashToken);
  return (
    <div className="App">
      <header className="App-header">
        <ul className="Nav-bar">
          <li className="nav-item">
            <Link to="/">Spotify Logo</Link>
          </li>
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
        </ul>
        {spotifyToken ? <p>Spotify Connected</p> : <p>Spotify Not Connected</p>}
      </header>
      <div className="routes">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<Create />} />
          <Route path="/user/create" element={<SignUp />} />
          <Route path="/user/login" element={<LogIn />} />
          <Route path="/user/spotify-info" element={<SpotifyConnect />} />
        </Routes>
      </div>
      <footer className="App-footer">
        <p>by Yeats thanks to Spotify</p>
      </footer>
    </div>
  );
}

export default App;
