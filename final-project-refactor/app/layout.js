import "./globals.css";
import Link from "next/link";

import Header from "@/components/Header";
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
          <Header></Header>
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
