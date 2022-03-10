import React from "react";
import axios from "axios";
// import calculateArtistProfit from "./functions/calculateArtistProfit";

const Create = () => {
  // normal vars //
  let spotifyToken = !window.localStorage.getItem("token")
    ? ""
    : window.localStorage.getItem("token");

  let spotifyId =
    "BQCHINctvF4xPKjOJkORYuP4AGmFKVYA0KMKtC_4iLzrVBa7--PgndFnohYQQFXyZmxfMacY6MoglV49EIu6qLqbUdVLqQI2qLwTNY2xtxlrUmGw_K7-nrOUbeb1li5GAYf2hi0WoM_S_NppbKDIz4FO018AM0XcCIpu3YcVFhc";
  // state Vars//
  const [topUserTracks, setTopUserTracks] = React.useState([]);
  const [trackForFunction, setTrackForFunction] = React.useState({});
  const [manualForm, setManualForm] = React.useState(false);
  const [displayAlbumArray, setDisplayAlbumArray] = React.useState(false);
  const [selectTrackTrigger, setSelectTrackTrigger] = React.useState(false);
  const [weeklyStreams, setWeeklyStreams] = React.useState(0);
  const [profitsObject, setProfitsObject] = React.useState(false);

  const searchUserTopTracks = (e) => {
    e.preventDefault();
    axios
      .get("https://api.spotify.com/v1/me/top/tracks?limit=5", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${spotifyId}`,
        },
      })
      .then((results) => {
        console.log(results.data);
        setTopUserTracks(results.data.items);
        setDisplayAlbumArray(true);
      })
      .catch((err) => {
        console.log("Something went wrong with your axios request", err);
        console.log(spotifyToken);
      });
  };

  const selectTrack = (trackId) => {
    console.log("Id thats passed as argument", trackId);
    console.log("topUserTracks array", topUserTracks);
    let assignmentVar = topUserTracks.find((trackObj) => {
      return trackObj.id === trackId;
    });
    setTrackForFunction(assignmentVar);
    setDisplayAlbumArray(false);
    setSelectTrackTrigger(true);
  };

  const calculateArtistProfit = (weeklyStreams) => {
    // $$ Royalty per stream Vars
    const minProfit = 0.33;
    const maxProfit = 0.55;
    // Stream # Vars
    const monthlyStreams = weeklyStreams * 4;
    const annualStreams = monthlyStreams * 12;
    // Return object
    const returnObject = {
      weeklyProfit: `$${(weeklyStreams * minProfit).toFixed(2)} - $${(
        weeklyStreams * maxProfit
      ).toFixed(2)}`,
      monthlyProfit: `$${(monthlyStreams * minProfit).toFixed(2)} - $${(
        monthlyStreams * maxProfit
      ).toFixed(2)}`,
      annualProfit: `$${(annualStreams * minProfit).toFixed(2)} - $${(
        annualStreams * maxProfit
      ).toFixed(2)}`,
    };

    return returnObject;
  };

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
        <div className="album-display">
          {displayAlbumArray ? (
            topUserTracks.map((trackObj) => {
              return (
                <div key={trackObj.id}>
                  <img
                    src={trackObj.album.images[1].url}
                    alt="not found"
                    className="album-image-display"
                  />
                  <p>{trackObj.name}</p>
                  <p>{trackObj.artists[0].name}</p>
                  <button
                    type="button"
                    onClick={() => {
                      selectTrack(trackObj.id);
                    }}
                  >
                    Select
                  </button>
                </div>
              );
            })
          ) : (
            <br />
          )}
        </div>
        <div>
          {selectTrackTrigger ? (
            <div>
              <div>
                <img
                  src={trackForFunction.album.images[1].url}
                  alt="not found"
                  className="album-image-display"
                />
                <p>{trackForFunction.name}</p>
                <p>{trackForFunction.artists[0].name}</p>
              </div>
              <form>
                <label>
                  How Many Times Have You Listened to the Track This Week?
                  <input
                    type="number"
                    value={weeklyStreams}
                    onChange={(e) => {
                      setWeeklyStreams(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProfitsObject(calculateArtistProfit(weeklyStreams));
                    }}
                  >
                    Submit
                  </button>
                </label>
              </form>
            </div>
          ) : (
            <br></br>
          )}
          {profitsObject ? (
            <div>
              <p>
                {trackForFunction.artists[0].name} has made between roughly{" "}
                {profitsObject.weeklyProfit} off your streams this week!
              </p>
              <p>
                At this rate, they'll make between roughly{" "}
                {profitsObject.monthlyProfit} this month!
              </p>
              <p>And then {profitsObject.annualProfit} this year!</p>
            </div>
          ) : (
            <br />
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
