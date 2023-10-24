import { render } from '@testing-library/react';
import Markers from './Markers';
import { useDelayed } from "../../contexts/DelayedContext";
import { useMap } from "react-leaflet";
import useMapSocket from "./mapSocket";

jest.mock('react-leaflet', () => ({
  useMap: jest.fn(),
}));

jest.mock('./mapSocket', () => jest.fn());

jest.mock("../../contexts/DelayedContext", () => ({
  useDelayed: jest.fn(),
}));

describe('Markers component', () => {
  const mockMap = {
    on: jest.fn(),
    off: jest.fn(),
    hasLayer: jest.fn(),
    removeLayer: jest.fn(),
    addLayer: jest.fn(),
  };

  const mockDelayedTrainsGroup = {
    current: {
      clearLayers: jest.fn(),
      addTo: jest.fn(),
      addLayer: jest.fn(),
    }
  };

  const mockSelectedTrainGroup = {
    current: {
      clearLayers: jest.fn(),
      addTo: jest.fn(),
      addLayer: jest.fn(),
    }
  };

  beforeEach(() => {
    useMap.mockReturnValue(mockMap);
    useMapSocket.mockReturnValue({
      allDelayedTrainsGroup: mockDelayedTrainsGroup,
      selectedTrainGroup: mockSelectedTrainGroup
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    useDelayed.mockReturnValue({
      selectedTrain: null
    });

    render(<Markers />);
  });


});
