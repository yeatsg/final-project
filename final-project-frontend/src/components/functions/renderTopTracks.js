import React from "react";

const renderTopTracks = (topTracks) => {
  return (
    <table className="top-tracks-display">
      <thead className="table-box">
        <th></th>
        <th>Today's Top Tracks</th>
        <th></th>
      </thead>
      <tbody>
        {topTracks.map((trackObj) => (
          <tr key={trackObj.track.id}>
            <th className="table-box">
              <img
                src={trackObj.track.album.images[1].url}
                alt="noimage"
                className="table-icon"
              />
            </th>
            <th className="table-box">
              <p>{trackObj.track.name}</p>
              <p>{trackObj.track.artists[0].name}</p>
            </th>
            <th className="table-box">Between $13-25K</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default renderTopTracks;
