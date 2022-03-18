import React from "react";
import axios from "axios";
// import calculateArtistProfit from "./functions/calculateArtistProfit";

const Create = (props) => {
  // state Vars//
  const [topTracksArray, setTopTracksArray] = React.useState([]);
  const [selectedTrack, setSelectedTrack] = React.useState({});
  const [weeklyStreams, setWeeklyStreams] = React.useState(1);
  const [profitsObject, setProfitsObject] = React.useState(false);
  const [manualForm, setManualForm] = React.useState(false);
  // For Triggering A New HTML Render // Referenced in the ternary operators
  const [displayTrackArray, setDisplayTrackArray] = React.useState(false);
  const [displaySelectedTrack, setDisplaySelectedTrack] = React.useState(false);
  const [displayTrackArrayButton, setDisplayTrackArrayButton] =
    React.useState(true);
  const [displayMoreInfo, setDisplayMoreInfo] = React.useState(false);

  const searchUserTopTracks = (e) => {
    e.preventDefault();
    axios
      .get("https://api.spotify.com/v1/me/top/tracks?limit=5", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${props.tokens.spotify}`,
        },
      })
      .then((results) => {
        console.log(results.data);
        setTopTracksArray(results.data.items);
        setDisplayTrackArray(true);
      })
      .catch((err) => {
        console.log("Something went wrong with your axios request", err);
        console.log(props.tokens.spotify);
      });
  };

  const selectTrack = (trackId) => {
    // Check trackId against the id inside the array already and return the selected item //
    // Deleted variable and put all logic directly inside setSelectedTrack -- make sure it works //
    setSelectedTrack(
      topTracksArray.find((trackObj) => {
        return trackObj.id === trackId;
      })
    );
    setDisplayTrackArray(false);
    setDisplaySelectedTrack(true);
    setDisplayTrackArrayButton(false);
  };

  const calculateArtistProfit = (weeklyStreams) => {
    // $$ Royalty per stream Vars
    const minProfit = 0.0033;
    const maxProfit = 0.0055;
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

    setDisplaySelectedTrack(false);

    return returnObject;
  };

  return (
    <div className="render-body">
      <div>
        <div>
          <p>You are ready to use this form.</p>
          {/* STEP 1: Display Submit Button */}
          {displayTrackArrayButton && (
            <button onClick={searchUserTopTracks}>Your Top 5 Tracks</button>
          )}
        </div>
        {/* STEP 2: The Top 5 Tracks are displayed and mapped with select buttons */}
        <div className="album-display">
          {displayTrackArray &&
            topTracksArray.map((trackObj) => {
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
            })}
        </div>
        {/* STEP 3: The individual track is selected and displayed along with custom form*/}
        <div>
          {displaySelectedTrack && (
            // Display Selected Track Info
            <div className="final-screen">
              <div className="track-box">
                <img
                  src={selectedTrack.album.images[1].url}
                  alt="not found"
                  className="selected-album-image"
                />
                <p>
                  <b>{selectedTrack.name}</b>
                </p>
                <p>{selectedTrack.artists[0].name}</p>
              </div>
              {/* Weekly Stream Form */}
              <form className="track-form">
                <label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={weeklyStreams}
                    className="large-input"
                    onChange={(e) => {
                      setWeeklyStreams(e.target.value);
                    }}
                  />
                  <h1>
                    How Many Times Have You Listened to the Track This Week?
                  </h1>
                  <br />
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
          )}
          {/* STEP FOUR: Show Results */}
          {profitsObject && (
            <div>
              <h1>You've done it!</h1>
              <br />
              {/* Track Information displayed throughout */}
              <div className="final-screen">
                <div className="track-box">
                  <img
                    src={selectedTrack.album.images[1].url}
                    alt="not found"
                    className="selected-album-image"
                  />
                  <p>
                    <b>{selectedTrack.name}</b>
                  </p>
                  <p>{selectedTrack.artists[0].name}</p>
                </div>
                {/* Ternary operator to toggle between album information */}
                {!displayMoreInfo ? (
                  <div className="track-form">
                    <p>
                      We estimate that this week {selectedTrack.artists[0].name}{" "}
                      has made between roughly
                    </p>
                    <h2>{profitsObject.weeklyProfit}</h2>
                    <p>From your streams on Spotify.</p>
                    <button
                      onClick={() => {
                        setDisplayMoreInfo(true);
                      }}
                    >
                      More Info
                    </button>
                  </div>
                ) : (
                  <div className="track-form">
                    <p>If you keep this up they'll make</p>
                    <h2>{profitsObject.monthlyProfit}</h2>
                    <p>
                      this <b>month</b> and
                    </p>
                    <h2>{profitsObject.annualProfit}</h2>

                    <p>
                      By the end of this <b>year!</b>
                    </p>
                    {/* Reset Button */}
                    <button
                      onClick={() => {
                        setDisplayTrackArrayButton(true);
                        setDisplaySelectedTrack(false);
                        setDisplayTrackArray(false);
                        setDisplayMoreInfo(false);
                        setProfitsObject(false);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
