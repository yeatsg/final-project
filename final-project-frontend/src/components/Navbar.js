import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  let { localToken, spotifyToken, logoutUser } = props;

  return (
    <div>
      <ul className="Nav-bar">
        <div>
          <li className="logo-in-nav-bar">
            <Link to="/">
              <img
                src="unwrapped-logo-draft2.png"
                alt="no image"
                className="site-logo"
              />
            </Link>
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
              About
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
              Create
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
              Sign Up
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
                Log In
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
    </div>
  );
}

export default Navbar;
