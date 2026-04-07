import { generateSpotifyAccessToken } from "@/util/generateSpotifyAccessToken";

export const GET = async () => {
    // Spotify Id for "Top 50 USA" Playlist //
    const playlistId = "37i9dQZEVXbLRQDuF5jeBp";
    const token = await generateSpotifyAccessToken()

    if (!token) {
        return Response.json({
            message: "Something went wrong"
        }, {
            status: 500
        })
    }

    const fetchOptions = {
      headers: {
          Authorization: `Bearer ${token}`,
      }
    }

    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, fetchOptions)
    
    if (!res.ok) {
      console.error("failed to fetch in searchTopPlaylist")
      console.error(await res.text())
      //Error previously triggered popup modal.
      return Response.json({
        message: "failed"
      }, {
        status: 500
      })
    }
    
    const data = await res.json()
    console.log(data)

    return Response.json(data)
  };