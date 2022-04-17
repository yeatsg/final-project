import React from "react";

const SpotifyConnect = (props) => {
  // VARIABLES //
  // const clientId = process.env.CLIENT_ID;
  const clientId = "769579f19a2c4121bb8bf8a240b67273";
  const redirectURI = "http://localhost:3000";
  // const redirectURI = "https://unwrapped-the-spotify-app.netlify.app/";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";
  const scopes =
    "user-library-read user-top-read user-read-recently-played user-read-private user-library-read user-follow-read";

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
        <a
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scopes}`}
          className="button-to-link"
        >
          Login to Spotify
        </a>
      </div>
    </div>
  );
};

export default SpotifyConnect;
