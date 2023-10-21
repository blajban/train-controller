import io from "socket.io-client";
import L from 'leaflet';
import { API_KEY, API_URL } from '../config';
import { useRef } from "react";
import { useEffect } from "react";
import { useDelayed } from "../contexts/DelayedContext";


export default function useMapSocket(map, markersRef) {
  const { delayedTrains, selectedTrain } = useDelayed();
  const allDelayedTrainsGroup = useRef(L.layerGroup().addTo(map));
  const selectedTrainGroup = useRef(L.layerGroup().addTo(map));


  
  useEffect(() => {
    const socket = io(`${API_URL}`, {
      query: {
        'x-api-key': API_KEY
      }
    });

    socket.on("message", (data) => {
      // Is it here that we filter out too many? How can only 25/100 from delayedTrains be shown?
      const isDelayed = delayedTrains && delayedTrains.some(train => train.OperationalTrainNumber === data.trainnumber);
      if (!isDelayed) return;

      if (selectedTrain && data.trainnumber !== selectedTrain.OperationalTrainNumber) return;

      let marker = L.marker(data.position).bindPopup(data.trainnumber);

      if (selectedTrain && data.trainnumber === selectedTrain.OperationalTrainNumber) {
        if (markersRef.current.selected) {
          markersRef.current.selected.setLatLng(data.position);
          if (!selectedTrainGroup.current.hasLayer(markersRef.current.selected)) {
            markersRef.current.selected.addTo(selectedTrainGroup.current);
          }
          return;
        }
      
        marker.addTo(selectedTrainGroup.current);
        markersRef.current.selected = marker;
        return;
      }
      

      if (markersRef.current.all[data.trainnumber]) {
        markersRef.current.all[data.trainnumber].setLatLng(data.position);
        return;
      }

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



