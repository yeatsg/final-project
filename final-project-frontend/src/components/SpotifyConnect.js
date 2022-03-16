import React from "react";

const SpotifyConnect = () => {
  return (
    <div className="bg-modal">
      <div className="modal-content">
        <div className="modal-close">+</div>
        <img src="spotify-logo.png" alt="no image" />
        <p>
          Before we can begin,you will need to connect your Spotify account to
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
