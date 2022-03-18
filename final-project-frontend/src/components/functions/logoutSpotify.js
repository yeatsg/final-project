const logoutSpotify = (setTokens) => {
  window.localStorage.removeItem("spotifyToken");
  setTokens.spotify("");
};

export default logoutSpotify;
