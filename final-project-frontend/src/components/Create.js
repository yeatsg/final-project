import React from "react";
import axios from "axios";
import { Transition } from "react-transition-group";
// import calculateArtistProfit from "./functions/calculateArtistProfit";

const duration = 600;

const defaultStyles = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

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
  const [displayInfo, setDisplayInfo] = React.useState(false);
  const [displayMoreInfo, setDisplayMoreInfo] = React.useState(false);

  const searchUserTopTracks = (e) => {
    console.log("Axios call starts");
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
        setDisplayTrackArrayButton(false);
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
    <div
      id="form-creation"
      className="render-body green-pink-bg pink-bubble-bg"
    >
      <div className="text-body">
        <div>
          <h1>You are ready to use this form.</h1>
          {/* STEP 1: Display Submit Button */}
          <Transition
            in={displayTrackArrayButton}
            timeout={duration}
            mountOnEnter
          >
            {(state) => (
              <button
                onClick={searchUserTopTracks}
                className="green-pink-btn"
                // title="Step 1 Transition"
                style={{ ...defaultStyles, ...transitionStyles[state] }}
              >
                Your Top 5 Tracks
              </button>
            )}
          </Transition>
          {/* {displayTrackArrayButton && (
            <button onClick={searchUserTopTracks} className="green-pink-btn">
              Your Top 5 Tracks
            </button>
          )} */}
        </div>
        {/* STEP 2: The Top 5 Tracks are displayed and mapped with select buttons */}
        {/* <div className="album-display">
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
                    className="green-pink-btn"
                  >
                    Select
                  </button>
                </div>
              );
            })}
        </div> */}
        <Transition
          in={displayTrackArray}
          timeout={duration}
          mountOnEnter
          unmountOnExit
        >
          {(state) => (
            <div
              className="album-display"
              style={{ ...defaultStyles, ...transitionStyles[state] }}
            >
              {topTracksArray.map((trackObj) => {
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
                      className="green-pink-btn"
                    >
                      Select
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </Transition>
        {/* STEP 3: The individual track is selected and displayed along with custom form*/}
        <Transition
          in={displaySelectedTrack}
          timeout={duration}
          mountOnEnter
          unmountOnExit
        >
          {(state) => (
            <div style={{ ...defaultStyles, ...transitionStyles[state] }}>
              {/* Display Selected Track Info */}
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
                    <h3>
                      How Many Times Have You Listened to the Track This Week?
                    </h3>
                    <br />
                    <button
                      type="button"
                      onClick={() => {
                        setProfitsObject(calculateArtistProfit(weeklyStreams));
                        setDisplayInfo(true);
                      }}
                      className="green-pink-btn"
                    >
                      Submit
                    </button>
                  </label>
                </form>
              </div>
            </div>
          )}
        </Transition>
        {/* {displaySelectedTrack && (
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
        {/* <form className="track-form">
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
                    className="green-pink-btn"
                  >
                    Submit
                  </button>
                </label>
              </form>
            </div>
                  )} */}
        {/* STEP FOUR: Show Results */}
        <Transition
          in={profitsObject}
          timeout={duration}
          mountOnEnter
          unmountOnExit
        >
          {(state) => (
            <div style={{ ...defaultStyles, ...transitionStyles[state] }}>
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
                <Transition
                  in={displayInfo}
                  timeout={duration}
                  mountOnEnter
                  unmountOnExit
                >
                  {(state) => (
                    <div
                      className="track-form"
                      style={{ ...defaultStyles, ...transitionStyles[state] }}
                    >
                      <p>
                        We estimate that this week{" "}
                        {selectedTrack.artists[0].name} has made between roughly
                      </p>
                      <h2>{profitsObject.weeklyProfit}</h2>
                      <p>From your streams on Spotify.</p>
                      <button
                        onClick={() => {
                          setDisplayMoreInfo(true);
                        }}
                        className="green-pink-btn"
                      >
                        More Info
                      </button>
                    </div>
                  )}
                </Transition>

                <Transition
                  in={displayMoreInfo}
                  timeout={duration}
                  mountOnEnter
                  unmountOnExit
                >
                  {(state) => (
                    <div
                      className="track-form"
                      style={{ ...defaultStyles, ...transitionStyles[state] }}
                    >
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
                        className="green-pink-btn"
                      >
                        Reset
                      </button>
                    </div>
                  )}
                </Transition>
              </div>
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
};

export default Create;
