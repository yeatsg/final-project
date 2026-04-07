// import { generateSpotifyAccessToken } from "@/util/generateSpotifyAccessToken";

//      /api/spotifyLogin

export const GET = async () => {
    
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: 'user-top-read',
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        state: 'abcdefg'
    })

    return Response.redirect('https://accounts.spotify.com/authorize?' + params.toString())
}