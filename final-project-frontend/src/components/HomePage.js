import React from "react";
import axios from "axios";

const HomePage = () => {
// Spotify API with Client Credential Flow is currently not working. Hard coding object with top songs. //



  // This will be hard coded, but the function can easily be changed to map dynamic data
  const mapTopArtists = () => {

  }
  // React.useEffect(() => {
  //   axios
  //     .post(`https://accounts.spotify.com/api/token`, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         Accept: "application/json",
  //         // Authorization: `Basic ${clientId}: ${clientSecret}`,
  //       },
  //       auth: {
  //         username: clientId,
  //         password: clientSecret,
  //       },
  //       form: {
  //         grant_type: "client_credentials",
  //       },
  //       json: true,
  //     })
  //     .then((results) => {
  //       console.log(results.data);
  //       setClientsideSpotifyToken(results.data);
  //     })
  //     .catch((err) => {
  //       console.log("Somethign went wrong with the axios request", err);
  //     });
  // }, []);

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
      </div>
      <div>
        <table>
          <
        </table>
      </div>
    </div>
  );
};

export default HomePage;
