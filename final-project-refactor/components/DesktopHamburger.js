"use client"

export default function DesktopHamburger({ shown, setShown }) {
    return <div id="hamburger_desktop"><button onClick={() => { setShown(false) }}>|||</button></div>
}