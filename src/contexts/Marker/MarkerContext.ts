import { createContext } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { Marker } from "../../types";

interface IDefaultMarker {
	markers: Marker[];
	setMarkers: Dispatch<SetStateAction<Marker[]>>;
}

const defaultValue: IDefaultMarker = {
	markers: [],
	setMarkers: () => {},
};

export const MarkerContext = createContext<IDefaultMarker>(defaultValue);
