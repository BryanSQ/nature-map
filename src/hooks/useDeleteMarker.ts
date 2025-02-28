import { useMap } from "./useMap";
import { useMarkers } from "./useMarkers";

export const useDeleteMarker = () => {
	const { markers, setMarkers } = useMarkers();
	const { map } = useMap();

	const deleteMarker = (markerId: string) => {
		const markerToDelete = markers.find((marker) => marker.id === markerId);
		if (markerToDelete && map !== null) {
			markerToDelete.googleMarker.map = null;
			setMarkers(markers.filter((marker) => marker.id !== markerToDelete.id));
		}
	};

	return deleteMarker;
};
