import type { LocalMarker, Marker } from "../types";

const MAP_API = import.meta.env.VITE_MAPS_API_KEY;

const mapStyles = [
	{ elementType: "geometry", stylers: [{ color: "#242f3e" }] },
	{ elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
	{ elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
	{
		featureType: "administrative.locality",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "poi.park",
		elementType: "geometry",
		stylers: [{ color: "#263c3f" }],
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [{ color: "#6b9a76" }],
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [{ color: "#38414e" }],
	},
	{
		featureType: "road",
		elementType: "geometry.stroke",
		stylers: [{ color: "#212a37" }],
	},
	{
		featureType: "road",
		elementType: "labels.text.fill",
		stylers: [{ color: "#9ca5b3" }],
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [{ color: "#746855" }],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [{ color: "#1f2835" }],
	},
	{
		featureType: "road.highway",
		elementType: "labels.text.fill",
		stylers: [{ color: "#f3d19c" }],
	},
	{
		featureType: "transit",
		elementType: "geometry",
		stylers: [{ color: "#2f3948" }],
	},
	{
		featureType: "transit.station",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [{ color: "#17263c" }],
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [{ color: "#515c6d" }],
	},
	{
		featureType: "water",
		elementType: "labels.text.stroke",
		stylers: [{ color: "#17263c" }],
	},
];

async function initMap(mapId: string): Promise<google.maps.Map> {
	const { Map: GMap } = (await google.maps.importLibrary(
		"maps",
	)) as google.maps.MapsLibrary;

	const initialMap = new GMap(
		document.getElementById("google-map-container") as HTMLElement,
		{
			zoom: 12,
			mapId,
			center: { lat: 9.9725447, lng: -84.1963422 },
			styles: mapStyles,
			disableDefaultUI: true,
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
