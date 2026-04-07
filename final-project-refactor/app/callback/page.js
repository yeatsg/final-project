"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useSpotify } from "@/context/spotifyContext"

export default function SpotifyCallbackPage() {
    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    const spotifyCtx = useSpotify()

    useEffect(() => {
        if (code) {
            spotifyCtx.fetchTokenFromCode(code)
        }
    }, [])

    return <h3>Logging you in...</h3>
}