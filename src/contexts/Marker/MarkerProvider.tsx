import { useEffect, useState } from "react";

import type { ReactNode } from "react";
import type { LocalMarker, Marker } from "../../types";

import { MarkerContext } from "./MarkerContext";
import { useLocalStorage, useMap } from "../../hooks";
import { addMarker, transformToLocalMarker } from "../../utils/map";

interface MarkerProviderProps {
    children: ReactNode;
}


export const MarkerProvider = ({ children }: MarkerProviderProps) => {

    const { map } = useMap();

    const [markers, setMarkers] = useState<Marker[]>([]);

    const { localStorageValue: localMarkers, saveLocalStorageValue } = useLocalStorage('local-markers', []);

    // biome-ignore lint: exhaustive-deps innecesary here
    useEffect(() => {
        const transformMarkers = async () => {
            if (localMarkers.length > 0) {
                if (map) {
                    const convertedMarkers = localMarkers.map(async (marker: LocalMarker) => addMarker(map, marker.position));
                    const solvedMarkers = await Promise.all(convertedMarkers);
                    setMarkers(solvedMarkers);
                }
            }
        };

        transformMarkers();
    }, [map]);


    // EL PROBLEMA QUE NO BORRA EL ULTIMO ESTA AQUI
    // biome-ignore lint: exhaustive-deps innecesary here
    useEffect(() => {

        console.log(`HAY ${markers.length} MARCADORES`);

        if (markers.length === 0) return;

        const newLocalMarkers = markers.map((marker) => transformToLocalMarker(marker));
        saveLocalStorageValue(newLocalMarkers);
    }, [markers]);

    return (
        <MarkerContext.Provider value={{ markers, setMarkers }}>
            {children}
        </MarkerContext.Provider>
    );
};
