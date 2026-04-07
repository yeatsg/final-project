import { useState, useEffect } from 'react'
import axios from 'axios'

// VARIABLES //
const clientId = "769579f19a2c4121bb8bf8a240b67273";
const clientSecret = "19eac3fe1a9a4616942c9c16f86dfe87";
const authEndpoint = "https://accounts.spotify.com/api/token";
const requestHeader = "application/x-www-form-urlencoded";
const requestBody = {grant_type: 'client_credentials', client_id: clientId, client_secret: clientSecret};
const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');


export function useSpotifyAccessToken() {
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        axios
        .post(
            authEndpoint, 
            toUrlEncoded(requestBody),
            {
                headers: { 'Content-Type': requestHeader }
            }
        )
        .then((results) => {
            console.log(results.data);
            console.log("Spotify Token Acquired: ",  results.data.access_token)
            setToken(results.data.access_token);
            setLoading(false)
        })
        .catch((err) => {
            props.triggerModal(true);
            console.log("Something went wrong with your axios request", err, err.response?.data);
            setLoading(false)
            setError(err)
        });
    }, [])

    return {loading, error, token}
}