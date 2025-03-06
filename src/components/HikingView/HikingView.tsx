import { useEffect, useState } from "react";
import { useHiking, useMapMove } from "../../hooks";
import { useMarkers } from "../../hooks/useMarkers";
import type { LocalMarker } from "../../types";
import { transformToLocalMarker } from "../../utils/map";

import "./HikingView.css";
import { useParams } from "react-router-dom";

export const HikingView = () => {
	const { searchRoutes } = useHiking();
	const { panAndZoom } = useMapMove();

	const { lat, lng } = useParams();

	console.log(lat, lng);

	useEffect(() => {
		if (lat && lng) {
			panAndZoom(
				{ lat: Number.parseFloat(lat), lng: Number.parseFloat(lng) },
				16,
			);
			searchRoutes({
				lat: Number.parseFloat(lat),
				lng: Number.parseFloat(lng),
			});
		}
	}, [lat, lng, panAndZoom, searchRoutes]);

	return <div id="pano" />;
};
