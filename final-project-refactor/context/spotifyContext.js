"use client"

import { createContext, useContext } from "react";

//               vvvv this is the thing that has .Provider on it
export const spotifyContext = createContext({
    code: null
})

// this is a custom hook to make it a little easier to import the context
export const useSpotify = () => {
    return useContext(spotifyContext)
}

/*
        WITH the custom hook

            import { useSpotify } from '...'

            function MyComponent() {
                const spotifyCtx = useSpotify()

                return <></>
            }
        
        --------------------

        WITHOUT the custom hook

            import { spotifyContext } from '...'
            import { useContext } from 'react'

            function MyComponent() {
                const spotifyCtx = useContext(spotifyContext)

                return <></>
            }
*/