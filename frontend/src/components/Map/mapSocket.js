import io from "socket.io-client";
import L from 'leaflet';
import { API_KEY, API_URL } from '../../config';
import { useRef } from "react";
import { useEffect } from "react";
import { useDelayed } from "../../contexts/DelayedContext";


export default function useMapSocket(map, markersRef) {
  const { delayedTrains, selectedTrain, trainsWithPosition, setTrainsWithPosition } = useDelayed();
  const allDelayedTrainsGroup = useRef(L.layerGroup().addTo(map));
  const selectedTrainGroup = useRef(L.layerGroup().addTo(map));

  useEffect(() => {
    const socket = io(`${API_URL}`, {
      query: {
        'x-api-key': API_KEY
      }
    });

    socket.on("message", (data) => {
      if (markersRef.current.selected && markersRef.current.selected.trainnumber == data.trainnumber) {
        markersRef.current.selected.setLatLng(data.position);
      }

      if (markersRef.current.all[data.trainnumber]) {
        markersRef.current.all[data.trainnumber].setLatLng(data.position);
        return;
      }

      const isDelayed = delayedTrains && delayedTrains.some(train => train.OperationalTrainNumber === data.trainnumber);
      if (!isDelayed) return;

      if (!trainsWithPosition.includes(data.trainnumber)) {
        setTrainsWithPosition(prevTrains => [...prevTrains, data.trainnumber]);
      }

      let marker = L.marker(data.position).bindPopup(data.trainnumber);

      marker.addTo(allDelayedTrainsGroup.current);
      markersRef.current.all[data.trainnumber] = marker;
    });

    return () => {
      for(let marker of Object.values(markersRef.current.all)) {
        marker.remove();
      }
      if(markersRef.current.selected) {
          markersRef.current.selected.remove();
      }
      socket.disconnect();
    };
  }, [map, delayedTrains, selectedTrain, markersRef]);

  return { allDelayedTrainsGroup, selectedTrainGroup };
}



