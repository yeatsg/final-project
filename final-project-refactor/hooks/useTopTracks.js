


import { useState } from "react";
import { useSpotify } from "@/context/spotifyContext";
import { useEffect } from "react";

export function useTopTracks() {
    const spotifyCtx = useSpotify()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [topTracks, setTopTracks] = useState([])

    const fetchTopTracks = async (token) => {
        console.log("fetching top tracks...")
        try {
            const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", 
                    {
                        headers: { 'Authorization': `Bearer ${token}` },
                    }
                )
            const results = await response.json()
            console.log("fetchTopTracks results:", results);
            setTopTracks(results.items)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    };

    useEffect(() => {
        if (spotifyCtx.token) {
            console.log("spotifyCtx.token:", spotifyCtx.token)
            fetchTopTracks(spotifyCtx.token)
        }
    }, [spotifyCtx.token])

    return { topTracks, loading, error }
}