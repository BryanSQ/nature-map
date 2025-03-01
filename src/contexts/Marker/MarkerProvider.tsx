import { useEffect, useState } from "react";

import type { ReactNode } from "react";
import type { LocalMarker, Marker } from "../../types";

import { MarkerContext } from "./MarkerContext";
import { useLocalStorage, useMap } from "../../hooks";
import { transformToLocalMarker } from "../../utils/map";

import { v4 as uuidv4 } from "uuid";

interface MarkerProviderProps {
	children: ReactNode;
}

export const MarkerProvider = ({ children }: MarkerProviderProps) => {
	const { map } = useMap();

	const { localStorageValue: localMarkers, saveLocalStorageValue } =
		useLocalStorage("local-markers", []);

	const [markers, setMarkers] = useState<Marker[]>([]);

	const placeMarker = async (
		position: google.maps.LatLng | google.maps.LatLngLiteral,
	): Promise<Marker> => {
		const { AdvancedMarkerElement } = (await google.maps.importLibrary(
			"marker",
		)) as google.maps.MarkerLibrary;

		if (!map) return Promise.reject("Map not loaded");

		const gMarker = new AdvancedMarkerElement({
			map: map,
			position: position,
		});

		const newMarker = {
			id: uuidv4(),
			googleMarker: gMarker,
		};

		setMarkers((prev) => {
			const updatedMarkers = [...prev, newMarker];
			saveLocalStorageValue(updatedMarkers.map(transformToLocalMarker));
			return updatedMarkers;
		});
		return newMarker;
	};

	const deleteMarker = (markerId: string) => {
		const markerToDelete = markers.find((marker) => marker.id === markerId);
		if (markerToDelete) {
			markerToDelete.googleMarker.map = null;
			setMarkers((prev) => {
				const updatedMarkers = prev.filter(
					(marker) => marker.id !== markerToDelete.id,
				);
				saveLocalStorageValue(updatedMarkers.map(transformToLocalMarker));
				return updatedMarkers;
			});
		}
	};

	const setMarkerTitle = (id: string, newTitle: string) => {
		console.log("setMarkerTitle");

		setMarkers((prev) => {
			const updatedMarkers = prev.map((marker) => {
				if (marker.id === id) {
					marker.googleMarker.title = newTitle;
					return { ...marker };
				}
				return marker;
			});

			// 🔹 Guardar inmediatamente en localStorage después de actualizar el estado
			const newLocalMarkers = updatedMarkers.map(transformToLocalMarker);
			saveLocalStorageValue(newLocalMarkers);

			return updatedMarkers;
		});
	};

	// biome-ignore lint: exhaustive-deps innecesary here
	useEffect(() => {
		const transformMarkers = async () => {
			if (localMarkers.length > 0 && map) {
				console.log(
					`VOY A CARGAR ${localMarkers.length} ${localMarkers.length === 1 ? "MARCADOR" : "MARCADORES"}`,
				);
				await Promise.all(
					localMarkers.map(async (marker: LocalMarker) => {
						const newMarker = await placeMarker(marker.position);
						setMarkerTitle(newMarker.id, marker.name);
					}),
				);
			}
		};

		transformMarkers();
	}, [map]);

	return (
		<MarkerContext.Provider
			value={{ markers, placeMarker, deleteMarker, setMarkerTitle }}
		>
			{children}
		</MarkerContext.Provider>
	);
};
