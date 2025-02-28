import { useEffect, useState } from "react";
import { useMarkers } from "../../hooks/useMarkers";
import { Marker } from "../Marker";

import type { LocalMarker } from "../../types";
import { transformToLocalMarker } from "../../utils/map";

import "./MarkerList.css"


export const MarkerList = () => {
    const [localMarkers, setLocalMarkers] = useState<LocalMarker[]>([]);

    const { markers } = useMarkers();

    useEffect(() => {

        const newLocalMarkers = markers
            .map(marker => transformToLocalMarker(marker))
            .filter(marker => marker !== null);

        setLocalMarkers(newLocalMarkers)
    }, [markers])

    return (
        <ul className="marker-list">
            {
                localMarkers.length > 0
                    ? (
                        localMarkers?.map((marker) => {
                            return (
                                <Marker key={marker.id} marker={marker} />
                            )
                        }
                        )
                    )
                    : (<div>No markers to show</div>)
            }
        </ul>
    );
};