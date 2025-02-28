import { useContext } from "react";
import { MarkerContext } from "../contexts/Marker";

export const useMarkers = () => useContext(MarkerContext);
