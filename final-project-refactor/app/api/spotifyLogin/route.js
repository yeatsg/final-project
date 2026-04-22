// import { generateSpotifyAccessToken } from "@/util/generateSpotifyAccessToken";

//      /api/spotifyLogin

export const GET = async (req) => {
    
    const pathname = new URL(req.url).searchParams.get('pathname')

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: 'user-top-read',
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        state: pathname
    })

    return Response.redirect('https://accounts.spotify.com/authorize?' + params.toString())
}