import React from "react";
import axios from 'axios'
import { useSpotifyAccessToken } from "../hooks/useSpotifyAccessToken";

const SpotifyConnect = (props) => {

  const redirectURI = "http://localhost:3000";

  const { loading, error, token } = useSpotifyAccessToken()

  const searchUserTopTracks = (e) => {

  };

  return (
    <div className="bg-modal">
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={() => {
            {
              props.activate(false);
            }
          }}
        >
          +
        </button>
        <img src="spotify-logo.png" alt="no image" style={{ width: "200px" }} />
        <p>
          Before we can begin, you will need to connect your Spotify account to
          this app and give us access to your top artists. Let's get started
          with the button below.
        </p>
        {loading ? (
            <p>Loading...</p>
        ) : (error || !token) ? (
            <p>Something went wrong</p>
        ) : (
            <a 
                onClick={searchUserTopTracks} 
                className="button-to-link"
            >
                Login to Spotify
            </a>
        )}
      </div>
    </div>
  );
};

export default SpotifyConnect;
