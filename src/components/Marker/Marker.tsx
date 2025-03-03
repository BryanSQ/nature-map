import { MdLocationPin } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import type { LocalMarker } from "../../types";
import { useMarkers } from "../../hooks/useMarkers";

import "./Marker.css";

interface IMarkerProps {
	marker: LocalMarker;
}

export const Marker = ({ marker }: IMarkerProps) => {
	const { deleteMarker, selectDetailsMarker } = useMarkers();

	return (
		<li className="marker">
			<div className="marker-title">
				{marker.name}
				<button type="button" onClick={() => deleteMarker(marker.id)}>
					<MdDelete />
				</button>
				<button type="button" onClick={() => selectDetailsMarker(marker)}>
					See Details
				</button>
			</div>

			<div className="marker-data">
				<span>
					{marker.name}
					<MdLocationPin /> San José
				</span>
			</div>
		</li>
	);
};
