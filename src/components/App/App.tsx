import { GoogleMap } from "../GoogleMap";
import { GoTo } from "../GoTo";
import { MarkerList } from "../MarkerList";

import { MapProvider } from "../../contexts/Map";
import { MarkerProvider } from "../../contexts/Marker";
import { PlaceDialog } from "../Place";

import "./App.css";
import { PlaceDetails } from "../Place/PlaceDetails";
import { Filter } from "../Filter/Filter";
import { Island } from "../Island";

export const App = () => {
	return (
		<>
			<MapProvider>
				<MarkerProvider>
					<GoogleMap />
					<Island>
						<GoTo />
						<Filter />
						<MarkerList />
						<PlaceDialog />
						<PlaceDetails />
					</Island>
				</MarkerProvider>
			</MapProvider>
		</>
	);
};
