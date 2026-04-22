import "./globals.css";
import Link from "next/link";

import SpotifyContextProvider from "@/context/SpotifyContextProvider";
import SpotifyLoginLink from "@/components/SpotifyLoginLink";

export default async function RootLayout({ children }) {

  //const res = await fetch("http://localhost:3000/example")
  //const json = await res.json()

  return (
    <SpotifyContextProvider>
      <html lang="en">
        <head>
        </head>
        <body>
          <header>
            <h1>This is the header.</h1>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/create">create</Link>
            <SpotifyLoginLink />
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
