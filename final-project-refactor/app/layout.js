import "./globals.css";

import SpotifyContextProvider from "@/context/SpotifyContextProvider";

export default async function RootLayout({ children }) {

  //const res = await fetch("http://localhost:3000/example")
  //const json = await res.json()

  return (
    <SpotifyContextProvider>
      <html lang="en">
        <head>

        </head>
        <body>
          <header className="bg_secondary-color">
            <img src="./public/rubik/unwrapped-logo-draft3.png" />
            <a href="/">Home</a>
            <a href="/about">About</a>
          </header>
          {children}
          <footer className="bg_secondary-color">
            <div className="center-flex">
              <p>Powered by Spotify</p>
            </div>
          </footer>
        </body>
      </html>
    </SpotifyContextProvider>
  );
}
