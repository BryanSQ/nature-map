import { useEffect } from "react";
import { useMap } from "./useMap";
import { useMapMarker } from "./useMapMarker";
// import { useMarkers } from "./useMarkers";

export const useMapClick = () => {
	const { map } = useMap();
	// const { setMarkers } = useMarkers();
	const { placeMarker } = useMapMarker();

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
