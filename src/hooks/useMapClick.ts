import { useEffect } from "react";
import { useMap } from "./useMap";
import { useMarkers } from "./useMarkers";

import { addMarker } from "../utils/map";

export const useMapClick = () => {
	const { map } = useMap();
	const { setMarkers } = useMarkers();

	useEffect(() => {
		if (map === null) return;

		const handleMapClick = async (e: google.maps.MapMouseEvent) => {
			const coords = e.latLng;
			if (coords) {
				const newMarker = await addMarker(map, coords);
				setMarkers((prev) => [...prev, newMarker]);
			}
		};

		map.addListener("click", handleMapClick);

		return () => google.maps.event.clearListeners(map, "click");
	}, [map, setMarkers]);
};
