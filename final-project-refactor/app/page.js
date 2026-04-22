"use client"

import { useState } from "react";
//import axios from "axios";
import Link from 'next/link';
import Modal from "@/components/Modal";

console.log("Link import:", Link)

export default function Home(props) {

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
        <p>You're not currently logged into Spotify.</p>
        <p>Please follow the link below.</p>
        <button></button>
      </Modal>

      <section className="bg_primary-color" id="home_hero-container">
        <div className="spacing-md">
          <div className="text-body">
            <h1>Your Spotify artists, your money</h1>
            <h3>How much have your favorites made per stream?</h3>
            <br />
            <Link href="/create" className="button_secondary" style={removeLinkStyle}>
              Let's Find Out
            </Link>
          </div>
        </div>
      </section>
      <section className="bg_secondary-color" id="home_container-2">

        <div className="spacing-md">
          <div className="text-body">
            <p>
              Spotify is the largest streaming service in the world with access to all the world's greatest artists. Every time an artist's track is streamed, that artist makes money back in royalties.
            </p>
            <p>With the UN-WRAPPED app we can help our users know how much their favorite artists have been able to make, and hopefully share that information with their friends.
            </p>
          </div>
        </div>
      </section>
      <section className="bg_primary-color" id="home_container-3">
        <div className="spacing-md">
          <div className="text-body">
            <p>
              Thanks to the Spotify API, which Spotify has made available publically to web developers, we are able to use your actual Spotify informaiton to help make these estimates as accurate as possible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
