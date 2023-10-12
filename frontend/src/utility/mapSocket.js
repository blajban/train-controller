import io from "socket.io-client";
import L from 'leaflet';
import { API_KEY, API_URL } from '../config';

export default function mapSocket(map, markersRef) {
  const socket = io(`${API_URL}`, {
    query: {
      'x-api-key': API_KEY
    }
  });

  socket.on("message", (data) => {
      if (markersRef.current.hasOwnProperty(data.trainnumber)) {
          let marker = markersRef.current[data.trainnumber];
          marker.setLatLng(data.position);
      } else {
          let marker = L.marker(data.position).bindPopup(data.trainnumber).addTo(map);
          markersRef.current[data.trainnumber] = marker;
      }
  });

  return () => {
    for(let key in markersRef.current) {
      map.removeLayer(markersRef.current[key]);
    }
    socket.disconnect();
  };
}
