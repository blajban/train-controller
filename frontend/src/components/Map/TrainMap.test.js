import { render, waitFor } from '@testing-library/react';
import TrainMap from './TrainMap';

jest.mock('react-leaflet', () => {
  return {
    MapContainer: () => { return (<div>Mocked MapContainer</div>) },
    TileLayer: () => { return (<div>Mocked TileLayer</div>) }
  }
});

describe('TrainMap', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('renders the mocked MapContainer', () => {
    const { getByText, debug } = render(<TrainMap />);
    expect(getByText("Mocked MapContainer")).toBeInTheDocument();
  });
});

