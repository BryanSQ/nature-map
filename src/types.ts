export interface IWindow {
	googleInfoWindow: google.maps.InfoWindow;
	listener: google.maps.MapsEventListener;
}

export type Marker = {
	id: string;
	googleMarker: google.maps.marker.AdvancedMarkerElement;
	place?: Place;
};

export type LocalMarker = {
	id: string;
	name: string;
	position: google.maps.LatLngLiteral | google.maps.LatLng;
	place?: Place;
};

export type Place = {
	id: string;
	name: string;
	description: string;
	category: string;
	location: string[];
	images: { url: string }[];
};
