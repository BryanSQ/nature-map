import type { LocalMarker, Marker } from "../types";

const MAP_API = import.meta.env.VITE_MAPS_API_KEY;

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
			disableDefaultUI: true,
		},
	);

	const styledMapType = new google.maps.StyledMapType([
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{
					visibility: "on",
				},
				{
					color: "#aee2e0",
				},
			],
		},
		{
			featureType: "landscape",
			elementType: "geometry.fill",
			stylers: [
				{
					color: "#abce83",
				},
			],
		},
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{
					color: "#769E72",
				},
			],
		},
		{
			featureType: "poi",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#7B8758",
				},
			],
		},
		{
			featureType: "poi",
			elementType: "labels.text.stroke",
			stylers: [
				{
					color: "#EBF4A4",
				},
			],
		},
		{
			featureType: "poi.park",
			elementType: "geometry",
			stylers: [
				{
					visibility: "simplified",
				},
				{
					color: "#8dab68",
				},
			],
		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{
					visibility: "simplified",
				},
			],
		},
		{
			featureType: "road",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#5B5B3F",
				},
			],
		},
		{
			featureType: "road",
			elementType: "labels.text.stroke",
			stylers: [
				{
					color: "#ABCE83",
				},
			],
		},
		{
			featureType: "road",
			elementType: "labels.icon",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
		{
			featureType: "road.local",
			elementType: "geometry",
			stylers: [
				{
					color: "#A4C67D",
				},
			],
		},
		{
			featureType: "road.arterial",
			elementType: "geometry",
			stylers: [
				{
					color: "#9BBF72",
				},
			],
		},
		{
			featureType: "road.highway",
			elementType: "geometry",
			stylers: [
				{
					color: "#EBF4A4",
				},
			],
		},
		{
			featureType: "transit",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
		{
			featureType: "administrative",
			elementType: "geometry.stroke",
			stylers: [
				{
					visibility: "on",
				},
				{
					color: "#87ae79",
				},
			],
		},
		{
			featureType: "administrative",
			elementType: "geometry.fill",
			stylers: [
				{
					color: "#7f2200",
				},
				{
					visibility: "off",
				},
			],
		},
		{
			featureType: "administrative",
			elementType: "labels.text.stroke",
			stylers: [
				{
					color: "#ffffff",
				},
				{
					visibility: "on",
				},
				{
					weight: 4.1,
				},
			],
		},
		{
			featureType: "administrative",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#495421",
				},
			],
		},
		{
			featureType: "administrative.neighborhood",
			elementType: "labels",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
	]);
	initialMap.mapTypes.set("styled_map", styledMapType);
	initialMap.setMapTypeId("styled_map");

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
