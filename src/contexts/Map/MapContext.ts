import { createContext, type Dispatch, type SetStateAction } from "react";

interface IDefaultMap {
	map: google.maps.Map | null;
	setMap: Dispatch<SetStateAction<google.maps.Map | null>>;
}

const defaultValue: IDefaultMap = {
	map: null,
	setMap: () => {},
};

export const MapContext = createContext(defaultValue);
