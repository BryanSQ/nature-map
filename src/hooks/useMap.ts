import { useContext } from "react";
import { MapContext } from "../contexts/Map";

export const useMap = () => useContext(MapContext);
