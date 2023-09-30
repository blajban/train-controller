import { useRef, useEffect, useContext } from "react";
import { useMap } from "react-leaflet";

import mapSocket from "../../utility/mapSocket";
import leafletIcons from "../../utility/leafletIcons";
import { SelectedTrainsContext } from '../../App';


leafletIcons();

function Markers() {
  const map = useMap();
  const markersRef = useRef({});
  const { selectedTrains } = useContext(SelectedTrainsContext);

  useEffect(() => {
    mapSocket(map, markersRef, selectedTrains);
  }, [map, selectedTrains]);

  return null;
}

export default Markers;
