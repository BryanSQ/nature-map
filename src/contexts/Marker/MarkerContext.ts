import { createContext } from "react";
import type { Marker } from "../../types";

interface IDefaultMarker {
	markers: Marker[];
	placeMarker: (
		position: google.maps.LatLng | google.maps.LatLngLiteral,
	) => Promise<Marker>;
	deleteMarker: (markerId: string) => void;
	setMarkerTitle: (id: string, newTitle: string) => void;
	selectedMarker: Marker | null;
	selectMarker: (marker: Marker | null) => void;
}

const defaultValue: IDefaultMarker = {
	markers: [],
	placeMarker: async () => ({}) as Marker,
	deleteMarker: () => {},
	setMarkerTitle: () => {},
	selectedMarker: null,
	selectMarker: () => {},
};

export const MarkerContext = createContext<IDefaultMarker>(defaultValue);
