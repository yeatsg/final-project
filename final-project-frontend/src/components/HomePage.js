import React from "react";
import axios from "axios";

const HomePage = () => {
  // GLOBAL VARIABLES //

  // Variables for spotify authorization

  const clientId = env.CLIENT_ID;

  // const redirectURI = "http://localhost:3000";
  const redirectURI = "https://unwrapped-the-spotify-app.netlify.app/";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";
  const scopes =
    "user-library-read user-top-read user-read-recently-played user-read-private user-library-read user-follow-read";

  // State variables
  const [spotifyToken, setSpotifyToken] = React.useState(
    window.localStorage.getItem("spotifyToken")
  );

  const [topTracks, setTopTracks] = React.useState([]);

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

  // Log Out and destroy token

  const logout = () => {
    setSpotifyToken("");
    window.localStorage.removeItem("spotifyToken");
  };

  const searchTopPlaylist = (e) => {
    e.preventDefault();
    const playlistId = "37i9dQZEVXbLRQDuF5jeBp";
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
        // params: {
        //   // q: "37i9dQZF1DX18jTM2l2fJY",
        //   // type: "playlists",
        // },
      })
      .then((results) => {
        console.log(results.data);
        setTopTracks(results.data.tracks.items.slice(0, 5));
      })
      .catch((err) => {
        console.log("Something went wrong with your axios request", err);
      });
  };

  const renderTopTracks = () => {
    console.log(topTracks);
    return (
      <table className="top-tracks-display">
        <thead className="table-box">
          <th></th>
          <th>Today's Top Tracks</th>
          <th></th>
        </thead>
        <tbody>
          {topTracks.map((trackObj) => (
            <tr key={trackObj.track.id}>
              <th className="table-box">
                <img
                  src={trackObj.track.album.images[1].url}
                  alt="noimage"
                  className="table-icon"
                />
              </th>
              <th className="table-box">
                <p>{trackObj.track.name}</p>
                <p>{trackObj.track.artists[0].name}</p>
              </th>
              <th className="table-box">Between $13-25K</th>
            </tr>
          ))}
        </tbody>
      </table>
    );
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
        <div>{topTracks.length ? renderTopTracks() : <br />}</div>
        <br></br>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
};

export default HomePage;
