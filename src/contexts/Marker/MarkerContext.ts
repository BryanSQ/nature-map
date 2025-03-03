import { createContext } from "react";
import type { LocalMarker, Marker, Place } from "../../types";

interface IDefaultMarker {
	markers: Marker[];
	addMarker: (
		position: google.maps.LatLng | google.maps.LatLngLiteral,
	) => Promise<Marker>;
	deleteMarker: (markerId: string) => void;
	setMarkerTitle: (id: string, newTitle: string) => void;
	selectedMarker: Marker | null;
	selectMarker: (marker: Marker | null) => void;
	addPlaceToMarker: (markerId: string, place: Place) => void;

	detailsPlace: LocalMarker | null;
	selectDetailsMarker: (marker: LocalMarker | null) => void;

	filterCategories: string[];
	updateCategories: (newCategories: string[]) => void;
}

const defaultValue: IDefaultMarker = {
	markers: [],
	addMarker: async () => ({}) as Marker,
	deleteMarker: () => {},
	setMarkerTitle: () => {},
	selectedMarker: null,
	selectMarker: () => {},
	addPlaceToMarker: () => {},

	detailsPlace: null,
	selectDetailsMarker: () => {},

	filterCategories: [],
	updateCategories: () => {},
};

export const MarkerContext = createContext<IDefaultMarker>(defaultValue);
