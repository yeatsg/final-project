import React from "react";

const About = () => {
  return (
    <div className="render-body">
      <div className="pink-white-bg">
        <div className="text-body">
          <h2>What is Unwrapped?</h2>
          <h1>
            Unwrapped is a powerful tool for Spotify users to help{" "}
            <b>estimate</b> how much money your favorite artists have made based
            on your streaming behavior on Spotify.
          </h1>
        </div>
      </div>
      <div id="about-grid2">
        <div className="text-body">
          <p>
            Spotify is the current industry leader in music streaming. Its
            ituitive design and powerful algorithms provide Spotify's users with
            easy access to a larger catalog of music than has ever been made
            possible before, and all conveniently available from the phone in
            their pocket or their computers.
          </p>
        </div>
      </div>
      <div className="text-body">
        <div>
          <h1>Where does our data come from?</h1>
          <p>
            It is important to note that Spotify does not allow information on
            their royalty agreements to the public. The numbers posted here are
            based on investigative journalism by Business Insider, which claims
            that artists make a range between $0.0033 and $0.0055 based on their
            deals with the streaming service.
          </p>
          <p>
            This is just an <b>estimate</b> of artist profits
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
