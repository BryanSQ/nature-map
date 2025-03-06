import { fetchHikingRoutes } from "../utils/routes";
import { useMap } from "./useMap";

export const useHiking = () => {
	const { map } = useMap();

	const searchRoutes = async (
		position: google.maps.LatLng | google.maps.LatLngLiteral,
	) => {
		// Utilizamos la posición para buscar rutas cercanas
		const hikingRoutes = await fetchHikingRoutes(position);

		if (!hikingRoutes) {
			return;
		}

		// Usamos la función fetchRouteCoordinates para obtener nodos cercanos a la ubicación.
		fetchRouteCoordinates(position);
	};

	const fetchRouteCoordinates = async (
		position: google.maps.LatLng | google.maps.LatLngLiteral,
	) => {
		// Convertir lat, lng a formato numérico si es necesario
		const lat = "lat" in position ? position.lat : position.latitude;
		const lng = "lng" in position ? position.lng : position.longitude;

		// Crear la consulta para obtener nodos cercanos a la ubicación dada
		const url = `http://overpass-api.de/api/interpreter?data=[out:json][timeout:60];node(around:500,${lat},${lng});out;`;

		console.log("Overpass URL:", url);

		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const data = await response.json();

			// Extraemos las coordenadas de los nodos cercanos
			const coordinates = data.elements.map(
				(node: { lat: number; lon: number }) => ({
					lat: node.lat,
					lng: node.lon,
				}),
			);

			console.log(data);
			drawRoute(coordinates);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error(String(error));
			}
		}
	};

	const drawRoute = (coordinates: { lat: number; lng: number }[]) => {
		const routeLine = new google.maps.Polyline({
			path: coordinates,
			geodesic: true,
			strokeColor: "#8B4513 ",
			strokeOpacity: 1.0,
			strokeWeight: 4,
		});
		routeLine.setMap(map);
	};

	return { searchRoutes };
};
