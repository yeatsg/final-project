"use client"

import { useRef, useState, useEffect, createContext, useContext } from 'react';

const HeaderHeightContext = createContext()

export function HeightProvider({children}) {

    const [elementHeight, setElementHeight] = useState(124);
    const targetRef = useRef(null);

    useEffect(() => {
        if (targetRef.current) return;

        const updateHeight = () => {
            const height = targetRef.current.offsetHeight;
            setElementHeight(height);
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        window.addEventListener('load', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
            window.removeEventListener('load', updateHeight);
        };
    }, []);

    return (
        <HeaderHeightContext.Provider value={{ elementHeight, targetRef, setElementHeight }}>
            {children}
        </HeaderHeightContext.Provider>
    );
}

export function useHeaderHeight() {
    const context = useContext(HeaderHeightContext);
    if (!context) {
        throw new Error('useHeaderHeight must be used within a HeightProvider');
    }
    return context;
}
