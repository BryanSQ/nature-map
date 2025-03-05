import { useEffect, useState } from "react";
import { useMarkers } from "../../hooks/useMarkers";
import { Marker } from "../Marker";

import type { LocalMarker } from "../../types";
import { transformToLocalMarker } from "../../utils/map";

import "./MarkerList.css"


export const MarkerList = () => {
    const [localMarkers, setLocalMarkers] = useState<LocalMarker[]>([]);
    const [markersToShow, setMarkersToShow] = useState<LocalMarker[]>([]);

    const { markers, filterCategories } = useMarkers();

    useEffect(() => {

        const newLocalMarkers = markers
            .map(marker => transformToLocalMarker(marker))
            .filter(marker => marker !== null);

        setLocalMarkers(newLocalMarkers)
    }, [markers])

    useEffect(() => {
        if (filterCategories.length === 0) {
            setMarkersToShow(localMarkers);
            return;
        }

        const filteredMarkers = localMarkers.filter((marker) => marker.place && filterCategories.includes(marker.place.category));
        setMarkersToShow(filteredMarkers);
    }, [filterCategories, localMarkers])

    return (
        <ul className="marker-list">
            {
                markersToShow.length > 0
                    ? (
                        markersToShow?.map((marker) => {
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