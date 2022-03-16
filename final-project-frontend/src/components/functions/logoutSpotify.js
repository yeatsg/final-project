import React from "react";

const logoutSpotify = () => {
  window.localStorage.removeItem("spotifyToken");
};

export default logoutSpotify;
