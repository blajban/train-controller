import { useRef, useEffect } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import io from "socket.io-client";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Markers() {
  const map = useMap();
  const markersRef = useRef({});

  useEffect(() => {
    const socket = io("http://localhost:1337");

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
  }, [map]);

  return null;
}

export default Markers;
