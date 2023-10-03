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

  function setMarkerVisibility(trainNumber, isVisible) {
    if (markersRef.current.hasOwnProperty(trainNumber)) {
      if (isVisible) {
        Markers.addTo(map);
      } else {
        map.removeLayer(Markers);
      }
    }
  }

  useEffect(() => {
    mapSocket(map, markersRef, selectedTrains, setMarkerVisibility);
  }, [map, selectedTrains]);

  return null;
}



export default Markers;
