import { useRef, useEffect } from "react";

import { useMap } from "react-leaflet";

import useMapSocket from "../../utility/mapSocket";
import L from "leaflet";
import leafletIcons from "../../utility/leafletIcons";

import { useDelayed } from "../../contexts/DelayedContext";

leafletIcons();

function Markers() {
  const map = useMap();
  const markersRef = useRef({
    all: {},
    selected: null
  });

  const { allDelayedTrainsGroup, selectedTrainGroup } = useMapSocket(map, markersRef);

  const { selectedTrain } = useDelayed();

  useEffect(() => {
    if (selectedTrain) {
      allDelayedTrainsGroup.current.clearLayers();
      selectedTrainGroup.current.addTo(map);
    } else {
      allDelayedTrainsGroup.current.addTo(map);
      Object.values(markersRef.current.all).forEach(marker => {
        allDelayedTrainsGroup.current.addLayer(marker);
      });
      selectedTrainGroup.current.clearLayers();
    }
  }, [selectedTrain]);

  return null;
}


export default Markers;
