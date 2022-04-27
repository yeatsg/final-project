import React from "react";

const About = () => {
  return (
    <div className="render-body">
      <div className="pink-white-bg">
        <div className="text-body">
          <h1>What is Unwrapped?</h1>
          <p>
            Unwrapped is a powerful tool for Spotify users to help{" "}
            <b>estimate</b> how much money your favorite artists have made based
            on your streaming behavior on Spotify.
          </p>
        </div>
      </div>
      <div id="about-grid2">
        <div className="text-body">
          <h2>About</h2>
          <p>
            As the world's largest music streaming service, Spotify has become
            the go-to medium for popular artists to distribute their music and
            for smaller independent artists to find an audience.
          </p>
          <p>
            In 2020, Spotify Wrapped was introduced, providing Spotify users
            with feedback on their streaming data and spotlighting their user's
            top artists and tracks. But with Spotify reporting $X00,000,000 in
            revenue, how much have my favorite artists have actually made off my
            streams?
          </p>
          <p>Thus, Unwrapped was born.</p>
        </div>
      </div>
      <div id="about-grid3">
        <div className="text-body">
          <div>
            <h1>Where does our data come from?</h1>
            <p>
              It is important to note that Spotify does not allow information on
              their royalty agreements to the public. At best, what Unwrapped
              provides is a useful <b>estimate</b> to educate users on how their
              money gets spent when streaming on Spotify.
            </p>
            <div>
              <div>
                <h3>Spotify Streaming Data</h3>
                <img src="" alt="image pending" />
                <p>
                  Spotify provides its powerful API to web developers that's
                  capable of retrieving information such as top artists and top
                  tracks. Unwrapped cannot access this information without you
                  providing Spotify your express permission when using our web
                  site.
                </p>
              </div>
              <div>
                <h3>Artist Profits</h3>
                <img src=" " alt="image pending" />
                <p>
                  Artist profits are based on{" "}
                  <a>investigative journalism by Business Insider</a>, which
                  claims that artists make a range between $0.0033 and $0.0055
                  based on their deals with the streaming service.
                </p>
              </div>
              <div>
                <h3>Number of Streams</h3>
                <img src=" " alt="image pending" />
                <p>
                  Spotify does not provide us with total number of streams,
                  which is why this data has to be inputted manually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
