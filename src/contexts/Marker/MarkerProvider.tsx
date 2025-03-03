import { useEffect, useState } from "react";

import type { ReactNode } from "react";
import type { LocalMarker, Marker, Place } from "../../types";

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

	const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);

	const [detailsPlace, setDetailsPlace] = useState<LocalMarker | null>(null);

	const [filterCategories, setFilterCategories] = useState<string[]>([]);

	// this is going to be used to render the markers according to the filters
	const [currentMarkers, setCurrentMarkers] = useState<Marker[]>([]);

	const selectMarker = (marker: Marker | null) => {
		setSelectedMarker(marker);
	};

	const selectDetailsMarker = (marker: LocalMarker | null) => setDetailsPlace(marker);

	const updateCategories = (newCategories: string[]) => {
		setFilterCategories(newCategories);
	}

	const refreshMarkers = () => {

		if (filterCategories.length === 0) {
			setCurrentMarkers([...markers])
			return;
		}
		const refreshedMarkers = markers.filter((marker) => marker.place && filterCategories.includes(marker.place.category))
		setCurrentMarkers(refreshedMarkers);
		return;
	}

	const renderMarkers = () => {
		const notRendered = markers.map((marker) => !currentMarkers.includes(marker))
		console.log(notRendered);
	}

	const addMarker = async (
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

		gMarker.addListener("gmp-click", () => selectMarker(newMarker));

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
		setMarkers((prev) => {
			const updatedMarkers = prev.map((marker) => {
				if (marker.id === id) {
					marker.googleMarker.title = newTitle;
					return { ...marker };
				}
				return marker;
			});

			// Guardar inmediatamente en localStorage después de actualizar el estado
			const newLocalMarkers = updatedMarkers.map(transformToLocalMarker);
			saveLocalStorageValue(newLocalMarkers);

			return updatedMarkers;
		});
	};

	const addPlaceToMarker = (markerId: string, newPlace: Place) => {
		setMarkers((prev) => {
			const updatedMarkers = prev.map((marker) => {
				if (marker.id === markerId) {
					marker.place = newPlace;
					return { ...marker };
				}
				return marker;
			});

			const newLocalMarkers = updatedMarkers.map(transformToLocalMarker);
			saveLocalStorageValue(newLocalMarkers);
			return updatedMarkers;
		})
	}

	// biome-ignore lint: exhaustive-deps innecesary here
	useEffect(() => {
		const transformMarkers = async () => {
			if (localMarkers.length > 0 && map) {
				await Promise.all(
					localMarkers.map(async (marker: LocalMarker) => {
						const newMarker = await addMarker(marker.position);
						setMarkerTitle(newMarker.id, marker.name);
					}),
				);
			}
		};

		transformMarkers();
	}, [map]);

	// biome-ignore lint: should not depend on refresh nor render
	useEffect(() => {
		refreshMarkers();
		renderMarkers();
	}, [filterCategories])

	return (
		<MarkerContext.Provider
			value={{
				markers,
				addMarker,
				deleteMarker,
				setMarkerTitle,
				selectedMarker,
				selectMarker,
				addPlaceToMarker,
				detailsPlace,
				selectDetailsMarker,
				filterCategories,
				updateCategories,
			}}
		>
			{children}
		</MarkerContext.Provider>
	);
};
