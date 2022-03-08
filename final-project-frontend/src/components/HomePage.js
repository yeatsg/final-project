import React from "react";
import axios from "axios";

const HomePage = () => {
  const clientId = env.CLIENT_ID;
  const clientSecret = env.CLIENT_SECRET;
  const [clientsideSpotifyToken, setClientsideSpotifyToken] =
    React.useState("");
  const [topArtists, setTopArtists] = React.useState([]);

  React.useEffect(() => {
    axios
      .post(`https://accounts.spotify.com/api/token`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          // Authorization: `Basic ${clientId}: ${clientSecret}`,
        },
        auth: {
          username: clientId,
          password: clientSecret,
        },
        form: {
          grant_type: "client_credentials",
        },
        json: true,
      })
      .then((results) => {
        console.log(results.data);
        setClientsideSpotifyToken(results.data);
      })
      .catch((err) => {
        console.log("Somethign went wrong with the axios request", err);
      });
  }, []);

  // let playlistId = "37i9dQZF1DX0kbJZpiYdZl";
  // React.useEffect(() => {
  //   axios
  //     .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
  //       headers: {
  //         Authorization: `Basic `,
  //         "769579f19a2c4121bb8bf8a240b67273": clientSecret,
  //       },
  //       form: {
  //         "grant_type": "client_credentials",
  //       },
  //       json: true,
  //     })
  //     .then((results) => {
  //       console.log(results.data);
  //       setTopArtists(results.data);
  //     })
  //     .catch((err) => {
  //       console.log("Something went wrong with your axios request", err);
  //     });
  // }, []);

  return (
    <div>
      <p>Dennis</p>
      <p>{topArtists}</p>
    </div>
  );
};

export default HomePage;
