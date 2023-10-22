import { useRef, useEffect } from "react";

import { useMap } from "react-leaflet";

import useMapSocket from "./mapSocket";
import L from "leaflet";
import leafletIcons from "./leafletIcons";

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
      const selectedMarkerPos = markersRef.current.all[selectedTrain.OperationalTrainNumber].getLatLng();
      const newMarker = L.marker(selectedMarkerPos).bindPopup(selectedTrain.OperationalTrainNumber);
      newMarker.addTo(selectedTrainGroup.current);
      markersRef.current.selected = newMarker;
      markersRef.current.selected.trainnumber = selectedTrain.OperationalTrainNumber;
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
