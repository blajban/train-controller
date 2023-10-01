import io from "socket.io-client";
import L from 'leaflet';

const API_URL = process.env.NODE_ENV !== 'production'
  ? process.env.REACT_APP_API_URL_DEV
  : process.env.REACT_APP_API_URL_PROD;

const API_KEY = process.env.NODE_ENV !== 'test'
  ? process.env.REACT_APP_API_KEY
  : 'testkey';

export default function mapSocket(map, markersRef, selectedTrains) {
  const socket = io(`${API_URL}`, {
    query: {
      'x-api-key': API_KEY
    }
  });

  socket.on("message", (data) => {
    // If no train is selected or the current train is in the selectedTrains array
    if (selectedTrains.length === 0 || selectedTrains.includes(data.trainnumber)) {
        if (markersRef.current.hasOwnProperty(data.trainnumber)) {
            let marker = markersRef.current[data.trainnumber];
            marker.setLatLng(data.position);
            console.log(`Updating marker position for train ${data.trainnumber}`);
            marker.addTo(map); // Ensure marker is visible
        } else {
            let marker = L.marker(data.position).bindPopup(data.trainnumber).addTo(map);
            markersRef.current[data.trainnumber] = marker;
        }
    } else {
        // If the train is not in the selectedTrains array, hide the marker if it exists
        if (markersRef.current.hasOwnProperty(data.trainnumber)) {
            markersRef.current[data.trainnumber].remove(); // Hide the marker
            console.log(`Hiding marker for train ${data.trainnumber}`);
        }
    }
  });

  return () => {
    for(let key in markersRef.current) {
      markersRef.current[key].remove(); // Hide all markers on cleanup
    }
    socket.disconnect();
  };
}
