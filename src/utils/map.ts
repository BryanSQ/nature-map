import type { LocalMarker, Marker } from "../types";

const MAP_API = import.meta.env.VITE_MAPS_API_KEY;

async function initMap(mapId: string): Promise<google.maps.Map> {
	const { Map: GMap } = (await google.maps.importLibrary(
		"maps",
	)) as google.maps.MapsLibrary;

	const { ColorScheme } = await google.maps.importLibrary("core");

	const initialMap = new GMap(
		document.getElementById("google-map-container") as HTMLElement,
		{
			zoom: 12,
			mapId,
			center: { lat: 9.9725447, lng: -84.1963422 },
			disableDefaultUI: true,
			colorScheme: ColorScheme.DARK,
		},
	);

	return initialMap;
}

const transformToLocalMarker = (marker: Marker): LocalMarker | null => {
	const coords = marker.googleMarker.position;
	const place = marker.place;

	if (coords && place) {
		return {
			id: marker.id,
			name: place?.name,
			position: coords,
			place,
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
	position: google.maps.LatLngLiteral | google.maps.LatLng,
) => {
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

export { initMap, transformToLocalMarker, reverseGeocode, geocode };
