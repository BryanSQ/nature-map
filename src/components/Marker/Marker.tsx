import { MdLocationPin } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { MdCenterFocusWeak } from "react-icons/md";

import { MdDelete } from "react-icons/md";

import type { LocalMarker } from "../../types";
import { useMarkers } from "../../hooks/useMarkers";
import { useMapMove } from "../../hooks";

import { DeleteDialog } from "../DeleteDialog";

import "./Marker.css";

interface IMarkerProps {
	marker: LocalMarker;
}

export const Marker = ({ marker }: IMarkerProps) => {
	const { deleteMarker, selectDetailsMarker } = useMarkers();
	const { panAndZoom } = useMapMove();

	const formatLocation = () => {
		if (marker.place?.location) {
			const [shortName, administrativeLevel, formattedAddress] =
				marker.place.location;
			let location = "";
			if (shortName !== "" && administrativeLevel !== "") {
				location = `${shortName}, ${administrativeLevel}`;
			}
			if (
				shortName === "" &&
				administrativeLevel === "" &&
				formattedAddress !== ""
			) {
				location = formattedAddress;
			}
			if (
				shortName === "" &&
				administrativeLevel === "" &&
				formattedAddress === ""
			) {
				location = "Unknown Location";
			}
			return location;
		}
	};

	return (
		<li className="marker">
			<img
				alt={`Thumbnail for ${marker.name}`}
				src={marker.place?.images?.[0].url}
				className="marker__image"
			/>

			<div className="marker__data">
				<div className="marker__header">
					<div className="marker__title">{marker.name}</div>
				</div>

				<div className="marker__location">
					<MdLocationPin />
					{formatLocation()}
				</div>
			</div>

			<div className="marker__button-container">
				{/* <button
					className="marker__button"
					type="button"
					onClick={() => deleteMarker(marker.id)}
				>
					
				</button> */}

				<DeleteDialog buttonFunction={() => deleteMarker(marker.id)} />
				<button
					className="marker__button"
					type="button"
					onClick={() => selectDetailsMarker(marker)}
				>
					<CgDetailsMore />
				</button>
				<button
					className="marker__button"
					type="button"
					onClick={() => panAndZoom(marker.position, 15)}
				>
					<MdCenterFocusWeak />
				</button>
			</div>
		</li>
	);
};
