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
          <header>
            <h1>This is the header.</h1>
            <a href="/">Home</a>
            <a href="/about">About</a>
          </header>
          {children}
          <footer>
            <p>This is the footer</p>
          </footer>
        </body>
      </html>
    </SpotifyContextProvider>
  );
}
