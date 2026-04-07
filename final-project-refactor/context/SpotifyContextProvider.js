"use client"

import { spotifyContext } from "./spotifyContext";
import { useState, useEffect } from "react";

export default function SpotifyContextProvider({ children }) {
    const [token, setToken] = useState(null)

    const fetchTokenFromCode = async (code) => {
        console.log("fetching token...")
        const res = await fetch('/api/spotify/token', {
            method: 'POST',
            body: JSON.stringify({ code }),
        })
        const data = await res.json()
        console.log("data:", data)
        setToken(data.access_token)
    }

    useEffect(() => {
        if (token) {
            localStorage.setItem("spotify-auth-token", token)
        }
    }, [token])

    useEffect(() => {
        const lsToken = localStorage.getItem("spotify-auth-token")
        if (lsToken) {
            setToken(lsToken)
        }
    }, [])

    const ctx = {
        token,
        fetchTokenFromCode,
    }

    return <spotifyContext.Provider value={ctx}>
        {children}
    </spotifyContext.Provider>
}