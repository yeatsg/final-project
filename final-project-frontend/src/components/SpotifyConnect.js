import React from "react";
import axios from "axios";
import env from "react-dotenv";

const SpotifyConnect = () => {
  // GLOBAL VARIABLES //

  // Variables for spotify authorization

  const clientId = "769579f19a2c4121bb8bf8a240b67273";
  const redirectURI = "http://localhost:3000";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";

  // State variables

  const [token, setToken] = React.useState("");
  const [userInfo, setUserInfo] = React.useState([]);
  const [topItems, setTopItems] = React.useState([]);

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

  // User Axios Call //

  const findUserInfo = (e) => {
    e.preventDefault();
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((userResults) => {
        console.log("Current User data", userResults);
        setUserInfo(userResults.data);
      })
      .catch((err) => {
        console.log("Something went wrong with your axios request", err);
      });
  };

  const findTopItems = (e) => {
    e.preventDefault();
    axios
      .get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((itemResults) => {
        console.log("Current user's top items", itemResults.data);
        setTopItems(itemResults.data);
      })
      .catch((err) => {
        console.log("Something went wrong with your axios request", err);
      });
  };

  // Return statement // raw CSS

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <div>
            <p>
              This app can utilize Spotify's API to provide you with feedback on
              your personal Spotify data. In order to take advantage of this
              feature, you will need to follow the link below and use your
              Spotify login credentials to provide us with authorization to use
              this service.
            </p>
            <a
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}`}
            >
              Connect to Spotify
            </a>
            <p>
              If you aren't interested in utilizing this feature, you can
              manually input your information and register for an account with
              us.
            </p>
          </div>
        ) : (
          <div>
            <button
              onClick={(e) => {
                findTopItems(e);
              }}
            >
              Click Me
            </button>
            <h2>We found the following information</h2>
            <p>{userInfo.display_name}</p>
            <p>{topItems[0]}</p>
          </div>
        )}
      </header>
    </div>
  );
};

export default SpotifyConnect;
