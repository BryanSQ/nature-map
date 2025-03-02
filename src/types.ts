export interface IWindow {
	googleInfoWindow: google.maps.InfoWindow;
	listener: google.maps.MapsEventListener;
}

export type Marker = {
	id: string;
	googleMarker: google.maps.marker.AdvancedMarkerElement;
	infoWindow?: IWindow;
};

export type LocalMarker = {
	id: string;
	name: string;
	position: google.maps.LatLngLiteral | google.maps.LatLng;
};

export type Place = {
	id: string;
	name: string;
	category: string;
	images: string[];
};

export type MarkerWithPlace = Marker & { place: Place };
