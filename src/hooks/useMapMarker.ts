import { useMap } from "./useMap";
import { useMarkers } from "./useMarkers";

export const useMapMarker = () => {
	const { map } = useMap();

	const { setMarkers } = useMarkers();

	const placeMarker = async (
		position: google.maps.LatLng | google.maps.LatLngLiteral,
	) => {
		const { AdvancedMarkerElement } = (await google.maps.importLibrary(
			"marker",
		)) as google.maps.MarkerLibrary;

		return new AdvancedMarkerElement({
			map: map,
			position: position,
		});
	};

	return { placeMarker };
};
