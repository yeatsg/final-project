"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function SpotifyLoginLink() {

    const pathname = usePathname()

    return <>
        <Link href={`/api/spotifyLogin?pathname=${pathname}`}>Log in with Spotify</Link>
    </>
}