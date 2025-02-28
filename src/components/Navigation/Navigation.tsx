import type { ReactNode } from "react"

import "./Navigation.css"

interface navigationProps {
    children: ReactNode
}

export const Navigation = ({ children }: navigationProps) => {
    return (
        <nav className="nav-links">
            {children}
        </nav>
    )
}