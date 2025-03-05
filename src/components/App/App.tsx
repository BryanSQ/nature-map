import { Link } from "react-router-dom";
import { GoogleMap } from "../GoogleMap";
import { GoTo } from "../GoTo";
import { MarkerList } from "../MarkerList";
import { Navigation } from "../Navigation";

import { IoHeart } from "react-icons/io5";
import { MdOutlineTravelExplore } from "react-icons/md";

import { MapProvider } from "../../contexts/Map";
import { MarkerProvider } from "../../contexts/Marker";
import { PlaceDialog } from "../Place";

import "./App.css";
import { PlaceDetails } from "../Place/PlaceDetails";
import { Filter } from "../Filter/Filter";

export const App = () => {
	return (
		<>
			<MapProvider>
				<MarkerProvider>
					<GoogleMap />
					<div className="island">
						<div className="app-title">
							<p className="app-title__text">Leaf & Breeze</p>
						</div>
						<Navigation>
							<Link to="/favorites">
								Favorites
								<IoHeart />
							</Link>
							<Link to="/favorites">
								Explore <MdOutlineTravelExplore />
							</Link>
						</Navigation>
						<GoTo />
						<Filter />
						<MarkerList />
						<PlaceDialog />
						<PlaceDetails />
					</div>
				</MarkerProvider>
			</MapProvider>
		</>
	);
};
