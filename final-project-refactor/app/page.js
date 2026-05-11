"use client"

import Link from 'next/link';
import { useState } from "react";
import { useSpotify } from "@/context/spotifyContext";
import { useHeaderHeight } from '@/hooks/useHeaderHeight';
import Modal from "@/components/Modal";

export default function Home(props) {
  const { elementHeight } = useHeaderHeight();

  const [topTracks, setTopTracks] = useState(null);
  const [failureModalShown, setFailureModalShown] = useState(false);

  let spotifyCtx = useSpotify();

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




  return (
    <div className="render-body">
      <Modal shown={failureModalShown} setShown={setFailureModalShown}>
        <p>You're not currently logged into Spotify.</p>
        <p>Please follow the link below.</p>
        <button></button>
      </Modal>
      <section className="bg_primary-color" id="home_hero-container" style={{ minHeight: `calc(100vh - ${elementHeight}px)` }}>
        <div className="spacing-sm flex-height-fill">
          <div id="home_h1-container">
            <h1>
              <span className='header-title'>Unwrapped</span>
              <span className='header-subtitle'>Powered by © Spotify</span>
            </h1>
          </div>
          <div className='text-body flex-height-fill rel-container'>
            <h2 className='margin-bottom-sm'>
              Your Spotify Artists. Your money.
            </h2>
            <h3 className='margin-bottom-md'>See the real estimate of what your streams earned them.</h3>
            {(spotifyCtx.code !== null) ? (
              <Link href="/create" className="button_secondary margin-bottom-lg">
                See My Impact
              </Link>
            ) : (
              <button onClick={() => setFailureModalShown(true)} className='button_secondary margin-bottom-lg' >See My Impact</button>
            )}
            <div id="home_abstract-object"></div>
          </div>
        </div>
      </section>
      <section className="bg_secondary-color" id="home_wrapped--container">
        <div className="spacing-md flex-height-fill">
          <div className="flex-2col flex-height-fill" style={{height: '100%'}}>
            <div className="text-body">
              <h2 className='margin-bottom-sm'>Spotify Wrapped tells you what you loved.</h2>
              <h3 className='margin-bottom-md'>Unwrapped tells you what that love was worth.</h3>
              <p>Last December, millions shared their top artists. But no one shared if those streams paid for coffee, groceries, or rent. We built Unwrapped to close that gap.
              </p>
            </div>
            <div id="home_wrapped--img-container">
              <div className='grid-3col_staggered'>
                <img id="home_wrapped--img-1" src="streaming-bg-image.jpg" className="img_display-md-thin" alt="Stock Image 1" />
                <img id="home_wrapped--img-2" src="streaming-bg-image.jpg" className="img_display-md-thin" alt="Stock Image 2" />
                <img id="home_wrapped--img-3" src="streaming-bg-image.jpg" className="img_display-md-thin" alt="Stock Image 3" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='bg_primary-color' id="home_how-to-container">
        <div className='spacing-md'>
          <div className='text-body'>
            <h2 className='margin-bottom-md'>Four Steps. Real Estimates</h2>
            <div className='container-row'>
              <div className='card-md glass'>
                <h5>Login with Spotify</h5>
                <p>We only see your top artists — never your password. Spotify handles authentication.</p>
              </div>
              <div className='card-md glass'>
                <h5>We estimate royalties</h5>
                <p>Using industry-reported rates (0.0033–0.0054 per stream), we calculate a realistic range.
                </p>
              </div>
              <div className='card-md glass'>
                <h5>See your impact</h5>
                <p>Track by track. Then share it or keep it between you and your headphones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg_secondary-color" id="home_api-container">
        <div className="spacing-md flex-center">
          <div className="text-body" style={{ width: '40%' }}>
            <p>
              Thanks to the Spotify API, which Spotify has made available publically to web developers, we are able to use your actual Spotify informaiton to help make these estimates as accurate as possible.
            </p>
          </div>
        </div>
      </section>
      <section className='bg_primary-color' id="home_closer-container">
        <div className='spacing-md'>
          <div className='text-body'>
            <h2>You streamed them hundreds of times.</h2>
            <h3>Don't you want to know what that meant?</h3>
            <p>No pressure. No judgment. Just transparency.
            </p>
            <button>Check Your Impact - It's Free</button>
          </div>
        </div>
      </section>
    </div>
  );
}
