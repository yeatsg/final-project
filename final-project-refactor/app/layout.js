import "./globals.css";
import Link from "next/link";

import SpotifyContextProvider from "@/context/SpotifyContextProvider";
import SpotifyLoginLink from "@/components/SpotifyLoginLink";
import ResizeHeaderByScroll from "@/components/ResizeHeaderByScroll";


export default async function RootLayout({ children }) {

  //const res = await fetch("http://localhost:3000/example")
  //const json = await res.json()

  return (
    <SpotifyContextProvider>
      <html lang="en">
        <head>
        </head>
        <body>
          <header id="head" className="bg_secondary-color">
            <div className="spacing-md">
              <div id="head_logo-container">
                <Link href="/">
                  <img id="head_logo" src="unwrapped-logo-draft3.png" height="80px" width="80px" />
                </Link>
              </div>
              <div id="head_nav" >
                <div className="container-row">
                  <Link href="/">🏠︎</Link>
                  <Link href="/about">About</Link>
                  <Link href="/create">Create</Link>
                  <SpotifyLoginLink />
                </div>
              </div>
            </div>
          </header>
          <ResizeHeaderByScroll></ResizeHeaderByScroll>
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
