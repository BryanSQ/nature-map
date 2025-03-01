import type { Marker } from "../types";
import { useMap } from "./useMap";
import { useMarkers } from "./useMarkers";

import { v4 as uuidv4 } from "uuid";

export const useMapMarker = () => {
	const { map } = useMap();

	const { markers, setMarkers } = useMarkers();

	const placeMarker = async (
		position: google.maps.LatLng | google.maps.LatLngLiteral,
	): Promise<Marker> => {
		const { AdvancedMarkerElement } = (await google.maps.importLibrary(
			"marker",
		)) as google.maps.MarkerLibrary;

		console.log("placeMarker");
		const gMarker = new AdvancedMarkerElement({
			map: map,
			position: position,
		});

		const newMarker = {
			id: uuidv4(),
			googleMarker: gMarker,
		};

		setMarkers((prev) => [...prev, newMarker]);
		return newMarker;
	};

	const deleteMarker = (markerId: string) => {
		console.log("deleteMarker");
		const markerToDelete = markers.find((marker) => marker.id === markerId);
		if (markerToDelete) {
			markerToDelete.googleMarker.map = null;
			setMarkers(markers.filter((marker) => marker.id !== markerToDelete.id));
		}
	};

	const setMarkerTitle = (id: string, newTitle: string) => {
		console.log("setMarkerTitle");

		const markerToModify = markers.find((marker) => marker.id === id);

		console.log(markerToModify);
		if (markerToModify) {
			markerToModify.googleMarker.title = newTitle;

			const updatedMarkerList = markers.map((marker) =>
				marker.id === id ? markerToModify : marker,
			);
			setMarkers(updatedMarkerList);
			console.log(markerToModify.googleMarker.title);
		}
	};

	return { placeMarker, deleteMarker, setMarkerTitle };
};
