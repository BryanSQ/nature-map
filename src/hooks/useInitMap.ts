import { useEffect } from "react";

import { initMap } from "../utils/map";

import { useMap } from "./useMap";

export const useInitMap = (mapId: string) => {
	const { setMap } = useMap();

	useEffect(() => {
		const setNewMap = async () => {
			try {
				setMap(await initMap(mapId));
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message);
				} else {
					console.error(error);
				}
			}
		};

		setNewMap();
	}, []);
};
