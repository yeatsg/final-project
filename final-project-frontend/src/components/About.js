import React from "react";

const About = () => {
  return (
    <div className="render-body">
      <p>About this App!</p>
      <p>
        Spotify UN-WRAPPED utilizes the Spotify API to create an estimate of
        artist royalties based on your streaming data. UN-WRAPPED is inspired by
        the Spotify Wrapped feature which shows users their streaming history
        and behavior over the course of the year.
      </p>
      <p>
        It is important to note that Spotify does not allow information on their
        royalty agreements to the public. The numbers posted here are based on
        investigative journalism by Business Insider, which claims that artists
        make a range between $0.0033 and $0.0055 based on their deals with the
        streaming service.
      </p>
      <p>
        This is just an <b>estimate</b> of artist profits
      </p>
    </div>
  );
};

export default About;
