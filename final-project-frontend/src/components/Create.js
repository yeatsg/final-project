import React from "react";
import axios from "axios";

const Create = () => {
  let spotifyToken = !window.localStorage.getItem("token")
    ? ""
    : window.localStorage.getItem("token");

  // state Vars//

  const searchUserTopTracks = (e) => {
    e.preventDefault();
    axios
      .get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      })
      .then((results) => {
        console.log(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong with your axios request", err);
        console.log(spotifyToken);
      });
  };

  const [manualForm, setManualForm] = React.useState(false);

  return (
    <div>
      <div>
        {!spotifyToken && !manualForm ? (
          <div>
            <p>
              You are not currently signed in to your Spotify account. In order
              to best utilize this resource. You can sign in here.
            </p>
            <p>
              Or you can input your information{" "}
              <button onClick={setManualForm(true)}>manually</button>
            </p>
          </div>
        ) : (
          <div>
            <p>You are ready to use this form.</p>
            <button onClick={searchUserTopTracks}>Add Shit</button>
          </div>
        )}
      </div>
      <form>
        <label>Artist name</label>
        <input type="text" />
      </form>
    </div>
  );
};

export default Create;
