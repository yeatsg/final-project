import React from "react";
import axios from "axios";

const UserSpotifyInfo = () => {
  // GLOBAL VARIABLES //

  // Variables for spotify authorization

  const clientId = "769579f19a2c4121bb8bf8a240b67273";
  const clientSecret = "19eac3fe1a9a4616942c9c16f86dfe87";
  const redirectURI = "http://localhost:3000";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";

  // State variables

  const [token, setToken] = React.useState("");
  const [userInfo, setUserInfo] = React.useState("");

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
    setToken(hashToken);
    console.log("this is the final state var token", token);
  }, []);

  // Log Out and destroy token

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  // Search Artist function //

  React.useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((results) => {
        console.log("Current User data", results);
      })
      .catch((err) => {
        console.log("Something went wrong with your axios request", err);
        console.log("Bearer token", token);
      });
  }, []);

  // Return statement // raw CSS

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ? (
          <a
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Log Out</button>
        )}

        {token ? (
          <div>
            <h1>{userInfo}</h1>
          </div>
        ) : (
          <h2>please log in to access</h2>
        )}
      </header>
    </div>
  );
};

export default UserSpotifyInfo;
