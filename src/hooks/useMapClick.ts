import { useEffect } from "react";
import { useMap } from "./useMap";
import { useMarkers } from "./useMarkers";

export const useMapClick = () => {
	const { map } = useMap();
	const { placeMarker } = useMarkers();

	useEffect(() => {
		if (map === null) return;

		const handleMapClick = async (e: google.maps.MapMouseEvent) => {
			const coords = e.latLng;
			if (coords) {
				await placeMarker(coords);
			}
		};

		map.addListener("click", handleMapClick);

		return () => google.maps.event.clearListeners(map, "click");
	}, [map, placeMarker]);
};
