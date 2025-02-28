import { useState, } from "react";

import type { ReactNode } from "react";

import { MapContext } from ".";


interface MapProviderProps {
    children: ReactNode;
}


export const MapProvider = ({ children }: MapProviderProps) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);

    return (
        <MapContext.Provider value={{ map, setMap }}>
            {children}
        </MapContext.Provider>
    );
};