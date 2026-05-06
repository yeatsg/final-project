"use client"

import Link from "next/link";
// import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { useHeaderHeight } from '@/hooks/useHeaderHeight';
import SpotifyLoginLink from "@/components/SpotifyLoginLink";
import DesktopHamburger from "@/components/DesktopHamburger";


export default function Header() {
    const [shrinkForScroll, setShrinkForScroll] = useState(false);
    const [desktopHamburgerVisible, setDesktopHamburgerVisible] = useState(false);
    const { targetRef } = useHeaderHeight();
    // const router = useRouter();

    useEffect(() => {
        window.onscroll = function () { scrollFunction() };

        function scrollFunction() {
            const scrollY = window.scrollY;
            // let isScrolled = document.scrollingElement.scrollTop > 180;
            if (scrollY >= 235) {
                setShrinkForScroll(true);
                setDesktopHamburgerVisible(true)
            } else if (scrollY < 72) {
                setShrinkForScroll(false);
                setDesktopHamburgerVisible(false);
            }
        }
    }, []);


    return <header 
        id="head" ref={targetRef}
        className={`${shrinkForScroll ? ' head_desktop-shrink' : ''}`}
        >
        <div className={`spacing-md${shrinkForScroll ? ' glass' : ''}`}>
            <div id="head_logo-container">
                <Link href="/">
                    <img id="head_logo" src="unwrapped-logo-draft3.png" max-height="100px" max-width="100px" />
                </Link>
            </div>
            <div id="head_nav" >
                {
                    !desktopHamburgerVisible ? (
                        <div className="container-row">
                            <Link href="/" >🏠︎</Link>
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