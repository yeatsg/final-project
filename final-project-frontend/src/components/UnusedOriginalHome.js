import React from "react";
import axios from "axios";
import env from "react-dotenv";

const Home = () => {
  // GLOBAL VARIABLES //

  // Variables for spotify authorization

  const clientId = env.CLIENT_ID;
  const redirectURI = "http://localhost:3000";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";

  // State variables

  const [spotifyToken, setSpotifyToken] = React.useState("");
  const [searchKey, setSearchKey] = React.useState("");
  const [artists, setArtists] = React.useState([]);

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

  // Search Artist function //

  const searchArtists = (e) => {
    e.preventDefault();
    axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
        params: {
          q: searchKey,
          type: "artist",
        },
      })
      .then((results) => {
        setArtists(results.data.artists.items);
      })
      .catch((err) => {
        console.log("Something went wrong with your axios request", err);
      });
  };

  // Render Artist function //

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"300px"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  // Return statement // raw CSS

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!spotifyToken ? (
          <a
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Log Out</button>
        )}

        {spotifyToken ? (
          <form onSubmit={searchArtists}>
            <input
              type="text"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
            />
            <button type="submit">Search</button>
          </form>
        ) : (
          <h2>please log in to access</h2>
        )}
        {renderArtists()}
      </header>
    </div>
  );
};

export default Home;
