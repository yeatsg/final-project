import React from "react";
import axios from "axios";
// function imports //
import renderTopTracks from "./functions/renderTopTracks";
import logoutSpotify from "./functions/logoutSpotify";

const HomePage = () => {
  // GLOBAL VARIABLES //

  // Variables for spotify authorization

  // const clientId = process.env.CLIENT_ID;
  const clientId = "769579f19a2c4121bb8bf8a240b67273";

  const redirectURI = "http://localhost:3000";
  // const redirectURI = "https://unwrapped-the-spotify-app.netlify.app/";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";
  const scopes =
    "user-library-read user-top-read user-read-recently-played user-read-private user-library-read user-follow-read";

  // State variables
  const [spotifyToken, setSpotifyToken] = React.useState(
    window.localStorage.getItem("spotifyToken")
  );

  const [topTracks, setTopTracks] = React.useState([]);

  // Log Out and destroy token

  // Axios call //

  const searchTopPlaylist = (e) => {
    e.preventDefault();
    // Spotify Id for "Top 50 USA" Playlist //
    const playlistId = "37i9dQZEVXbLRQDuF5jeBp";
    // axios call and promise
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      })
      .then((results) => {
        console.log(results.data);
        setTopTracks(results.data.tracks.items.slice(0, 5));
      })
      .catch((err) => {
        console.log("Something went wrong with your axios request", err);
      });
  };

  return (
    <div className="render-body">
      <div>
        <h2>WELCOME TO UN-WRAPPED!</h2>
        {!spotifyToken ? (
          <div>
            <p>
              Before we can begin,you will need to connect your Spotify account
              to this app and give us access to your top artists. Let's get
              started with the button below.
            </p>
            <a
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scopes}`}
              className="button-to-link"
            >
              Login to Spotify
            </a>
          </div>
        ) : (
          <div>
            <button onClick={searchTopPlaylist}>Today's Top Tracks</button>
            <br />
          </div>
        )}
        {/* <button onClick={searchTopPlaylist}>Today's Top Tracks</button> */}
        <br></br>
        {/* <br></br> */}
        <div>{topTracks.length ? renderTopTracks(topTracks) : <br />}</div>
        <br></br>
        <p>
          Spotify is the largest streaming service in the world with access to
          all the world's greatest artists. Every time a user streams an
          artist's track, an artist makes money back in royalties. With the
          UN-WRAPPED app we can help our users know how much their favorite
          artists have been able to make, and hopefully share that information
          with their friends.
        </p>
        <p>
          Thanks to the Spotify API, which Spotify has made available publically
          to web developers, we are able to use your actual Spotify informaiton
          to help make these estimates as accurate as possible.
        </p>
        <button onClick={logoutSpotify}>Log Out of Spotify</button>
      </div>
    </div>
  );
};

export default HomePage;
