"use client"

import { useState } from "react"

//import { usePathName } from "next/navigation"
//This will allow me to get a url to pass as redirect uri in any environment.
//Not sure if it should be global or specific to the Home and Create pages. 
import Link from "next/link"
import { useTopTracks } from "@/hooks/useTopTracks"

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
    console.log("calculateArtistProfit has ran succesfully: ", returnObject)
    return returnObject;
};

export default function createPage() {

    const { topTracks, loading } = useTopTracks()
    const [selectedTrack, setSelectedTrack] = useState(null)
    const [projectedRevenue, setProjectedRevenue] = useState({})

    let artistsNameMapped = '';

    return <>
        <section className="bg_primary-color">
            <div className="spacing-md">
                <Link href="/api/spotifyLogin">Log in with Spotify</Link>
                {/* Step 1: Your Top 5 Tracks */}
                {loading ?
                    (<>
                        <p>Loading your top tracks...</p>
                    </>)
                    :
                    topTracks && topTracks.length && !selectedTrack ?
                        (<>
                            <h3>Your top tracks</h3>
                            <div className="album-display-container">
                                {topTracks.map(t => {
                                    return <div key={t.id}>
                                        <h4>{t.name}</h4>
                                        {artistsNameMapped = t.artists.map(a => a.name).join(', ')}
                                        <p>by {artistsNameMapped}</p>
                                        <img src={t.album.images?.[0]?.url} alt={artistsNameMapped} className="album-img" />
                                        <button type="button" onClick={() => setSelectedTrack(t)} className="green-pink-btn"></button>
                                    </div>
                                })}
                            </div>
                        </>)
                        :
                        (<>
                            <p>You have no top tracks.</p>
                        </>)}

                {/* Step 2: How often do you listen? */}
                {selectedTrack && !projectedRevenue ? (
                    <div>
                        <div className="album-display-container">
                            <div key={selectedTrack.id}>
                                <h4>{selectedTrack.name}</h4>
                                {artistsNameMapped = selectedTrack.artists.map(a => a.name).join(', ')}
                                <p>by {artistsNameMapped}</p>
                                <img src={selectedTrack.album.images?.[0]?.url} alt={artistsNameMapped} className="album-img-selected" />
                            </div>
                        </div>
                        <form>
                            <p>How many times did you listen to this track this week?</p>
                            <input type="number" />
                            <button type="button" onClick={(numb) => { setProjectedRevenue(calculateArtistProfit(numb)) }}>Submit</button>
                        </form>
                    </div>
                ) : (
                    <div className="empty-div">empty</div>
                )}

                {/*Step 3: Results */}
                {Object.keys(projectedRevenue).length !== 0 ? (
                    <div >
                        <div className="album-img-selected">
                            <div key={selectedTrack.id}>
                                <h4>{/*selectedTrack.name*/}</h4>
                                {artistsNameMapped = selectedTrack.artists.map(a => a.name).join(', ')}
                                <p>by {artistsNameMapped}</p>
                                <img src={selectedTrack.album.images?.[0]?.url} alt={artistsNameMapped} className="album-image-display" />
                            </div>
                        </div>
                        <div
                            className="track-form"
                        >
                            <p>
                                We estimate that this week{" "}
                                {selectedTrack.artists[0].name} has made between roughly
                            </p>
                            <h1>{profitsObject.weeklyProfit}</h1>
                            <p>From your streams on Spotify.</p>
                            <button
                                onClick={() => {
                                    console.log("Placeholder retrigger => ");
                                }}
                                className="green-pink-btn"
                            >
                                More Info
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                    </div>
                )
                }
            </div>
        </section>
    </>

}