"use client"

import { createContext, useContext } from "react";

export const spotifyContext = createContext({
    code: null
})

export const useSpotify = () => {
    return useContext(spotifyContext)
}