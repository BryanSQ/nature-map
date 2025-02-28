import { v4 as uuidv4 } from "uuid";

import type { LocalMarker, Marker } from "../types";

async function initMap(mapId: string): Promise<google.maps.Map> {
	const { Map: GMap } = (await google.maps.importLibrary(
		"maps",
	)) as google.maps.MapsLibrary;

	const initialMap = new GMap(
		document.getElementById("google-map-container") as HTMLElement,
		{
			zoom: 8,
			mapId,
			center: { lat: 9.9725447, lng: -84.1963422 },
		},
	);

	return initialMap;
}

const addMarker = async (
	map: google.maps.Map,
	position: google.maps.LatLng | google.maps.LatLngLiteral,
	markerTitle = "John Doe",
): Promise<Marker> => {
	const { AdvancedMarkerElement } = (await google.maps.importLibrary(
		"marker",
	)) as google.maps.MarkerLibrary;

	const gMarker = new AdvancedMarkerElement({
		map: map,
		position: position,
		title: markerTitle,
	});
	return {
		id: uuidv4(),
		googleMarker: gMarker,
	};
};

const transformToLocalMarker = (marker: Marker): LocalMarker | null => {
	const coords = marker.googleMarker.position;

	if (coords) {
		return {
			id: marker.id,
			name: marker.googleMarker.title,
			position: coords,
		};
	}

	return null;
};

export { initMap, addMarker, transformToLocalMarker };
