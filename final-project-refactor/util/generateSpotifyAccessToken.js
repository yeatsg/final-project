export async function generateSpotifyAccessToken() {    
    const requestBody = {
        client_id: process.env.SPOTIFY_CLIENT_ID, 
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        response_type: 'code', 
        scopes: "user-library-read user-top-read user-read-recently-played user-read-private user-library-read user-follow-read", 
        redirect_uri: "https://127.0.0.1:3000/callback", 
        show_dialog: 'True'
    };
    let res
    try {
        console.log("Attempting to fetch spotify access token...")
        const params = new URLSearchParams(requestBody)
        res = await fetch(`https://accounts.spotify.com/api/token?${params.toString()}`)
    } catch (error) {
        console.error("Failed fetching spotify access token", error)
        return null
    }

    if (!res.ok) {
        console.error("Bad response when fetching spotify access token:", await res.text())
        return null
    }

    const data = await res.json()
    return data
    
}

