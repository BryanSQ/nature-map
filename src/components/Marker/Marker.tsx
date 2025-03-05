import { MdLocationPin } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";

import { MdDelete } from "react-icons/md";


import type { LocalMarker } from "../../types";
import { useMarkers } from "../../hooks/useMarkers";

import "./Marker.css";

interface IMarkerProps {
	marker: LocalMarker;
}

export const Marker = ({ marker }: IMarkerProps) => {
	const { deleteMarker, selectDetailsMarker } = useMarkers();

	console.log(marker.place?.location);
	return (
		<li className="marker">

			<img
				alt={`Thumbnail for ${marker.name}`}
				src={marker.place?.images?.[0].url}
				className="marker__image"
			/>

			<div className="marker__data">

				<div className="marker__header">
					<div className="marker__title">
						{marker.name}
					</div>

				</div>

				<div className="marker__location">
					<MdLocationPin />
					{marker.place?.location[0]}, {marker.place?.location[1]}
				</div>

				<div className="marker__buttons">
					<button type="button" onClick={() => deleteMarker(marker.id)}>
						<MdDelete />
					</button>
					<button type="button" onClick={() => selectDetailsMarker(marker)}>
						<CgDetailsMore />
					</button>
				</div>

			</div>

		</li >
	);
};
