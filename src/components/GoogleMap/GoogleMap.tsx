import { useInitMap, useMapClick } from "../../hooks"

import "./GoogleMap.css"

export const GoogleMap = () => {

    useInitMap('MAIN_MAP');
    useMapClick();

    return <div id="google-map-container" />
}

// borrar marcadores