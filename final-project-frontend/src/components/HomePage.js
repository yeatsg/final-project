import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// function imports //
import renderTopTracks from "./functions/renderTopTracks";
import logoutSpotify from "./functions/logoutSpotify";

const HomePage = (props) => {
  // State variables

  const [topTracks, setTopTracks] = React.useState(false);

  // Axios call //

  const searchTopPlaylist = (e) => {
    e.preventDefault();
    // Spotify Id for "Top 50 USA" Playlist //
    const playlistId = "37i9dQZEVXbLRQDuF5jeBp";
    // axios call and promise
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${props.tokens.spotify}`,
        },
      })
      .then((results) => {
        console.log(results.data);
        setTopTracks(results.data.tracks.items.slice(0, 5));
      })
      .catch((err) => {
        props.triggerModal(true);
        console.log("Something went wrong with your axios request", err);
      });
  };

  const removeLinkStyle = { textDecoration: "none" };

  return (
    <div className="render-body">
      <div id="landing-page" className="green-pink-bg pink-bubble-bg">
        <div class="text-body">
          <h1>Your Spotify artists, your money</h1>
          <h3>How much have your favorites made per stream?</h3>
          <br />
          <Link to="/create" className="green-pink-btn" style={removeLinkStyle}>
            Let's Find Out
          </Link>
        </div>
      </div>

      <div id="grid-2">
        <div class="text-body">
          <p>
            Spotify is the largest streaming service in the world with access to
            all the world's greatest artists. Every time a user streams an
            artist's track, an artist makes money back in royalties. With the
            UN-WRAPPED app we can help our users know how much their favorite
            artists have been able to make, and hopefully share that information
            with their friends.
          </p>
        </div>
      </div>
      <div id="grid-3">
        <div class="text-body">
          <p>
            Thanks to the Spotify API, which Spotify has made available
            publically to web developers, we are able to use your actual Spotify
            informaiton to help make these estimates as accurate as possible.
          </p>
          <h3>Try it out below</h3>

          <div>
            <button onClick={searchTopPlaylist} className="green-pink-btn">
              Today's Top Tracks
            </button>
            <br />
          </div>

          <div>
            {topTracks && renderTopTracks(topTracks)}
            <br />
          </div>

          {/* <button
            onClick={() => {
              logoutSpotify(props.setTokens);
            }}
          >
            Log Out of Spotify
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
