import { v4 as uuidv4 } from "uuid";

import type { LocalMarker, Marker } from "../types";

const MAP_API = import.meta.env.VITE_MAPS_API_KEY;

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

const geocode = async (address: string) => {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${MAP_API}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		return json.results[0];
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(String(error));
		}
		return "Can't locate.";
	}
};

const reverseGeocode = async (
	position: google.maps.LatLngLiteral,
): Promise<string> => {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${MAP_API}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		return json.results;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(String(error));
		}
		return "Can't locate.";
	}
};

export { initMap, addMarker, transformToLocalMarker, reverseGeocode, geocode };
