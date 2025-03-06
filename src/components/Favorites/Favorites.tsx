import { MapProvider } from "../../contexts/Map";
import { MarkerProvider } from "../../contexts/Marker";
import { GoogleMap } from "../GoogleMap";
import { Island } from "../Island";
import { HikingView } from "../HikingView";

export const Favorites = () => {
	return (
		<>
			<MapProvider>
				<MarkerProvider>
					<GoogleMap />
					<Island>
						<HikingView />
					</Island>
				</MarkerProvider>
			</MapProvider>
		</>
	);
};
