import mapSocket from './mapSocket';
import io from "socket.io-client";
import L from 'leaflet';

jest.mock('socket.io-client');
jest.mock('leaflet');

describe('mapSocket', () => {
  let map, markersRef, socketMock;
  let messageCallback;

  beforeEach(() => {
    socketMock = { 
      on: jest.fn(),
      disconnect: jest.fn()
    };
    io.mockReturnValue(socketMock);

    L.marker = jest.fn().mockReturnValue({
      bindPopup: jest.fn().mockReturnValue({
        addTo: jest.fn()
      })
    });

    map = { removeLayer: jest.fn() };
    markersRef = { current: {} };

    mapSocket(map, markersRef);
    messageCallback = socketMock.on.mock.calls.find(call => call[0] === 'message')[1];
  });

  it('creates a socket connection', () => {
    expect(io).toHaveBeenCalledWith("http://localhost:1337");
  });

  it('listens to "message" events on the socket', () => {
    expect(socketMock.on).toHaveBeenCalledWith("message", expect.any(Function));
  });

  it('updates the marker if trainnumber exists', () => {
    const mockMarker = { setLatLng: jest.fn() };
    markersRef.current = { '123': mockMarker };
    const mockData = { trainnumber: '123', position: [0, 0] };

    messageCallback(mockData);

    expect(mockMarker.setLatLng).toHaveBeenCalledWith(mockData.position);
    expect(L.marker).not.toHaveBeenCalled();
  });

  it('creates a new marker if trainnumber does not exist', () => {
    markersRef.current = {};
    const mockData = { trainnumber: '123', position: [0, 0] };

    messageCallback(mockData);

    expect(L.marker).toHaveBeenCalledWith(mockData.position);
    expect(L.marker().bindPopup).toHaveBeenCalledWith(mockData.trainnumber);
    expect(L.marker().bindPopup().addTo).toHaveBeenCalledWith(map);
  });

  it('cleans up markers and disconnects the socket on cleanup', () => {
    const returnedFunction = mapSocket(map, markersRef);
    markersRef.current = {
      key1: "marker1",
      key2: "marker2",
      key3: "marker3"
    };

    returnedFunction();

    Object.values(markersRef.current).forEach((marker) => {
      expect(map.removeLayer).toHaveBeenCalledWith(marker);
    });
    
    expect(socketMock.disconnect).toHaveBeenCalledTimes(1);
  });
});


