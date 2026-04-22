//      /callback?state=xyz

"use client"

import { useSearchParams } from "next/navigation"
import { useSpotify } from "@/context/spotifyContext"
import { useEffect } from "react"

export default function SpotifyCallbackPage() {

    const searchParams = useSearchParams()
    const state = searchParams.get('state')
    const code = searchParams.get('code')

    const spotifyContext = useSpotify()

    useEffect(() => {
        if (code) {
            localStorage.setItem("spotify-auth-code", code)
            spotifyContext.fetchTokenFromCode(code)
        }
        setTimeout(() => {
            window.location.href = state
        }, 3000);
    }, [])



    // return <>
    // </>
    
    return <>
        <h3>State: {state}</h3>
        <h3>Code: {code}</h3>
        <p>You are logged in. redirecting...</p>
    </>
}

