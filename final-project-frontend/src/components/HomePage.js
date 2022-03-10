import React from "react";
import axios from "axios";

const HomePage = () => {
  // GLOBAL VARIABLES //

  // Variables for spotify authorization

  const clientId = env.CLIENT_ID;
  const redirectURI = "http://localhost:3000";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";

  // State variables
  const [spotifyToken, setSpotifyToken] = React.useState(
    window.localStorage.getItem("token")
  );

  const [topTracks, setTopTracks] = React.useState([]);

  // FUNCTIONS //

  // Token assignment upon RedirectURI //

  React.useEffect(() => {
    const hash = window.location.hash;
    let hashToken = window.localStorage.getItem("token");
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
      window.localStorage.setItem("token", hashToken);
    }
    setSpotifyToken(hashToken);
    console.log("this is the final state var token", spotifyToken);
  }, []);

  // Log Out and destroy token

  const logout = () => {
    setSpotifyToken("");
    window.localStorage.removeItem("token");
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
      <table>
        {topTracks.map((trackObj) => (
          <tr key={trackObj.track.id}>
            <th>
              <img src={trackObj.track.album.images[1].url} alt="noimage" />
            </th>
            <th>
              <p>{trackObj.track.name}</p>
              <p>{trackObj.track.artists[0].name}</p>
            </th>
            <th>Streams: x</th>
          </tr>
        ))}
      </table>
    );
  };

  return (
    <div>
      <div>
        <p>Welcome!</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        {!spotifyToken ? (
          <div>
            <p>This program requires Spotify to run</p>
            <a
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}`}
            >
              Login to Spotify
            </a>
          </div>
        ) : (
          <button onClick={logout}>Log Out</button>
        )}
        <br></br>
        <button onClick={searchTopPlaylist}>
          Give me Olivia Rodrigo object please
        </button>
      </div>
      <div>{topTracks.length ? renderTopTracks() : "Loading..."}</div>
    </div>
  );
};

export default HomePage;
