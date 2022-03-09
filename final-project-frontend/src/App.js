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
// Function subcomponent import //
import logoutUser from "./components/functions/logoutUser";

function App() {
  let localToken = "";
  let spotifyToken = window.localStorage.getItem("token");

  // let hashToken = window.localStorage.getItem("token");
  // console.log("this is hashToken", hashToken);
  return (
    <div className="App">
      <header className="App-header">
        <ul className="Nav-bar">
          <li>Spotify Logo</li>
          <li>About</li>
          <li>Create Page</li>
          <li>Dennis Page</li>
          {!localToken ? (
            <div>
              <li>
                <Link to="/user/create">Create an Account</Link>
              </li>
              <li>
                <Link to="/user/login">Log In</Link>
              </li>
            </div>
          ) : (
            <button onClick={logoutUser}>Log Out</button>
          )}
        </ul>
        {spotifyToken ? <p>Spotify Connected</p> : <p>Spotify Not Connected</p>}
      </header>
      <div className="routes">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/secretroom" element={<HomePage />} />
          <Route path="/user/create" element={<SignUp />} />
          <Route path="/user/login" element={<LogIn />} />
          {/* <Route path="/create" element={<Create />} /> */}
          <Route path="/user/spotify-info" element={<SpotifyConnect />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
