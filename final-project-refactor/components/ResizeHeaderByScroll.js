"use client"

export default function resizeHeaderByScroll() {
    window.onscroll = function () { scrollFunction() };

    //need to refactor so that window is a useEffect to stop server-side errors

    function scrollFunction() {
        const headerDom = document.getElementById("head");
        const headerLogo = headerDom.querySelector("#head_logo")
        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
            headerDom.style.fontSize = "14px";
            headerLogo.style.height = "40px";
            //headerDom.style.backgroundColor = "transparent";
        } else {
            headerDom.style.fontSize = "inherit";
            headerLogo.style.height = "inherit";
        }
    }

}