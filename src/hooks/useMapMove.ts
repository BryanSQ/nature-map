import { useMap } from "./useMap";

export const useMapMove = () => {
	const { map } = useMap();

	const panAndZoom = (
		position: google.maps.LatLngLiteral | google.maps.LatLng,
		zoomLevel: number,
	) => {
		map?.panTo(position);
		map?.setZoom(zoomLevel);
	};

	return { panAndZoom };
};
