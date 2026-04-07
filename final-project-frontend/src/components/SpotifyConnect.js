import React from "react";
import axios from 'axios'

const SpotifyConnect = (props) => {
  // VARIABLES //
  const clientId = "";
  const clientSecret = "";
  const redirectURI = "http://localhost:3000";
  // const redirectURI = "https://unwrapped-the-spotify-app.netlify.app/";
  const authEndpoint = "https://accounts.spotify.com/api/token";
  const requestHeader = "application/x-www-form-urlencoded";
  //const requestBody = {grant_type: 'authorization_code', client_id: clientId, client_secret: clientSecret,  scopes:
  //  "user-library-read user-top-read user-read-recently-played user-read-private user-library-read user-follow-read"};
  const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

  /*const searchUserTopTracks = (e) => {
    console.log("Spotify Token Axios call starts");
    e.preventDefault();
    console.log("body:", requestBody)
    axios
      .post(
        authEndpoint, 
        toUrlEncoded(requestBody),
        {
          headers: { 'Content-Type': requestHeader }
        }
      )
      .then((results) => {
        console.log(results.data);
        console.log("Spotify Token Acquired: ",  results.data.access_token)
        props.setSpotifyToken(results.data.access_token);
        console.log("Props. set token ran")
      })
      .catch((err) => {
        props.triggerModal(true);
        console.log("Something went wrong with your axios request", err, err.response?.data);
        //console.log(props.tokens.spotify);
      });
  };*/

  const spotifyAuthorization = (e) => {
    console.log("Spotify Token Axios call starts");
    e.preventDefault();
    const requestBody = {client_id: clientId, response_type: 'code', scopes:
    "user-library-read user-top-read user-read-recently-played user-read-private user-library-read user-follow-read", redirect_uri: "https://127.0.0.1:3000/callback", show_dialog: 'True'};
    axios
      .get(
        "https://accounts.spotify.com/authorize?", 
        toUrlEncoded(requestBody)
      )
      .then((results) => {
        console.log(results.data);
        console.log("Spotify Token Acquired: ",  results.data.access_token)
        props.setSpotifyToken(results.data.access_token);
        console.log("Props. set token ran")
      })
      .catch((err) => {
        props.triggerModal(true);
        console.log("Something went wrong with your axios request", err, err.response?.data);
        //console.log(props.tokens.spotify);
      });
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
        <a
          onClick={spotifyAuthorization} className="button-to-link"
        >
          Login to Spotify
        </a>
      </div>
    </div>
  );
}
export default SpotifyConnect;