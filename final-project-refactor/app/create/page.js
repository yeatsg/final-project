"use client"

import { useState } from "react"

//import { Transition } from "react-transition-group";
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
    //setDisplaySelectedTrack(false);
    return returnObject;
};

export default function createPage() {

    const { topTracks, loading } = useTopTracks()
    const [selectedTrack, setSelectedTrack] = useState(null)
    const [projectedRevenue, setProjectedRevenue] = useState({})
 
    let artistsNameMapped = '';

    return <>
        
        {/* Step 1: Your Top 5 Tracks */}
        {loading ?
            (<>
                <p>Loading your top tracks...</p>
            </>)
            :
            (topTracks && topTracks.length) ?
                (<>
                    <h3>Your top tracks</h3>
                    <div className="album-display">
                        {topTracks.map(t => {

                            const noTrackSelected = selectedTrack === null;
                            const thisTrackSelected = selectedTrack === t
                            const shown = noTrackSelected || thisTrackSelected

                            return <div key={t.id} style={{
                                display: shown ? "block" : "none"
                            }}>
                                <h4>{t.name}</h4>
                                {artistsNameMapped = t.artists.map(a => a.name).join(', ')}
                                <p>by {artistsNameMapped}</p>
                                <img src={t.album.images?.[0]?.url} alt={artistsNameMapped} className="album-image-display"/>
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
        {selectedTrack && (
            <form>
                <p>How many times did you listen to this track this week?</p>
                <input type="number" />
                <button type="button" onClick={(numb)=>{setProjectedRevenue(calculateArtistProfit(numb))}}>Submit</button>
            </form>
        )}

        {/*Step 3: Results */}
    </>

}