"use client"

import { useState } from "react"

export function Counter() {

    const [n, setN] = useState(0)

    return <div>
        <button onClick={() => setN(n+1)}>
            {0}
        </button>
    </div>
}