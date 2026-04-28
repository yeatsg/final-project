"use client"

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";

import SpotifyLoginLink from "@/components/SpotifyLoginLink";
import DesktopHamburger from "@/components/DesktopHamburger";


export default function Header() {

    const [shrinkForScroll, setShrinkForScroll] = useState(false);
    const [desktopHamburgerVisible, setDesktopHamburgerVisible] = useState(false);

    useEffect(() => {
        window.onscroll = function () { scrollFunction() };

        function scrollFunction() {

            let isScrolled = document.scrollingElement.scrollTop > 180;
            if (isScrolled) {
                setShrinkForScroll(true);
                setDesktopHamburgerVisible(true)
            } else {
                setShrinkForScroll(false);
                setDesktopHamburgerVisible(false);
            }
        }
    }, []);


    return <header id="head" className={`bg_secondary-color${shrinkForScroll ? ' head_desktop-shrink' : ''}`}>
        <div className="spacing-md">
            <div id="head_logo-container">
                <Link href="/">
                    <img id="head_logo" src="unwrapped-logo-draft3.png" max-height="100px" max-width="100px" />
                </Link>
            </div>
            <div id="head_nav" >
                {
                    !desktopHamburgerVisible ? (
                        <div className="container-row">
                            <Link href="/">🏠︎</Link>
                            <Link href="/about">About</Link>
                            <Link href="/create">Create</Link>
                            <SpotifyLoginLink />
                        </div>
                    ) : (
                        <DesktopHamburger shown={!desktopHamburgerVisible} setShown={setDesktopHamburgerVisible}></DesktopHamburger>
                    )
                }
            </div>
        </div>
    </header>
}