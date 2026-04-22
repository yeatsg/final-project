"use client"

import { useState } from "react";
//import axios from "axios";
import Link from 'next/link';
import Modal from "@/components/Modal";

export default function Home (props) {

  // State variables

  const [topTracks, setTopTracks] = useState(null);
  const [failureModalShown, setFailureModalShown] = useState(false)

  // Axios call //
  
  const searchTopPlaylist = async (e) => {



    const res = await fetch(`http://localhost:3000/api/searchTopPlaylist`)
    
    if (!res.ok) {
      console.error(await res.text())
      setFailureModalShown(true)
      return
    }
    
    const data = await res.json()
    console.log(data)
  };
  
  const removeLinkStyle = { textDecoration: "none" };

  return (
    <div className="render-body">

      <button onClick={() => setFailureModalShown(true)}>
        test modal
      </button>

      <Modal shown={failureModalShown} setShown={setFailureModalShown}>
        <p>Something went wrong</p>
      </Modal>

      <div id="landing-page" className="green-pink-bg pink-bubble-bg">
        <div className="text-body">
          <h1>Your Spotify artists, your money</h1>
          <h3>How much have your favorites made per stream?</h3>
          <br />
          <Link href="/create" className="green-pink-btn" style={removeLinkStyle}>
            Let's Find Out
          </Link>
        </div>
      </div>

      <div id="grid-2">
        <div className="text-body">
          <p>
            Spotify is the largest streaming service in the world with access to
            all the world's greatest artists. Every time a user streams an
            artist's track, an artist makes money back in royalties. With the
            UN-WRAPPED app we can help our users know how much their favorite
            artists have been able to make, and hopefully share that information
            with their friends.
          </p>
        </div>
      </div>
      <div id="grid-3">
        <div className="text-body">
          <p>
            Thanks to the Spotify API, which Spotify has made available
            publically to web developers, we are able to use your actual Spotify
            informaiton to help make these estimates as accurate as possible.
          </p>
          <h3>Try it out below</h3>

          <div>
            <button onClick={searchTopPlaylist} href="/" className="green-pink-btn">
              Today's Top Tracks
            </button>
            <br />
          </div>

          <div>
            {/*topTracks && renderTopTracks(topTracks)*/}
            <br />
          </div>

          {/* <button
            onClick={() => {
              logoutSpotify(props.setTokens);
            }}
          >
            Log Out of Spotify
          </button> */}
        </div>
      </div>
    </div>
  );
}
