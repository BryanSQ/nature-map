import { Link } from "react-router-dom";
import { GoogleMap } from "../GoogleMap";
import { GoTo } from "../GoTo";
import { MarkerList } from "../MarkerList";
import { Navigation } from "../Navigation";

import { IoHeart } from "react-icons/io5";
import { MdOutlineTravelExplore } from "react-icons/md";

import "./App.css";
import { MapProvider } from "../../contexts/Map";
import { MarkerProvider } from "../../contexts/Marker";
import { Place } from "../Place";

export const App = () => {
    return (
        <>
            <MapProvider>
                <MarkerProvider>
                    <GoogleMap />
                    <div className="island">
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
                        <MarkerList />
                        <Place />
                    </div>
                </MarkerProvider>
            </MapProvider>
        </>
    );
};